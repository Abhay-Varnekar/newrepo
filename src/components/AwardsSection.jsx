import {
  Crown,
  Building2,
  Rocket,
  GraduationCap,
  HeartHandshake,
  Award,
  ShieldCheck,
  Globe,
  Users,
  ShoppingBag,
  Factory,
  HeartPulse,
  MapPin,
  Truck
} from 'lucide-react'

const AWARDS = [
  {
    icon: Crown,
    title: 'PSU Leadership & Governance Excellence Award',
    desc: 'Recognizing excellence in public sector leadership and governance impact.',
  },
  {
    icon: Users,
    title: 'Most Influential HR Leader to Work With',
    desc: 'Honoring HR leaders who shape people-first workplaces.',
  },
  {
    icon: Building2,
    title: 'People’s Choice Companies to Work',
    desc: 'Celebrating organizations with exceptional workplace culture.',
  },
  {
    icon: Award,
    title: 'Business Leader of Excellence',
    desc: 'Recognizing outstanding leadership in business growth and strategy.',
  },
  {
    icon: Crown,
    title: 'Most Influential CEO',
    desc: 'Honoring CEOs driving transformative organizational success.',
  },
  {
    icon: ShieldCheck,
    title: 'Most Influential CFO',
    desc: 'Recognizing financial leaders driving stability and growth.',
  },
  {
    icon: Users,
    title: 'Most Influential Women Leaders',
    desc: 'Celebrating women leaders inspiring change across industries.',
  },
  {
    icon: Truck,
    title: 'Logistics Excellence',
    desc: 'Recognizing excellence in supply chain and logistics innovation.',
  },
  {
    icon: HeartHandshake,
    title: 'CSR Initiatives & Social Impact Award',
    desc: 'Honoring impactful CSR and social responsibility programs.',
  },
  {
    icon: GraduationCap,
    title: 'Business Training Coaching Excellence',
    desc: 'Recognizing excellence in training, coaching, and skill development.',
  },
  {
    icon: Rocket,
    title: 'IT & Innovation Excellence',
    desc: 'Celebrating innovation in technology and digital transformation.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare / Pharma Excellence Award',
    desc: 'Honoring excellence in healthcare and pharmaceutical industries.',
  },
  {
    icon: Globe,
    title: 'Travel & Tourism Excellence Award',
    desc: 'Recognizing excellence in travel, hospitality, and tourism.',
  },
  {
    icon: MapPin,
    title: 'Real Estate Excellence Award',
    desc: 'Celebrating achievements in real estate development.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & HSE Award',
    desc: 'Recognizing safety, quality, and innovation in manufacturing.',
  },
  {
    icon: ShieldCheck,
    title: 'BFSI Leadership',
    desc: 'Recognizing leadership in banking and financial services.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail Excellence Award',
    desc: 'Celebrating innovation and growth in retail sector.',
  },
  {
    icon: Rocket,
    title: 'AI & Digital Transformation Award',
    desc: 'Recognizing leaders in AI, automation, and digital innovation.',
  },
  {
    icon: GraduationCap,
    title: 'National HR Excellence Award',
    desc: 'Honoring excellence in HR practices and people management.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance Excellence Award',
    desc: 'Recognizing leadership in insurance and risk management.',
  },
]

export default function AwardsSection({ awards: awardsProp } = {}) {
  const awards = awardsProp || AWARDS

  return (
    <section id="awards" className="relative py-20 lg:py-28 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">
              Recognition & Excellence
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Awards That <span className="text-gradient-gb">Define Excellence</span>
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
            Our recognition programs honor outstanding leaders and organizations who are redefining success.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {awards.map((award) => {
            const Icon = award.icon

            return (
              <div
                key={award.title}
                className="group bg-white rounded-2xl border border-neutral-100 p-5 lg:p-6 card-shadow hover:card-shadow-hover hover:border-gb-200 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gb-50 flex items-center justify-center mb-4 group-hover:bg-gb-100 transition-colors">
                  <Icon className="w-6 h-6 text-gb-600" />
                </div>

                <h3 className="text-sm font-bold text-neutral-900 mb-1.5 leading-snug">
                  {award.title}
                </h3>

                <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                  {award.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}