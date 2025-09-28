import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    FileText
} from "lucide-react";
import { selectUser } from "@/stores/slices/authSlice";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@/constants";
import { verifyJwtToken } from "@/utils/helper";

const CtaSection = () => {
    const navigate = useNavigate();
    const { user = "" } = verifyJwtToken(
        localStorage.getItem("accessToken")
    );

    return (
        <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 text-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-emerald-400/20 to-green-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Report Corruption?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                    Take the first step towards a corruption-free Sindh. Your report can make a real difference in building a
                    transparent and accountable government.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-8 py-4 bg-white text-green-700 hover:bg-green-50 hover:text-green-800 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => {
                            if (!user) {
                                navigate("/login");
                                return;
                            }
                            if (user?.roleKey === USER_ROLES.COMPLAINANT) {
                                navigate("/lodge-complaint");
                            } else {
                                navigate("/dashboard");
                            }
                        }
                        }
                    >
                        <FileText className="!w-5 !h-5 mr-2" />
                        File Complaint Now
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-700 bg-transparent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => {
                            if (!user) {
                                navigate("/register");
                                return;
                            }
                            if (user?.roleKey === USER_ROLES.COMPLAINANT) {
                                navigate("/lodge-complaint");
                            } else {
                                navigate("/dashboard");
                            }
                        }
                        }
                    >
                        <Eye className="!w-5! h-5 mr-2" />
                        Register As Complainant
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
