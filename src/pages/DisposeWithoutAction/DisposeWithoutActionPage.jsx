
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME, COMPLAINT_STATUS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";



const fetchDisposeWithoutActionComplaints = async ({ keyword, page, limit, type="", sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_DISPOSED_COMPALINTS, {
    params: { keyword, page, limit, type, order, sortBy }
  });
  return res.data;
};

export default function DisposeWithoutActionComplaintsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dispose Without Action Complaints</h1>
      <ComplaintTable apiFn={fetchDisposeWithoutActionComplaints} queryName={COMPLAINT_QUERY_NAME.disposed_without_action_complaints} extraParams={{type:COMPLAINT_STATUS.FILE_NOT_RELAVENT}} />
    </div>
  );
}
