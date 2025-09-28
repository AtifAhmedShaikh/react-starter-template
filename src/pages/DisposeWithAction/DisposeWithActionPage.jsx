
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";



const fetchDisposeWithActionComplaints = async ({ keyword, page, limit, sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_DISPOSED_COMPALINTS, {
    params: { keyword, page, limit, sortBy, order }
  });
  return res.data;
};

export default function DisposeWithActionComplaintsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dispose With Action Complaints</h1>
      <ComplaintTable apiFn={fetchDisposeWithActionComplaints} queryName={COMPLAINT_QUERY_NAME.disposed_with_action_complaints} />
    </div>
  );
}
