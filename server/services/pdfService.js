'use strict';

/**
 * pdfService.js
 *
 * Generates a clean, professional receipt PDF using PDFKit.
 *
 * Design:
 *  - White header with logo (no gold bar at top)
 *  - Black / dark-grey text throughout — maximum readability
 *  - Larger, generous font sizes
 *  - Gold used sparingly as an accent only (totals, dividers)
 *  - Helvetica (built-in — zero external font loading)
 *  - Logo loaded from disk once and cached
 */

const PDFDocument = require('pdfkit');
const fs          = require('fs');
const path        = require('path');

// ── Output directory ──────────────────────────────────────────────────────────
const RECEIPTS_DIR = path.join(__dirname, '..', 'receipts');
if (!fs.existsSync(RECEIPTS_DIR)) fs.mkdirSync(RECEIPTS_DIR, { recursive: true });

// ── Logo — loaded once, cached ────────────────────────────────────────────────
let _logoBuffer = null;
function getLogoBuffer() {
  if (_logoBuffer) return _logoBuffer;
  const logoPath = path.join(
    __dirname, '..', '..', 'public', 'images', 'logos', 'logo.png'
  );
  if (fs.existsSync(logoPath)) _logoBuffer = fs.readFileSync(logoPath);
  return _logoBuffer;
}
getLogoBuffer(); // pre-warm on module load

// ── Palette ───────────────────────────────────────────────────────────────────
const BLACK      = '#0A0A0A';
const DARK       = '#1F2937';
const MID        = '#4B5563';
const LIGHT      = '#9CA3AF';
const BORDER     = '#D1D5DB';
const BG_LIGHT   = '#F9FAFB';
const WHITE      = '#FFFFFF';
const GOLD       = '#B8860B';
const GOLD_FILL  = '#C9A84C';
const GREEN_TEXT = '#065F46';
const GREEN_BG   = '#ECFDF5';
const GREEN_BORD = '#A7F3D0';

// ── Utilities ─────────────────────────────────────────────────────────────────
function inr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', minimumFractionDigits: 2,
  }).format(n);
}

function formatDate(ts) {
  return new Date(ts).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }) + ' IST';
}

function fillRect(doc, x, y, w, h, color) {
  doc.save().rect(x, y, w, h).fill(color).restore();
}

function strokeRect(doc, x, y, w, h, color, lw = 0.75) {
  doc.save().rect(x, y, w, h).strokeColor(color).lineWidth(lw).stroke().restore();
}

function hLine(doc, x, y, w, color = BORDER, lw = 0.5) {
  doc.save().moveTo(x, y).lineTo(x + w, y).strokeColor(color).lineWidth(lw).stroke().restore();
}

/**
 * Draws a label+value row across the full content width.
 * Returns the y after the row (rowHeight below y).
 */
function row(doc, x, y, cw, label, value, opts = {}) {
  const {
    labelFont  = 'Helvetica',
    valueFont  = 'Helvetica-Bold',
    labelColor = MID,
    valueColor = BLACK,
    fontSize   = 10,
    rowHeight  = 20,
  } = opts;

  doc.font(labelFont).fontSize(fontSize).fillColor(labelColor)
    .text(label, x, y, { width: cw * 0.58, lineBreak: false });
  doc.font(valueFont).fontSize(fontSize).fillColor(valueColor)
    .text(value, x + cw * 0.58, y, { width: cw * 0.42, align: 'right', lineBreak: false });

  return y + rowHeight;
}

// ── Main export ───────────────────────────────────────────────────────────────
/**
 * generateReceiptPdf — creates a PDF receipt and saves it to disk.
 *
 * @param {object}  data
 * @param {string}  data.paymentId
 * @param {string}  data.orderId
 * @param {string}  data.receiptNumber
 * @param {string}  data.planName
 * @param {number}  data.quantity
 * @param {number}  data.baseAmount
 * @param {number}  data.gstOnAmount
 * @param {number}  data.convenienceFee
 * @param {number}  data.gstOnConvenience
 * @param {number}  data.totalAmount
 * @param {string}  data.customerName
 * @param {string}  data.customerEmail
 * @param {number}  [data.timestamp]
 *
 * @returns {Promise<string>}  Absolute path of the saved PDF.
 */
