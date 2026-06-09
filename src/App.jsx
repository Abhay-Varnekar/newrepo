import Navbar from './components/Navbar'
import HeroEvent from './components/HeroEvent'
import EventsSection from './components/EventsSection'
import AwardsSection from './components/AwardsSection'
import SpeakersSection from './components/SpeakersSection'
import ImpactSection from './components/ImpactSection'
import TestimonialsSection from './components/TestimonialsSection'
import PartnersSection from './components/PartnersSection'
import ContactSection from './components/ContactSection'
import NewsletterSection from './components/NewsletterSection'
import Footer from './components/Footer'
import PricingSection from './components/pricingsection'

export default function App() {
  return (
    <div className="bg-warm-50 text-neutral-800 antialiased overflow-x-hidden">
      <Navbar />
      <HeroEvent />
      <EventsSection />
      <AwardsSection />
      <SpeakersSection />
      <ImpactSection />
      <TestimonialsSection />
      <PartnersSection />
      <PricingSection/>
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}