import ContactUs from '@/components/landingPage/ContactUs'
import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const ContactUsPage = () => {
    return (
        <div className=" min-h-[100dvh] bg-secondary  flex flex-col">
        <Navbar />
        <main className="flex-1 my-auto">
          <ContactUs />
        </main>
        <Footer />
      </div>
      
    )
}

export default ContactUsPage