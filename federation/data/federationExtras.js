// Data for federation-level pages: Bookings, Payouts, Analytics,
// Policy & Wages, and Settings. Built from the "North Delhi Cooperative
// Hub" reference screens, renamed to Roopgarh Federation for brand
// consistency with the rest of the app.

// ---- Bookings (federation-wide kanban) ----

export const bookingsBanner = {
  title: "Cooperative Fair-Distribution Algorithm Active",
  note: "Dispatch prioritized on cooperative rotation & guaranteed livable wages, not proximity or speed.",
  compliance: "IND ACT & 41(4) Compliant",
  auditLog: "Audit Log",
};

export const federationBookingColumns = [
  {
    key: "requested",
    label: "Requested",
    cards: [
      {
        id: "#123-9921",
        urgency: "High Urgency",
        society: "Rohini Sector 7",
        customer: "Suresh Kr. Verma",
        service: "Tripped 3-Phase Main Switch",
        location: "Sector 7, Rohini · Pocket D",
        estWage: "\u20B9850 - \u20B91,200",
        posted: "14 mins ago",
      },
      {
        id: "#123-9924",
        urgency: "Scheduled (Eve)",
        society: "Pitampura Union",
        customer: "Ananya Deshmukh",
        service: "Overhead Water Tank Float Valve",
        location: "Pitampura · Block B",
        estWage: "\u20B9680 - \u20B9750",
        posted: "32 mins ago",
      },
      {
        id: "#123-9938",
        urgency: "Next-Day Slot",
        society: "Prashant Vihar",
        customer: "Harish Chhabra",
        service: "Balcony Tile Re-grouting",
        location: "Model Town II",
        estWage: "\u20B91,400 - \u20B91,800",
        posted: "1 hr ago",
      },
    ],
  },
  {
    key: "assigned",
    label: "Assigned",
    cards: [
      {
        id: "#123-9902",
        badge: "Worker Confirmed",
        society: "Rohini Sector 7",
        customer: "Gurpreet Singh",
        worker: "Mohd. Imran",
        service: "Split AC Gas Refill & Coil",
        location: "Shanti Nagar Phase 1",
        slot: "16:30",
        escrow: "\u20B91,650",
      },
      {
        id: "#123-9889",
        badge: "Awaiting SMS Ack.",
        society: "Prashant Vihar",
        customer: "Meena Aggarwal",
        worker: "Ram Kishore",
        service: "Inverter Wiring Reconfiguration",
        location: "Civil Lines · Rohtak Rd",
        slot: "10:00",
        escrow: "\u20B9950",
      },
    ],
  },
  {
    key: "inProgress",
    label: "In Progress",
    cards: [
      {
        id: "#123-9877",
        badge: "SOS Check",
        active: true,
        society: "Rohini Sector 7",
        customer: "Satish Kumar",
        worker: "Vinod Kumar",
        service: "Bathroom Pipe Line Leakage Repair",
        location: "Wazirpur Industrial Area",
        started: "1 hr ago",
        milestone: "2/3 · View Live Audit",
        rating: "5.0 Verified",
      },
      {
        id: "#123-9863",
        badge: "SOS Check",
        active: true,
        society: "Pitampura Union",
        customer: "Bhavna Mathur",
        worker: "Deepak Pal",
        service: "Exterior Waterproof Priming",
        location: "Kamla Nagar",
        started: "3 hr ago",
        milestone: "1/2 · View Live Audit",
        rating: "4.8 Manual",
      },
    ],
  },
  {
    key: "completed",
    label: "Completed",
    cards: [
      {
        id: "#123-9820",
        badge: "Sign-off Pending",
        society: "Rohini Sector 7",
        customer: "Vinod Rao",
        worker: "Anil Yadav",
        service: "Distribution MCB Replacement",
        location: "Vikas Puri",
        finished: "1 hr ago",
      },
      {
        id: "#123-9801",
        badge: "Audited & Closed",
        society: "Prashant Vihar",
        customer: "Ashwin Attri",
        worker: "Kiran Bala",
        service: "Kitchen Chimney Installation",
        location: "Ganga Vihar",
        finished: "3 hr ago",
      },
    ],
  },
];

