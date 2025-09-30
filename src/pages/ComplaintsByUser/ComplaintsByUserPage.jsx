
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import { COMPLAINT_QUERY_NAME } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { apiHandler } from "@/lib/apiWrapper";
import { HTTP_METHODS } from "@/constants";
import { formatDate } from "@/utils/formatters";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


// Reusable label-value pair
const Detail = ({ label, value, applyOr }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium break-words capitalize">{applyOr ? value || "—" : value}</p>
  </div>
)

export default function ComplainerComplaintsPage() {
  const { id } = useParams();
  const { hasPermission } = usePermissions();
  const navigate=useNavigate()
  const canViewComplainerComplaints = hasPermission(PermissionKeys.can_view_notifications);
  const [complainant, setComplainant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!hasPermission(PermissionKeys.can_view_complainant_profile)) return null;


  const fetchComplaintsByComplainerId = async ({ keyword, page, limit, sortBy, order }) => {
    const res = await apiHandler(`${COMPLAINT_APIS.GET_COMPLAINTS_BY_COMPLAINANT_ID}/${id}`, {
      method: HTTP_METHODS.GET,
      params: { keyword, page, limit, sortBy, order },
    });
    return res.success ? res.data : res;
  };

  const fetchComplainerDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiHandler(`${COMPLAINT_APIS.GET_USER_BY_ID}/${id}`, {
        method: HTTP_METHODS.GET,
      });
      console.log("Response", res)

      if (res.success) {
        setComplainant(res.data);
      } else {
        setError(res.message || "Failed to fetch complainant details");
      }
    } catch (err) {
      console.error("Error fetching complainant details:", err);
      setError("Something went wrong while fetching complainant details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComplainerDetails();
    }
  }, [id])
  
  if (!canViewComplainerComplaints) return null;

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading complainant details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={fetchComplainerDetails}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!complainant) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No complainant data found</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 sm:mt-5">Complainant Profile</h1>
      <div className="space-y-2 mb-8 sm:px-5">
        <ArrowLeft onClick={()=>navigate(-1)} className="sm:cursor-pointer"/>
        <div className="flex items-center gap-4 py-2 bg-white sticky top-0">
          <img
            src={complainant?.profileImage || ""}
            alt="Profile"
            width={64}
            height={64}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/profile.jpg";
            }}
            className="rounded-full border sm:w-24 sm:h-24 w-20 h-20"
          />
          <div>
            <h3 className="text-lg font-semibold">{complainant?.fullName}</h3>
            <p className="text-sm text-muted-foreground">{complainant?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Detail label="Father Name" value={complainant?.fatherName} />
          <Detail label="Phone" value={complainant?.phoneNumber} />
          <Detail label="CNIC" value={complainant?.cnic} />
          <Detail label="Gender" value={complainant?.gender} />
          <Detail label="City" value={complainant?.city?.name} />
          <Detail label="Address" value={complainant?.address} />
          <Detail label="Country" value={complainant?.country} />
          <Detail label="Verified" value={complainant?.verified ? "Yes" : "No"} />
          <Detail label="Created At" value={formatDate(complainant?.createdAt)} />
          <Detail label="Complaints Count" value={complainant?._count?.complaints ?? 0} applyOr={false} />
        </div>
      </div>
      <ComplaintTable apiFn={fetchComplaintsByComplainerId} queryName={COMPLAINT_QUERY_NAME.complainant_complaints} />
    </div>
  );
}
