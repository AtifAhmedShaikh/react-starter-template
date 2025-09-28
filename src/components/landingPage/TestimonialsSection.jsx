import { Card, CardContent } from "@/components/ui/card"
import {
  Star
} from "lucide-react"

const TestimonialSection = () => {

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/70 via-green-50/50 to-emerald-100/40 relative">
      <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-bl from-green-100/25 to-emerald-200/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-emerald-100/25 to-green-200/15 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Citizen Testimonials</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from citizens who fought corruption with our help
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-green-50/80 to-emerald-100/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-200/50">
            <CardContent className="pt-6">
              {/* <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-green-600 fill-current" />
                ))}
              </div> */}
              <p className="text-muted-foreground mb-4 italic">
                "E&ACE Sindh helped me recover my rightful property that was illegally occupied. The process was
                completely anonymous and professional."
              </p>
              <div className="font-semibold text-foreground">Muhammad Ali</div>
              <div className="text-sm text-muted-foreground">Karachi Resident</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50/80 to-emerald-100/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-200/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4 italic">
                "Thanks to E&ACE, the corrupt officials in our local office were caught and removed. Now we get
                services without paying bribes."
              </p>
              <div className="font-semibold text-foreground">Fatima Sheikh</div>
              <div className="text-sm text-muted-foreground">Hyderabad Resident</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50/80 to-emerald-100/60 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-green-200/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4 italic">
                "The complaint process was so simple and secure. Within weeks, action was taken against the corrupt
                contractor."
              </p>
              <div className="font-semibold text-foreground">Ahmed Hassan</div>
              <div className="text-sm text-muted-foreground">Sukkur Resident</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

  );
};

export default TestimonialSection;
