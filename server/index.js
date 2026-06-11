require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
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
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json());

// Allow requests only from the configured frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173', // vite preview
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. same-origin, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/**
 * Health check
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'TimesAspire payment server is running.' });
});

/**
 * POST /api/create-order
 *
 * Body: { amount: number (in paise), currency: string, planName: string }
 * Returns: { orderId, amount, currency }
 *
 * The Razorpay secret key is used here — this endpoint must remain server-side.
 */
app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', planName } = req.body;

  // Basic validation
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount. Must be a positive number in paise.' });
  }
  if (!Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Amount must be an integer (paise).' });
  }
  if (amount > 1_000_000_00) {
    // 1 crore INR safety cap
    return res.status(400).json({ error: 'Amount exceeds maximum allowed value.' });
  }

  try {
    const order = await razorpay.orders.create({
      amount,        // in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        planName: planName || 'TimesAspire Pass',
        source: 'timesaspire-website',
      },
    });

    console.log(`[Order Created] id=${order.id} plan="${planName}" amount=${amount} paise`);

    return res.json({
      orderId: order.id,
      amount: order.amount,
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
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * Returns: { success: boolean }
 *
 * Verifies the HMAC-SHA256 signature to confirm the payment is genuine.
 * This step is CRITICAL for security — never skip it.
 */
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing required payment fields.' });
  }

  // Construct the expected signature body as per Razorpay docs
  const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(signatureBody)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(razorpay_signature, 'hex')
  );

  if (isValid) {
    console.log(
      `[Payment Verified] order_id=${razorpay_order_id} payment_id=${razorpay_payment_id}`
    );
    return res.json({ success: true, paymentId: razorpay_payment_id });
  } else {
    console.warn(
      `[Payment INVALID] order_id=${razorpay_order_id} payment_id=${razorpay_payment_id} — signature mismatch`
    );
    return res.status(400).json({ success: false, error: 'Invalid payment signature.' });
  }
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
  console.log(`   Mode            : ${process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live') ? 'PRODUCTION' : 'TEST'}\n`);
});
