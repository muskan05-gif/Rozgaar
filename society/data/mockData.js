// Sample data for the Society Overview dashboard.
// Swap these for real API data — component shape stays the same.

export const societyInfo = {
  name: "Kapurthala Cooperative Society",
  location: "Punjab, Region North",
  societyId: "4KPR-402",
  district: "Kapurthala district",
  admin: {
    name: "Harpreet Singh",
    role: "Society Administrator",
    initials: "HS",
  },
  today: "Today, 24 Oct 2024",
};

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "" },
  { key: "workers", label: "Workers", icon: "Users", path: "workers" },
  { key: "bookings", label: "Bookings", icon: "CalendarCheck", path: "bookings" },
  { key: "disputes", label: "Disputes", icon: "Gavel", path: "disputes" },
  { key: "payouts", label: "Payouts", icon: "Wallet", path: "payouts" },
  { key: "reports", label: "Reports", icon: "FileBarChart", path: "reports" },
  { key: "settings", label: "Settings", icon: "Settings", path: "settings" },
];

export const stats = [
  {
    key: "workers",
    label: "Active Workers",
    value: "128",
    icon: "Users",
    footnote: "+12 onboarded this week",
  },
  {
    key: "bookings",
    label: "Today's Bookings",
    value: "34",
    icon: "CalendarCheck",
    footnote: "8 completed · 22 in progress",
  },
  {
    key: "verifications",
    label: "Pending Verifications",
    value: "6",
    icon: "ShieldAlert",
    footnote: "Requires document review",
  },
  {
    key: "rating",
    label: "Avg. Rating",
    value: "4.7",
    icon: "Star",
    footnote: "Based on 1,420 completed jobs",
    isRating: true,
  },
];

export const recentBookings = [
  {
    id: 1,
    customer: "Gurpreet Kaur",
    initials: "GK",
    service: "Plumbing Repair",
    worker: "Rajesh Kumar",
    status: "Confirmed",
    time: "10:30 AM",
  },
  {
    id: 2,
    customer: "Amit Verma",
    initials: "AV",
    service: "Electrical Wiring",
    worker: "Manjit Singh",
    status: "Pending",
    time: "11:15 AM",
  },
  {
    id: 3,
    customer: "Simranjit Gill",
    initials: "SG",
    service: "Carpentry Works",
    worker: "Jaswinder Pal",
    status: "Confirmed",
    time: "11:45 AM",
  },
  {
    id: 4,
    customer: "Pooja Sharma",
    initials: "PS",
    service: "Home Painting",
    worker: "Sunil Verma",
    status: "Confirmed",
    time: "12:10 PM",
  },
  {
    id: 5,
    customer: "Davinder Singh",
    initials: "DS",
    service: "Appliance Repair",
    worker: "Harman Preet",
    status: "Pending",
    time: "12:40 PM",
  },
];

export const workerVerifications = [
  {
    id: 1,
    name: "Vikramjit Singh",
    initials: "VS",
    skill: "Electrician",
    note: "Aadhar & police clearance pending",
  },
  {
    id: 2,
    name: "Satnam Singh",
    initials: "SS",
    skill: "Carpenter",
    note: "Skill certificate attached, awaiting review",
  },
  {
    id: 3,
    name: "Kuldeep Kaur",
    initials: "KK",
    skill: "Tailoring & Craft",
    note: "SHG collective membership proof needed",
  },
  {
    id: 4,
    name: "Deepak Sharma",
    initials: "DS",
    skill: "Masonry & Tile",
    note: "Bank passbook & ID proof pending",
  },
];

export const weeklyTrend = [
  { day: "Mon", date: "Oct 18", value: 23 },
  { day: "Tue", date: "Oct 19", value: 28 },
  { day: "Wed", date: "Oct 20", value: 31 },
  { day: "Thu", date: "Oct 21", value: 42 },
  { day: "Fri", date: "Oct 22", value: 39 },
  { day: "Sat", date: "Oct 23", value: 48, isPeak: true },
  { day: "Sun", date: "Oct 24", value: 14 },
];

export const weeklyTrendMeta = {
  targetThreshold: 35,
  volumeTotal: 238,
  fulfillmentRate: "98.4%",
  insight:
    "Saturday recorded peak demand driven by residential HVAC maintenance & home repairs.",
};