export const bookingsFooter = {
  escrowProtected: "\u20B91,42,890.00",
  rotationRefreshed: "3 mins ago",
  emergencyHotline: "1800-ROZGAAR-01",
};

// ---- Payouts (federation-wide settlement roster) ----

export const payoutSummary = [
  { key: "cycle", label: "Total Payout This Cycle", value: "\u20B98,42,500", footnote: "2 settlement batches" },
  { key: "pending", label: "Pending Payout", value: "\u20B946,200", footnote: "Cooperative clarity checks" },
  { key: "compliance", label: "Fair-Wage Compliance", value: "99.4%", footnote: "Above floor for all trades" },
  { key: "reserve", label: "Cooperative Reserve", value: "\u20B934,800", footnote: "Statutory audited" },
];

export const settlementRoster = [
  {
    name: "Rameshwar Prasad",
    role: "Senior Electrician",
    society: "Rohini Sector #104",
    activity: "48 hrs · 14 jobs",
    payRate: "\u20B9214/hr",
    netPayout: "\u20B921,050",
    disbursal: "\u20B921,050",
    status: "Paid",
  },
  {
    name: "Sunita Kumari Devi",
    role: "Senior Care Specialist",
    society: "Pitampura Union #108",
    activity: "51 hrs · 15 jobs",
    payRate: "\u20B9234/hr",
    netPayout: "\u20B927,050",
    disbursal: "\u20B927,050",
    status: "Paid",
  },
  {
    name: "Mohammed Aslam",
    role: "Mason & Tile Setter",
    society: "Prashant Vihar #112",
    activity: "42 hrs · 12 jobs",
    payRate: "\u20B9192/hr",
    netPayout: "\u20B917,220",
    disbursal: "\u20B917,220",
    status: "Paid",
  },
  {
    name: "Vikram Singh Rawat",
    role: "Carpentry Specialist",
    society: "Rohini Sector #104",
    activity: "38 hrs · 9 jobs",
    payRate: "\u20B9204/hr",
    netPayout: "\u20B915,450",
    disbursal: "Aadhaar KYC Link Missing",
    status: "Hold",
  },
  {
    name: "Pooja Mathew",
    role: "Surface Painter",
    society: "Pitampura Union #108",
    activity: "44 hrs · 11 jobs",
    payRate: "\u20B9196/hr",
    netPayout: "\u20B915,590",
    disbursal: "\u20B915,590",
    status: "Paid",
  },
  {
    name: "Omesh Chaurasiya",
    role: "HVAC & Cooling Tech",
    society: "Prashant Vihar #112",
    activity: "72 hrs · 20 jobs",
    payRate: "\u20B9226/hr",
    netPayout: "\u20B921,455",
    disbursal: "\u20B921,455",
    status: "Paid",
  },
];

export const payoutFooterNotes = {
  ledgerBlock: "#7921-40",
  refreshedAgo: "40 sec ago",
  wageFloorNote:
    "Cooperative Wage Floor vs statutory minimum: 22% above regional minimum wage benchmarks.",
  dualKeySigning: "Cooperative digital signatures require two authorized signers per settlement batch.",
};

// ---- Analytics ----

export const analyticsSummary = [
  { key: "volume", label: "Volume This Cycle", value: "4,892", footnote: "+8.1% vs last cycle" },
  { key: "fulfillment", label: "Completion Rate", value: "94.2%", footnote: "Weekly avg" },
  { key: "avgMargin", label: "Avg. Wage Margin", value: "1.48x", footnote: "Above statutory floor" },
  { key: "retention", label: "Active Worker Retention", value: "88.6%", footnote: "Trailing 6 months" },
];

export const bookingVolumeTrend = [
  3200, 3350, 3500, 3420, 3700, 3900, 3850, 4100, 4300, 4250, 4550, 4700, 4892,
];

export const serviceDemand = [
  { label: "Electrical", value: 95 },
  { label: "Plumbing", value: 78 },
  { label: "Carpentry", value: 52 },
  { label: "Painting", value: 41 },
  { label: "HVAC", value: 33 },
  { label: "Domestic", value: 24 },
];

