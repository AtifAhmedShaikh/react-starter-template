import { LoadingScreen } from "@/components/reuseable/Loading";
import { ADMIN_APIS } from "@/constants/APIs";
import { apiHandler } from "@/lib/apiWrapper";
import { ArrowLeft, AlertCircle, UserX } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Reusable label-value pair
const Detail = ({ label, value, applyOr }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium break-words capitalize">{applyOr ? value || "—" : value}</p>
    </div>
);


export default function AdminProfileDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await apiHandler(`${ADMIN_APIS.GET_ADMIN_PROFILE_DETAILS}/${id}`);
            setLoading(false);
            if (!response?.success) return toast.error(response?.message);
            setAdmin(response?.data?.admin);
        })();
    }, [id]);

    if (loading) {
        return <LoadingScreen />
    }

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <UserX className="mx-auto h-16 w-16 text-red-500 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Not Found</h2>
                        <p className="text-gray-600 mb-8">The requested admin profile could not be loaded.</p>
                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate(-1)}
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </Button>
                            <Button
                                onClick={() => navigate('/admins')}
                                variant="outline"
                                className="w-full"
                            >
                                View All Admins
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-4 sm:mt-5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 hover:bg-gray-100"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-xl font-semibold">Admin Profile</h1>
            </div>

            <div className="space-y-2 mb-8 sm:px-5">

                <div className="flex items-center gap-4 py-2 bg-white sticky top-0">
                    <img
                        src={admin?.profileImage || ""}
                        alt="Profile"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/profile.jpg";
                        }}
                        className="rounded-full border sm:w-24 sm:h-24 w-12 h-12"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">{admin?.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{admin?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border rounded-sm p-4">
                    <Detail label="Phone" value={admin?.phoneNumber} />
                    <Detail label="CNIC" value={admin?.cnic} />
                    <Detail label="Designation" value={admin?.role?.value} />
                    <Detail label="City" value={admin?.city?.name} />
                    <Detail label="Address" value={admin?.address} />
                </div>

                {admin?.chargesAssigned?.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-md font-semibold mb-2">Office Charge</h3>
                        <div className="space-y-3">
                            {Array.isArray(admin?.chargesAssigned) ? admin.chargesAssigned.map((charge, index) => (
                                <div
                                    key={index}
                                    className="rounded-md p-3"
                                >
                                    <p className="font-semibold">{charge.chargeName}</p>
                                </div>
                            )) : ""}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
