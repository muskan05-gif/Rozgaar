// Sample data for the Federation Overview dashboard.
// Swap these arrays/objects for real API data — every component
// below consumes exactly this shape, so the UI won't need to change.

export const federationInfo = {
  name: "Roopgarh Federation",
  tagline: "Apex Cooperative Federation",
  zone: "Punjab North Zone",
  director: {
    name: "Sukhwinder Singh",
    role: "Federation Director",
    initials: "SS",
  },
};

export const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "" },
  { key: "societies", label: "Societies", icon: "Building2", path: "societies" },
  { key: "workers", label: "Workers", icon: "Users", path: "workers" },
  { key: "policy", label: "Policy & Wages", icon: "ScrollText", path: "policy-wages" },
  { key: "analytics", label: "Analytics", icon: "BarChart3", path: "analytics" },
  { key: "disputes", label: "Disputes", icon: "Gavel", path: "disputes" },
  { key: "settings", label: "Settings", icon: "Settings", path: "settings" },
];

export const stats = [
  {
    key: "societies",
    label: "Total Societies",
    value: "18",
    icon: "Building2",
    footnote: "17 active · 1 onboarding",
  },
  {
    key: "workers",
    label: "Total Active Workers",
    value: "2,340",
    icon: "Users",
    footnote: "Up 128 from last month",
  },
  {
    key: "disbursed",
    label: "Disbursed This Month",
    value: "\u20B94.2L",
    icon: "Wallet",
    footnote: "Across 9,812 wage transactions",
  },
  {
    key: "performance",
    label: "Federation Performance",
    value: "9.4 / 10",
    icon: "TrendingUp",
    footnote: "Cooperative health index",
  },
];

export const societyLocations = [
  { id: 1, name: "Kapurthala Civil", x: 46, y: 40, status: "active" },
  { id: 2, name: "Kapurthala Majra", x: 52, y: 32, status: "active" },
  { id: 3, name: "Jalandhar Mills", x: 60, y: 46, status: "active" },
  { id: 4, name: "Hoshiarpur Cantt", x: 38, y: 56, status: "active" },
  { id: 5, name: "Moga Rural", x: 66, y: 60, status: "onboarding" },
  { id: 6, name: "Ferozepur Border", x: 30, y: 68, status: "active" },
  { id: 7, name: "Ludhiana South", x: 70, y: 34, status: "active" },
];

export const districtOptions = [
  "Punjab North Zone",
  "Kapurthala District",
  "Jalandhar District",
  "Hoshiarpur District",
  "Ludhiana District",
];

export const societies = [
  {
    id: "WKR-421",
    name: "Kapurthala Cooperative Society",
    district: "Kapurthala",
    workers: 128,
    workersStatus: "Active",
    disbursed: "\u20B91,42,000",
    rating: 4.7,
    reviews: 391,
    status: "Active",
  },
  {
    id: "SOC-013",
    name: "Jalandhar Mill Guild",
    district: "Jalandhar",
    workers: 256,
    workersStatus: "Active",
    disbursed: "\u20B92,90,600",
    rating: 4.6,
    reviews: 268,
    status: "Active",
  },
  {
    id: "SOC-091",
    name: "Amritsar Craft & Trade",
    district: "Hoshiarpur",
    workers: 96,
    workersStatus: "Active",
    disbursed: "\u20B91,08,400",
    rating: 4.4,
    reviews: 152,
    status: "Active",
  },
  {
    id: "SOC-057",
    name: "Ludhiana South Union Co-op",
    district: "Industrial Belt",
    workers: 210,
    workersStatus: "Active",
    disbursed: "\u20B92,45,900",
    rating: 4.2,
    reviews: 203,
    status: "Active",
  },
  {
    id: "SOC-104",
    name: "Ferozepur Multi-Service",
    district: "Border Zone",
    workers: 35,
    workersStatus: "Onboarding",
    disbursed: "\u20B948,100",
    rating: 4.4,
    reviews: 41,
    status: "Pending",
  },
  {
    id: "SOC-076",
    name: "Hoshiarpur Allied Guild",
    district: "Mid-Mission District",
    workers: 142,
    workersStatus: "Active",
    disbursed: "\u20B91,63,500",
    rating: 4.3,
    reviews: 178,
    status: "Active",
  },
];

export const disputes = [
  {
    id: 1,
    worker: "Manjot Singh",
    role: "Contractor",
    society: "Kapurthala Society",
    customer: "Rajinder Prasad",
    reference: "Booking #55-1421",
    issue: "Wage discrepancy & overdue settlement",
    priority: "High",
  },
  {
    id: 2,
    worker: "Sarabjit Singh",
    role: "Carpenter",
    society: "Amritsar Craft & Trade",
    customer: "Harpreet Kaur",
    reference: "Booking #43-0892",
    issue: "Damaged materials / equipment claim",
    priority: "Medium",
  },
  {
    id: 3,
    worker: "Jasvinder Pal",
    role: "Founding Member",
    society: "Ludhiana South Union",
    customer: "Sunil Mehta",
    reference: "Booking #61-2207",
    issue: "Salary compliance & documentation fee",
    priority: "Low",
  },
];
