import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import Swal from "sweetalert2";

export default function MobileAppReleasePage() {
  const handleDownload = () => {
    Swal.fire({
      title: "Downloading...",
      text: "Your APK is being downloaded.",
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Download Started ✅",
        text: "Thank you for using the E&ACE CMS Mobile App.",
        confirmButtonColor: "#22c55e",
      });
    });
  };

  const appScreenshots = [
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234732/WhatsApp_Image_2025-06-18_at_13.10.07_069c33af_jmlp7i.jpg",
    "https://play-lh.googleusercontent.com/PjJrLynIY7a5V__zCg8zl401iYMPVBmqd8rXR2eRUWsz-LIPe-9sdnrbKqdISeM0lw=w5120-h2880-rw",
    "https://play-lh.googleusercontent.com/fSNctUbDxl4BTLg3wGJjF78KZl4t708M3D0ssqAyAN7a28KD8hwoDMiP-_b1ZneIRto=w5120-h2880-rw",
    "https://play-lh.googleusercontent.com/XULdam3Zpo8xAYBZf8S_NQZGTgeQ8ffOOi8QhUaQiuVfWeCOIZUoR8jr14cqrUAzHtJr=w5120-h2880-rw",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234732/WhatsApp_Image_2025-06-18_at_13.10.07_6214f12a_lyppjy.jpg",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234732/WhatsApp_Image_2025-06-18_at_13.10.07_4002b494_sr5fvx.jpg",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234733/WhatsApp_Image_2025-06-18_at_13.10.07_d35969a8_gi4ihm.jpg",
    // "https://play-lh.googleusercontent.com/XULdam3Zpo8xAYBZf8S_NQZGTgeQ8ffOOi8QhUaQiuVfWeCOIZUoR8jr14cqrUAzHtJr=w1052-h592-rw",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234732/WhatsApp_Image_2025-06-18_at_13.10.08_2faa4c1a_o7jicy.jpg",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234734/WhatsApp_Image_2025-06-18_at_13.10.08_6ffc8da2_x9jvk7.jpg",
    // "https://res.cloudinary.com/dx2tjofpa/image/upload/v1750234733/WhatsApp_Image_2025-06-18_at_13.10.06_0822e742_bbd9uc.jpg"

  ]

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center relative z-10">
          {/* Govt Badge */}
          <h2 className="mb-4 text-lg sm:text-2xl text-green-800 font-semibold">
            Enquiries & Anti-Corruption Establishment Sindh
          </h2>

          <h2 className="mb-4 text-lg sm:text-2xl text-green-800 font-semibold">
            Complaints Management System Mobile App
          </h2>

          {/* Logo */}
          <div className="mb-6">
            <img
              src="ace.png"
              alt="App Logo"
              className="mx-auto h-28 w-28 "
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            E&ACE Mobile App📱
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Our Complaint Management  System is now accessible via Android and iOS
          </p>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Android Card */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-green-50">
              <img
                src="https://simpleicons.org/icons/android.svg"
                alt="Android Logo"
                className="h-12 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Download for Android
              </h2>
              <p className="text-gray-600 mb-4">
                Get early access and file complaints easily on the go.
              </p>
              <a
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.gos.ace"
                className="inline-block bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
              >
                📥 Download APK
              </a>
            </div>

            {/* iOS Card */}
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-amber-50">
              <img
                src="https://simpleicons.org/icons/apple.svg"
                alt="Apple Logo"
                className="h-12 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Coming Soon on iOS
              </h2>
              <p className="text-gray-600 mb-4">
                We’re working hard to make the iOS App available. Stay connected!
              </p>
              <span className="inline-block bg-gray-300 text-gray-700 px-5 py-2 rounded-full text-sm font-medium cursor-not-allowed">
                🚧 Coming Soon
              </span>
            </div>
          </div>


          {/* App Screenshots */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              App Screenshots 📸
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {appScreenshots.map((src, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-auto hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-green-600">🛡️</span>
              <span>Govt Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">🔐</span>
              <span>Secure System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">⚖️</span>
              <span>Legal Protection</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
