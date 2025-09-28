const ReportSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/60 via-green-50/40 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-green-300/15 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How to Report Corruption</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, secure, and anonymous process to report corruption incidents
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
              1
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Submit Complaint</h3>
            <p className="text-muted-foreground">
              Fill out our secure online form with details about the corruption incident
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
              2
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Get Reference Number</h3>
            <p className="text-muted-foreground">Receive a unique tracking number to monitor your complaint status</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
              3
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Investigation Begins</h3>
            <p className="text-muted-foreground">Our expert team conducts thorough investigation within 48 hours</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-xl group-hover:shadow-2xl group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
              4
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Action Taken</h3>
            <p className="text-muted-foreground">Appropriate legal action and systemic improvements implemented</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
