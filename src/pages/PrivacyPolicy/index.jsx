import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import {
  Bell,
  Database,
  FileText,
  Info,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { LogoImage } from "@/components/ui/image-variants";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-green-100 min-h-screen flex flex-col">
      <Navbar  />
      <div className="text-center mb-6 w-10/12 lg:w-8/12 mx-auto mt-12">
        <LogoImage
          src="https://res.cloudinary.com/dsdtmsuyq/image/upload/v1735481499/spbscc70frfadbd7oxcx.png"
          alt="logo"
          className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-green-900 flex items-center justify-center gap-2">
          <ShieldCheck className="w-10 h-10 text-green-700" />
          Enquiries & Anti-Corruption Establishment Sindh
        </h1>
        <p className="text-start text-lg text-gray-700 mt-4 leading-relaxed">
          Our Privacy Policy outlines how the Enquiries & Anti-Corruption
          Establishment Sindh handles complaints and inquiries responsibly.
        </p>
        <p className="text-start text-lg text-gray-700 mt-4 leading-relaxed">
          We are committed to maintaining transparency, protecting your
          information, and ensuring a secure and efficient process for
          addressing concerns and upholding integrity.
        </p>
      </div>

    <div className="px-4">
    <div className="max-w-7xl  mx-auto bg-white p-8 rounded-2xl shadow-md mt-8 mb-10 ">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <FileText className="w-7 h-7 text-green-600" /> Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          Welcome to our complaints management system. We are committed to
          protecting your privacy and ensuring that your personal information is
          handled securely and responsibly.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-green-600" /> 1. Information We Collect
          </h2>
          <p className="text-gray-700 text-lg mb-3">
            We collect the following information when you submit a complaint:
          </p>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Full name, CNIC, Phone
              Number, Email, father&apos;s name, contact details and address.
            </li>
            <li>
              <strong>Complaint Details:</strong> Subject, summary, and any
              attached files (documents, images).
            </li>
            <li>
              <strong>Additional Information:</strong> Gender, division,
              district, city, and witness details (if applicable).
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Bell className="w-6 h-6 text-green-600" /> 2. How We Use Your Information
          </h2>
          <p className="text-gray-700 text-lg mb-3">
            The information you provide is used to:
          </p>
          <ul className="text-gray-700 list-disc pl-6 space-y-2">
            <li>
              <strong>Address and resolve complaints:</strong> We use your
              information to handle and resolve your complaint effectively.
            </li>
            <li>
              <strong>Notify you of updates:</strong> You will receive
              notifications about the status of your complaint.
            </li>
            <li>
              <strong>Ensure compliance:</strong> Your information helps us
              ensure that all procedures follow organizational policies.
            </li>
          </ul>
          <p className="text-gray-700 text-lg mt-4 mb-2">
            Notification methods include:
          </p>
          <ul className="text-green-700 font-semibold list-disc pl-6 space-y-1">
            <li>In-app notifications</li>
            <li>SMS notifications</li>
            <li>WhatsApp notifications</li>
            <li>Email notifications</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-600" /> 3. Security Measures
          </h2>
          <p className="text-gray-700 mb-2">We take the following measures:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Disabling access to developer tools like inspect element</li>
            <li>Secure authentication for authorized personnel</li>
            <li>Encrypting sensitive data and attachments</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Database className="w-6 h-6 text-green-600" /> 5. Data Retention
          </h2>
          <p className="text-gray-700">
            Your data will be retained only as long as necessary to fulfill the
            purpose of resolving your complaint and complying with legal
            requirements.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-green-600" /> 6. Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be communicated on this page.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Mail className="w-6 h-6 text-green-600" /> 7. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns, please contact us at{" "}
            <a
              href="mailto:support@acesindh.gos.pk"
              className="text-green-700 font-semibold underline"
            >
              support@acesindh.gos.pk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
