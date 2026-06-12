import { useParams, Navigate } from 'react-router-dom'
import { PAST_EVENTS } from '../data/pastEvents'

import PastEventNavbar from '../components/PastEventNavbar'
import PastEventHero from '../components/PastEventHero'
import PastEventVideoSection from '../components/PastEventVideoSection'
import SpeakersSection from '../components/SpeakersSection'
import AwardsSection from '../components/AwardsSection'
import ImpactSection from '../components/ImpactSection'
import TestimonialsSection from '../components/TestimonialsSection'
import PartnersSection from '../components/PartnersSection'
import ContactSection from '../components/ContactSection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'

export default function PastEventPage() {
  const { slug } = useParams()
  const event = PAST_EVENTS.find((e) => e.slug === slug)

  // Unknown slug → redirect home
  if (!event) return <Navigate to="/" replace />

  return (
    <div className="bg-warm-50 text-neutral-800 antialiased overflow-x-hidden">
      <PastEventNavbar />
      <PastEventHero event={event} />
      <PastEventVideoSection videoUrl={event.videoUrl} />
      <SpeakersSection speakers={event.speakers} />
      <AwardsSection awards={event.awards} />
      <ImpactSection about={event.about} />
      <TestimonialsSection />
      <PartnersSection />
      {/* Pricing section intentionally omitted for past events */}
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
