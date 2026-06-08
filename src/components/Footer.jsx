import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

const FOOTER_SECTIONS = [
  {
    title: 'Events',
    links: ['CEO Summit', 'HR Conference', 'Education Forum', 'Startup Awards', 'Roundtables'],
  },
  {
    title: 'Awards',
    links: ['CEO of the Year', 'Best Workplace', 'Innovation Award', 'Education Leadership', 'Social Impact'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Our Team', 'Careers', 'Press Kit', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Reports', 'Past Winners', 'Sponsorship', 'FAQs'],
  },
]

const SOCIALS = [
  { icon: Linkedin },
  { icon: Twitter },
  { icon: Instagram },
  { icon: Youtube },
]

const LEGAL = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gb-400 to-gb-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">TA</span>
              </div>
              <span className="text-white font-semibold text-base tracking-tight">TimesAspire</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">
              India's premium leadership ecosystem — connecting visionaries, celebrating excellence.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon
                return (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-neutral-500" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-500 hover:text-gb-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">© 2025 TimesAspire. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <a key={item} href="#" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}