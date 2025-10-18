import {
  AlertTriangle,
  Award,
  Building,
  CheckCircle,
  Gavel,
  Lock,
  Shield,
  TrendingUp,
  Users
} from "lucide-react"

const AboutUsSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-background via-primary/5 to-primary/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/20 to-primary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-2xl animate-bounce delay-500"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 via-primary/5 to-primary/15 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-primary/80 rounded-full animate-pulse"></div>
            <h2 className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary border-primary/20 px-8 py-4 text-lg font-bold shadow-lg animate-fade-in">
              🏛️ About
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary/80 via-primary to-transparent rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-6 animate-fade-in delay-300">
            Enquiries & Anti-Corruption Establishment Sindh
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-2xl text-muted-foreground mb-4 leading-relaxed animate-fade-in delay-500">
              The Enquiries & Anti-Corruption Establishment Sindh is dedicated to eliminating corruption and promoting
              transparency in government operations across Sindh province.
            </p>
            <p className="text-lg text-green-700 font-semibold animate-fade-in delay-700 font-nastaliq">
              "سندھ میں بدعنوانی کا خاتمہ اور شفافیت کو فروغ دینے کے لیے پرعزم"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start  mb-20">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white/90 to-green-50/80 p-8 rounded-3xl shadow-sm border border-primary/60 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-green-100/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                  <p className="text-green-700 font-semibold font-nastaliq">ہمارا مشن</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                To create a corruption-free Sindh where government services are delivered with complete transparency,
                accountability, and efficiency. We work tirelessly to investigate complaints, prosecute offenders, and
                implement systemic reforms.
              </p>
              <p className="text-green-700 font-semibold text-right font-nastaliq">
                "شفاف، جوابدہ اور موثر حکومتی خدمات کے ذریعے بدعنوانی سے پاک سندھ کی تعمیر"
              </p>
            </div>

            <div className="space-y-6">
              <div className="group bg-gradient-to-r from-white to-green-25/60 p-6 rounded-2xl shadow-sm border-primary/50  hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border ">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
                    <AlertTriangle className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-2">Zero Tolerance Policy</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Strict action against all forms of corruption with no exceptions or compromises
                    </p>
                    <p className="text-green-700 font-semibold text-sm mt-2 font-nastaliq">بدعنوانی کے خلاف سخت کارروائی</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-white to-green-25/60 p-6 rounded-2xl shadow-sm border-primary/50  hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border ">
              <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
                    <Users className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-2">Citizen-Centric Approach</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Prioritizing public interest and citizen welfare in all decisions and actions
                    </p>
                    <p className="text-green-700 font-semibold text-sm mt-2 font-nastaliq">شہریوں کی فلاح کو ترجیح</p>
                  </div>
                </div>
              </div>

          
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50/90 via-emerald-50/80 to-green-100/70 p-10 rounded-3xl shadow-sm border border-primary/60 hover:shadow-3xl transition-all duration-500 hover:transform hover:scale-105  backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-2xl"></div>

              <div className="text-center  flex gap-2 mb-8 relative z-10">
                <div className="w-16 h-16  bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center   shadow-xl">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="flex flex-col items-center ">
                <h3 className="text-2xl font-bold text-foreground mb-2">Our Impact</h3>
                <p className="text-green-700 font-semibold font-nastaliq">ہمارے کارنامے</p>
              
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 relative z-10">

                {/* <div className="text-center group">
                  <div className="bg-gradient-to-br from-white to-green-50/80 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110 border border-green-100/50">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                      15+
                    </div>
                    <div className="text-muted-foreground font-semibold">Years of Service</div>
                    <div className="text-green-700 text-sm font-semibold font-nastaliq">سال خدمت</div>
                  </div>
                </div> */}

                <div className="text-center group">
                  <div className="bg-gradient-to-br from-white to-green-50/80 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110 border border-green-100/50">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                      17,722
                    </div>
                    <div className="text-muted-foreground font-semibold">Total Complaints</div>
                    <div className="text-green-700 text-sm font-semibold font-nastaliq">کل شکایات </div>
                  </div>
                </div>
                
                {/* <div className="text-center group">
                  <div className="bg-gradient-to-br from-white to-green-50/80 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110 border border-green-100/50">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                      98%
                    </div>
                    <div className="text-muted-foreground font-semibold">Success Rate</div>
                    <div className="text-green-700 text-sm font-semibold font-nastaliq">کامیابی کی شرح</div>
                  </div>
                </div> */}

                {/* <div className="text-center group">
                  <div className="bg-gradient-to-br from-white to-green-50/80 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:transform hover:scale-110 border border-green-100/50">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                      24/7
                    </div>
                    <div className="text-muted-foreground font-semibold">Support Available</div>
                    <div className="text-green-700 text-sm font-semibold font-nastaliq">مدد دستیاب</div>
                  </div>
                </div> */}

              </div>

            </div>

            <div className="space-y-6">
            <div className=" bg-gradient-to-r from-white to-green-25/60 p-6 rounded-2xl shadow-sm border-primary/50  hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border ">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
                  <Building className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-2">Systemic Reforms</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Implementing long-term solutions and structural changes to prevent corruption
                  </p>
                  <p className="text-green-700 font-semibold text-sm mt-2 font-nastaliq">نظامی اصلاحات کا نفاذ</p>
                </div>
              </div>
            </div>
            

              <div className="group bg-gradient-to-r from-white to-green-25/60 p-6 rounded-2xl shadow-sm border-primary/50  hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border ">
              <div className="flex  gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg group-hover:from-green-200 group-hover:to-emerald-300 transition-all duration-300">
                  <Award className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">Key Achievements</h4>
                  <div >
                <div className="flex items-center gap-3 text-md">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">PKR 2.5 Million recovered from corrupt practices</span>
                </div>
                <div className="flex items-center gap-3 text-md">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">1,234+ corrupt officials prosecuted successfully</span>
                </div>
                {/* <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">50+ government departments reformed</span>
                </div> */}
              </div>
                  {/* <p className="text-green-700 font-semibold font-nastaliq">اہم کامیابیاں</p> */}
                </div>
              </div>
            
            </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-green-700/10 rounded-3xl p-12 border border-green-200/50 shadow-md  backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-300/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-300/20 to-transparent rounded-full blur-3xl"></div>

          <div className="text-center mb-10 relative z-10">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-xl border-2 border-green-200">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="w-18 h-18 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-xl border-2 border-emerald-200">
                <Building className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border border-green-200">
                <Gavel className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Authorized by Government of Sindh</h3>
            <p className="text-xl text-muted-foreground font-semibold mb-2">
              <span className="font-nastaliq text-lg px-3">
                حکومت سندھ کی جانب سے مجاز
              </span>
              |
              <span className="px-3">
                Full Legal Authority
              </span>
            </p>
            <p className="text-green-700 font-bold text-lg">Chief Minister Sindh's Direct Initiative</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center relative z-10">
            <div className="bg-white/80 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-green-100/50">
              <Lock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="font-semibold text-sm">Data Security</span>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-green-100/50">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="font-semibold text-sm">Legal Protection</span>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-green-100/50">
              <Gavel className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="font-semibold text-sm">Full Prosecution Power</span>
            </div>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default AboutUsSection;
