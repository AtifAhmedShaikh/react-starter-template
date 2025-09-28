import ServicesSection from '@/components/landingPage/ServicesSection'
import StatsSection from '@/components/landingPage/StatsSection'
import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const StatisticsPage = () => {
  return (
    <div>
      <Navbar />
      {/* Statistics Section */}
      <StatsSection />
      <Footer />
    </div>
  )
}

export default StatisticsPage
