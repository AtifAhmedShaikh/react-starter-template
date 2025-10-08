import LodgeComplaintForm from '@/components/LodgeComplaint/LodgeComplaintMainForm'
import React from 'react'
import { Helmet } from 'react-helmet'

const LodgeComplaintPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lodge Complaint - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
      </Helmet>
      <LodgeComplaintForm />

    </div>
  )
}

export default LodgeComplaintPage