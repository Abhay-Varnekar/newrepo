const PARTNERS = [
  { name: 'TATA', img: '/images/partners/tata.png' },
  { name: 'Infosys', img: '/images/partners/infosys.png' },
  { name: 'Wipro', img: '/images/partners/wipro.png' },
  { name: 'HCL', img: '/images/partners/hcl.png' },
  { name: 'Reliance', img: '/images/partners/reliance.png' },
  { name: 'Adani', img: '/images/partners/adani.png' },
  { name: 'Bajaj', img: '/images/partners/bajaj.png' },
  { name: 'Mahindra', img: '/images/partners/mahindra.png' },
  { name: 'L&T', img: '/images/partners/lt.png' },
  { name: 'Godrej', img: '/images/partners/godrej.png' },
  { name: 'Deloitte', img: '/images/partners/deloitte.png' },
  { name: 'EY', img: '/images/partners/ey.png' },
]

// If you don't have logo images yet, use text fallback:
const PARTNERS_TEXT = [
  'TATA', 'Infosys', 'Wipro', 'HCL', 'Reliance', 'Adani',
  'Bajaj', 'Mahindra', 'L&T', 'Godrej', 'Deloitte', 'EY',
]

function LogoItem({ partner, useImages }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center px-6 h-16 select-none">
      {useImages && partner.img ? (
        <img
          src={partner.img}
          alt={partner.name}
          className="h-8 w-auto max-w-[120px] object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
      ) : (
        <span className="text-neutral-300 font-bold text-sm tracking-tight hover:text-gb-600 transition-colors duration-300">
          {partner.name}
        </span>
      )}
    </div>
  )
}

export default function PartnersSection() {
  const doubled = [...PARTNERS, ...PARTNERS]
  const doubledText = [...PARTNERS_TEXT, ...PARTNERS_TEXT]

  return (
    <section id="partners" className="relative py-20 lg:py-28 bg-warm-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Trusted By</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
            Our <span className="text-gradient-gb">Partners</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg leading-relaxed">
            Proudly associated with leading organizations that share our commitment to excellence.
          </p>
        </div>
      </div>

      {/* Logo Cloud Row 1 — scrolls left */}
      <div className="relative w-full mb-8">
        <style>{`
          @keyframes logos-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes logos-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .scroll-left { animation: logos-left 30s linear infinite; }
          .scroll-right { animation: logos-right 30s linear infinite; }
          .logo-mask {
            mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          }
        `}</style>
        <div className="logo-mask w-full">
          <div className="scroll-left flex w-max">
            {doubled.map((partner, i) => (
              <LogoItem key={`r1-${i}`} partner={partner} useImages={false} />
            ))}
          </div>
        </div>
        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Logo Cloud Row 2 — scrolls right */}
      <div className="relative w-full mb-16">
        <div className="logo-mask w-full">
          <div className="scroll-right flex w-max">
            {doubled.map((partner, i) => (
              <LogoItem key={`r2-${i}`} partner={partner} useImages={false} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Sponsorship CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-2xl border border-gb-200 bg-gradient-to-r from-gb-50 via-white to-gb-50 p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gb-200/30 rounded-full blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Become a Sponsor</h3>
              <p className="text-neutral-500 leading-relaxed mb-5">
                Position your brand alongside India's most respected leaders. Unmatched visibility, lead generation, and brand association.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs font-medium text-gb-700 bg-gb-100 rounded-md">Title Sponsor</span>
                <span className="px-3 py-1.5 text-xs font-medium text-gb-700 bg-gb-100 rounded-md">Co-Sponsor</span>
                <span className="px-3 py-1.5 text-xs font-medium text-gb-700 bg-gb-100 rounded-md">Category Sponsor</span>
                <span className="px-3 py-1.5 text-xs font-medium text-gb-700 bg-gb-100 rounded-md">Exhibition</span>
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