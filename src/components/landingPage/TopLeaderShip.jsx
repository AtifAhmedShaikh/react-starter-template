import { Badge } from "@/components/ui/badge"
import {
  Award,
  CheckCircle,
  Gavel,
  Lock,
  Scale,
  Search,
  Shield,
  Users,
  Star,
  Sparkles,
  Crown
} from "lucide-react"
import { useState, useEffect } from "react"


const TopLeaderShip = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-emerald-50/90 to-green-50/80 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-200/40 via-green-100/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-200/40 via-emerald-100/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-300/20 to-green-200/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-to-br from-green-300/20 to-emerald-200/15 rounded-full blur-2xl animate-bounce delay-1000"
          style={{ animationDuration: "10s" }}
        ></div>
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-green-400/80 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-emerald-500/70 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-500 to-green-600 rounded-full animate-pulse"></div>
            <Badge className="bg-gradient-to-r from-emerald-100 via-green-50 to-emerald-100 text-emerald-800 border-emerald-200 px-10 py-5 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <Crown className="w-5 h-5 mr-2 text-emerald-600" />
              Top Management
            </Badge>
            <div className="h-1 w-24 bg-gradient-to-r from-green-600 via-emerald-500 to-transparent rounded-full animate-pulse"></div>
          </div>
          <h2 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-800 bg-clip-text text-transparent mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Leadership Team
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className={`text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed font-medium transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Meet the dedicated leaders driving the fight against corruption in Sindh Province
            </p>
          </div>
        </div>

        {/* CM/Minister Level */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-emerald-600" />
              <h3 className="text-3xl font-bold text-slate-800">Provincial Leadership</h3>
              <Star className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto"></div>
          </div>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto max-w-6xl">
              <div className="group bg-gradient-to-br from-white/90 via-emerald-50/80 to-green-50/90 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:transform hover:scale-105 border border-emerald-100/60 backdrop-blur-md relative overflow-hidden hover:border-emerald-300/60">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-200/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>

                <div className="text-center relative z-10">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-emerald-200 group-hover:shadow-3xl group-hover:border-emerald-300 transition-all duration-500 group-hover:scale-110">
                      <img
                        src="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/murad%20ali%20shah_2025-01-28T05-31-24.jpg"
                        alt="Chief Minister"
                        className="w-36 h-36 rounded-full object-cover"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/profile.jpg";
                        }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-2xl p-8 border border-emerald-200/50 backdrop-blur-sm">
                    <h4 className="text-2xl font-bold text-slate-800 mb-3">Syed Murad Ali Shah</h4>
                    <p className="text-lg font-semibold text-emerald-700 mb-2">Chief Minister Sindh</p>
                  </div>
                  <div className="mt-6 p-6 bg-white/60 rounded-2xl border border-emerald-100/50 backdrop-blur-sm">
                    <p className="text-slate-700 leading-relaxed text-sm">
                      Accountability builds trust and responsibility. The Anti-Corruption Establishment is committed to transparency and good governance. New reforms and legal updates show continued dedication to fighting corruption—a threat to development and public welfare. I fully support this mission.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-white/90 via-green-50/80 to-emerald-50/90 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:transform hover:scale-105 border border-green-100/60 backdrop-blur-md relative overflow-hidden hover:border-green-300/60">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400/60 rounded-full animate-ping delay-300"></div>

                <div className="text-center relative z-10">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-green-200 group-hover:shadow-3xl group-hover:border-green-300 transition-all duration-500 group-hover:scale-110">
                      <img
                        src="https://res.cloudinary.com/dsdtmsuyq/image/upload/v1733719587/bpoodv2dsw9vqnkpoyce.jpg"
                        alt="Minister"
                        className="w-36 h-36 rounded-full object-cover"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/profile.jpg";
                        }}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl p-8 border border-green-200/50 backdrop-blur-sm">
                    <h4 className="text-2xl font-bold text-slate-800 mb-3">Muhammad Bux Khan Mahar</h4>
                    <p className="text-lg font-semibold text-green-700 mb-2">Minister, E&ACE Sindh</p>
                  </div>
                  <div className="mt-6 p-6 bg-white/60 rounded-2xl border border-green-100/50 backdrop-blur-sm">
                    <p className="text-slate-700 leading-relaxed text-sm">
                      The Anti-Corruption Establishment's annual report boosts public awareness. Using technology and reforms, E&ACE is becoming stronger and more transparent. With committed leadership, we will fight corruption and build a fairer society.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Director General Level */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h3 className="text-3xl font-bold text-slate-800">Executive Leadership</h3>
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mx-auto max-w-7xl">

            <div className="group bg-gradient-to-br from-white/90 via-emerald-50/70 to-green-50/80 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:transform hover:scale-105 border border-emerald-100/60 backdrop-blur-md relative overflow-hidden hover:border-emerald-300/60">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-emerald-400/70 rounded-full animate-ping"></div>

              <div className="text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-36 h-36 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-emerald-200 group-hover:shadow-2xl group-hover:border-emerald-300 transition-all duration-500 group-hover:scale-110">
                    <img
                      src="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/secretary%20sindh_2025-01-28T05-32-12.jpg"
                      alt="Chief Secretary Sindh"
                      className="w-32 h-32 rounded-full object-cover"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/profile.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-2xl p-6 border border-emerald-100/50 backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Syed Asif Hyder Shah</h4>
                  <p className="text-lg font-semibold text-emerald-700 mb-2">Chief Secretary Sindh</p>
                </div>
                <div className="mt-5 p-5 bg-white/60 rounded-2xl border border-emerald-100/50 backdrop-blur-sm">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Corruption elimination in Sindh is gaining momentum, with E&ACE playing a key role in protecting public rights. The recent restructuring, including abolishing 298 posts, aims to restore trust in government. Collaboration is vital, and with new initiatives, I'm hopeful for a fairer, corruption-free society.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/90 via-green-50/70 to-emerald-50/80 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:transform hover:scale-105 border border-green-100/60 backdrop-blur-md relative overflow-hidden hover:border-green-300/60">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-green-400/70 rounded-full animate-ping delay-200"></div>

              <div className="text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-36 h-36 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-emerald-200 group-hover:shadow-2xl group-hover:border-emerald-300 transition-all duration-500 group-hover:scale-110">
                    <img
                      src="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/chhhh_2025-08-28T07-35-13.jpg"
                      alt="Chairman"
                      className="w-32 h-32 rounded-full object-cover"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/profile.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <Gavel className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-600/10 to-green-600/10 rounded-2xl p-6 border border-emerald-100/50 backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Zulfiqar Ali Shah</h4>
                  <p className="text-lg font-semibold text-emerald-700 mb-2">Chairman</p>
                </div>
                <div className="mt-5 p-5 bg-white/60 rounded-2xl border border-emerald-100/50 backdrop-blur-sm">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Corruption affects us all, and we must fight it together. Our institution is committed to accountability and justice. I call on everyone to uphold integrity and join this fight. To the corrupt: we will not tolerate you. Let's build a corruption-free Sindh—together, we can make a difference.
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white/90 via-green-50/70 to-emerald-50/80 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:transform hover:scale-105 border border-green-100/60 backdrop-blur-md relative overflow-hidden hover:border-green-300/60">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/25 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-green-400/70 rounded-full animate-ping delay-500"></div>

              <div className="text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-36 h-36 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-green-200 group-hover:shadow-2xl group-hover:border-green-300 transition-all duration-500 group-hover:scale-110">
                    <img
                      src="https://bucket-name-basic.s3.us-east-2.amazonaws.com/ace/complaints/director_2025-01-28T05-22-09.jpg"
                      alt="Director General"
                      className="w-32 h-32 rounded-full object-cover"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/profile.jpg";
                      }}
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl p-6 border border-green-100/50 backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Imtiaz Ali Abro</h4>
                  <p className="text-lg font-semibold text-green-700 mb-2">Director General</p>
                </div>
                <div className="mt-5 p-5 bg-white/60 rounded-2xl border border-green-100/50 backdrop-blur-sm">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    The Enquiries and Anti-Corruption Establishment (E&ACE) in Sindh faces challenges like limited resources and weak frameworks. Ongoing reforms, including legal amendments and restructuring, aim to strengthen its role. These efforts are vital for improving corruption control in Sindh.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Leadership Message */}
        <div className="bg-gradient-to-br from-emerald-600/15 via-green-600/10 to-emerald-700/15 rounded-3xl p-16 border border-emerald-200/60 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-300/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-300/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-emerald-200/10 to-green-200/10 rounded-full blur-2xl"></div>

          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-200 hover:scale-110 transition-all duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-green-200 hover:scale-110 transition-all duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl border-2 border-emerald-200 hover:scale-110 transition-all duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">Leadership Message</h3>
            <p className="text-xl md:text-2xl text-slate-600 font-medium mb-12 max-w-5xl mx-auto leading-relaxed">
              Our leadership team is committed to serving the people of Sindh with complete integrity and transparency. Together, we will eliminate corruption and build a government that truly serves its citizens.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-emerald-100/60 backdrop-blur-sm group">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800 text-lg">Transparency First</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">Every decision made with complete openness</p>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-emerald-100/60 backdrop-blur-sm group">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Gavel className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800 text-lg">Swift Justice</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">Quick action against all corrupt practices</p>
              </div>
              <div className="bg-white/90 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-emerald-100/60 backdrop-blur-sm group">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800 text-lg">Citizen Welfare</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">People's interests above everything else</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default TopLeaderShip;
