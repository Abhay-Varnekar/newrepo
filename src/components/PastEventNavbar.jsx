import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Home } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Speakers', href: '#speakers' },
  { label: 'Awards', href: '#awards' },
  { label: 'About', href: '#about' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
]

export default function PastEventNavbar() {
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
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="TimesAspire"
              className="h-40 w-40 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home button — replaces "All Events" */}
            <Link
              to="/"
              className="nav-link px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — removed Register Now for past events */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-gb-400 to-gb-600 hover:from-gb-300 hover:to-gb-500 rounded-lg transition-all duration-300 shadow-lg shadow-gb-600/30 hover:shadow-gb-500/40 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Featured Event
            </Link>
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
            {/* Home link */}
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-2 px-4 py-3 text-neutral-600 hover:text-gb-700 hover:bg-gb-50 rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-neutral-600 hover:text-gb-700 hover:bg-gb-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
