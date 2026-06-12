/**
 * ============================================================
 *  emailTemplate.js
 *
 *  ✏️  EDIT THIS FILE to customise the confirmation email
 *  that is sent to customers after a successful payment.
 * ============================================================
 *
 *  Placeholders you can use anywhere in subject, bodyLines,
 *  closing, or footerNote:
 *
 *    {{planName}}   — Plan purchased, e.g. "Delegate Pass"
 *    {{quantity}}   — Number of tickets, e.g. "2"
 *    {{amount}}     — Amount charged,   e.g. "₹11,799.00"
 *    {{paymentId}}  — Razorpay Payment ID
 *    {{orderId}}    — Razorpay Order ID
 *
 *  HTML tags are supported in bodyLines and closing
 *  (e.g. <strong>, <em>, <br/>).
 * ============================================================
 */

module.exports = {

  // ── Subject Line ───────────────────────────────────────────
  subject: '✅ Payment Confirmed — TimesAspire',

  // ── Body Paragraphs ────────────────────────────────────────
  // Each string becomes one paragraph. Add or remove lines freely.
  bodyLines: [
    'Thank you for registering with <strong>TimesAspire — The Global Connect</strong>.',
    'We are pleased to confirm your registration for <strong>{{planName}} × {{quantity}}</strong>.',
    'Your payment of <strong>{{amount}}</strong> has been successfully received.'
    + ' Your Payment ID is <strong>{{paymentId}}</strong> — please save this for your records.',
    'Our team will reach out to you shortly with your entry pass, venue details, and event schedule.',
    'We look forward to welcoming you at the summit!',
  ],

  // ── Closing / Sign-off ─────────────────────────────────────
  closing: 'Warm regards,<br/><strong>The TimesAspire Team</strong>',

  // ── Footer note (small text at the very bottom) ────────────
  footerNote: 'For queries, write to us at support@timesaspire.com',

}
