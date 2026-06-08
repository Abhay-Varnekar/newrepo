import { Crown, Building2, Rocket, GraduationCap, HeartHandshake, Plus } from 'lucide-react'

const AWARDS = [
  { icon: Crown, title: 'CEO of the Year', desc: 'Recognizing transformative CEOs driving exceptional growth, innovation, and stakeholder value.', winners: '50+', editions: '8', categories: '15+' },
  { icon: Building2, title: 'Best Workplace Award', desc: 'Celebrating organizations that foster exceptional culture, well-being, and inclusive environments.', winners: '120+', editions: '6', categories: '20+' },
  { icon: Rocket, title: 'Startup Innovation Award', desc: 'Honoring disruptive startups solving complex challenges with innovative, scalable solutions.', winners: '80+', editions: '5', categories: '10+' },
  { icon: GraduationCap, title: 'Education Leadership Award', desc: 'Acknowledging educators and institutions driving transformative change in India\'s education landscape.', winners: '90+', editions: '4', categories: '12+' },
  { icon: HeartHandshake, title: 'Social Impact Award', desc: 'Recognizing initiatives and leaders creating measurable social change and community impact.', winners: '60+', editions: '3', categories: '8+' },
]

function AwardCard({ award }) {
  const Icon = award.icon
  return (
    <div className="group bg-white rounded-2xl border border-neutral-100 p-8 card-shadow hover:card-shadow-hover hover:border-gb-200 transition-all duration-500">
      <div className="w-14 h-14 rounded-xl bg-gb-50 flex items-center justify-center mb-6 group-hover:bg-gb-100 transition-colors">
        <Icon className="w-7 h-7 text-gb-600" />
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-2">{award.title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed mb-5">{award.desc}</p>
      <div className="flex items-center gap-4 pt-5 border-t border-neutral-100">
        <div className="text-center"><div className="text-lg font-bold text-gb-700">{award.winners}</div><div className="text-[10px] text-neutral-400 uppercase tracking-wider">Winners</div></div>
        <div className="w-px h-8 bg-neutral-100" />
        <div className="text-center"><div className="text-lg font-bold text-neutral-800">{award.editions}</div><div className="text-[10px] text-neutral-400 uppercase tracking-wider">Editions</div></div>
        <div className="w-px h-8 bg-neutral-100" />
        <div className="text-center"><div className="text-lg font-bold text-neutral-800">{award.categories}</div><div className="text-[10px] text-neutral-400 uppercase tracking-wider">Categories</div></div>
      </div>
    </div>
  )
}

export default function AwardsSection() {
  return (
    <section id="awards" className="relative py-20 lg:py-28 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">🏅 Recognition & Excellence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Awards That <span className="text-gradient-gb">Define Excellence</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
            Our recognition programs honor outstanding leaders and organizations who are redefining success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS.map((award) => (
            <AwardCard key={award.title} award={award} />
          ))}
          {/* Nominate CTA */}
          <div className="group relative bg-gradient-to-br from-gb-50 to-warm-100 rounded-2xl border-2 border-dashed border-gb-300 hover:border-gb-500 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 hover:from-gb-100 hover:to-warm-200">
            <div className="w-14 h-14 rounded-full border-2 border-gb-400 flex items-center justify-center mb-4 group-hover:border-gb-600 group-hover:scale-110 transition-all duration-300 bg-white">
              <Plus className="w-6 h-6 text-gb-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">Submit a Nomination</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">Know a leader who deserves recognition?</p>
            <span className="text-gb-700 text-sm font-semibold group-hover:underline">Nominate Now →</span>
          </div>
        </div>
      </div>
    </section>
  )
}