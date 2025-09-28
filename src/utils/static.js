export const sampleComplaintHistory = [
  {
    id: "1",
    complaintId: "comp-001",
    previousStatus: {
      id: "status-1",
      userLabel: "New",
      adminLabel: "New Complaint",
      originalStatus: "new",
      colorStyles: "bg-blue-100 text-blue-800 border-blue-200",
    },
    currentStatus: {
      id: "status-2",
      userLabel: "Under Review",
      adminLabel: "Forwarded for Review",
      originalStatus: "forwarded",
      colorStyles: "bg-amber-100 text-amber-800 border-amber-200",
    },
    forwardedBy: {
      id: "charge-1",
      chargeName: "Reception Officer",
      officeLocation: "Main Office",
      assignedPerson: {
        id: "user-1",
        fullName: "Ahmed Ali",
        role: {
          key: "reception_officer",
          value: "Reception Officer",
          level: 1,
        },
      },
    },
    forwardedTo: [
      {
        id: "charge-2",
        chargeName: "Investigation Officer",
        officeLocation: "Investigation Wing",
        assignedPerson: {
          id: "user-2",
          fullName: "Sara Khan",
          role: {
            key: "investigation_officer",
            value: "Investigation Officer",
            level: 2,
          },
        },
      },
      {
        id: "charge-3",
        chargeName: "Legal Advisor",
        officeLocation: "Legal Department",
        assignedPerson: {
          id: "user-3",
          fullName: "Muhammad Hassan",
          role: {
            key: "legal_advisor",
            value: "Legal Advisor",
            level: 2,
          },
        },
      },
      {
        id: "charge-4",
        chargeName: "Senior Officer",
        officeLocation: "Administrative Wing",
        assignedPerson: {
          id: "user-4",
          fullName: "Fatima Sheikh",
          role: {
            key: "senior_officer",
            value: "Senior Officer",
            level: 3,
          },
        },
      },
    ],
    remarks:
      "Initial complaint received and forwarded to investigation team, legal advisor, and senior officer for comprehensive review.",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    complaintId: "comp-001",
    previousStatus: {
      id: "status-2",
      userLabel: "Under Review",
      adminLabel: "Forwarded for Review",
      originalStatus: "forwarded",
    },
    forwardedBy: {
      id: "charge-2",
      chargeName: "Investigation Officer",
      officeLocation: "Investigation Wing",
      assignedPerson: {
        id: "user-2",
        fullName: "Sara Khan",
        role: {
          key: "investigation_officer",
          value: "Investigation Officer",
          level: 2,
        },
      },
    },
    forwardedTo: [],
    remarks: null,
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    complaintId: "comp-001",
    previousStatus: {
      id: "status-3",
      userLabel: "In Progress",
      adminLabel: "Investigation Started",
      originalStatus: "pending",
    },
    forwardedBy: {
      id: "charge-6",
      chargeName: "Technical Analyst",
      officeLocation: "Analysis Lab",
      assignedPerson: {
        id: "user-6",
        fullName: "Zara Noor",
        role: {
          key: "technical_analyst",
          value: "Technical Analyst",
          level: 3,
        },
      },
    },
    forwardedTo: [],
    remarks: null,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "4",
    complaintId: "comp-001",
    previousStatus: {
      id: "status-4",
      userLabel: "Under Detailed Review",
      adminLabel: "Forwarded for Detailed Review",
      originalStatus: "forwarded",
    },
    forwardedBy: {
      id: "charge-11",
      chargeName: "Senior Legal Advisor",
      officeLocation: "Legal Department",
      assignedPerson: {
        id: "user-11",
        fullName: "Sadia Malik",
        role: {
          key: "senior_legal_advisor",
          value: "Senior Legal Advisor",
          level: 3,
        },
      },
    },
    forwardedTo: [],
    remarks: null,
    createdAt: "2024-01-18T16:45:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
];
