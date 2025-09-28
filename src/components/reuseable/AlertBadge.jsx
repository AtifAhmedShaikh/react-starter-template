import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "../../lib/utils";
import { Terminal } from "lucide-react";

const AlertBadge = ({
  success = false,
  variant = "destructive",
  message = "",
  title,
  className = "",
  showIcon = true,
}) => {
  return (
    <Alert variant={success ? "primary" : variant}>
      {showIcon && <Terminal className={cn("h-4 w-4", className)} />}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className={success ? "text-primary" : "text-destructive"}>
        {message || ""}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBadge;
