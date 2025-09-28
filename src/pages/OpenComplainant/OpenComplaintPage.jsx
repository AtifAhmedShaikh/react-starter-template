import LodgeOpenComplaintMainForm from '@/OpenComlaints/OpenComplaintForm'
import { Helmet } from 'react-helmet'

const LodgeOpenComplaintPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lodge Complaint - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
      </Helmet>
      <LodgeOpenComplaintMainForm />

    </div>
  )
}

export default LodgeOpenComplaintPage