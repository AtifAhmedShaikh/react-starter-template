
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME, FORWARD_COMPLAINT_STATUS } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";



const fetchTrackComplaints = async ({ keyword, page, limit , ...params}) => {
    const res = await axiosInstance.get(COMPLAINT_APIS.FORWARDED_COMPLAINTS, {
        params: { keyword, page, limit, ...params }
    });
    return res.data;
};

export default function TrackComplaintsPage() {
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">New Complaints</h1>
            <ComplaintTable apiFn={fetchTrackComplaints} queryName={COMPLAINT_QUERY_NAME.new_complaints} extraParams={{status:FORWARD_COMPLAINT_STATUS.NEW}} />
        </div>
    );
}
