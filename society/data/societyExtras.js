// Data for the four remaining society pages: Disputes, Payouts, Reports,
// Settings. Built consistent with the rest of the society module's patterns
// since no reference image was provided for these.

// ---- Disputes ----

export const disputeStats = [
  { key: "open", label: "Open Disputes", value: "7", footnote: "3 awaiting your response", icon: "AlertCircle" },
  { key: "resolved", label: "Resolved This Month", value: "22", footnote: "91% within SLA", icon: "CheckCircle2" },
  { key: "avgTime", label: "Avg. Resolution Time", value: "1.8 days", footnote: "Down from 2.4 days", icon: "Timer" },
  { key: "escalated", label: "Escalated to Federation", value: "2", footnote: "Pending apex review", icon: "ArrowUpRight" },
];

export const disputes = [
  {
    id: "DSP-2291",
    raisedBy: "Tarlochan Bedi",
    against: "Vikramjit Singh",
    type: "Pricing Claim",
    amount: "\u20B92,200",
    status: "Under Mediation",
    raisedOn: "09 Oct 2024",
  },
  {
    id: "DSP-2287",
    raisedBy: "Balwinder Chahal",
    against: "Deepak Sharma",
    type: "No-show Claim",
    amount: "\u20B91,500",
    status: "Open",
    raisedOn: "08 Oct 2024",
  },
  {
    id: "DSP-2279",
    raisedBy: "Simranjit Gill",
    against: "Kuldeep Kaur",
    type: "Damaged Materials",
    amount: "\u20B93,800",
    status: "Escalated",
    raisedOn: "05 Oct 2024",
  },
  {
    id: "DSP-2265",
    raisedBy: "Rajeshwar Verma",
    against: "Jaswinder Pal",
    type: "Quality Complaint",
    amount: "\u20B91,450",
    status: "Resolved",
    raisedOn: "01 Oct 2024",
  },
  {
    id: "DSP-2251",
    raisedBy: "Manjit Kaur",
    against: "Satnam Singh",
    type: "Wage Shortfall",
    amount: "\u20B9600",
    status: "Resolved",
    raisedOn: "28 Sep 2024",
  },
];

// ---- Payouts ----

export const payoutStats = [
  { key: "disbursed", label: "Disbursed This Month", value: "\u20B94,82,600", footnote: "Across 128 workers", icon: "Wallet" },
  { key: "pending", label: "Pending Payouts", value: "\u20B938,150", footnote: "9 workers awaiting", icon: "Clock" },
  { key: "avgTime", label: "Avg. Payout Time", value: "6.2 hrs", footnote: "From job completion", icon: "Timer" },
  { key: "escrow", label: "Escrow Balance Held", value: "\u20B914,200", footnote: "Pledged for disputes", icon: "ShieldCheck" },
];

export const payoutRecords = [
  { worker: "Vikramjit Singh", account: "PNB \u2022\u2022\u20214231", due: "\u20B96,450", lastPayout: "12 Oct 2024", status: "Paid" },
  { worker: "Satnam Singh", account: "SBI \u2022\u2022\u20218847", due: "\u20B94,120", lastPayout: "12 Oct 2024", status: "Paid" },
  { worker: "Kuldeep Kaur", account: "PNB \u2022\u2022\u20213390", due: "\u20B93,860", lastPayout: "10 Oct 2024", status: "Pending" },
  { worker: "Deepak Sharma", account: "HDFC \u2022\u2022\u20215512", due: "\u20B92,940", lastPayout: "09 Oct 2024", status: "Pending" },
  { worker: "Jaswinder Pal", account: "SBI \u2022\u2022\u20211074", due: "\u20B95,610", lastPayout: "12 Oct 2024", status: "Paid" },
  { worker: "Manjit Singh", account: "PNB \u2022\u2022\u20216602", due: "\u20B91,200", lastPayout: "07 Oct 2024", status: "Failed" },
];

// ---- Reports ----

export const reportStats = [
  { key: "generated", label: "Reports Generated", value: "14", footnote: "This month", icon: "FileText" },
  { key: "scheduled", label: "Scheduled Reports", value: "3", footnote: "Auto-emailed monthly", icon: "CalendarClock" },
  { key: "audit", label: "Last Governance Audit", value: "01 Oct", footnote: "Passed, no findings", icon: "ShieldCheck" },
  { key: "compliance", label: "Compliance Score", value: "98.4%", footnote: "Kapurthala Guild Standard", icon: "Gauge" },
];

export const availableReports = [
  {
    key: "bookings",
    title: "Monthly Booking Summary",
    description: "All dispatched, completed, and cancelled bookings for the selected month.",
    lastGenerated: "01 Oct 2024",
    icon: "CalendarCheck",
  },
  {
    key: "verification",
    title: "Worker Verification Compliance",
    description: "KYC status, pending audits, and document expiry across the guild.",
    lastGenerated: "28 Sep 2024",
    icon: "ShieldCheck",
  },
  {
    key: "wages",
    title: "Wage Disbursement Ledger",
    description: "Full payout history with bank references, for federation reconciliation.",
    lastGenerated: "01 Oct 2024",
    icon: "Wallet",
  },
  {
    key: "disputes",
    title: "Dispute Resolution Log",
    description: "Every dispute raised this quarter, outcome, and time-to-resolution.",
    lastGenerated: "25 Sep 2024",
    icon: "Gavel",
  },
  {
    key: "welfare",
    title: "Cooperative Welfare Fund Statement",
    description: "Contributions, withdrawals, and balance of the 3% welfare reserve.",
    lastGenerated: "01 Oct 2024",
    icon: "HeartHandshake",
  },
  {
    key: "governance",
    title: "Quarterly Governance Report",
    description: "Submitted to the federation apex body for oversight review.",
    lastGenerated: "01 Jul 2024",
    icon: "FileBarChart",
  },
];

// ---- Settings ----

export const admins = [
  { name: "Harpreet Singh", role: "Society Administrator", email: "harpreet.singh@rozgaar.coop", active: true },
  { name: "Simarpreet Kaur", role: "Deputy Administrator", email: "simarpreet.kaur@rozgaar.coop", active: true },
  { name: "Balraj Sandhu", role: "Compliance Officer", email: "balraj.sandhu@rozgaar.coop", active: false },
];

export const notificationPrefs = [
  { key: "newBooking", label: "New booking requests", description: "Notify when a customer submits a new job.", enabled: true },
  { key: "disputeEscalation", label: "Dispute escalations", description: "Notify when a dispute is raised or escalated.", enabled: true },
  { key: "kycPending", label: "Pending KYC reviews", description: "Notify when a worker's documents need review.", enabled: true },
  { key: "payoutFailed", label: "Failed payouts", description: "Notify when an automatic payout fails to settle.", enabled: true },
  { key: "weeklyDigest", label: "Weekly performance digest", description: "A summary email every Monday morning.", enabled: false },
];

export const payoutConfig = {
  bank: "Punjab National Bank",
  accountMasked: "\u2022\u2022\u2022\u2022 4231",
  mode: "Automatic NEFT",
  schedule: "Daily, 6:00 PM",
  autoPayoutEnabled: true,
};
