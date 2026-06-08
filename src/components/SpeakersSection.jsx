import { Linkedin, Twitter, ArrowRight } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const SPEAKERS = [
  { seed: 'spk-ceo-m', name: 'Rajesh Sharma', role: 'CEO, TechVista India', social: ['linkedin', 'twitter'] },
  { seed: 'spk-chro-f', name: 'Priya Mehta', role: 'CHRO, GlobalEdge Corp', social: ['linkedin'] },
  { seed: 'spk-founder-m2', name: 'Arjun Kapoor', role: 'Founder, NexaVentures', social: ['linkedin'] },
  { seed: 'spk-policy-f2', name: 'Dr. Kavitha Rao', role: 'Policy Advisor, NITI Aayog', social: ['linkedin'], hiddenMd: true },
  { seed: 'spk-edu-m3', name: 'Prof. Anil Desai', role: 'Director, IIM Bangalore', social: ['linkedin'], hiddenLg: true },
]

export default function SpeakersSection() {
  const scrollRef = useScrollAnimation()

  return (
    <section id="speakers" ref={scrollRef} className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-gb-500" />
              <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Featured Voices</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Distinguished <span className="text-gradient-gb">Speakers</span>
            </h2>
          </div>
          <a href="#" className="group flex items-center gap-2 text-sm font-medium text-gb-600 hover:text-gb-800 transition-colors">
            View all speakers <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.seed}
              className={`speaker-card group text-center cursor-pointer ${
                speaker.hiddenMd ? 'hidden md:block' : ''
              } ${speaker.hiddenLg ? 'hidden lg:block' : ''}`}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 border border-neutral-100 group-hover:border-gb-300 transition-all duration-500 card-shadow group-hover:card-shadow-hover">
                <img
                  src={`https://picsum.photos/seed/${speaker.seed}/400/530.jpg`}
                  alt={speaker.name}
                  className="speaker-img w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {speaker.social.map((s) => (
                    <a key={s} href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-gb-500 transition-colors">
                      {s === 'linkedin' ? <Linkedin className="w-3.5 h-3.5 text-white" /> : <Twitter className="w-3.5 h-3.5 text-white" />}
                    </a>
                  ))}
                </div>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-gb-700 transition-colors">
                {speaker.name}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">{speaker.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}