import { Handshake, Mic, Award } from 'lucide-react'

const FEATURES = [
  { icon: Handshake, title: 'High-Impact Networking', desc: 'Curated matchmaking connects the right leaders for partnerships and investments.' },
  { icon: Mic, title: 'Thought Leadership Stage', desc: 'Global thought leaders share insights that redefine strategies and inspire action.' },
  { icon: Award, title: 'Prestigious Recognition', desc: 'Rigorous, transparent nomination and jury processes that add real credibility.' },
]

const QUOTE = {
  text: "Beyond boundaries and borders, we bring visionary minds together. It's not just about hosting an event—it's about creating a global ecosystem where ideas spark and real impact begins.",
  author: "TimesAspire Leadership"
}

const PHOTOS = [
  { seed: 'stage-talk-light', h: 'h-48' },
  { seed: 'award-ceremony-light', h: 'h-64' },
  { seed: 'networking-light', h: 'h-64', offset: true },
  { seed: 'panel-light', h: 'h-48', offset: true },
]

export default function ImpactSection({ about } = {}) {
  const heading     = about?.heading     || 'Creating Moments That\nShape Industries'
  const description = about?.description || 'Every TimesAspire event is meticulously crafted to deliver more than conversations — we create catalysts for change, collaboration, and growth.'
  const features    = about?.features    || FEATURES
  const quote       = about?.quote       || QUOTE
  const photos      = about?.photos      || PHOTOS

  const [headingLine1, headingLine2] = heading.split('\n')

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
              {headingLine1}<br /><span className="text-gradient-gb">{headingLine2}</span>
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-8">
              {description}
            </p>

            <div className="space-y-5">
              {features.map((f) => {
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
              {photos.filter((p) => !p.offset).map((p) => (
                <div key={p.seed || p.src} className={`rounded-2xl overflow-hidden ${p.h} card-shadow`}>
                  <img
                    src={p.src || `https://picsum.photos/seed/${p.seed}/500/500.jpg`}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {photos.filter((p) => p.offset).map((p) => (
                <div key={p.seed || p.src} className={`rounded-2xl overflow-hidden ${p.h} card-shadow`}>
                  <img
                    src={p.src || `https://picsum.photos/seed/${p.seed}/500/500.jpg`}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Quote Block */}
        <div className="mt-12 bg-white border border-neutral-100 rounded-2xl py-6 px-6 md:py-8 md:px-10 text-center card-shadow relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gb-500 to-transparent opacity-70" />
          <div className="absolute -top-8 -left-4 text-7xl text-gb-100 font-serif select-none">"</div>
          <div className="absolute -bottom-12 -right-4 text-7xl text-gb-100 font-serif select-none rotate-180">"</div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-base md:text-lg font-serif italic text-neutral-800 leading-relaxed mb-3">
              "{quote.text}"
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-px bg-gb-500/50" />
              <span className="text-[10px] md:text-xs font-semibold text-gb-600 tracking-[0.2em] uppercase">
                {quote.author}
              </span>
              <div className="w-6 h-px bg-gb-500/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}