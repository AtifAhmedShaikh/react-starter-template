// import { Button } from "@/components/ui/button";
// import { verifyJwtToken } from "@/utils/helper";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { success: isValidToken } = verifyJwtToken(
//     localStorage.getItem("accessToken")
//   );

//   return (
//     <header className="border-b bg-white shadow-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <img src="/ace.png" alt="Logo" className="w-16 h-16 mr-2" />
//             <div>
//               <h1 className="text-2xl font-bold text-primary">ACE Sindh</h1>
//               <p className="text-sm text-muted-foreground">Enquiries & Anti-Corruption Establishment</p>
//             </div>
//           </Link>
//           <nav className="hidden md:flex items-center gap-6">
//             <Link to="/about" className="text-foreground hover:text-primary transition-colors">
//               About
//             </Link>
//             <Link to="/services" className="text-foreground hover:text-primary transition-colors">
//               Services
//             </Link>
//             <Link to="/statistics" className="text-foreground hover:text-primary transition-colors">
//               Statistics
//             </Link>
//             <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
//               Contact
//             </Link>
//             {isValidToken ? (
//               <div className="flex gap-2 items-center">
//                 <Button className="mx-auto" onClick={() => navigate("/edit-profile")}>
//                   Profile
//                 </Button>
//                 <Button onClick={() => navigate("/logout")}>Logout</Button>
//               </div>
//             ) : (
//               <div className="flex gap-2 items-center">
//                 <Button onClick={() => navigate("/login")}>Login</Button>
//                 <Button onClick={() => navigate("/register")}>Register</Button>
//               </div>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { verifyJwtToken } from "@/utils/helper";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { USER_ROLES } from "@/constants";

const Navbar = () => {
  const landingPageURL = import.meta.env.VITE_LANDING_PAGE_URL;
  const navigate = useNavigate();
  const { success: isValidToken, user = "" } = verifyJwtToken(
    localStorage.getItem("accessToken")
  );

  const location = useLocation();
  const currentPath = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => currentPath?.includes(path) ? "!text-primary font-semibold" : "text-foreground";

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={landingPageURL || "/"} className="flex items-center gap-2">
            <img src="/ace.png" alt="Logo" className="w-16 h-16 mr-2" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">ACE Sindh</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enquiries & Anti-Corruption Establishment
              </p>
              {/* <hr className="text-muted-foreground" /> */}
              <p className="text-xs text-primary">Government Of Sindh</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to={landingPageURL || "/"} className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/" className={`transition-colors hover:text-primary ${currentPath === "/" ? "text-primary font-semibold" : "text-foreground"
              }`}>
              About
            </Link>
            <Link to="/services" className={`hover:text-primary transition-colors ${isActive("/services")}`}>
              Services
            </Link>
            <Link to="/statistics" className={`hover:text-primary transition-colors ${isActive("/statistics")}`}>
              Statistics
            </Link>
            <Link to="/contact" className={`hover:text-primary transition-colors ${isActive("/contact")}`}>
              Contact
            </Link>
            {isValidToken ? (
              <div className="flex gap-2">
                <Button onClick={() => {
                  if (user?.roleKey === USER_ROLES.COMPLAINANT) {
                    navigate("/track-complaints");
                    return;
                  }
                  navigate("/dashboard");
                }}>
                  {user?.roleKey === USER_ROLES.COMPLAINANT ? "Track Complaints" : "Dashboard"}
                </Button>
                <Button onClick={() => navigate("/logout")}>Logout</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 bg-white border-t pt-4">
            <Link to={landingPageURL||"/"} className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/" className="hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/services" className={`hover:text-primary transition-colors ${isActive("/services")}`} onClick={() => setMenuOpen(false)}>
              Services
            </Link>
            <Link to="/statistics" className={`hover:text-primary transition-colors ${isActive("/statistics")}`} onClick={() => setMenuOpen(false)}>
              Statistics
            </Link>
            <Link to="/contact" className={`hover:text-primary transition-colors ${isActive("/contact")}`} onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            {isValidToken ? (
              <div className="flex flex-col gap-2">
                <Button onClick={() => {
                  setMenuOpen(false);
                  if (user?.roleKey === USER_ROLES.COMPLAINANT) {
                    navigate("/track-complaints");
                    return;
                  }
                  navigate("/dashboard");
                }}>
                  {user?.roleKey === USER_ROLES.COMPLAINANT ? "Track Complaints" : "Dashboard"}
                </Button>
                <Button onClick={() => { setMenuOpen(false); navigate("/logout"); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button onClick={() => { setMenuOpen(false); navigate("/login"); }}>
                  Login
                </Button>
                <Button onClick={() => { setMenuOpen(false); navigate("/register"); }}>
                  Register
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

