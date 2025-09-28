
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { API_METHODS, COMPLAINT_QUERY_NAME } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";



const fetchTrackComplaints = async ({ keyword, page, limit, sortBy = "updatedAt", order = "desc" }) => {
    const res = await apiHandler(COMPLAINT_APIS.NEW_COMPLAINTS, {
        params: { keyword, page, limit, sortBy, order },
        method: API_METHODS.GET
    });
    return res;
};

export default function TrackComplaintsPage() {
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">New Complaints</h1>
            <ComplaintTable apiFn={fetchTrackComplaints} queryName={COMPLAINT_QUERY_NAME.new_complaints} />
        </div>
    );
}
