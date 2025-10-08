import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react"; // optional spinner icon

const manuals = [
  {
    title: "Director General Dashboard Usage & Workflow Responsibilities",
    description:
      "A complete walkthrough of the Director's dashboard, features, and responsibilities in handling and tracking complaints.",
    driveId: "1Pi8fIzVpPFjKYLJFgQOHKVtS4-ioMa46",
  },
  {
    title: "Deputy Director Dashboard & Case Forwarding Process",
    description:
      "Step-by-step guide for Deputy Directors to manage incoming cases, review complaint workflows, and forward actions efficiently.",
    driveId: "1pUzIFtTX5ZlQokgdcmH3UbIQ3DTZ9mcb",
  },
  {
    title: "ACC Sindh - Admin Portal Guide",
    description:
      "Comprehensive guide to using the ACE Sindh Admin Portal, including managing users, cases, and system configurations.",
    driveId: "1uDkEfkkIe6gVH6R4NKJc5-kMJTicMmDN", // Extracted from the given URL
  },
];

const ManualPage = () => {
  const [selectedManual, setSelectedManual] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleManualClick = (manual) => {
    setSelectedManual(manual);
    setLoading(true); // Show loading until iframe loads
  };

  return (
    <div className="min-h-screen container mx-auto  sm:p-6 p-2 mx-4">
      <div className=" mx-auto">
        <h1 className="sm:text-3xl text-xl font-bold text-primary mb-2">
          Admin Manuals
        </h1>
        <p className="text-gray-500 mt-1 ml-1 font-poppins">
          These guides help administrators manage the system effectively—covering job
          creation, candidate shortlisting, and the final joining process.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {manuals.map((manual, index) => (
            <Dialog key={index} open={selectedManual?.driveId === manual.driveId} onOpenChange={(isOpen) => !isOpen && setSelectedManual(null)}>
              <DialogTrigger asChild className="mb-0">
                <div
                  onClick={() => handleManualClick(manual)}
                  className="cursor-pointer group border-2 border-primary/50 hover:ring-2 ring-primary  ring-offset-2 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.03] p-3 flex flex-col"
                >
                  <h4 className="font-semibold text-base text-primary group-hover:text-primary font-poppins">
                    {manual.title}
                  </h4>
                  <p className="text-gray-500 text-sm font-poppins">
                    {manual.description}
                  </p>
                </div>
              </DialogTrigger>

              <DialogContent className="!max-w-7xl w-full h-[90vh]  p-0">
                <DialogHeader>
                  <DialogTitle className="p-4 text-primary border-b sm:text-xl text-sm sm:text-center text-left">
                    {manual.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-[80vh]">
                  {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="ml-2 text-sm text-gray-700">Loading document...</span>
                    </div>
                  )}
                  <iframe
                    src={`https://drive.google.com/file/d/${manual.driveId}/preview`}
                    title={manual.title}
                    width="100%"
                    height="100%"
                    className="w-full h-full border-none"
                    allowFullScreen
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualPage 