export const workerGrowthTrend = [1900, 2020, 2110, 2180, 2260, 2340];
export const workerGrowthMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export const wageParityBySociety = [
  { society: "Central Delhi Hub", floor: 218, actual: 324 },
  { society: "North Rohini Cooperative", floor: 218, actual: 299 },
  { society: "East Delhi Trade Union", floor: 218, actual: 282 },
  { society: "South Textile Alliance", floor: 218, actual: 266 },
  { society: "West Suburban Contract Guild", floor: 218, actual: 254 },
];

export const socialEquity = [
  { key: "pension", label: "Pension Accounts Enrolled", value: "3,184", footnote: "92.3% eligible members" },
  { key: "health", label: "Active Health Cover", value: "4,120", footnote: "96.4% members insured" },
  { key: "loans", label: "Emergency Co-op Loans", value: "\u20B948.60L", footnote: "0.4% delinquency rate" },
];

// ---- Policy & Wages ----

export const wageBenchmarks = {
  minBaseRate: { value: "\u20B9218", unit: "per hour", note: "+11% vs regional gazette baseline" },
  welfareSurcharge: { value: "4.0", unit: "worker %", note: "Directed to Society Medical Escrow" },
  adminRetention: { value: "12.5%", unit: "cap", note: "Statutory statutory limit capped at 15%" },
};

export const policyToggles = [
  {
    key: "escrowSettlement",
    label: "Automatic Escrow Settlement",
    description: "Instantly disburse completed booking funds to worker UPI/bank accounts once mutual sign-off & QR is logged by the employer.",
    enabled: true,
    tag: "T-0 Hours",
  },
  {
    key: "fairDistribution",
    label: "Fair-Distribution Algorithm Enforcement",
    description: "Prevent gig hoarding by suppressing dispatch priority to workers who have exceeded 36 booked operational hours in a rolling 6-day window.",
    enabled: true,
    tag: "Statutory Mandate",
  },
  {
    key: "crossDispatch",
    label: "Inter-Society Cross-Dispatch",
    description: "Permits overflow emergency service requests (electrical, mishap, gas leakage) to be prompted to adjacent federated delegate cooperatives.",
    enabled: false,
    tag: "Manual Hold",
  },
];

export const registryStatus = {
  certificate: "Cert. #DL-COOP-4401-R",
  renewed: "Renewed 31 Mar 2026",
  kycVerified: "412 / 428",
};

// ---- Settings ----

export const federationTabs = ["Cooperative Profile", "Team & Roles", "Notification Dispatch", "Federation Hierarchy"];

export const cooperativeProfile = {
  name: "Roopgarh Federation",
  registrationId: "DL-COOP-4401-R",
  zone: "Punjab North Zone",
  registrar: "Sukhwinder Singh",
  established: "2019",
  memberSocieties: 18,
};

export const teamRoles = [
  { name: "Sukhwinder Singh", role: "Federation Director", access: "Full Governance", active: true },
  { name: "Rajesh Sharma", role: "Registrar", access: "Bookings & Payouts", active: true },
  { name: "Anjali Deshpande", role: "Compliance Auditor", access: "Read-only Reports", active: true },
  { name: "Manpreet Bajwa", role: "Regional Coordinator", access: "Society Onboarding", active: false },
];

export const notificationDispatchPrefs = [
  { key: "escalation", label: "Society dispute escalations", description: "Immediate alert when a dispute reaches apex arbitration.", enabled: true },
  { key: "payoutHold", label: "Payout holds", description: "Notify when a worker settlement is placed on hold.", enabled: true },
  { key: "onboarding", label: "New society onboarding", description: "Notify when a society requests to join the federation.", enabled: true },
  { key: "auditReminder", label: "Audit reminders", description: "Monthly reminder to review the compliance dashboard.", enabled: false },
];

export const federationHierarchy = {
  name: "National Federation of Service Cooperatives",
  code: "Apex Node · DL-00",
  clusters: [
    {
      name: "Roopgarh Federation Cluster",
      code: "Nodal Hub · DL-14",
      current: true,
      societies: [
        { name: "Rohini Sector 7 Society #104", workers: 428, current: true },
        { name: "Pitampura Union #108", workers: 310 },
        { name: "Prashant Vihar Collective #112", workers: 112 },
      ],
    },
  ],
};
