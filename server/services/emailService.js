'use strict';

const path = require('path');

/**
 * emailService.js
 *
 * Sends a payment confirmation email to the customer.
 * Also BCC's the company inbox (COMPANY_EMAIL in server/.env).
 *
 * Email content is controlled by server/emailTemplate.js — edit that file.
 *
 * Required env vars (server/.env):
 *   SMTP_HOST      e.g. smtp.gmail.com
 *   SMTP_PORT      e.g. 587
 *   SMTP_SECURE    false (STARTTLS) | true (SSL/465)
 *   SMTP_USER      your sending email address
 *   SMTP_PASS      Gmail App Password — myaccount.google.com/apppasswords
 *   SMTP_FROM      "TimesAspire <noreply@timesaspire.com>"
 *   COMPANY_EMAIL  your company inbox that receives a BCC of every email
 */

const nodemailer = require('nodemailer');
const template   = require('../emailTemplate');

// ── Transporter (created once, lazily) ────────────────────────────────────────
let _transport = null;

function getTransport() {
  if (_transport) return _transport;
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  _transport = nodemailer.createTransport({
    host:   SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });
  return _transport;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function inr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', minimumFractionDigits: 2,
  }).format(n);
}

/** Replace all {{key}} placeholders with values from data. */
function fill(text, data) {
  return text
    .replace(/\{\{planName\}\}/g,  data.planName)
    .replace(/\{\{quantity\}\}/g,  String(data.quantity))
    .replace(/\{\{amount\}\}/g,    data.amount)
    .replace(/\{\{paymentId\}\}/g, data.paymentId)
    .replace(/\{\{orderId\}\}/g,   data.orderId);
}

