// Data for the Workers directory, individual worker profiles, and the
// Bookings kanban board. Kept separate from mockData.js since these
// power full pages rather than dashboard widgets.

export const workerStats = [
  { key: "total", label: "Total Registered", value: "128", unit: "Workers", icon: "Users" },
  { key: "verified", label: "Trade Verified", value: "116", unit: "90.6% rate", icon: "ShieldCheck" },
  { key: "pending", label: "Pending Audit", value: "12", unit: "Action required", icon: "ShieldAlert" },
  { key: "rating", label: "Avg. Member Rating", value: "4.78", unit: "out of 5.0", icon: "Star" },
];

export const workerCategories = [
  "All Services",
  "Electrician",
  "Plumbing Repair",
  "Carpentry & Woodwork",
  "Tailoring & Craft",
  "Masonry & Tile",
  "Home Painting",
  "Appliance Repair",
  "Home Healthcare & Caregiving",
  "Heavy Vehicle Driver & Transport",
];

export const workers = [
  {
    id: "WKR-M-1042",
    name: "Vikramjit Singh",
    area: "Kapurthala Central",
    category: "Electrician",
    rating: 4.9,
    reviews: 142,
    status: "Verified",
    jobs: 150,
    joined: "Sep 2023",
  },
  {
    id: "WKR-M-1029",
    name: "Satnam Singh",
    area: "Sultanpur Lodhi",
    category: "Carpentry & Woodwork",
    rating: 4.8,
    reviews: 95,
    status: "Verified",
    jobs: 112,
    joined: "Oct 2022",
  },
  {
    id: "WKR-M-1001",
    name: "Kuldeep Kaur",
    area: "Phagwara West",
    category: "Tailoring & Craft",
    rating: 4.9,
    reviews: 84,
    status: "Verified",
    jobs: 87,
    joined: "Mar 2023",
  },
  {
    id: "WKR-M-1102",
    name: "Deepak Sharma",
    area: "Kapurthala Model Town",
    category: "Masonry & Tile",
    rating: 4.5,
    reviews: 102,
    status: "Verified",
    jobs: 68,
    joined: "Dec 2023",
  },
  {
    id: "WKR-M-0983",
    name: "Jaswinder Pal",
    area: "Hussainpur Sub-district",
    category: "Plumbing Repair",
    rating: 4.7,
    reviews: 184,
    status: "Verified",
    jobs: 184,
    joined: "Aug 2022",
  },
  {
    id: "WKR-M-1130",
    name: "Harpreet Kaur",
    area: "Kapurthala Cantonment",
    category: "Home Healthcare & Caregiving",
    rating: 4.8,
    reviews: 43,
    status: "Pending",
    jobs: 14,
    joined: "Feb 2024",
  },
  {
    id: "WKR-M-1044",
    name: "Rajesh Kumar",
    area: "Phagwara City",
    category: "Appliance Repair",
    rating: 4.6,
    reviews: 76,
    status: "Verified",
    jobs: 89,
    joined: "Apr 2023",
  },
  {
    id: "WKR-M-1151",
    name: "Manjit Singh",
    area: "Nadala Rural",
    category: "Electrical Wiring",
    rating: 4.7,
    reviews: 14,
    status: "Pending",
    jobs: 8,
    joined: "Mar 2024",
  },
  {
    id: "WKR-M-0967",
    name: "Sunil Verma",
    area: "Kapurthala Outer Ring",
    category: "Home Painting",
    rating: 4.8,
    reviews: 125,
    status: "Verified",
    jobs: 120,
    joined: "Jul 2022",
  },
  {
    id: "WKR-M-1178",
    name: "Davinder Singh",
    area: "Sultanpur Highway Node",
    category: "Heavy Vehicle Driver & Transport",
    rating: 4.4,
    reviews: 58,
    status: "Verified",
    jobs: 46,
    joined: "Sep 2023",
  },
];

