import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; // Optional icon, requires lucide-react installed

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Frown size={48} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">Oops! Page not found.</p>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
