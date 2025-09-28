"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FileText } from "lucide-react";

const GlobalFileViewer = ({ file, onClose }) => {
  const isOpen = Boolean(file);
  const [isLoading, setIsLoading] = useState(true);

  const url = file?.url || file?.key;
  const isImage = url && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);
  const isPDF = url && /\.pdf$/i.test(url);

  // Disable body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[80vw] max-md:!max-w-[90vw] w-full max-h-[90vh] h-full p-0 overflow-auto"> 
        <DialogHeader className="flex !mb-auto  flex-row items-center justify-between p-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            {file?.name || "File Preview"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative w-full h-full flex-1  flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          {isLoading && (
            <div className="absolute inset-0 flex flex-1 items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
          )}

          {isImage && (
            <img
              src={url}
              alt={file?.name || "preview"}
              className={`max-w-full  object-contain rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleLoad}
              onError={handleLoad}
            />
          )}

          {isPDF && (
            <iframe
              src={`${url}#view=fitH`}
              title={file?.name || "pdf-viewer"}
              className={`w-full h-[calc(90vh-100px)] border-none rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleLoad}
            />
          )}

          {!isImage && !isPDF && (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <FileText className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-lg font-medium">No preview available</p>
              <p className="text-sm text-muted-foreground mt-2">
                This file type cannot be previewed
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalFileViewer;