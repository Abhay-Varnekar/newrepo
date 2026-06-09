import React from 'react'
import { Check, ArrowRight, PhoneCall } from 'lucide-react'

const PLANS = [
  {
    name: 'Delegate Pass',
    desc: 'Full summit access with networking.',
    price: '₹8,999',
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

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-14 lg:py-20 bg-warm-50">
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
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 flex flex-col transition-all duration-500 card-shadow hover:card-shadow-hover ${
                plan.highlight
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
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                      plan.highlight ? 'bg-gb-100' : 'bg-gb-50'
                    }`}>
                      <Check className="w-2.5 h-2.5 text-gb-600" />
                    </div>
                    <span className="text-xs text-neutral-600 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${plan.ctaStyle}`}
              >
                {plan.cta}
                <plan.ctaIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Need a custom package?{' '}
          <a href="#contact" className="text-gb-600 font-medium hover:text-gb-800 underline underline-offset-2">
            Talk to our team
          </a>
        </p>
      </div>
    </section>
  )
}