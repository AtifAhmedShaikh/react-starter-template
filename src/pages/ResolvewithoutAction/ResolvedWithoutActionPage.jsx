
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME, COMPLAINT_STATUS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";



const fetchResolvedComplaints = async ({ keyword, page, limit, type="", sortBy = "updatedAt", order = "desc" }) => {
  const res = await axiosInstance.get(COMPLAINT_APIS.GET_RESOLVED_COMPALINTS, {
    params: { keyword, page, limit, type, sortBy, order }
  });
  return res.data;
};

export default function ResolvedWithoutComplaintsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Resolved With No Complaints</h1>
      <ComplaintTable apiFn={fetchResolvedComplaints} queryName={COMPLAINT_QUERY_NAME.resolved_complaints} extraParams={{type:COMPLAINT_STATUS.RESOLVED_NO_ACTION}}  /> 
    </div>
  );
}
