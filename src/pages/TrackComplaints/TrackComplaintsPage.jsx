
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";
import { Helmet } from "react-helmet";



const fetchTrackComplaints = async ({ keyword, page, limit, sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_TRACK_COMPLAINTS, {
    params: { keyword, page, limit, sortBy, order }
  });
  return res.data;
};

export default function TrackComplaintsPage() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Track Complaints - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
      </Helmet>
      <div>
        <h1 className="text-xl font-semibold mb-4">Track Complaints</h1>
              <ComplaintTable apiFn={fetchTrackComplaints} />
      </div>
    </>
  );
}
