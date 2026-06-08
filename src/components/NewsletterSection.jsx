import { useState } from 'react'

export default function NewsletterSection() {
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
    e.target.reset()
    setTimeout(() => setDone(false), 5000)
  }

  return (
    <section className="relative py-16 bg-gradient-to-r from-gb-600 via-gb-500 to-gb-600">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Stay Updated With TimesAspire</h3>
            <p className="text-white/60 text-sm">Get exclusive invitations, speaker announcements, and leadership insights.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              required
              className="flex-1 md:w-72 px-5 py-3.5 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/15 transition-colors"
              placeholder="Enter your email"
            />
            <button type="submit" className="px-6 py-3.5 bg-white text-gb-700 text-sm font-semibold rounded-xl hover:bg-warm-50 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </form>
        </div>
        {done && (
          <div className="mt-4 text-center">
            <p className="text-sm text-white/80 font-medium">✓ You're subscribed! Check your inbox for confirmation.</p>
          </div>
        )}
      </div>
    </section>
  )
}