import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { USER_ROLES } from "@/constants";
import { verifyJwtToken } from "@/utils/helper";
import {
  Award,
  Eye,
  FileText,
  Lock,
  Shield
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    heading: "Fight Corruption, Build Trust",
    taglineEng: "No More Bribes | No More Injustice | No More Silence",
    taglineUrdu: "رشوت نہیں | ناانصافی نہیں | خاموشی نہیں",
  },
  {
    heading: "With Truth and Transparency",
    taglineEng:
      "Lodge your complaint with full confidence — your information will only be accessible to authorized officers of E&ACE Sindh.",
    taglineUrdu: "ہم سندھ کو بدعنوانی سے پاک بنانے کے لیے پرعزم ہیں",
  },
  {
    heading: " Corruption Ends Now!",
    taglineEng: "Your voice matters. Help us build a corruption-free Sindh.",
    taglineUrdu: "اب بدعنوانی کا خاتمہ ہوگا",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const { user = "" } = verifyJwtToken(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-14 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 !py-1 rounded-full text-sm font-semibold">
            Government of Sindh Initiative
          </Badge>
          <Badge className="bg-accent/10 text-accent-foreground border-accent/20 px-4 !py-1 rounded-full text-sm font-semibold">
            ⚖️ Enquiries & Anti-Corruption Establishment
          </Badge>
        </div>

        {/* Hero Text Slider */}
        <div className="transition-opacity duration-700 ease-in-out mb-8">
          <h1 className="text-2xl md:text-5xl  font-bold text-foreground mb-10 mt-2">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Complaint Management System
            </span>
          </h1>
          <h1 className="text-xl md:text-3xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {heroSlides[activeSlide].heading}
            </span>
          </h1>
          <p className="text-xl font-bold text-primary">
            {heroSlides[activeSlide].taglineEng}
          </p>
          <p className="text-lg font-semibold text-primary/80 font-nastaliq mt-2">
            {heroSlides[activeSlide].taglineUrdu}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 mt-4">
          <Button
            size="lg"
            className="bg-gradient-to-r cursor-pointer from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => {
              console.log({ user })
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
            <FileText className="!w-6 !h-6 mr-3 shrink-0" />

            <span className="font-nastaliq">
              شکایت درج کریں
            </span>


            | File a Complaint
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r cursor-pointer from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => {
              console.log({ user })
              if (!user) {
                navigate("/register");
                return;
              }
              if (user?.roleKey === USER_ROLES.COMPLAINANT) {
                navigate("/lodge-complaint");
                return;
              } else {
                navigate("/dashboard");
                return;
              }

            }
            }
          >
            <Eye className="!w-6 !h-6 mr-3 shrink-0" />
            <span className="font-nastaliq">
              بطور شکایت کنندہ رجسٹر ہوں
            </span>
            |
            Register
          </Button>
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>high Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Legal Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>Govt of Sindh Authorized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { USER_ROLES } from "@/constants";
// import { verifyJwtToken } from "@/utils/helper";
// import {
//   Award,
//   Eye,
//   FileText,
//   Lock,
//   Pause,
//   Play,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Shield } from "lucide-react";

// // Background images (replace with actual image URLs)
// const backgroundImages = [
//   "/images/hero1.jpg", // Replace with real paths or URLs
//   "/images/hero2.jpg",
//   "/images/hero3.jpg",
// ];

// const heroSlides = [
//   {
//     heading: "Fight Corruption, Build Trust",
//     taglineEng: "No More Bribes | No More Injustice | No More Silence",
//     taglineUrdu: "رشوت نہیں | ناانصافی نہیں | خاموشی نہیں",
//   },
//   {
//     heading: "With Truth and Transparency",
//     taglineEng:
//       "Lodge your complaint with full confidence — your information will only be accessible to authorized officers of E&ACE Sindh.",
//     taglineUrdu: "ہم سندھ کو بدعنوانی سے پاک بنانے کے لیے پرعزم ہیں",
//   },
//   {
//     heading: "Corruption Ends Now!",
//     taglineEng: "Your voice matters. Help us build a corruption-free Sindh.",
//     taglineUrdu: "اب بدعنوانی کا خاتمہ ہوگا",
//   },
// ];

// const HeroSection = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const navigate = useNavigate();
//   const { user = "" } = verifyJwtToken(localStorage.getItem("accessToken"));

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isPlaying) return;
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % heroSlides.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev + 1) % heroSlides.length);
//   };

