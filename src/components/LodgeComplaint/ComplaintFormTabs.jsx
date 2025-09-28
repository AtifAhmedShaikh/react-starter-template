"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const ComplaintFormTabs = ({ steps, activeTab }) => {
  return (
    <TabsList className=" md:max-w-[calc(100vw-24rem)] max-w-[calc(100vw-4rem)] bg-transparent no-scrollbar  justify-start ">
      {steps.map(({ key, label, icon }) => (
        <TabsTrigger
          key={key}
          value={key}
          disabled={activeTab !== key}
          className={`flex items-center gap-1 text-sm font-medium transition-colors shadow-none outline-none p-2 ${
            activeTab === key
              ? "border-none border-b-2 border-primary text-primary"
              : "text-gray-500 hover:bg-primary"
          }`}
        >
          {icon && <span className="w-4 h-4">{icon}</span>}
          <span className="inline">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ComplaintFormTabs;
