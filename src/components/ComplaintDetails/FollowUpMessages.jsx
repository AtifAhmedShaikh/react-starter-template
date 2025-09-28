"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareQuote, FileText, Clock, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import GlobalFileViewer from "@/components/reuseable/GlobalFileViewer"; // Import your global viewer
import FilePreviewOnly from "../reuseable/FilePreviewOnly";

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FollowUpMessagesUI({ followUpMessages, complainer }) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="mt-5 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquareQuote className="h-6 w-6 text-indigo-600" />
          Follow-Up Messages {followUpMessages?.length > 0 && `(${followUpMessages.length})`}
        </h2>
      </div>

      {/* Complainer Info */}
      {complainer && (
        <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-white border p-4 rounded-lg shadow-sm">
          <Avatar className="h-16 w-16 border border-indigo-200 shadow-sm">
            <img
              src={complainer.profileImage}
              alt={complainer.fullName}
              className="rounded-full w-full h-full object-cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/profile.jpg";
              }}
            />
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {complainer.fullName}
            </h3>
            
          </div>
        </div>
      )}

      {/* Timeline Messages */}
      <div className="relative pt-5">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-indigo-100"></div>

        {followUpMessages.length > 0 ? (
          <div className="space-y-6">
            {followUpMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex items-start gap-4 pl-10"
              >
                {/* Dot */}
                <div className="absolute left-[14px] top-5 w-3 h-3 bg-indigo-500 rounded-full shadow-md"></div>

                {/* Message bubble with arrow */}
                <div className="relative bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-4 flex-1 hover:shadow-md transition">
                  {/* Arrow */}
                  <div className="absolute left-[-8px] top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200"></div>
                  <div className="absolute left-[-6px] top-5 w-0 h-0 border-t-7 border-b-7 border-r-7 border-transparent border-r-gray-50"></div>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 leading-relaxed break-words overflow-hidden flex-1 mr-4">{msg.message}</p>
                    <span className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                      <Clock className="w-3 h-3" /> {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  {/* File Attachments */}
                  {msg.attachments?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {/* {msg.attachments.map((file, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          onClick={() => setSelectedFile(file)}
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs cursor-pointer hover:bg-blue-100"
                        >
                          {file.key || file.name}
                        </Badge>
                      ))} */}
                      <FilePreviewOnly
                      files={msg.attachments}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No follow-up messages yet.</p>
          </div>
        )}
      </div>

      {/* Global File Viewer */}
      <GlobalFileViewer
        file={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </div>
  );
}
