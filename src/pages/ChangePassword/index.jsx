
import React from "react";
import ChangePasswordForm from "@/components/ChangePassword";
import { Helmet } from "react-helmet";

const ChangePasswordPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
   </Helmet>

    <div className="h-[calc(100vh-64px)] w-full">
      <ChangePasswordForm />
    </div>
    </>
  );
};

export default ChangePasswordPage;
