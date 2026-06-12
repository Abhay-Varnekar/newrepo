require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const crypto   = require('crypto');
const fs       = require('fs');
const path     = require('path');

const Razorpay     = require('razorpay');
const emailService = require('./services/emailService');
const jobQueue     = require('./services/jobQueue');
const { RECEIPTS_DIR } = require('./services/pdfService');

const app  = express();
const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------------
// Validate required environment variables on startup
// ---------------------------------------------------------------------------
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(
    '[TimesAspire Server] ERROR: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET ' +
    'must be set in server/.env before starting the server.\n' +
    'Copy server/.env.example to server/.env and fill in your Razorpay credentials.'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Razorpay client (server-side only — secret key never reaches the browser)
// ---------------------------------------------------------------------------
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods:     ['GET', 'POST'],
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * GET /api/health
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'TimesAspire payment server is running.' });
});

/**
 * POST /api/create-order
 */
app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', planName } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0)
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number in paise.' });
  if (!Number.isInteger(amount))
    return res.status(400).json({ error: 'Amount must be an integer (paise).' });
  if (amount > 1_000_000_00)
    return res.status(400).json({ error: 'Amount exceeds maximum allowed value.' });

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes:   { planName: planName || 'TimesAspire Pass', source: 'timesaspire-website' },
    });

    console.log(`[Order Created] id=${order.id} plan="${planName}" amount=${amount} paise`);

    return res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error('[create-order] Razorpay API error:', err);
    return res.status(502).json({ error: 'Failed to create Razorpay order. Please try again.' });
  }
});

/**
 * POST /api/verify-payment
 *
 * 1. Verifies the Razorpay HMAC signature — CRITICAL for security.
 * 2. Returns { success: true, paymentId, receiptNumber } IMMEDIATELY.
 * 3. Enqueues a background job to generate PDF + send receipt email.
 */
app.post('/api/verify-payment', (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    planName,
    quantity,
    baseAmount,
    gstOnAmount,
    convenienceFee,
    gstOnConvenience,
    totalAmount,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ success: false, error: 'Missing required payment fields.' });

  // ── HMAC signature verification ──────────────────────────────────────────
  const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSig   = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(signatureBody)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(expectedSig,           'hex'),
    Buffer.from(razorpay_signature,    'hex')
  );

  if (!isValid) {
    console.warn(`[Payment INVALID] order=${razorpay_order_id} payment=${razorpay_payment_id}`);
    return res.status(400).json({ success: false, error: 'Invalid payment signature.' });
  }

  // ── Payment is genuine — build receipt metadata ──────────────────────────
  const now           = Date.now();
  const datePart      = new Date(now).toISOString().slice(0, 10).replace(/-/g, '');
  const idSuffix      = razorpay_payment_id.slice(-5).toUpperCase();
  const receiptNumber = `TA-${datePart}-${idSuffix}`;

  console.log(`[Payment Verified] order=${razorpay_order_id} payment=${razorpay_payment_id} receipt=${receiptNumber}`);

  // ── Respond INSTANTLY ────────────────────────────────────────────────────
  res.json({ success: true, paymentId: razorpay_payment_id, receiptNumber });

  // ── Enqueue background work (non-blocking) ───────────────────────────────
  // Fetch customer details from Razorpay asynchronously, then enqueue PDF job
  (async () => {
    try {
      const payment       = await razorpay.payments.fetch(razorpay_payment_id);
      const customerEmail = payment.email   || null;
      const customerName  = payment.contact ? String(payment.contact) : '';

      jobQueue.enqueue({
        type: 'generate_pdf',
        payload: {
          paymentId:       razorpay_payment_id,
          orderId:         razorpay_order_id,
          receiptNumber,
          planName:        planName        || 'TimesAspire Pass',
          quantity:        Number(quantity) || 1,
          baseAmount:      Number(baseAmount)       || 0,
          gstOnAmount:     Number(gstOnAmount)      || 0,
          convenienceFee:  Number(convenienceFee)   || 0,
          gstOnConvenience:Number(gstOnConvenience) || 0,
          totalAmount:     Number(totalAmount)      || 0,
          customerName,
          customerEmail,
          timestamp:       now,
        },
      });
    } catch (err) {
      console.error(`[verify-payment] Failed to fetch payment details for ${razorpay_payment_id}:`, err.message);
    }
  })();
});

/**
 * GET /api/receipt/:paymentId/status
 *
 * Polls whether the PDF is ready. Called every 2 s by useReceiptStatus.
 * Returns: { ready: boolean, downloadUrl?: string }
 */
app.get('/api/receipt/:paymentId/status', (req, res) => {
  const { paymentId } = req.params;

  // Basic sanitise — payment IDs are alphanumeric with underscores
  if (!/^[\w-]+$/.test(paymentId)) {
    return res.status(400).json({ error: 'Invalid paymentId.' });
  }

  const pdfPath = path.join(RECEIPTS_DIR, `${paymentId}.pdf`);
  const exists  = fs.existsSync(pdfPath);

  if (exists) {
    return res.json({
      ready:       true,
      downloadUrl: `/api/receipt/${paymentId}/download`,
    });
  }

  return res.json({ ready: false });
});

/**
 * GET /api/receipt/:paymentId/download
 *
 * Serves the generated PDF as a download attachment.
 */
app.get('/api/receipt/:paymentId/download', (req, res) => {
  const { paymentId } = req.params;

  if (!/^[\w-]+$/.test(paymentId)) {
    return res.status(400).json({ error: 'Invalid paymentId.' });
  }

  const pdfPath = path.join(RECEIPTS_DIR, `${paymentId}.pdf`);

  if (!fs.existsSync(pdfPath)) {
    return res.status(404).json({ error: 'Receipt not ready yet. Please try again in a moment.' });
  }

  res.setHeader('Content-Type',        'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="TimesAspire-Receipt-${paymentId}.pdf"`);
  fs.createReadStream(pdfPath).pipe(res);
});

// ---------------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n✅ TimesAspire payment server running on http://localhost:${PORT}`);
  console.log(`   Razorpay Key ID : ${process.env.RAZORPAY_KEY_ID}`);
  console.log(`   Mode            : ${process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live') ? 'PRODUCTION' : 'TEST'}`);
  console.log(`   Receipts dir    : ${RECEIPTS_DIR}\n`);
});