export const workerGuildNotice = {
  title: "Kapurthala Trade Guild Quality Standard v3.1",
  description:
    "All workers must undergo biometric Aadhaar linkage, police clearance, and trade assessment prior to assignment dispatch.",
};

// ---- Worker profile detail (keyed by worker id) ----

export const workerProfiles = {
  "WKR-M-1042": {
    tags: ["Electrician", "High Wage Rating", "Appliance Registration"],
    memberSince: "Sep 2023",
    availableForDispatch: true,
    documents: [
      { key: "aadhaar", label: "Aadhaar Card", note: "UIDAI e-KYC linked", status: "Verified", updated: "12 Oct 2024" },
      { key: "pan", label: "PAN Card", note: "Cross-checked with e-filing", status: "Verified", updated: "12 Oct 2024" },
      { key: "coop", label: "Co-op Certificate", note: "Kapurthala Federation issued", status: "Verified", updated: "01 Sep 2023" },
      { key: "bank", label: "Bank Passbook", note: "Punjab National Bank", status: "Verified", updated: "12 Oct 2024" },
    ],
    earnings: {
      totalCooperativeEarning: "\u20B91,84,650",
      thisMonth: "\u20B928,400",
      thisMonthChange: "+12% vs last month",
      netPayout: "\u20B931,882",
      pendingPayout: "\u20B94,250",
      bank: "Punjab National Bank",
      payoutMode: "Automatic NEFT",
      lastPayment: "12 Oct 2024",
      monthlyTrend: [18, 21, 24, 22, 26, 28],
    },
    bookingHistory: [
      { id: "MPL-1421", date: "24 Oct 2024", customer: "Gurpreet Kaur", service: "Sub-meter Replacement", amount: "\u20B91,450", rating: 5.0, review: "Power was back and very clean wiring work", status: "Completed" },
      { id: "MPL-1409", date: "22 Oct 2024", customer: "Rajwinder Verma", service: "Tripswitch DB Box", amount: "\u20B92,700", rating: 4.9, review: "Explained the issue clearly before fixing", status: "Completed" },
      { id: "MPL-1387", date: "19 Oct 2024", customer: "Simranjit Gill", service: "Ceiling Fan & Chandelier Install", amount: "\u20B91,800", rating: 4.9, review: "On time, confident work", status: "Completed" },
      { id: "MPL-1372", date: "15 Oct 2024", customer: "Dr. P.S. Khurana", service: "Solar Inverter Integration", amount: "\u20B96,600", rating: 4.8, review: "Handled a tricky panel setup well", status: "Completed" },
      { id: "MPL-1355", date: "11 Oct 2024", customer: "Harbhajan Singh", service: "Emergency MCB Sparking Fix", amount: "\u20B91,150", rating: 5.0, review: "Arrived within 30 minutes of booking", status: "Completed" },
    ],
  },
};

export function getWorkerProfile(id) {
  const base = workers.find((w) => w.id === id);
  const detail = workerProfiles[id];
  if (!base) return null;
  return {
    ...base,
    ...(detail || {
      tags: [base.category],
      memberSince: base.joined,
      availableForDispatch: base.status === "Verified",
      documents: [],
      earnings: null,
      bookingHistory: [],
    }),
  };
}

// ---- Bookings kanban board ----

export const bookingsMeta = {
  matchingNote: "Matched via cooperative fair-distribution, not proximity.",
  rotationPool: "Active Rotation Pool: 128 Guild Workers",
  todayGmv: "\u20B928,650",
  welfareReserve: "\u20B9859.50",
  escrowBalance: "\u20B914,200",
  fairDistributionCompliance: "99.4%",
};

