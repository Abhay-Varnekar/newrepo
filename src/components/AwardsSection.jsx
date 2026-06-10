import {
    Crown,
    Building2,
    Rocket,
    GraduationCap,
    HeartHandshake,
    Mic,
    Award,
    ShieldCheck,
    Globe,
    Users,
    ShoppingBag,
    Factory,
    HeartPulse,
    MapPin
} from 'lucide-react'

const AWARDS = [
    {
        icon: Crown,
        title: 'PSU Leadership Excellence Award',
        desc: 'Recognizing PSU leaders who have driven exceptional institutional growth and transformation.'
    },
    {
        icon: Building2,
        title: "People's Choice Best Workplaces",
        desc: 'Celebrating organizations fostering exceptional culture and inclusive environments.'
    },
    {
        icon: Rocket,
        title: 'Startup Innovation Award',
        desc: 'Honoring disruptive startups solving complex challenges with scalable solutions.'
    },
    {
        icon: GraduationCap,
        title: 'Education Leadership Award',
        desc: "Acknowledging educators and institutions driving transformative change in India's education landscape."
    }, {
        icon: HeartHandshake,
        title: 'Social Impact Award',
        desc: 'Recognizing initiatives and leaders creating measurable social change.'
    }, {
        icon: Mic,
        title: 'PSU Leadership & Governance Excellence',
        desc: 'Recognizing public sector leaders driving impactful policy and governance reforms.'
    }, {
        icon: Award,
        title: 'Business Leader of Excellence',
        desc: 'Honoring CEOs driving exceptional growth, innovation, and stakeholder value.'
    }, {
        icon: ShieldCheck,
        title: 'BFSI Leadership Award',
        desc: 'Celebrating BFSI leaders shaping the future of Indian financial services.'
    }, {
        icon: Globe,
        title: 'Global Expansion Award',
        desc: 'Recognizing leaders with successful international business expansion strategies.'
    }, {
        icon: Users,
        title: 'Most Influential Women Leaders',
        desc: 'Celebrating women leaders who inspire change across industries.'
    }, {
        icon: ShoppingBag,
        title: 'Retail & Real Estate Excellence',
        desc: 'Honoring excellence in retail innovation and real estate development.'
    }, {
        icon: Factory,
        title: 'Manufacturing & HSE Excellence',
        desc: 'Recognizing manufacturing leaders for safety, quality and innovation.'
    }, {
        icon: HeartPulse,
        title: 'CSR & Community Development Award',
        desc: 'Recognizing meaningful CSR and community development initiatives.'
    }, {
        icon: MapPin,
        title: 'Real Estate Excellence Award',
        desc: 'Celebrating achievement in real estate development and urban transformation.'
    }, {
        icon: Building2,
        title: 'IT & Digital Transformation Award',
        desc: 'Recognizing digital transformation leaders in Indian enterprise.'
    },
]

export default function AwardsSection() {
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
                        Awards That
                        <span className="text-gradient-gb">Define Excellence</span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
                        Our recognition programs honor outstanding leaders and organizations who are redefining success.
                    </p>
                </div>

                {/* Awards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
                    {
                    AWARDS.map((award) => {
                        const Icon = award.icon
                        return (
                            <div key={
                                    award.title
                                }
                                className="group bg-white rounded-2xl border border-neutral-100 p-5 lg:p-6 card-shadow hover:card-shadow-hover hover:border-gb-200 transition-all duration-500">
                                <div className="w-12 h-12 rounded-xl bg-gb-50 flex items-center justify-center mb-4 group-hover:bg-gb-100 transition-colors">
                                    <Icon className="w-6 h-6 text-gb-600"/>
                                </div>

                                <h3 className="text-sm font-bold text-neutral-900 mb-1.5 leading-snug">
                                    {
                                    award.title
                                } </h3>

                                <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                                    {
                                    award.desc
                                } </p>
                            </div>
                        )
                    })
                } </div>

            </div>
        </section>
    )
}
