import { Handshake } from 'lucide-react'

const PARTNERS = ['TATA', 'Infosys', 'Wipro', 'HCL', 'Reliance', 'Adani', 'Bajaj', 'Mahindra', 'L&T', 'Godrej', 'Deloitte', 'EY']
const SPONSOR_TYPES = ['Title Sponsor', 'Co-Sponsor', 'Category Sponsor', 'Exhibition']

export default function PartnersSection() {
  return (
    <section id="partners" className="relative py-20 lg:py-28 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <Handshake className="w-4 h-4 text-gb-500" />
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Trusted By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Our <span className="text-gradient-gb">Partners</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
            Proudly associated with leading organizations that share our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center mb-14">
          {PARTNERS.map((name) => (
            <div key={name} className="h-12 w-28 rounded-lg bg-white border border-neutral-100 flex items-center justify-center p-3 cursor-pointer card-shadow hover:shadow-md hover:border-gb-200 transition-all">
              <span className="text-neutral-400 font-bold text-sm tracking-tight hover:text-gb-600 transition-colors">{name}</span>
            </div>
          ))}
        </div>

        {/* Sponsorship CTA */}
        <div className="relative rounded-2xl border border-gb-200 bg-gradient-to-r from-gb-50 via-white to-gb-50 p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gb-200/30 rounded-full blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Become a Sponsor</h3>
              <p className="text-neutral-500 leading-relaxed mb-5">
                Position your brand alongside India's most respected leaders. Unmatched visibility, lead generation, and brand association.
              </p>
              <div className="flex flex-wrap gap-2">
                {SPONSOR_TYPES.map((type) => (
                  <span key={type} className="px-3 py-1.5 text-xs font-medium text-gb-700 bg-gb-100 rounded-md">{type}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:justify-end gap-3">
              <a href="#" className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-gb-500 to-gb-600 hover:from-gb-400 hover:to-gb-500 rounded-xl transition-all duration-300 gold-shadow text-center">
                Download Brochure
              </a>
              <a href="#contact" className="px-8 py-4 text-base font-medium text-gb-700 border border-gb-200 hover:border-gb-400 hover:bg-gb-50 rounded-xl transition-all duration-300 text-center">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}