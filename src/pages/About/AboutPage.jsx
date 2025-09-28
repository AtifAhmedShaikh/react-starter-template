import AboutUsSection from '@/components/landingPage/AboutSection'
import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-screen'>
            <AboutUsSection />
            </div>
            <Footer />
        </>
    )
}

export default AboutPage