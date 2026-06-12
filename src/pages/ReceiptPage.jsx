import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { Download, CheckCircle, Clock, AlertCircle, ArrowLeft, FileText } from 'lucide-react'
import { useReceiptStatus } from '../hooks/useReceiptStatus'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)

// ── Spinner component ─────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="inline-block w-5 h-5 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
  )
}

// ── Fee row ───────────────────────────────────────────────────────────────────
function FeeRow({ label, value, highlight }) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 px-4 ${
        highlight
          ? 'bg-[#c9a84c] rounded-lg'
          : 'border-b border-white/5'
      }`}
    >
      <span className={`text-xs ${highlight ? 'font-bold text-neutral-900' : 'text-neutral-400'}`}>
        {label}
      </span>
      <span className={`text-xs font-semibold ${highlight ? 'text-neutral-900' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}

// ── Main receipt page ─────────────────────────────────────────────────────────
export default function ReceiptPage() {
  const { receiptId } = useParams()
  const { state: navState } = useLocation()

  // Data passed from the payment handler via React Router state
  const {
    receiptNumber,
    planName,
    quantity,
    breakdown,
  } = navState || {}

  const { ready, downloadUrl } = useReceiptStatus(receiptId)

  const handleDownload = () => {
    if (!downloadUrl) return
    window.open(`${BACKEND_URL}${downloadUrl}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4 py-16">

      {/* Back link */}
      <div className="w-full max-w-lg mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-neutral-500 hover:text-[#c9a84c] text-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg rounded-2xl overflow-hidden border border-white/8 bg-neutral-900 shadow-2xl shadow-black/60">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#b8860b] to-[#c9a84c] px-6 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-white/70 font-medium tracking-widest uppercase">
              TimesAspire — The Global Connect
            </p>
            <h1 className="text-lg font-bold text-white leading-tight">Payment Receipt</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* ── Success indicator ────────────────────────────────────── */}
          <div className="flex flex-col items-center text-center gap-3 py-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                ready
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-[#c9a84c]/15 text-[#c9a84c]'
              }`}
            >
              {ready ? (
                <CheckCircle className="w-9 h-9" />
              ) : (
                <Clock className="w-9 h-9 opacity-80" />
              )}
            </div>
            <div>
              <p className="text-white font-semibold text-base">
                {ready ? 'Receipt Ready!' : 'Payment Confirmed'}
              </p>
              <p className="text-neutral-400 text-xs mt-1">
                {ready
                  ? 'Your receipt PDF is ready to download.'
                  : 'Your receipt is being prepared…'}
              </p>
            </div>
          </div>

          {/* ── Receipt / Payment info ────────────────────────────────── */}
          <div className="space-y-2">
            {receiptNumber && (
              <div className="flex items-center justify-between bg-white/4 rounded-lg px-4 py-2.5 border border-white/6">
                <span className="text-neutral-500 text-xs">Receipt No.</span>
                <span className="text-[#c9a84c] text-xs font-bold tracking-wide">{receiptNumber}</span>
              </div>
            )}
            <div className="flex items-center justify-between bg-white/4 rounded-lg px-4 py-2.5 border border-white/6">
              <span className="text-neutral-500 text-xs">Payment ID</span>
              <span className="text-white text-xs font-mono">{receiptId}</span>
            </div>
            {planName && (
              <div className="flex items-center justify-between bg-white/4 rounded-lg px-4 py-2.5 border border-white/6">
                <span className="text-neutral-500 text-xs">Plan</span>
                <span className="text-white text-xs font-medium">
                  {planName}{quantity > 1 ? ` × ${quantity}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* ── Fee breakdown (shown if data passed via state) ────────── */}
          {breakdown && (
            <div className="rounded-xl overflow-hidden border border-white/6">
              <div className="bg-white/4 px-4 py-2 border-b border-white/6">
                <span className="text-[10px] text-neutral-500 font-semibold tracking-widest uppercase">
                  Fee Breakdown
                </span>
              </div>
              <div className="bg-neutral-900/50 space-y-0">
                <FeeRow label={`Base Amount (${quantity} × ${planName})`} value={inr(breakdown.baseAmount)} />
                <FeeRow label="GST on Amount (18%)"        value={inr(breakdown.gstOnAmount)} />
                <FeeRow label="Convenience Charge (2%)"    value={inr(breakdown.convenienceFee)} />
                <FeeRow label="GST on Convenience (18%)"   value={inr(breakdown.gstOnConvenience)} />
              </div>
              <div className="px-4 py-3">
                <FeeRow label="Total Charged" value={inr(breakdown.totalAmount)} highlight />
              </div>
            </div>
          )}

          {/* ── Download button ───────────────────────────────────────── */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!ready}
              className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                ready
                  ? 'bg-gradient-to-r from-[#b8860b] to-[#c9a84c] text-neutral-900 hover:from-[#c9a84c] hover:to-[#d4a017] shadow-lg shadow-[#c9a84c]/20 cursor-pointer'
                  : 'bg-white/5 text-neutral-600 cursor-not-allowed border border-white/6'
              }`}
            >
              {ready ? (
                <>
                  <Download className="w-4 h-4" />
                  Download Receipt PDF
                </>
              ) : (
                <>
                  <Spinner />
                  Preparing your receipt…
                </>
              )}
            </button>

            {!ready && (
              <p className="text-center text-[10px] text-neutral-600">
                The Download button will activate automatically once your receipt is ready.
              </p>
            )}
          </div>

          {/* ── Support note ──────────────────────────────────────────── */}
          <p className="text-center text-[10px] text-neutral-600 border-t border-white/5 pt-4">
            Questions?{' '}
            <a
              href="mailto:support@timesaspire.com"
              className="text-[#c9a84c]/70 hover:text-[#c9a84c] underline underline-offset-2"
            >
              support@timesaspire.com
            </a>
          </p>
        </div>
      </div>

    </div>
  )
}
