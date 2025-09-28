import TrackOpenComplaintsTable from "@/components/TrackOpenComplaints/TrackOpenComplaintsTable";
import { COMPLAINT_QUERY_NAME } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";

const fetchTrackOpenComplaints = async ({ keyword, page, limit, sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_TRACK_OPEN_COMPLAINTS, {
    params: { keyword, page, limit, order, sortBy }
  });
  return res.data;
};

export default function TrackOpenComplaintsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Track Open Complaints</h1>
      <TrackOpenComplaintsTable 
        apiFn={fetchTrackOpenComplaints} 
        queryName={COMPLAINT_QUERY_NAME.track_open_complaints} 
      />
    </div>
  );
}
