
import AboutUsSection from "@/components/landingPage/AboutSection"
import ContactUs from "@/components/landingPage/ContactUs"
import CtaSection from "@/components/landingPage/CtaSection"
import FaqSection from "@/components/landingPage/FaqSection"
import HeroSection from "@/components/landingPage/HeroSection"
import ReportSection from "@/components/landingPage/ReportSection"
import SecuritySection from "@/components/landingPage/SecuritySection"
import ServicesSection from "@/components/landingPage/ServicesSection"
import StatsSection from "@/components/landingPage/StatsSection"
import TestimonialSection from "@/components/landingPage/TestimonialsSection"
import TopLeaderShip from "@/components/landingPage/TopLeaderShip"
import Footer from "@/components/layouts/Footer"
import Navbar from "@/components/layouts/Navbar"

export const slogans = [
  "Fight Corruption, Build Trust",
  "Corruption Free Sindh",
  "Justice for Every Citizen",
  "End Bribery, Restore Dignity",
  "Transparent Sindh, Prosperous Future",
  "Break the Chains of Corruption",
  "Your Voice Against Injustice",
  "Honest Government, Happy People",
]

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutUsSection />

      {/* How It Works Section */}
      <ReportSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Statistics Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Security & Privacy Section */}
      <SecuritySection />

      {/* Team Leader */}
      <TopLeaderShip />

      {/* <TeamLeadSection /> */}

      {/* FAQ Section */}
      <FaqSection />
      {/* Contact Section */}
      <ContactUs />

      {/* CTA Section */}
      <CtaSection />


      {/* Footer */}
      <Footer />
    </div>
  )
}
