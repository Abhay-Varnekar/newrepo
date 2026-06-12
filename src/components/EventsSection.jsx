import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { PAST_EVENTS } from '../data/pastEvents'

export default function EventsSection() {
  const scrollRef = useScrollAnimation()

  return (
    <section id="events" ref={scrollRef} className="relative py-20 lg:py-28 bg-white">
      <div className="absolute top-0 left-0 right-0 h-px line-gb opacity-20" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-gb-500" />
              <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">
                Past Events
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
              Summits, Conferences & <span className="text-gradient-gb">More</span>
            </h2>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAST_EVENTS.map((event) => (
            <Link
              key={event.slug}
              to={`/events/${event.slug}`}
              className="event-card group bg-white rounded-2xl border border-neutral-100 overflow-hidden card-shadow hover:card-shadow-hover hover:border-gb-200 transition-all duration-500 cursor-pointer block"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-img w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {event.badges.map((b) => (
                    <span
                      key={b.text}
                      className={`px-3 py-1 ${b.style} text-[10px] font-bold rounded-md uppercase tracking-wider`}
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-xl p-2 text-center shadow-lg min-w-[48px]">
                  <div className="text-lg font-extrabold text-gb-700 leading-none">
                    {event.day}
                  </div>
                  <div className="text-[9px] font-semibold text-neutral-400 uppercase">
                    {event.month}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gb-500" />
                  <span className="text-xs text-neutral-500 font-medium">{event.city}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-gb-700 transition-colors mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                  {event.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex -space-x-2">
                    {event.avatars.map((a) => (
                      <img
                        key={a}
                        src={`https://picsum.photos/seed/${a}/36/36.jpg`}
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        alt=""
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gb-50 flex items-center justify-center text-[9px] text-gb-700 font-bold">
                      {event.extraCount}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gb-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}