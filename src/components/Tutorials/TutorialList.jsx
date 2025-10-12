import { ThumbnailImage } from "@/components/ui/image-variants";

const Thumbnail = ({ title }) => {
  return (
    <div className="relative bg-foreground w-full justify-center h-full flex flex-col items-center">
      <div className="pt-2 !mx-auto relative">
        <ThumbnailImage src="/ace.png" alt="thumbnail" className="relative" />
      </div>
      <h1 className="font-bold text-center text-white mt-2">Enquiries & Anti-Corruption Establishment Sindh</h1>
      <h3 className="font-medium text-sm mt-4 text-white text-center">{title}</h3>
    </div>
  );
};


export const tutorials = [
  {
    id: "tut-15",
    title: "ACE Director General - Admin Portal Overview Only",
    link: "https://drive.google.com/file/d/1YvdkmtZW_OwfJX925R6gZ-LYopnIIAsD/preview",
    thumbnail: <Thumbnail title={"ACE Director - Admin Portal Overview Only"} />,
    duration: "08:32",
    description:
      "A focused walkthrough for the ACE Director role highlighting how to navigate and use the Admin Portal effectively.",
    category: "overview",
    tags: ["ACE Director", "admin portal", "overview", "dashboard"],
    roles: ["admin", "ace_director", "login"],
    content: (
      <div>
        <p>This tutorial provides an overview of the admin portal specifically for ACE Directors. It includes:</p>
        <ul>
          <li>Dashboard layout and key widgets</li>
          <li>Checking incoming complaints and their statuses</li>
          <li>Navigating through key modules like Job, Candidates, and Approvals</li>
          <li>How to monitor the progress of complaints and system usage</li>
        </ul>
      </div>
    ),
  },
  {
    id: "tut-16",
    title: "Complaint Forwarding as a Deputy Director",
    link: "https://drive.google.com/file/d/1bMwVZw8Iu321taj1QCjPEVQEjjadFpKm/preview",
    thumbnail: <Thumbnail title={"Complaint Forwarding as a Deputy Director"} />,
    duration: "00:58",
    description: "Step-by-step guide for Deputy Directors on forwarding complaints within the ACE system.",
    category: "complaint-forwarding",
    tags: ["complaint", "forward", "deputy director"],
    roles: ["admin", "deputy_director"],
    content: (
      <div>
        <p>This tutorial explains how Deputy Directors can forward complaints effectively:</p>
        <ul>
          <li>Accessing the complaints module</li>
          <li>Selecting a complaint for review</li>
          <li>Using the forward functionality with comments</li>
          <li>Tracking complaint movement</li>
        </ul>
      </div>
    ),
  },
  {
    id: "tut-17",
    title: "How to Forward a Complaint as a Director General",
    link: "https://drive.google.com/file/d/1-krXB3mb44aj_KiVmFDdC4nIaNK9mnge/preview",
    thumbnail: <Thumbnail title={"How to Forward a Complaint as a Director"} />,
    duration: "00:55",
    description: "Tutorial for Directors on how to forward complaints within the ACE complaint workflow.",
    category: "complaint-forwarding",
    tags: ["complaint", "forward", "director"],
    roles: ["admin", "director"],
    content: (
      <div>
        <p>This video guides Directors through the complaint forwarding process, including:</p>
        <ul>
          <li>Locating a complaint assigned to their designation</li>
          <li>Initiating and confirming forwarding actions</li>
          <li>Assigning the complaint to another designation or user</li>
        </ul>
      </div>
    ),
  },
  {
    id: "tut-18",
    title: "How to Forward a Complaint as a Circle Officer",
    link: "https://drive.google.com/file/d/1W6w9a2crW_VUo70cleIYm76O7RFxgBWw/preview",
    thumbnail: <Thumbnail title={"How to Forward a Complaint as a Circle Officer"} />,
    duration: "0:56",
    description: "How Circle Officers can forward complaints using the complaint workflow system.",
    category: "complaint-forwarding",
    tags: ["complaint", "forward", "circle-officer"],
    roles: ["admin", "circle-officer"],
    content: (
      <div>
        <p>This video explains how Circle Officers can forward complaints within the system, including:</p>
        <ul>
          <li>Checking complaints assigned to them</li>
          <li>Initiating the forwarding process</li>
          <li>Selecting the appropriate designation or user to forward to</li>
        </ul>
      </div>
    ),
  },

  {
    id: "tut-19",
    title: "How to Resolve the Complaint as an ACC Committee",
    link: "https://drive.google.com/file/d/118dq9tnD0Ki6CvSRLp4WHrtr20oawOgA/preview",
    thumbnail: <Thumbnail title={"How to Resolve the Complaint as an ACE Committee"} />,
    duration: "01:01",
    description: "How ACC Committee members can resolve complaints step-by-step using the complaint workflow system.",
    category: "complaint-forwarding",
    tags: ["complaint", "resolve", "forward", "director", "acc"],
    roles: ["admin", "director"],
    content: (
      <div>
        <p>This video guides Directors through the complaint forwarding process, including:</p>
        <ul>
          <li>Locating a complaint assigned to their designation</li>
          <li>Initiating and confirming forwarding actions</li>
          <li>Assigning the complaint to another designation or user</li>
        </ul>
      </div>
    ),
  },
];
