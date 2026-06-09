import { Calendar, MapPin, Users, Ticket, Trophy, Mic2, LayoutGrid, Handshake, ChevronDown } from 'lucide-react'
import useCountdown from '../hooks/useCountdown'

const DELEGATE_AVATARS = ['del1', 'del2', 'del3', 'del4', 'del5']
const THEMES = ['AI & Digital', 'Sustainability', 'Global Expansion', 'Leadership 4.0', 'ESG', 'Fintech']

const QUICK_STATS = [
  { icon: Mic2, value: '45+', label: 'Speakers' },
  { icon: LayoutGrid, value: '12', label: 'Sessions' },
  { icon: Trophy, value: '25', label: 'Award Categories' },
  { icon: Handshake, value: '1:1', label: 'Networking' },
]

export default function HeroEvent() {
  const countdown = useCountdown('2026-06-24T09:00:00+05:30')

  return (
    <section id="featured-event" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/South India Summit.png"
          alt="India CEO Summit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-event-overlay" />
      </div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-gb-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute inset-0 bg-green-400 rounded-full" />
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-white text-xs font-semibold tracking-wider uppercase">
                  Upcoming Event
                </span>
              </div>
              <span className="px-3 py-1.5 bg-gb-500/90 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                Flagship
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
            South India Visionaries<br />
              Summit & Awards<br />
              <span className="shimmer-gold">2026</span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4 text-gb-300" />
                <span className="text-sm font-medium">June 24, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-gb-300" />
                <span className="text-sm font-medium">Taj Yeshwantpur, Bengaluru</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-gb-300" />
                <span className="text-sm font-medium">500+ Delegates Expected</span>
              </div>
            </div>

            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              The definitive gathering of India's most influential business leaders — exploring strategy, innovation, AI transformation, and sustainable growth for the next decade.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <a
                href="#"
                className="group flex items-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-gb-500 to-gb-600 hover:from-gb-400 hover:to-gb-500 rounded-xl transition-all duration-300 gold-shadow hover:scale-[1.02]"
              >
                <Ticket className="w-5 h-5" />
                Register for Summit
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2.5 px-8 py-4 text-base font-medium text-white border border-white/20 hover:border-white/40 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Trophy className="w-5 h-5 text-gb-300" />
                Nominate for Awards
              </a>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-2.5">
                {DELEGATE_AVATARS.map((seed) => (
                  <img
                    key={seed}
                    src={`https://picsum.photos/seed/${seed}/48/48.jpg`}
                    className="w-9 h-9 rounded-full border-2 border-black/50 object-cover"
                    alt=""
                  />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-black/50 bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] text-white font-semibold">
                  +47
                </div>
              </div>
              <span className="text-white/50 text-sm">CEOs & CXOs already registered</span>
            </div>
          </div>

          {/* Right: Countdown & Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Countdown */}
            {/* <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
              <div className="text-xs font-semibold text-gb-300 uppercase tracking-wider mb-4">
                Event Starts In
              </div>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { value: countdown.days, label: 'Days' },
                  { value: countdown.hours, label: 'Hours' },
                  { value: countdown.mins, label: 'Mins' },
                  { value: countdown.secs, label: 'Secs', highlight: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="countdown-box text-center p-3 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div
                      className={`text-3xl font-extrabold ${
                        item.highlight ? 'text-gb-300' : 'text-white'
                      }`}
                    >
                      {item.value}
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gradient-to-r from-gb-400 to-gb-500 rounded-full" />
              </div>
              <div className="text-[11px] text-white/40 mt-2">
                65% seats filled — limited spots remaining
              </div>
            </div> */}
            {/* Spacer — keeps layout in place */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 invisible">
                <div className="text-xs font-semibold text-gb-300 uppercase tracking-wider mb-4">Event Starts In</div>
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="countdown-box text-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-3xl font-extrabold text-white">00</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Days</div>
                    </div>
                  ))}
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gradient-to-r from-gb-400 to-gb-500 rounded-full" />
                </div>
                <div className="text-[11px] text-white/40 mt-2">65% seats filled</div>
              </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {QUICK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl p-4"
                >
                  <stat.icon className="w-5 h-5 text-gb-300 mb-2" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[11px] text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Themes */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl p-4">
              <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Key Themes
              </div>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] text-white/70"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-[10px] uppercase tracking-widest">More Events</span>
        <ChevronDown className="w-5 h-5 text-white/30" />
      </div>
    </section>
  )
}