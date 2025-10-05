// Comprehensive mock data generator for Anti-Corruption Establishment Sindh Dashboard
export const generateMockDashboardData = () => {
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate last 12 months data
  const generateMonthlyData = (baseValue, variance = 0.3) => {
    return months.map((month, index) => {
      const monthIndex = (currentMonth - 11 + index + 12) % 12;
      const seasonalFactor =
        1 + Math.sin((monthIndex / 12) * 2 * Math.PI) * 0.2;
      const randomFactor = 1 + (Math.random() - 0.5) * variance;
      return {
        month: month,
        count: Math.round(baseValue * seasonalFactor * randomFactor),
        value: Math.round(baseValue * seasonalFactor * randomFactor * 1.2),
        revenue: Math.round(baseValue * seasonalFactor * randomFactor * 100),
        efficiency: Math.round(60 + Math.random() * 40),
        satisfaction: Math.round(70 + Math.random() * 30),
      };
    });
  };

  // Generate complaint status data for Anti-Corruption Establishment
  const statuses = [
    "Open",
    "Under Investigation",
    "Resolved",
    "Closed",
    "Pending Review",
    "Forwarded",
  ];
  const statusData = statuses.map((status) => ({
    status,
    count: Math.floor(Math.random() * 200) + 20,
    percentage: Math.round(Math.random() * 30) + 10,
  }));

  // Generate offence types data
  const offenceTypes = [
    "Bribery",
    "Embezzlement",
    "Fraud",
    "Nepotism",
    "Misuse of Authority",
    "Corruption in Procurement",
    "Financial Irregularities",
    "Abuse of Power",
  ];
  const offenceData = offenceTypes.map((offence) => ({
    category: offence,
    count: Math.floor(Math.random() * 150) + 10,
    growth: Math.round((Math.random() - 0.5) * 20),
    priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
  }));

  // Generate type of person data
  const personTypes = [
    "Government Official",
    "Public Servant",
    "Contractor",
    "Business Person",
    "Politician",
    "Law Enforcement",
    "Judicial Officer",
    "Other",
  ];
  const personTypeData = personTypes.map((type) => ({
    month: type,
    count: Math.floor(Math.random() * 100) + 15,
    value: Math.floor(Math.random() * 120) + 20,
  }));

  // Generate city-wise user data for Sindh
  const cities = [
    "Karachi",
    "Hyderabad",
    "Sukkur",
    "Larkana",
    "Mirpurkhas",
    "Nawabshah",
    "Jacobabad",
    "Shikarpur",
    "Khairpur",
    "Dadu",
  ];
  const cityData = cities.map((city) => ({
    location: city,
    count: Math.floor(Math.random() * 80) + 10,
    growth: Math.round((Math.random() - 0.5) * 15),
    region: ["Central", "North", "South", "East", "West"][
      Math.floor(Math.random() * 5)
    ],
  }));

  // Generate zone/division data for Sindh
  const zones = [
    "Karachi Central Zone",
    "Karachi South Zone",
    "Karachi East Zone",
    "Karachi West Zone",
    "Hyderabad Zone",
    "Sukkur Zone",
    "Larkana Zone",
    "Mirpurkhas Zone",
    "Shaheed Benazirabad Zone",
    "Central Zone",
  ];
  const zoneData = zones.map((zone) => ({
    department: zone,
    total: Math.floor(Math.random() * 300) + 50,
    pending: Math.floor(Math.random() * 80) + 10,
    completed: Math.floor(Math.random() * 200) + 20,
    rejected: Math.floor(Math.random() * 30) + 5,
    opened: Math.floor(Math.random() * 60) + 15,
    resolved: Math.floor(Math.random() * 150) + 25,
  }));

  // Generate user activity data
  const userActivityData = generateMonthlyData(500, 0.4);

  // Generate performance metrics
  const performanceMetrics = [
    {
      metric: "Average Resolution Time",
      value: Math.round(15 + Math.random() * 30),
      unit: "days",
    },
    {
      metric: "Resolution Rate",
      value: Math.round(70 + Math.random() * 25),
      unit: "%",
    },
    {
      metric: "Public Satisfaction",
      value: Math.round(75 + Math.random() * 20),
      unit: "%",
    },
    {
      metric: "System Uptime",
      value: Math.round(95 + Math.random() * 5),
      unit: "%",
    },
    { metric: "Error Rate", value: Math.round(Math.random() * 3), unit: "%" },
    {
      metric: "Cases Processed",
      value: Math.round(200 + Math.random() * 300),
      unit: "per month",
    },
  ];

  // Generate comprehensive analysis data
  const comprehensiveAnalysis = offenceTypes.map((offence) => ({
    category: offence,
    total: Math.floor(Math.random() * 200) + 50,
    pending: Math.floor(Math.random() * 60) + 10,
    completed: Math.floor(Math.random() * 120) + 20,
    rejected: Math.floor(Math.random() * 20) + 5,
    inProgress: Math.floor(Math.random() * 40) + 10,
  }));

  // Calculate summary statistics
  const totalComplaints = statusData.reduce((sum, item) => sum + item.count, 0);
  const newComplaintsCount = Math.floor(totalComplaints * 0.2);
  const openComplaintsCount =
    statusData.find((s) => s.status === "Open")?.count || 0;
  const handledComplaintsCount =
    statusData.find((s) => s.status === "Resolved")?.count || 0;
  const totalUsers = Math.floor(Math.random() * 2000) + 500;
  const totalAdmins = Math.floor(Math.random() * 50) + 20;

  return {
    // Summary cards data - matching the expected format
    totalComplaints,
    newComplaintsCount,
    openComplaintsCount,
    handledComplaintsCount,
    totalUsers,
    totalAdmins,

    // Chart data - matching the expected format for the dashboard
    groupedStatusStats: statusData.map((item) => ({
      value: item.status,
      count: item.count,
    })),

    groupedOffenceStats: offenceData.map((item) => ({
      value: item.category,
      count: item.count,
    })),

    groupedCityUsers: cityData.map((item) => ({
      value: item.location,
      count: item.count,
    })),

    groupedTypeOfPersonStats: personTypeData.map((item) => ({
      value: item.month,
      count: item.count,
    })),

    groupedZoneStats: zoneData.map((item) => ({
      value: item.department,
      total: item.total,
      opened: item.opened,
      resolved: item.resolved,
    })),

    // Additional data for comprehensive analysis
    comprehensiveAnalysis,
    performanceMetrics,

    // Additional summary metrics
    totalRevenue: Math.floor(Math.random() * 100000) + 50000,
    averageResponseTime: Math.round(2 + Math.random() * 3),
    customerSatisfaction: Math.round(80 + Math.random() * 20),
    systemUptime: Math.round(95 + Math.random() * 5),

    // Additional chart data
    monthlyTrend: generateMonthlyData(400, 0.3),
    quarterlyComparison: [
      {
        quarter: "Q1",
        current: Math.floor(Math.random() * 500) + 200,
        previous: Math.floor(Math.random() * 500) + 150,
      },
      {
        quarter: "Q2",
        current: Math.floor(Math.random() * 500) + 250,
        previous: Math.floor(Math.random() * 500) + 200,
      },
      {
        quarter: "Q3",
        current: Math.floor(Math.random() * 500) + 300,
        previous: Math.floor(Math.random() * 500) + 250,
      },
      {
        quarter: "Q4",
        current: Math.floor(Math.random() * 500) + 350,
        previous: Math.floor(Math.random() * 500) + 300,
      },
    ],

    // Time-based data
    hourlyActivity: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      activity: Math.floor(Math.random() * 50),
      users: Math.floor(Math.random() * 100) + 20,
    })),

    // Real-time metrics
    realTimeMetrics: {
      activeConnections: Math.floor(Math.random() * 200) + 50,
      requestsPerSecond: Math.floor(Math.random() * 20) + 5,
      errorRate: Math.round(Math.random() * 2 * 100) / 100,
      averageLoadTime: Math.round((Math.random() * 1 + 0.5) * 100) / 100,
    },

    // Growth metrics
    growthMetrics: {
      userGrowth: Math.round((Math.random() - 0.5) * 15),
      revenueGrowth: Math.round((Math.random() - 0.5) * 20),
      complaintGrowth: Math.round((Math.random() - 0.5) * 10),
      resolutionGrowth: Math.round((Math.random() - 0.5) * 15),
    },
  };
};

// Generate random data for specific time ranges
export const generateTimeRangeData = (range = "7d") => {
  const data = generateMockDashboardData();

  switch (range) {
    case "24h":
      return {
        ...data,
        trendAnalysis: Array.from({ length: 24 }, (_, i) => ({
          month: `${i}:00`,
          count: Math.floor(Math.random() * 100) + 20,
          value: Math.floor(Math.random() * 120) + 30,
        })),
      };
    case "7d":
      return {
        ...data,
        trendAnalysis: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return {
            month: date.toLocaleDateString("en-US", { weekday: "short" }),
            count: Math.floor(Math.random() * 200) + 50,
            value: Math.floor(Math.random() * 250) + 60,
          };
        }),
      };
    case "30d":
      return data;
    case "90d":
      return {
        ...data,
        trendAnalysis: Array.from({ length: 12 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - (11 - i));
          return {
            month: date.toLocaleDateString("en-US", { month: "short" }),
            count: Math.floor(Math.random() * 500) + 100,
            value: Math.floor(Math.random() * 600) + 150,
          };
        }),
      };
    default:
      return data;
  }
};
