import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Award,
  Building,
  Eye,
  FileText,
  Gavel,
  UserCheck
} from "lucide-react"

const ServicesSection = () => {

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-white via-green-25/50 to-emerald-25/30 relative">
      <div className="absolute top-0 left-1/4 w-56 h-56 bg-gradient-to-br from-green-100/20 to-emerald-200/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-44 h-44 bg-gradient-to-br from-emerald-100/20 to-green-200/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive anti-corruption services to ensure transparency and accountability
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <FileText className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Complaint Registration</CardTitle>
              <CardDescription>Secure and anonymous complaint filing system available 24/7</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Eye className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Case Tracking</CardTitle>
              <CardDescription>Real-time updates on your complaint status and investigation progress</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Gavel className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Legal Action</CardTitle>
              <CardDescription>Swift legal proceedings against proven corruption cases</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Building className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Institutional Reforms</CardTitle>
              <CardDescription>
                Systemic changes to prevent future corruption in government departments
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <UserCheck className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Whistleblower Protection</CardTitle>
              <CardDescription>Complete protection and support for those reporting corruption</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 bg-gradient-to-br from-white to-green-25/30 border-green-100/50">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <Award className="w-6 h-6 text-green-700" />
              </div>
              <CardTitle>Integrity Awards</CardTitle>
              <CardDescription>Recognition program for honest government officials and citizens</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
