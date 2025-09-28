import { store } from "@/stores";
import { logoutAsync } from "@/stores/slices/authSlice";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import JsCookies from "js-cookie"

const LogoutPage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutAsync());

        const timer = setTimeout(() => {
            setLoading(false);
            toast.success("Logout successful");
        }, 2000);
        localStorage.clear(); // clear storage after logout
        JsCookies.remove("selectedChargeId");
        store.dispatch({ type: 'RESET_STORE' });
        navigate("/login");
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Logging Out - Anti-Corruption Establishment Sindh</title>
                <meta
                    property="og:title"
                    content="Enquiries & Anti-Corruption Establishment Sindh."
                />
            </Helmet>

            {loading ? (
                <div className="text-center">
                    <div className="mb-4">
                        <svg
                            className="animate-spin h-10 w-10 text-blue-500 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                        Logging out... Please wait
                    </p>
                </div>
            ) : (
                <p className="text-lg font-semibold text-gray-700">
                    Logout complete. Redirecting...
                </p>
            )}
        </div>
    );
};

export default LogoutPage;
