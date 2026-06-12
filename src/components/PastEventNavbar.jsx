import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Home, ChevronDown } from 'lucide-react'
import { PAST_EVENTS } from '../data/events'

const NAV_LINKS = [
  { label: 'Video', href: '#video' },
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function PastEventNavbar({ event }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  // Filter out the video link if the event doesn't have a video
  const activeLinks = NAV_LINKS.filter(
    (link) => link.href !== '#video' || event?.videoUrl
  )

  // Other events to show in the dropdown
  const otherEvents = PAST_EVENTS.filter((e) => e.slug !== event?.slug)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMobileOpen(false)

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'bg-black1 backdrop-blur-xl'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logos/logo.png"
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

            {/* Other Events Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav-link px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5">
                Other Events
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-gb-900/10 border border-neutral-100 border-t-4 border-t-gb-500 transition-all duration-300 origin-top-left overflow-hidden ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
              >
                <div className="py-2">
                  {otherEvents.map((e) => (
                    <Link
                      key={e.slug}
                      to={`/events/${e.slug}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-6 py-3.5 text-sm font-medium text-neutral-600 hover:text-gb-700 hover:bg-gradient-to-r hover:from-gb-50 hover:to-transparent transition-all duration-200 border-l-2 border-transparent hover:border-gb-500"
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {activeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link px-6 py-4 text-sm font-medium rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
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

            {/* Other Events (Mobile Accordion) */}
            <div>
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-neutral-600 hover:text-gb-700 hover:bg-gb-50 rounded-lg transition-colors"
              >
                <span className="font-medium">Other Events</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileDropdownOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-neutral-50/50 rounded-lg mt-1 border border-neutral-100/50">
                  {otherEvents.map((e) => (
                    <Link
                      key={e.slug}
                      to={`/events/${e.slug}`}
                      onClick={handleNavClick}
                      className="block px-4 py-2 text-sm text-neutral-500 hover:text-gb-700 hover:bg-white rounded-md transition-colors"
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {activeLinks.map((link) => (
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
