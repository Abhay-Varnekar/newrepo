import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
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
import PastEventPage from './pages/PastEventPage'

function HomePage() {
  return (
    <div className="bg-warm-50 text-neutral-800 antialiased overflow-x-hidden">
      <Navbar />
      <HeroEvent />
      <EventsSection />
      <SpeakersSection />
      <AwardsSection />
      <ImpactSection />
      <TestimonialsSection />
      <PricingSection />
      <PartnersSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:slug" element={<PastEventPage />} />
      </Routes>
    </>
  )
}
