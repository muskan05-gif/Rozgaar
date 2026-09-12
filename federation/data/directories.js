// Data for the three remaining federation pages: Societies, Workers,
// Disputes. Federation-scope versions of the society-level directories —
// same pattern, aggregated across all member societies.

// ---- Societies ----

export const federationSocietyStats = [
  { key: "total", label: "Total Societies", value: "18", footnote: "17 active · 1 onboarding", icon: "Building2" },
  { key: "workers", label: "Total Workers Covered", value: "2,340", footnote: "Across all societies", icon: "Users" },
  { key: "avgRating", label: "Avg. Society Rating", value: "4.6", footnote: "Out of 5.0", icon: "Star" },
  { key: "compliance", label: "Governance Compliance", value: "96.2%", footnote: "Audited this quarter", icon: "ShieldCheck" },
];

export const districtFilterOptions = [
  "All Districts",
  "Kapurthala",
  "Jalandhar",
  "Hoshiarpur",
  "Ludhiana",
  "Ferozepur",
];

export const societiesDirectory = [
  {
    id: "SOC-KPR-104",
    name: "Kapurthala Cooperative Society",
    coordinator: "Harpreet Singh",
    district: "Kapurthala",
    workers: 128,
    disbursed: "\u20B91,42,000",
    rating: 4.7,
    reviews: 391,
    status: "Active",
    registered: "Mar 2021",
  },
  {
    id: "SOC-JLD-013",
    name: "Jalandhar Mill Guild",
    coordinator: "Baljit Kaur",
    district: "Jalandhar",
    workers: 256,
    disbursed: "\u20B92,90,600",
    rating: 4.6,
    reviews: 268,
    status: "Active",
    registered: "Jan 2020",
  },
  {
    id: "SOC-HSP-091",
    name: "Amritsar Craft & Trade",
    coordinator: "Ranjit Bawa",
    district: "Hoshiarpur",
    workers: 96,
    disbursed: "\u20B91,08,400",
    rating: 4.4,
    reviews: 152,
    status: "Active",
    registered: "Jul 2022",
  },
  {
    id: "SOC-LDH-057",
    name: "Ludhiana South Union Co-op",
    coordinator: "Navjot Sidhu",
    district: "Ludhiana",
    workers: 210,
    disbursed: "\u20B92,45,900",
    rating: 4.2,
    reviews: 203,
    status: "Active",
    registered: "Sep 2019",
  },
  {
    id: "SOC-FZP-104",
    name: "Ferozepur Multi-Service",
    coordinator: "Amarjeet Chahal",
    district: "Ferozepur",
    workers: 35,
    disbursed: "\u20B948,100",
    rating: 4.4,
    reviews: 41,
    status: "Onboarding",
    registered: "Aug 2024",
  },
  {
    id: "SOC-HSP-076",
    name: "Hoshiarpur Allied Guild",
    coordinator: "Rupinder Kaur",
    district: "Hoshiarpur",
    workers: 142,
    disbursed: "\u20B91,63,500",
    rating: 4.3,
    reviews: 178,
    status: "Active",
    registered: "Feb 2021",
  },
];

export const societyGovernanceNotice = {
  title: "Annual Society Charter Renewal",
  description:
    "All chartered societies must submit updated governance filings and pass a compliance audit before 31 March each year.",
};

// ---- Workers (federation-wide) ----

export const federationWorkerStats = [
  { key: "total", label: "Total Registered", value: "2,340", footnote: "Across 18 societies", icon: "Users" },
  { key: "verified", label: "Trade Verified", value: "2,118", footnote: "90.5% rate", icon: "ShieldCheck" },
  { key: "pending", label: "Pending Audit", value: "94", footnote: "Action required", icon: "ShieldAlert" },
  { key: "rating", label: "Avg. Member Rating", value: "4.68", footnote: "Out of 5.0", icon: "Star" },
];

