import { Linkedin, Twitter, ArrowRight } from 'lucide-react'

const SPEAKERS = [
  { seed: 'spk-ceo-m', name: 'Rajesh Sharma', role: 'CEO, TechVista India' },
  { seed: 'spk-chro-f', name: 'Priya Mehta', role: 'CHRO, GlobalEdge Corp' },
  { seed: 'spk-founder-m2', name: 'Arjun Kapoor', role: 'Founder, NexaVentures' },
  { seed: 'spk-policy-f2', name: 'Dr. Kavitha Rao', role: 'Policy Advisor, NITI Aayog' },
  { seed: 'spk-edu-m3', name: 'Prof. Anil Desai', role: 'Director, IIM Bangalore' },
  { seed: 'spk-cfo-m4', name: 'Siddharth Jain', role: 'CFO, NovaTech Industries' },
  { seed: 'spk-cto-f5', name: 'Ananya Reddy', role: 'CTO, Elevate Group' },
  { seed: 'spk-vp-m6', name: 'Mohit Patel', role: 'VP Strategy, FinEdge Solutions' },
]

function SpeakerCard({ speaker, index }) {
  return (
    <div className="group flex-shrink-0 w-44 sm:w-52 md:w-60 lg:w-72 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer relative">
      <img
        src={`https://picsum.photos/seed/${speaker.seed}/400/530.jpg`}
        alt={speaker.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{speaker.name}</h4>
        <p className="text-[10px] sm:text-xs text-white/60 truncate">{speaker.role}</p>
      </div>
      {/* Hover socials */}
      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-gb-500 transition-colors">
          <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
        </a>
        <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-gb-500 transition-colors">
          <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
        </a>
      </div>
    </div>
  )
}

export default function SpeakersSection() {
  const doubled = [...SPEAKERS, ...SPEAKERS]

  return (
    <section id="speakers" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
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
      </div>

      {/* Infinite Scroll Slider */}
      <div className="relative w-full mb-12">
        <style>{`
          @keyframes speaker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .speaker-scroll {
            animation: speaker-scroll 25s linear infinite;
          }
          .speaker-scroll:hover {
            animation-play-state: paused;
          }
          .speaker-mask {
            mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          }
        `}</style>

        <div className="speaker-mask w-full">
          <div className="speaker-scroll flex gap-5 w-max">
            {doubled.map((speaker, index) => (
              <SpeakerCard
                key={`${speaker.seed}-${index}`}
                speaker={speaker}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  )
}