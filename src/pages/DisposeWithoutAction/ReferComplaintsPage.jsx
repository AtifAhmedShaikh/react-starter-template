
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME, COMPLAINT_STATUS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";



const fetchDisposeWithoutActionComplaints = async ({ keyword, page, limit, sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_REFER_COMPLAINTS, {
    params: { keyword, page, limit, order, sortBy }
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
