import { ShieldAlert } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <div className="max-w-md w-full bg-card shadow-lg rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <ShieldAlert className="text-red-500 w-12 h-12" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-6">
                    You do not have permission to view this page or resource.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="inline-block bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-2 rounded-lg transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
