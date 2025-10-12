import React from "react";
import {
  FileText,
  CheckCircle,
  UserCheck,
  Ban,
  Shield,
  AlertTriangle,
  RefreshCw,
  Mail,
} from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { LogoImage } from "@/components/ui/image-variants";

const TermsAndCondition = () => {
  return (
    <div className="bg-green-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center mb-6 w-10/12 lg:w-8/12 mx-auto mt-12">
        <LogoImage
          src="https://res.cloudinary.com/dsdtmsuyq/image/upload/v1735481499/spbscc70frfadbd7oxcx.png"
          alt="logo"
          className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-green-900 flex items-center justify-center gap-2">
          <FileText className="w-9 h-9 text-green-700" />
          Enquiries & Anti-Corruption Establishment Sindh
        </h1>
        <p className="text-start text-lg text-gray-700 mt-4 leading-relaxed">
          These Terms & Conditions govern your use of our complaints management
          system. By using our services, you agree to abide by these terms and
          ensure compliance with all applicable laws and regulations.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-8 mb-10">
          <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <CheckCircle className="w-7 h-7 text-green-600" /> Terms & Conditions
          </h1>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" /> 1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using our complaints management system, you
              acknowledge that you have read, understood, and agreed to these
              Terms & Conditions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-green-600" /> 2. User Responsibilities
            </h2>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information when submitting complaints.</li>
              <li>Fraudulent or misleading complaints will result in appropriate action.</li>
              <li>Maintain the confidentiality of your login credentials.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <Ban className="w-6 h-6 text-green-600" /> 3. Prohibited Activities
            </h2>
            <ul className="text-gray-700 list-disc pl-6 space-y-2">
              <li>Do not submit false or malicious complaints.</li>
              <li>Harassment, abuse, or threatening behavior is strictly prohibited.</li>
              <li>Unauthorized access or tampering with system data is a legal offense.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" /> 4. Data Privacy
            </h2>
            <p className="text-gray-700">
              All personal data provided is subject to our Privacy Policy. We
              ensure the confidentiality and security of user data.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-green-600" /> 5. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              We strive to maintain accuracy and security in our system. However,
              we do not guarantee uninterrupted service and are not liable for any
              indirect damages resulting from the use of our platform.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-green-600" /> 6. Modifications to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms & Conditions at any time.
              Continued use of our system after modifications constitutes
              acceptance of the new terms.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              <Mail className="w-6 h-6 text-green-600" /> 7. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions regarding these Terms & Conditions, please
              contact us at{" "}
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

export default TermsAndCondition;
