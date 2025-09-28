
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { API_METHODS, COMPLAINT_QUERY_NAME, FORWARD_COMPLAINT_STATUS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";




const fetchSentComplaints = async ({ keyword, page, limit, ...params }) => {
  const res = await apiHandler(COMPLAINT_APIS.FORWARDED_COMPLAINTS, {
    params: { keyword, page, limit, ...params } ,
    method: API_METHODS.GET
  });
  return res;
};


export default function SentComplaintsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Sent Complaints</h1>
      <ComplaintTable apiFn={fetchSentComplaints} queryName={COMPLAINT_QUERY_NAME.sent_complaints} extraParams={{status:FORWARD_COMPLAINT_STATUS.SENT}} />
    </div>
  );
}