async function generateReceiptPdf(data) {
  const {
    paymentId,
    orderId,
    receiptNumber,
    planName,
    quantity,
    baseAmount       = 0,
    gstOnAmount      = 0,
    convenienceFee   = 0,
    gstOnConvenience = 0,
    totalAmount      = 0,
    customerName     = '',
    customerEmail    = '',
    timestamp        = Date.now(),
  } = data;

  const outputPath = path.join(RECEIPTS_DIR, `${paymentId}.pdf`);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size:    'A4',
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      info: {
        Title:   `Receipt ${receiptNumber}`,
        Author:  'TimesAspire',
        Subject: 'Payment Receipt',
      },
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const PW = doc.page.width;    // 595.28
    const PH = doc.page.height;   // 841.89
    const ML = 52;
    const MR = 52;
    const CW = PW - ML - MR;     // ~491

    let y = 0;

    // ════════════════════════════════════════════════════════════════
    // 1. WHITE HEADER — logo left, company name right
    // ════════════════════════════════════════════════════════════════
    fillRect(doc, 0, 0, PW, 110, WHITE);

    // Logo
    const logo = getLogoBuffer();
    if (logo) {
      doc.image(logo, ML, 14, { height: 80, fit: [150, 80] });
    } else {
      doc.font('Helvetica-Bold').fontSize(22).fillColor(DARK)
        .text('TimesAspire', ML, 36);
    }

    // Company name + tagline (right-aligned)
    doc.font('Helvetica-Bold').fontSize(18).fillColor(DARK)
      .text('TimesAspire', 0, 30, { align: 'right', width: PW - MR - 8 });
    doc.font('Helvetica').fontSize(9).fillColor(MID)
      .text('The Global Connect', 0, 52, {
        align: 'right', width: PW - MR - 8, characterSpacing: 1.5,
      });
    doc.font('Helvetica').fontSize(8).fillColor(LIGHT)
      .text('support@timesaspire.com', 0, 66, { align: 'right', width: PW - MR - 8 });

    // Thin gold separator line under header
    hLine(doc, 0, 110, PW, GOLD_FILL, 2);

    y = 126;

    // ════════════════════════════════════════════════════════════════
    // 2. RECEIPT TITLE + NUMBER
    // ════════════════════════════════════════════════════════════════
    doc.font('Helvetica-Bold').fontSize(22).fillColor(BLACK)
      .text('PAYMENT RECEIPT', ML, y);

    doc.font('Helvetica').fontSize(10).fillColor(MID)
      .text(`Receipt No:`, ML, y + 30);
    doc.font('Helvetica-Bold').fontSize(12).fillColor(GOLD)
      .text(receiptNumber, ML + 72, y + 28);

    // Date right-aligned
    doc.font('Helvetica').fontSize(9).fillColor(MID)
      .text('Date & Time:', 0, y + 30, { align: 'right', width: PW - MR - 8 });
    doc.font('Helvetica').fontSize(9).fillColor(DARK)
      .text(formatDate(timestamp), 0, y + 43, { align: 'right', width: PW - MR - 8 });

    y += 64;
    hLine(doc, ML, y, CW, BORDER);
    y += 16;

    // ════════════════════════════════════════════════════════════════
    // 3. PAYMENT CONFIRMED BANNER
    // ════════════════════════════════════════════════════════════════
    fillRect(doc, ML, y, CW, 44, GREEN_BG);
    strokeRect(doc, ML, y, CW, 44, GREEN_BORD);

    doc.font('Helvetica-Bold').fontSize(13).fillColor(GREEN_TEXT)
      .text('✅  Payment Confirmed — Registration Successful', ML + 14, y + 15);

    y += 58;

    // ════════════════════════════════════════════════════════════════
    // 4. CUSTOMER DETAILS
    // ════════════════════════════════════════════════════════════════
    if (customerName || customerEmail) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(LIGHT)
        .text('BILLED TO', ML, y, { characterSpacing: 1.5 });
      y += 16;

      if (customerName) {
        doc.font('Helvetica-Bold').fontSize(13).fillColor(BLACK)
          .text(customerName, ML, y);
        y += 18;
      }
      if (customerEmail) {
        doc.font('Helvetica').fontSize(10).fillColor(MID)
          .text(customerEmail, ML, y);
        y += 14;
      }
      y += 12;
      hLine(doc, ML, y, CW);
      y += 16;
    }

    // ════════════════════════════════════════════════════════════════
    // 5. ORDER DETAILS
    // ════════════════════════════════════════════════════════════════
    doc.font('Helvetica-Bold').fontSize(9).fillColor(LIGHT)
      .text('ORDER DETAILS', ML, y, { characterSpacing: 1.5 });
    y += 16;

    const rowOpts = { fontSize: 11, rowHeight: 22 };
    y = row(doc, ML, y, CW, 'Plan',       planName,  { ...rowOpts, valueColor: BLACK });
    y = row(doc, ML, y, CW, 'Quantity',   String(quantity), rowOpts);
    y = row(doc, ML, y, CW, 'Order ID',   orderId,   { ...rowOpts, fontSize: 9, rowHeight: 18 });
    y = row(doc, ML, y, CW, 'Payment ID', paymentId, { ...rowOpts, fontSize: 9, rowHeight: 18 });

    y += 12;
    hLine(doc, ML, y, CW);
    y += 16;

    // ════════════════════════════════════════════════════════════════
    // 6. FEE BREAKDOWN TABLE
    // ════════════════════════════════════════════════════════════════
    doc.font('Helvetica-Bold').fontSize(9).fillColor(LIGHT)
      .text('FEE BREAKDOWN', ML, y, { characterSpacing: 1.5 });
    y += 16;

    // Table header
    fillRect(doc, ML, y, CW, 24, DARK);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
      .text('DESCRIPTION', ML + 10, y + 7);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
      .text('AMOUNT', ML + 10, y + 7, { align: 'right', width: CW - 20 });
    y += 24;

    const tableRows = [
      [`Base Amount  (${quantity} × ${planName})`, inr(baseAmount)],
      ['GST on Base Amount (18%)',                  inr(gstOnAmount)],
      ['Convenience Fee (2%)',                      inr(convenienceFee)],
      ['GST on Convenience Fee (18%)',              inr(gstOnConvenience)],
    ];

    tableRows.forEach(([label, val], i) => {
      const bg = i % 2 === 0 ? WHITE : BG_LIGHT;
      fillRect(doc, ML, y, CW, 24, bg);
      strokeRect(doc, ML, y, CW, 24, BORDER, 0.4);

      doc.font('Helvetica').fontSize(10).fillColor(DARK)
        .text(label, ML + 10, y + 7, { lineBreak: false });
      doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK)
        .text(val, ML + 10, y + 7, { align: 'right', width: CW - 20, lineBreak: false });

      y += 24;
    });

    // Total row — gold background
    fillRect(doc, ML, y, CW, 34, GOLD);
    doc.font('Helvetica-Bold').fontSize(13).fillColor(WHITE)
      .text('TOTAL CHARGED', ML + 10, y + 10);
    doc.font('Helvetica-Bold').fontSize(14).fillColor(WHITE)
      .text(inr(totalAmount), ML + 10, y + 10, { align: 'right', width: CW - 20 });
    y += 48;

    // ════════════════════════════════════════════════════════════════
    // 7. WHAT HAPPENS NEXT
    // ════════════════════════════════════════════════════════════════
    hLine(doc, ML, y, CW);
    y += 16;

    doc.font('Helvetica-Bold').fontSize(9).fillColor(LIGHT)
      .text('WHAT HAPPENS NEXT', ML, y, { characterSpacing: 1.5 });
    y += 16;

    const nextSteps = [
      'Our team will contact you with your entry pass, venue details, and event schedule.',
      'Please keep this receipt and your Payment ID for future reference.',
      'For any queries, write to us at support@timesaspire.com',
    ];

    nextSteps.forEach((line) => {
      doc.font('Helvetica').fontSize(10).fillColor(DARK)
        .text(`•  ${line}`, ML, y, { width: CW });
      y += 20;
    });

    y += 12;

    // ════════════════════════════════════════════════════════════════
    // 8. FOOTER
    // ════════════════════════════════════════════════════════════════
    const footerY = PH - 52;
    hLine(doc, 0, footerY, PW, BORDER);
    fillRect(doc, 0, footerY + 0.5, PW, 51.5, DARK);

    doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE)
      .text('TimesAspire — The Global Connect', ML, footerY + 16);
    doc.font('Helvetica').fontSize(8).fillColor(LIGHT)
      .text(
        `© ${new Date().getFullYear()} TimesAspire. All rights reserved.   |   support@timesaspire.com`,
        ML, footerY + 32,
        { width: CW }
      );

    // ── Finalise ──────────────────────────────────────────────────
    doc.end();
    stream.on('finish', () => resolve(outputPath));
    stream.on('error',  reject);
  });
}

module.exports = { generateReceiptPdf, RECEIPTS_DIR };
