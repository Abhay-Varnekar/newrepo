import React from 'react'
import { Check, ArrowRight, PhoneCall, X } from 'lucide-react'
import useRazorpay from '../hooks/useRazorpay'

// ---------------------------------------------------------------------------
// Fee configuration — edit these to change rates
// ---------------------------------------------------------------------------
const GST_RATE = 0.18           // 18% GST on base amount
const CONVENIENCE_RATE = 0.02   // 2% convenience charge on base amount
const CONVENIENCE_GST_RATE = 0.18 // 18% GST on convenience charge

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------
const PLANS = [
  {
    name: 'Delegate Pass',
    desc: 'Full summit access with networking.',
    price: '₹9,999',
    amount: 999900, // ₹9,999 in paise
    period: '/delegate',
    highlight: false,
    cta: 'Register',
    ctaStyle: 'border-2 border-gb-300 text-gb-700 hover:border-gb-500 hover:bg-gb-50',
    ctaIcon: ArrowRight,
    features: [
      'Summit Sessions Access',
      'Award Ceremony Entry',
      'Lunch & Tea Breaks',
      'Conference Kit',
      'Networking Lounge',
    ],
  },
  {
    name: 'Executive Pass',
    desc: 'VIP access, roundtable & dinner.',
    price: '₹24,999',
    amount: 2499900, // ₹24,999 in paise
    period: '/delegate',
    highlight: true,
    cta: 'Register',
    ctaStyle: 'bg-gradient-to-r from-gb-500 to-gb-600 text-white hover:from-gb-400 hover:to-gb-500 gold-shadow',
    ctaIcon: ArrowRight,
    badge: 'Popular',
    features: [
      'Everything in Delegate',
      'VIP Seating',
      'CEO Roundtable',
      'Networking Dinner',
      '1-on-1 Mentorship',
      'Session Recordings',
    ],
  },
  {
    name: 'Corporate Table',
    desc: 'Table of 8 with branding & concierge.',
    price: '₹1,49,999',
    amount: 14999900, // ₹1,49,999 in paise
    period: '/table',
    highlight: false,
    cta: 'Contact Us',
    ctaStyle: 'border-2 border-gb-300 text-gb-700 hover:border-gb-500 hover:bg-gb-50',
    ctaIcon: PhoneCall,
    features: [
      'Executive Pass × 8',
      'Branded Booth',
      'Dedicated Concierge',
      'Media Package',
      'Speaking Slot',
      'Custom Branding',
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper: compute fee breakup for a given base amount (in rupees)
// ---------------------------------------------------------------------------
function computeFees(baseRupees) {
  const gstOnAmount = Math.round(baseRupees * GST_RATE * 100) / 100
  const convenience = Math.round(baseRupees * CONVENIENCE_RATE * 100) / 100
  const gstOnConvenience = Math.round(convenience * CONVENIENCE_GST_RATE * 100) / 100
  const total = baseRupees + gstOnAmount + convenience + gstOnConvenience
  return { baseRupees, gstOnAmount, convenience, gstOnConvenience, total }
}

// ---------------------------------------------------------------------------
// Helper: format as ₹ with Indian locale
// ---------------------------------------------------------------------------
const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(n)

// ---------------------------------------------------------------------------
// Fee Breakup Modal
// ---------------------------------------------------------------------------
function FeeBreakupModal({ plan, qty, onConfirm, onClose }) {
  const baseRupees = (plan.amount / 100) * qty
  const fees = computeFees(baseRupees)

  const rows = [
    { label: `Amount (${qty > 1 ? `${qty} × ${inr(plan.amount / 100)}` : plan.price})`, value: inr(fees.baseRupees) },
    { label: `GST on Amount (18%)`, value: inr(fees.gstOnAmount) },
    { label: `Razorpay Charges (2%)`, value: inr(fees.convenience) },
    { label: `GST on Razorpay Charges (18%)`, value: inr(fees.gstOnConvenience) },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <h3 className="text-base font-bold text-neutral-900">Fee Breakup</h3>
          <p className="text-xs text-neutral-500 mt-0.5">{plan.name}{qty > 1 ? ` × ${qty}` : ''}</p>
        </div>

        {/* Breakup rows */}
        <div className="space-y-3 mb-5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">{row.label}</span>
              <span className="text-xs font-semibold text-neutral-800">{row.value}</span>
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-900">Total Charges</span>
            <span className="text-sm font-bold text-gb-600">{inr(fees.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(fees.total)}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-gb-500 to-gb-600 text-white text-xs font-semibold hover:from-gb-400 hover:to-gb-500 gold-shadow transition-all"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PricingSection
// ---------------------------------------------------------------------------
export default function PricingSection() {
  const { openCheckout } = useRazorpay()
  const [quantities, setQuantities] = React.useState({
    'Delegate Pass': 1,
    'Executive Pass': 1,
    'Corporate Table': 1,
  })
  // { plan, qty } when modal is open, null when closed
  const [pendingCheckout, setPendingCheckout] = React.useState(null)

  const updateQuantity = (planName, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [planName]: Math.max(1, (prev[planName] || 1) + delta),
    }))
  }

  const handleRegisterClick = (plan, qty) => {
    setPendingCheckout({ plan, qty })
  }

  const handleConfirmPayment = (totalRupees) => {
    const { plan, qty } = pendingCheckout
    // Convert total rupees → paise (integer)
    const totalPaise = Math.round(totalRupees * 100)
    setPendingCheckout(null)
    openCheckout(plan, qty, totalPaise)
  }

  return (
    <section id="pricing" className="relative py-14 lg:py-20 bg-warm-50" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            Choose Your <span className="text-gradient-gb">Experience</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto">
            Select the pass that best fits your goals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan) => {
            const qty = quantities[plan.name] || 1
            const basePriceNum = parseInt(plan.price.replace(/[^\d]/g, ''), 10)
            const totalPriceFormatted = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(basePriceNum * qty)

            return (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 flex flex-col transition-all duration-500 card-shadow hover:card-shadow-hover ${plan.highlight
                    ? 'bg-white border-2 border-gb-400 scale-[1.02] lg:scale-[1.04]'
                    : 'bg-white border border-neutral-100 hover:border-gb-200'
                  }`}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gb-500 text-white text-[9px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-gb-500/30">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-base font-bold text-neutral-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">{plan.desc}</p>

                <div className="mb-5">
                  <span className="text-3xl font-extrabold text-neutral-900">{plan.price}</span>
                  <span className="text-xs text-neutral-400 font-medium ml-1.5">{plan.period}</span>
                  <p className="text-[10px] text-neutral-400 mt-0.5">(+Applicable Charges)</p>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${plan.highlight ? 'bg-gb-100' : 'bg-gb-50'
                        }`}>
                        <Check className="w-2.5 h-2.5 text-gb-600" />
                      </div>
                      <span className="text-xs text-neutral-600 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mb-4">
                  <span className="text-xs font-semibold text-neutral-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(plan.name, -1)}
                      disabled={qty <= 1}
                      className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral-600 hover:border-gb-400 hover:text-gb-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-neutral-800 w-4 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(plan.name, 1)}
                      className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral-600 hover:border-gb-400 hover:text-gb-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Optional Total Display (base price only, excl. taxes) */}
                {qty > 1 && (
                  <div className="flex items-center justify-between mb-4 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100 transition-all">
                    <span className="text-xs text-neutral-500 font-medium">Subtotal (excl. taxes):</span>
                    <span className="text-sm font-bold text-gb-600">{totalPriceFormatted}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleRegisterClick(plan, qty)}
                  className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 w-full cursor-pointer ${plan.ctaStyle}`}
                >
                  {plan.cta}
                  <plan.ctaIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Need a custom package?{' '}
          <a href="#contact" className="text-gb-600 font-medium hover:text-gb-800 underline underline-offset-2">
            Talk to our team
          </a>
        </p>
      </div>

      {/* Fee Breakup Modal */}
      {pendingCheckout && (
        <FeeBreakupModal
          plan={pendingCheckout.plan}
          qty={pendingCheckout.qty}
          onConfirm={handleConfirmPayment}
          onClose={() => setPendingCheckout(null)}
        />
      )}
    </section>
  )
}