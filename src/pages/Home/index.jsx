
import AboutUsSection from "@/components/landingPage/AboutSection"
import ContactUs from "@/components/landingPage/ContactUs"
import HeroSection from "@/components/landingPage/HeroSection"
import ServicesSection from "@/components/landingPage/ServicesSection"
import StatsSection from "@/components/landingPage/StatsSection"
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