// ── HTML email builder ────────────────────────────────────────────────────────
function buildHtml(data) {
  const paragraphs = template.bodyLines
    .map((line) => `
      <p style="margin:0 0 16px 0;font-size:14px;color:#374151;line-height:1.75;">
        ${fill(line, data)}
      </p>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${fill(template.subject, data)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:36px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,0.07);max-width:580px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#b8860b 0%,#c9a84c 100%);
                        padding:30px 40px;">
              <p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;
                         letter-spacing:0.3px;">TimesAspire</p>
              <p style="margin:6px 0 0;font-size:10px;color:rgba(255,255,255,0.65);
                         letter-spacing:2.5px;text-transform:uppercase;">
                The Global Connect
              </p>
            </td>
          </tr>

          <!-- ── Success Banner ── -->
          <tr>
            <td style="background:#ecfdf5;padding:18px 40px;
                        border-bottom:1px solid #a7f3d0;">
              <p style="margin:0;font-size:16px;font-weight:700;color:#065f46;">
                ✅ &nbsp; Payment Confirmed
              </p>
              <p style="margin:5px 0 0;font-size:12px;color:#047857;">
                Your registration has been received successfully.
              </p>
            </td>
          </tr>

          <!-- ── Payment Details Box ── -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#fafaf8;border:1px solid #e5e7eb;
                             border-radius:8px;padding:16px 20px;">
                <tr>
                  <td style="font-size:11px;color:#9ca3af;padding:5px 0;">Plan</td>
                  <td align="right"
                      style="font-size:11px;font-weight:600;color:#1f2937;padding:5px 0;">
                    ${fill('{{planName}} &times; {{quantity}}', data)}
                  </td>
                </tr>
                <tr>
                  <td style="font-size:11px;color:#9ca3af;padding:5px 0;">Amount Paid</td>
                  <td align="right"
                      style="font-size:11px;font-weight:700;color:#b8860b;padding:5px 0;">
                    ${fill('{{amount}}', data)}
                  </td>
                </tr>
                <tr style="border-top:1px solid #e5e7eb;">
                  <td style="font-size:10px;color:#9ca3af;padding:10px 0 4px;">Payment ID</td>
                  <td align="right"
                      style="font-size:10px;font-family:monospace;color:#374151;
                              padding:10px 0 4px;">
                    ${fill('{{paymentId}}', data)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:28px 40px;">
              ${paragraphs}
              <p style="margin:24px 0 0;font-size:14px;color:#374151;line-height:1.75;">
                ${fill(template.closing, data)}
              </p>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#1f2937;padding:18px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.55);">
                ${fill(template.footerNote, data)}
              </p>
              <p style="margin:8px 0 0;font-size:10px;color:rgba(255,255,255,0.3);">
                &copy; ${new Date().getFullYear()} TimesAspire — The Global Connect
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Public API ────────────────────────────────────────────────────────────────
/**
 * sendConfirmationEmail — sends the payment confirmation to the customer
 * and BCC's the company email (COMPANY_EMAIL in .env).
 *
 * @param {object} opts
 * @param {string} opts.to           Customer email address
 * @param {string} opts.planName
 * @param {number} opts.quantity
 * @param {number} opts.totalAmount  In rupees
 * @param {string} opts.paymentId    razorpay_payment_id
 * @param {string} opts.orderId      razorpay_order_id
 */
async function sendConfirmationEmail({ to, planName, quantity, totalAmount, paymentId, orderId }) {
  const transport = getTransport();

  if (!transport) {
    console.warn(
      '[emailService] SMTP not configured — skipping confirmation email.\n' +
      'Add SMTP_HOST / SMTP_USER / SMTP_PASS to server/.env to enable emails.'
    );
    return;
  }

  if (!to) {
    console.warn('[emailService] No customer email address available — skipping.');
    return;
  }

  const data = {
    planName:  planName  || 'TimesAspire Pass',
    quantity:  quantity  || 1,
    amount:    inr(totalAmount || 0),
    paymentId: paymentId || '—',
    orderId:   orderId   || '—',
  };

  const subject     = fill(template.subject, data);
  const html        = buildHtml(data);
  const companyBcc  = process.env.COMPANY_EMAIL || null;

  await transport.sendMail({
    from:    process.env.SMTP_FROM || `TimesAspire <${process.env.SMTP_USER}>`,
    to,
    ...(companyBcc ? { bcc: companyBcc } : {}),
    subject,
    html,
  });

  console.log(
    `[emailService] Confirmation sent → ${to}` +
    (companyBcc ? `  (BCC: ${companyBcc})` : '')
  );
}

// ── Receipt email (with PDF attachment) ──────────────────────────────────────
/**
 * sendReceiptEmail — sends the payment receipt with the PDF attached.
 *
 * @param {object} opts
 * @param {string} opts.to             Customer email address
 * @param {string} opts.planName
 * @param {number} opts.quantity
 * @param {number} opts.totalAmount    In rupees
 * @param {string} opts.paymentId
 * @param {string} opts.orderId
 * @param {string} opts.receiptNumber
 * @param {string} opts.pdfPath        Absolute path to the generated PDF
 */
async function sendReceiptEmail({ to, planName, quantity, totalAmount, paymentId, orderId, receiptNumber, pdfPath }) {
  const transport = getTransport();

  if (!transport) {
    console.warn('[emailService] SMTP not configured — skipping receipt email.');
    return;
  }

  if (!to) {
    console.warn('[emailService] No customer email — skipping receipt email.');
    return;
  }

  const data = {
    planName:  planName  || 'TimesAspire Pass',
    quantity:  quantity  || 1,
    amount:    inr(totalAmount || 0),
    paymentId: paymentId || '—',
    orderId:   orderId   || '—',
  };

  // Slightly different subject line for the receipt vs. the initial confirmation
  const subject = `🧾 Your Receipt — TimesAspire (${receiptNumber || paymentId})`;
  const html    = buildHtml(data);

  const companyBcc = process.env.COMPANY_EMAIL || null;

  const mailOptions = {
    from:    process.env.SMTP_FROM || `TimesAspire <${process.env.SMTP_USER}>`,
    to,
    ...(companyBcc ? { bcc: companyBcc } : {}),
    subject,
    html,
    attachments: pdfPath ? [{
      filename:    `Receipt-${receiptNumber || paymentId}.pdf`,
      path:        pdfPath,
      contentType: 'application/pdf',
    }] : [],
  };

  await transport.sendMail(mailOptions);

  console.log(
    `[emailService] Receipt email sent → ${to}` +
    (companyBcc ? `  (BCC: ${companyBcc})` : '') +
    (pdfPath ? '  [PDF attached]' : '')
  );
}

module.exports = { sendConfirmationEmail, sendReceiptEmail };
