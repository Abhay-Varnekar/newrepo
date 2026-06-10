import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  // { label: 'Next Event', href: '#featured-event' },
  { label: 'All Events', href: '#events' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Awards', href: '#awards' },
  { label: 'About', href: '#about' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMobileOpen(false)

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : 'bg-black1 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
  <img
    src="/images/logo.png"
    alt="TimesAspire"
    className="h-40 w-40 object-contain group-hover:scale-105 transition-transform duration-300"
  />
</a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#pricing"
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-gb-400 to-gb-600 hover:from-gb-300 hover:to-gb-500 rounded-lg transition-all duration-300 shadow-lg shadow-gb-600/30 hover:shadow-gb-500/40"
            >
              Register Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobileMenuBtn"
            className="lg:hidden p-2 transition-colors duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-neutral-100 shadow-xl">
          <div className="px-6 py-6 space-y-1">
            <a href="#featured-event" onClick={handleNavClick} className="block px-4 py-3 text-neutral-700 hover:text-gb-700 hover:bg-gb-50 rounded-lg transition-colors font-medium">
              🔥 Next Event
            </a>
            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-neutral-600 hover:text-gb-700 hover:bg-gb-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-neutral-100 mt-4">
              <a href="#" className="block w-full text-center px-5 py-3 text-sm font-semibold text-gb-700 border border-gb-300 rounded-lg hover:bg-gb-50 transition-colors">
                Nominate
              </a>
              <a href="#pricing" onClick={handleNavClick} className="block w-full text-center px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-gb-500 to-gb-600 rounded-lg">
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}