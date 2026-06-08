import { Handshake, Mic, Award } from 'lucide-react'

const FEATURES = [
  { icon: Handshake, title: 'High-Impact Networking', desc: 'Curated matchmaking connects the right leaders for partnerships and investments.' },
  { icon: Mic, title: 'Thought Leadership Stage', desc: 'Global thought leaders share insights that redefine strategies and inspire action.' },
  { icon: Award, title: 'Prestigious Recognition', desc: 'Rigorous, transparent nomination and jury processes that add real credibility.' },
]

const STATS = [
  { value: '150+', label: 'Events Concluded', highlight: true },
  { value: '500+', label: 'Award Recipients' },
  { value: '1200+', label: 'Speakers Featured' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const PHOTOS = [
  { seed: 'stage-talk-light', h: 'h-48' },
  { seed: 'award-ceremony-light', h: 'h-64' },
  { seed: 'networking-light', h: 'h-64', offset: true },
  { seed: 'panel-light', h: 'h-48', offset: true },
]

export default function ImpactSection() {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-warm-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gb-200/30 rounded-full blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-gb-500" />
              <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Our Impact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
              Creating Moments That<br /><span className="text-gradient-gb">Shape Industries</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-8">
              Every TimesAspire event is meticulously crafted to deliver more than conversations — we create catalysts for change, collaboration, and growth.
            </p>

            <div className="space-y-5">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gb-100 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-gb-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 mb-1">{f.title}</h4>
                      <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {PHOTOS.filter((p) => !p.offset).map((p) => (
                <div key={p.seed} className={`rounded-2xl overflow-hidden ${p.h} card-shadow`}>
                  <img src={`https://picsum.photos/seed/${p.seed}/500/500.jpg`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {PHOTOS.filter((p) => p.offset).map((p) => (
                <div key={p.seed} className={`rounded-2xl overflow-hidden ${p.h} card-shadow`}>
                  <img src={`https://picsum.photos/seed/${p.seed}/500/500.jpg`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-2xl bg-white border border-neutral-100 card-shadow">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-4xl md:text-5xl font-extrabold mb-1 ${s.highlight ? 'text-gb-600' : 'text-neutral-800'}`}>
                {s.value}
              </div>
              <div className="text-sm text-neutral-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}