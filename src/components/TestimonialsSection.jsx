import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    text: '"Winning the CEO of the Year award was a defining moment for our brand. The event quality, the networking, and the post-event visibility were absolutely world-class."',
    name: 'Vikram Patel',
    role: 'CEO, Sterling Industries',
    seed: 'tst-ceo1',
  },
  {
    text: '"TimesAspire\'s HR Summit gave us access to CHROs we\'d been trying to reach for months. The curated networking format is genuinely different from anything else in India."',
    name: 'Nisha Agarwal',
    role: 'VP - People, CloudFirst Tech',
    seed: 'tst-chro2',
  },
  {
    text: '"As a startup founder, speaking at TimesAspire opened doors to three major partnerships. Their team\'s professionalism and attention to detail is remarkable."',
    name: 'Rohan Singh',
    role: 'Founder, GreenLeaf Solutions',
    seed: 'tst-fnd3',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">💬 Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
            Voices From Our <span className="text-gradient-gb">Community</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.seed} className="group p-8 rounded-2xl bg-warm-50 border border-neutral-100 hover:border-gb-200 hover:bg-white transition-all duration-500 card-shadow-hover">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gb-500 fill-gb-500" />
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${t.seed}/80/80.jpg`} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-xs text-neutral-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}