//   const prevSlide = () => {
//     setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   return (
//     <section className="relative h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image Slider */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeSlide}
//           className="absolute inset-0 z-0"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//         >
//           <div
//             className="absolute inset-0 bg-black/40" // Overlay shade
//             style={{
//               backgroundImage: `url(${backgroundImages[activeSlide]})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//             }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Content */}
//       <div className="container mx-auto px-6 relative z-10 text-white text-center">
//         {/* Badges */}
//         <motion.div
//           initial={{ y: -30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="flex flex-wrap justify-center gap-4 mb-8"
//         >
//           <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-semibold shadow-md">
//             Government of Sindh Initiative
//           </Badge>
//           <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-semibold shadow-md">
//             ⚖️ Enquiries & Anti-Corruption Establishment
//           </Badge>
//         </motion.div>

//         {/* Hero Text Slider */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeSlide}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -20, opacity: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             className="mb-10"
//           >
//             <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
//               <span className="bg-gradient-to-r from-green-200 to-green-50 bg-clip-text text-transparent">
//                 Enquiries & Anti-Corruption Establishment, Sindh
//               </span>
//             </h1>
//             <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
//               {heroSlides[activeSlide].heading}
//             </h2>
//             <p className="text-lg md:text-xl text-green-100 font-medium mb-2">
//               {heroSlides[activeSlide].taglineEng}
//             </p>
//             <p className="text-md md:text-lg text-green-50 font-semibold font-nastaliq mt-1">
//               {heroSlides[activeSlide].taglineUrdu}
//             </p>
//           </motion.div>
//         </AnimatePresence>

//         {/* Call to Actions */}
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="flex flex-col sm:flex-row gap-5 justify-center mb-12"
//         >
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
//             onClick={() => {
//               if (!user) {
//                 navigate("/login");
//                 return;
//               }
//               if (user?.roleKey === USER_ROLES.COMPLAINANT) {
//                 navigate("/lodge-complaint");
//               } else {
//                 navigate("/dashboard");
//               }
//             }}
//           >
//             <FileText className="w-6 h-6 mr-3" />
//             <span className="font-nastaliq">شکایت درج کریں</span> | File a Complaint
//           </Button>
//           <Button
//             size="lg"
//             variant="outline"
//             className="border-2 border-green-300 text-green-100 bg-green-600/20 backdrop-blur-sm hover:bg-green-600/40 text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
//             onClick={() => {
//               if (!user) {
//                 navigate("/register");
//                 return;
//               }
//               if (user?.roleKey === USER_ROLES.COMPLAINANT) {
//                 navigate("/lodge-complaint");
//               } else {
//                 navigate("/dashboard");
//               }
//             }}
//           >
//             <Eye className="w-6 h-6 mr-3" />
//             <span className="font-nastaliq">بطور شکایت کنندہ رجسٹر ہوں</span> | Register
//           </Button>
//         </motion.div>

//         {/* Trust Badges */}
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.6 }}
//           className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm"
//         >
//           <div className="flex items-center gap-2">
//             <Lock className="w-4 h-4 text-green-300" />
//             <span>High Security</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Shield className="w-4 h-4 text-green-300" />
//             <span>Legal Protection</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Award className="w-4 h-4 text-green-300" />
//             <span>Govt of Sindh Authorized</span>
//           </div>
//         </motion.div>
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
//         aria-label="Previous Slide"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all duration-300"
//         aria-label="Next Slide"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       {/* Play/Pause Button */}
//       <button
//         onClick={togglePlayPause}
//         className="absolute bottom-8 right-8 z-20 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
//         aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
//       >
//         {isPlaying ? (
//           <Pause className="w-5 h-5" />
//         ) : (
//           <Play className="w-5 h-5" />
//         )}
//       </button>
//     </section>
//   );
// };

// export default HeroSection;