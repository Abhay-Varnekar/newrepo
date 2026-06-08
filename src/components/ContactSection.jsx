import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'connect@timesaspire.com' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Headquarters', value: 'Mumbai, Maharashtra, India' },
]

const SOCIALS = [
  { icon: Linkedin },
  { icon: Twitter },
  { icon: Instagram },
  { icon: Youtube },
]

const INTEREST_OPTIONS = ['', 'Attending a Summit', 'Submitting a Nomination', 'Speaking Opportunity', 'Sponsorship', 'Partnership', 'Media / Press', 'Other']

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSubmitted(true)
      setSending(false)
      setTimeout(() => {
        setSubmitted(false)
        e.target.reset()
      }, 4000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-px bg-gb-500" />
              <span className="text-gb-600 text-xs font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
              Ready to Be Part of<br />Something <span className="text-gradient-gb">Extraordinary</span>?
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed mb-10">
              Whether you want to attend, speak, nominate, sponsor, or partner — we'd love to hear from you.
            </p>

            <div className="space-y-6">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gb-50 border border-gb-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gb-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm text-neutral-900 font-medium">{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3 mt-10">
              {SOCIALS.map((s, i) => {
                const Icon = s.icon
                return (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-warm-50 border border-neutral-100 flex items-center justify-center hover:bg-gb-50 hover:border-gb-200 transition-all">
                    <Icon className="w-4 h-4 text-neutral-400" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="bg-warm-50 border border-neutral-100 rounded-2xl p-8 card-shadow">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">First Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-gb-400 focus:ring-2 focus:ring-gb-100 transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-gb-400 focus:ring-2 focus:ring-gb-100 transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Work Email</label>
                <input type="email" required className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-gb-400 focus:ring-2 focus:ring-gb-100 transition-all" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">I'm interested in</label>
                <select className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-400 focus:outline-none focus:border-gb-400 focus:ring-2 focus:ring-gb-100 transition-all appearance-none cursor-pointer">
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt || 'Select an option'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-gb-400 focus:ring-2 focus:ring-gb-100 transition-all resize-none" placeholder="Tell us more about your interest..." />
              </div>
              <button
                type="submit"
                disabled={sending}
                className={`w-full px-8 py-4 text-base font-semibold text-white rounded-xl transition-all duration-300 ${
                  submitted
                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                    : 'bg-gradient-to-r from-gb-500 to-gb-600 hover:from-gb-400 hover:to-gb-500 gold-shadow'
                }`}
              >
                {sending ? 'Sending...' : submitted ? 'Sent ✓' : 'Send Message'}
              </button>
              {submitted && (
                <div className="text-center py-3 px-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">✓ Thank you! We'll get back to you within 24 hours.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}