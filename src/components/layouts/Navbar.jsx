import { Button } from "@/components/ui/button";
import { LogoImage } from "@/components/ui/image-variants";
import { LANDING_PAGE_URL } from "@/config/configManager";
import { USER_ROLES } from "@/constants";
import { verifyJwtToken } from "@/utils/helper";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navbar = () => {
  const landingPageURL = LANDING_PAGE_URL;
  const navigate = useNavigate();
  const { success: isValidToken, user = "" } = verifyJwtToken(
    localStorage.getItem("accessToken")
  );

  const location = useLocation();
  const currentPath = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => currentPath?.includes(path) ? "!text-primary font-semibold" : "text-foreground";

  return (
    <header className="border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={landingPageURL || "/"} className="flex items-center gap-2">
            <LogoImage src="logo.png" alt="Logo" className="mr-2" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Starter Template</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Starter Template
              </p>
              {/* <hr className="text-muted-foreground" /> */}
              <p className="text-xs text-primary">Hash devs</p>
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
            <Link to="/theme-demo" className={`hover:text-primary transition-colors ${isActive("/theme-demo")}`}>
              Theme Demo
            </Link>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              {isValidToken ? (
                <>
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
                </>
              ) : (
                <>
                  <Button onClick={() => navigate("/login")}>Login</Button>
                  <Button onClick={() => navigate("/register")}>Register</Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 bg-background border-t pt-4">
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
            <Link to="/theme-demo" className={`hover:text-primary transition-colors ${isActive("/theme-demo")}`} onClick={() => setMenuOpen(false)}>
              Theme Demo
            </Link>
            <div className="flex flex-col gap-2">
              <ThemeSwitcher className="w-full justify-center" />
              {isValidToken ? (
                <>
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
                </>
              ) : (
                <>
                  <Button onClick={() => { setMenuOpen(false); navigate("/login"); }}>
                    Login
                  </Button>
                  <Button onClick={() => { setMenuOpen(false); navigate("/register"); }}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