export const federationWorkers = [
  { id: "WKR-M-1042", name: "Vikramjit Singh", society: "Kapurthala Cooperative Society", category: "Electrician", rating: 4.9, reviews: 142, status: "Verified", jobs: 150 },
  { id: "WKR-M-1029", name: "Satnam Singh", society: "Kapurthala Cooperative Society", category: "Carpentry & Woodwork", rating: 4.8, reviews: 95, status: "Verified", jobs: 112 },
  { id: "WKR-M-2214", name: "Baljit Kaur", society: "Jalandhar Mill Guild", category: "Tailoring & Craft", rating: 4.9, reviews: 84, status: "Verified", jobs: 87 },
  { id: "WKR-M-2231", name: "Ranjodh Sharma", society: "Jalandhar Mill Guild", category: "Masonry & Tile", rating: 4.5, reviews: 102, status: "Verified", jobs: 68 },
  { id: "WKR-M-3087", name: "Amarjeet Kaur", society: "Amritsar Craft & Trade", category: "Home Healthcare", rating: 4.8, reviews: 43, status: "Pending", jobs: 14 },
  { id: "WKR-M-4051", name: "Navjot Grewal", society: "Ludhiana South Union Co-op", category: "Appliance Repair", rating: 4.6, reviews: 76, status: "Verified", jobs: 89 },
  { id: "WKR-M-4098", name: "Simarjeet Dhillon", society: "Ludhiana South Union Co-op", category: "Electrical Wiring", rating: 4.7, reviews: 14, status: "Pending", jobs: 8 },
  { id: "WKR-M-5012", name: "Harveen Kaur", society: "Ferozepur Multi-Service", category: "Home Painting", rating: 4.8, reviews: 125, status: "Verified", jobs: 120 },
  { id: "WKR-M-6034", name: "Davinder Bains", society: "Hoshiarpur Allied Guild", category: "Heavy Vehicle Transport", rating: 4.4, reviews: 58, status: "Verified", jobs: 46 },
  { id: "WKR-M-6055", name: "Rupinder Kaur", society: "Hoshiarpur Allied Guild", category: "Plumbing Repair", rating: 4.7, reviews: 184, status: "Verified", jobs: 184 },
];

// ---- Disputes (federation-wide) ----

export const federationDisputeStats = [
  { key: "open", label: "Open Across Federation", value: "14", footnote: "5 need registrar review", icon: "AlertCircle" },
  { key: "resolved", label: "Resolved This Month", value: "58", footnote: "89% within SLA", icon: "CheckCircle2" },
  { key: "avgTime", label: "Avg. Resolution Time", value: "2.1 days", footnote: "Across all societies", icon: "Timer" },
  { key: "apex", label: "Awaiting Apex Arbitration", value: "3", footnote: "Escalated past society level", icon: "Gavel" },
];

export const federationDisputes = [
  { id: "FED-DSP-4471", society: "Kapurthala Cooperative Society", raisedBy: "Tarlochan Bedi", against: "Vikramjit Singh", type: "Pricing Claim", amount: "\u20B92,200", status: "Under Mediation", raisedOn: "09 Oct 2024" },
  { id: "FED-DSP-4465", society: "Jalandhar Mill Guild", raisedBy: "Balwinder Chahal", against: "Baljit Kaur", type: "No-show Claim", amount: "\u20B91,500", status: "Open", raisedOn: "08 Oct 2024" },
  { id: "FED-DSP-4452", society: "Amritsar Craft & Trade", raisedBy: "Simranjit Gill", against: "Amarjeet Kaur", type: "Damaged Materials", amount: "\u20B93,800", status: "Escalated", raisedOn: "05 Oct 2024" },
  { id: "FED-DSP-4438", society: "Ludhiana South Union Co-op", raisedBy: "Rajeshwar Verma", against: "Navjot Grewal", type: "Quality Complaint", amount: "\u20B91,450", status: "Resolved", raisedOn: "01 Oct 2024" },
  { id: "FED-DSP-4427", society: "Hoshiarpur Allied Guild", raisedBy: "Manjit Kaur", against: "Rupinder Kaur", type: "Wage Shortfall", amount: "\u20B9600", status: "Resolved", raisedOn: "28 Sep 2024" },
  { id: "FED-DSP-4409", society: "Ferozepur Multi-Service", raisedBy: "Amarjeet Chahal", against: "Harveen Kaur", type: "Contract Breach", amount: "\u20B95,200", status: "Escalated", raisedOn: "24 Sep 2024" },
];

export const disputeGovernanceNotice = {
  title: "Apex Arbitration Charter v1.4",
  description:
    "Disputes unresolved at society level for more than 5 business days are automatically escalated to the federation registrar for binding arbitration.",
};
