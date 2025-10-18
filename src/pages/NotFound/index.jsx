import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; // Optional icon, requires lucide-react installed

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-card p-10 rounded-xl shadow-md text-center max-w-md">
        <div className="flex justify-center mb-4">
          <Frown size={48} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Oops! Page not found.</p>
        <p className="text-sm text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-foreground hover:bg-foreground/90 text-background px-6 py-2 rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
