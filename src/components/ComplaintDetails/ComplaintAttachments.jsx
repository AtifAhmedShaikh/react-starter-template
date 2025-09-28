"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";
import GlobalFileViewer from "../reuseable/GlobalFileViewer";

const ComplaintAttachments = ({ attachments = [] }) => {
  const [previewFile, setPreviewFile] = useState(null);

  if (!attachments || attachments.length === 0) {
    return null;
  }

  const handlePreview = (file) => {
    setPreviewFile(file);
  };


  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6 text-primary" /> Attachments
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {attachments.map((file, index) => {
          const fileUrl = file.url || file.key;
          const fileIsImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(fileUrl);
          const fileIsPDF = /\.pdf$/i.test(fileUrl);
          const fileName = file?.fileName || fileUrl.split('/').pop();

          return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              <div 
                className="relative aspect-[4/3] bg-gray-100 cursor-pointer group"
                onClick={() => handlePreview(file)}
              >
                {fileIsImage ? (
                  <img
                    src={fileUrl}
                    alt={fileName}
                    className="object-cover w-full h-full"
                  />
                ) : fileIsPDF ? (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <FileText className="w-12 h-12 text-red-500 mb-2" />
                    <span className="text-sm font-medium text-center line-clamp-2">
                      {fileName}
                    </span>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-4">
                    <FileText className="w-12 h-12 text-gray-500 mb-2" />
                    <span className="text-sm font-medium text-center line-clamp-2">
                      {fileName}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 text-xs px-2 py-1 rounded-md shadow-sm">
                    Click to preview
                  </span>
                </div>
              </div>
              
              <div className="p-3 border-t">
                <div className="flex justify-between items-center">
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{fileName}</p>
                  </div>
                  <a 
                    href={fileUrl} 
                    download={fileName}
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Dialog */}
      <GlobalFileViewer file={previewFile} onClose={() => setPreviewFile(null)} />
    </section>
  );
};

export default ComplaintAttachments;