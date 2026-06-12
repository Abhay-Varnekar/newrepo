import { useParams, Navigate } from 'react-router-dom'
import { PAST_EVENTS } from '../data/events'

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
      <PastEventNavbar event={event} />
      <PastEventHero event={event} />
      <PastEventVideoSection videoUrl={event.videoUrl} />
      <ImpactSection about={event.about} />
      <SpeakersSection speakers={event.speakers} />
      {/* <AwardsSection awards={event.awards} /> */}
      <TestimonialsSection testimonials={event.about?.testimonials || event.testimonials} />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