export const bookingColumns = [
  {
    key: "requested",
    label: "Requested",
    cards: [
      {
        id: "8BK-9482",
        badge: "Urgent \u00B7 4m",
        customer: "Gurpreet Kaur",
        location: "Urban Estate, Ph-1, SI 4",
        tags: ["DB Box Tripping"],
        amount: "\u20B9950",
        footer: "10:30 AM \u00B7 Manual slot",
      },
      {
        id: "8BK-9485",
        badge: "Standard",
        customer: "Rajeshwar Verma",
        location: "Civil Lines, Near DC Office",
        tags: ["Sub-meter Replacement"],
        amount: "\u20B91,450",
        footer: "Today, 1:00 PM",
      },
      {
        id: "8BK-9484",
        badge: "Advance Booking",
        customer: "Anita Mehra",
        location: "Mall Road, Opp. Head Post",
        tags: ["Main Breaker Fault"],
        amount: "\u20B93,200",
        footer: "Tomorrow, 9:00 AM",
      },
    ],
  },
  {
    key: "assigned",
    label: "Assigned",
    cards: [
      {
        id: "8BK-9477",
        badge: "Dispatched",
        customer: "Dr. P.S. Khurana",
        location: "Model Town, Circular Road",
        tags: ["Overhead Tank Wiring"],
        worker: "Vikramjit Singh",
        amount: "\u20B91,150",
        footer: "11:00 AM \u00B7 ETA 20m",
      },
      {
        id: "8BK-9465",
        badge: "Confirmed",
        customer: "Harbhajan Singh",
        location: "Grain Market Rd, Block 3",
        tags: ["AC Inverter Fix"],
        worker: "Satnam Singh",
        amount: "\u20B91,800",
        footer: "11:30 AM slot",
      },
    ],
  },
  {
    key: "inProgress",
    label: "In Progress",
    cards: [
      {
        id: "8BK-9480",
        badge: "Active On Site",
        customer: "Pooja Sharma",
        location: "Guru Nanak Nagar, Lane 2",
        tags: ["Ceiling & Cornice Work"],
        worker: "Kuldeep Kaur",
        amount: "\u20B93,800",
        footer: "45m elapsed \u00B7 OTP validated",
      },
      {
        id: "8BK-9472",
        badge: "In Work",
        customer: "Sunil Grover",
        location: "Railway Colony, Sector 42",
        tags: ["Kitchen Sink Leak"],
        worker: "Jaswinder Pal",
        amount: "\u20B9700",
        footer: "18m elapsed \u00B7 Check status",
      },
    ],
  },
  {
    key: "completed",
    label: "Completed",
    cards: [
      {
        id: "8BK-9461",
        badge: "Paid & Escrow",
        customer: "Jaswant Rai",
        location: "Shalimar Nagar 1",
        tags: ["Water Pump Repair"],
        worker: "Rajesh Kumar",
        amount: "\u20B91,250",
        footer: "11:20 AM \u00B7 Receipt copy",
      },
      {
        id: "8BK-9448",
        badge: "Auto-settled",
        customer: "Kavita Batra",
        location: "Subhash Nagar, H-7",
        tags: ["Door Frame Fix"],
        worker: "Deepak Sharma",
        amount: "\u20B91,600",
        footer: "09:45 AM \u00B7 Receipt copy",
      },
      {
        id: "8BK-9452",
        badge: "Listing Circuit",
        customer: "Manjit Kaur",
        location: "Defence Colony, Plot 18",
        tags: ["Earthing & Circuit Test"],
        worker: "Vikramjit Singh",
        amount: "\u20B92,100",
        footer: "10:10 AM \u00B7 Parts billed",
      },
    ],
  },
  {
    key: "disputed",
    label: "Disputed",
    cards: [
      {
        id: "8BK-9464",
        badge: "Escalated 2h",
        customer: "Tarlochan Bedi",
        location: "Kanjli Rd, Near Bus Stop",
        tags: ["Pricing Claim"],
        amount: "\u20B92,200",
        footer: "Arbitrate Dispute",
        isUrgent: true,
      },
      {
        id: "8BK-9451",
        badge: "No-show Claim",
        customer: "Balwinder Chahal",
        location: "Shelkhupur Industrial Zone",
        tags: ["Delay past 45m"],
        amount: "\u20B91,500",
        footer: "Reassign Instantly",
        isUrgent: true,
      },
    ],
  },
];
