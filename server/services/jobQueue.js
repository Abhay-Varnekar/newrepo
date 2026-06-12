'use strict';

/**
 * jobQueue.js
 *
 * A lightweight in-process FIFO job queue with a single async worker.
 *
 * Why no Redis / Bull?
 *  - No extra infrastructure needed for a single-server deploy.
 *  - pdfkit generation is fast (~100-300 ms) so queuing is rarely needed.
 *  - If the server restarts mid-generation, the PDF simply regenerates on
 *    the next status poll (since the file won't exist yet).
 *
 * Usage:
 *   const queue = require('./jobQueue');
 *   queue.enqueue({ type: 'generate_pdf', payload: { ... } });
 */

const pdfService   = require('./pdfService');
const emailService = require('./emailService');

const _queue  = [];
let _running  = false;

/**
 * Enqueue a job. Supported types: 'generate_pdf'
 * @param {{ type: string, payload: object }} job
 */
function enqueue(job) {
  _queue.push(job);
  console.log(`[jobQueue] Enqueued job: ${job.type} — queue depth: ${_queue.length}`);
  if (!_running) _processNext();
}

async function _processNext() {
  if (_queue.length === 0) { _running = false; return; }
  _running = true;

  const job = _queue.shift();
  console.log(`[jobQueue] Processing job: ${job.type}`);

  try {
    if (job.type === 'generate_pdf') {
      await _handleGeneratePdf(job.payload);
    } else {
      console.warn(`[jobQueue] Unknown job type: ${job.type}`);
    }
  } catch (err) {
    console.error(`[jobQueue] Job failed (${job.type}):`, err.message);
  }

  // Process next job in the next tick so the event loop stays free
  setImmediate(_processNext);
}

async function _handleGeneratePdf(payload) {
  const {
    paymentId, orderId, receiptNumber,
    planName, quantity,
    baseAmount, gstOnAmount, convenienceFee, gstOnConvenience, totalAmount,
    customerName, customerEmail,
    timestamp,
  } = payload;

  // 1. Generate PDF
  const start = Date.now();
  const pdfPath = await pdfService.generateReceiptPdf({
    paymentId, orderId, receiptNumber,
    planName, quantity,
    baseAmount, gstOnAmount, convenienceFee, gstOnConvenience, totalAmount,
    customerName, customerEmail,
    timestamp,
  });
  console.log(`[jobQueue] PDF generated in ${Date.now() - start} ms → ${pdfPath}`);

  // 2. Send receipt email with PDF attached
  if (customerEmail) {
    try {
      await emailService.sendReceiptEmail({
        to:            customerEmail,
        planName,
        quantity,
        totalAmount,
        paymentId,
        orderId,
        receiptNumber,
        pdfPath,
      });
    } catch (err) {
      console.error(`[jobQueue] Email send failed for ${paymentId}:`, err.message);
    }
  } else {
    console.warn(`[jobQueue] No customer email for ${paymentId} — skipping email.`);
  }
}

module.exports = { enqueue };
