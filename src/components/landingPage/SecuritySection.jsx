import { AlertTriangle } from "lucide-react";
import { UserCheck } from "lucide-react";
import {
  Lock,
  Shield
} from "lucide-react";

const SecuritySection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/70 via-green-50/50 to-emerald-100/40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-60 h-60 bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-52 h-52 bg-gradient-to-br from-emerald-200/20 to-green-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Your Security is Our Priority</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced security measures to protect your identity and information
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
              <Lock className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">End-to-End Encryption</h3>
            <p className="text-muted-foreground">All communications are encrypted with military-grade security</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
              <Shield className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Anonymous Reporting</h3>
            <p className="text-muted-foreground">No personal information required to file complaints</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
              <UserCheck className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Whistleblower Protection</h3>
            <p className="text-muted-foreground">Legal protection under Sindh Whistleblower Act</p>
          </div>
          <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
              <AlertTriangle className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Secure Servers</h3>
            <p className="text-muted-foreground">Data stored on government-secured servers in Pakistan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
