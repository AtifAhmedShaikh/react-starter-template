import ServicesSection from '@/components/landingPage/ServicesSection'
import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const ServicesPage = () => {
  return (
    <div>
      <Navbar />
      {/* Services Section */}
      <ServicesSection />
      <Footer />
    </div>
  )
}

export default ServicesPage
