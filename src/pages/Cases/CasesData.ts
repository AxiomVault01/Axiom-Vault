export type CaseStatus =
  | "New"
  | "Open"
  | "Investigating"
  | "Under Review"
  | "Escalated"
  | "Closed";
export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface ConnectedTransaction {
  id: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Flagged";
}

export interface EvidenceFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TimelineEvent {
  id: string;
  type: "case_created" | "case_assigned" | "note_added" | "evidence_uploaded" | "reviewer_assigned" | "evidence_removed" | "status_change" | "comment" | "reassign";
  title: string;
  description: string;
  by: string;
  byInitials: string;
  byColor: string;
  timeAgo: string;
}

export interface Comment {
  id: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  timeAgo: string;
  text: string;
}

export interface ActivityLogEntry {
  id: string;
  event: string;
  by: string;
  timeAgo: string;
}

export interface StatusHistoryEntry {
  from: string;
  to: string;
  date: string;
}

export interface Case {
  id: string;
  status: CaseStatus;
  severity: Severity;
  title: string;
  assignedTo: string;
  alertId: string;
  created: string;
  lastUpdated: string;
  sla: string;
  closedDate?: string;
  // Related entities
  employee: { name: string; role: string; department: string };
  vendor: { name: string; id: string };
  approver: { name: string; role: string; department: string };
  // Linked alert
  linkedAlert: { id: string; type: string; date: string };
  // Transactions
  connectedTransactions: ConnectedTransaction[];
  // Investigation
  investigationStarted: boolean;
  evidence: EvidenceFile[];
  timeline: TimelineEvent[];
  aiSummary: string | null;
  aiConfidence: number | null;
  aiRecommendations: string[];
  patternDetections: string[];
  totalExposure: string;
  duplicateAmount: string;
  riskScore: string;
  transactionCount: number;
  comments: Comment[];
  activityLog: ActivityLogEntry[];
  statusHistory: StatusHistoryEntry[];
  // Assignees
  investigator: { name: string; role: string; dept: string } | null;
  reviewer: { name: string; role: string; dept: string } | null;
}

export const MOCK_CASES: Case[] = [
  {
    id: "CASE-2847",
    status: "New",
    severity: "Critical",
    title: "Duplicate Payment Investigation – Acme Supplies",
    assignedTo: "Sarah Chen",
    alertId: "ALT-2847",
    created: "2026-05-11 08:47",
    lastUpdated: "2026-05-11 08:47",
    sla: "2 days remaining",
    employee: {
      name: "James Mitchell",
      role: "Procurement Officer",
      department: "Procurement",
    },
    vendor: { name: "Acme Supplies", id: "VND-8847" },
    approver: {
      name: "Lisa Thompson",
      role: "Finance Manager",
      department: "Finance",
    },
    linkedAlert: {
      id: "ALT-2847",
      type: "Duplicate Payment",
      date: "2026-05-11 08:42",
    },
    connectedTransactions: [
      {
        id: "TXN-88471",
        amount: "$42,350",
        date: "2026-05-11 08:42",
        status: "Completed",
      },
      {
        id: "TXN-88472",
        amount: "$42,350",
        date: "2026-05-11 08:42",
        status: "Completed",
      },
    ],
    investigationStarted: false,
    evidence: [],
    timeline: [
      {
        id: "t2",
        type: "case_assigned",
        title: "Case Assigned",
        description: "Assigned to Sarah Chen for investigation",
        by: "David K",
        byInitials: "DK",
        byColor: "bg-slate-600",
        timeAgo: "1 day ago",
      },
      {
        id: "t1",
        type: "case_created",
        title: "Case Created",
        description: "Created from alert #ALT-2847",
        by: "David K",
        byInitials: "DK",
        byColor: "bg-slate-600",
        timeAgo: "1 day ago",
      },
    ],
    aiSummary: null,
    aiConfidence: null,
    aiRecommendations: [],
    patternDetections: [],
    totalExposure: "$84,700",
    duplicateAmount: "$42,350",
    riskScore: "98%",
    transactionCount: 2,
    comments: [],
    activityLog: [
      { id: "a2", event: "Case assigned", by: "David K", timeAgo: "1d ago" },
      {
        id: "a1",
        event: "Case created from alert ALT-2847",
        by: "David K",
        timeAgo: "1d ago",
      },
    ],
    statusHistory: [
      { from: "Assigned", to: "Open", date: "May 24, 2026 at 09:30 AM" },
    ],
    investigator: {
      name: "Sarah Chen",
      role: "Senior Investigator",
      dept: "Compliance Operations",
    },
    reviewer: null,
  },
  {
    id: "CASE-2848",
    status: "Under Review",
    severity: "Critical",
    title: "Ghost Vendor Investigation – Phantom Solutions LLC",
    assignedTo: "Alex Rodriguez",
    alertId: "ALT-2848",
    created: "2026-05-11 08:14",
    lastUpdated: "2026-05-11 08:47",
    sla: "1 day remaining",
    employee: {
      name: "Rebecca Torres",
      role: "Finance Analyst",
      department: "Finance",
    },
    vendor: { name: "Phantom Solutions LLC", id: "VND-9901" },
    approver: {
      name: "Mike Thompson",
      role: "Finance Director",
      department: "Finance",
    },
    linkedAlert: {
      id: "ALT-2848",
      type: "Ghost Vendor",
      date: "2026-05-11 08:14",
    },
    connectedTransactions: [
      {
        id: "TXN-88473",
        amount: "₦1,200,000",
        date: "2026-05-08 14:10",
        status: "Completed",
      },
      {
        id: "TXN-88474",
        amount: "₦950,000",
        date: "2026-05-10 09:30",
        status: "Completed",
      },
    ],
    investigationStarted: true,
    evidence: [
      {
        id: "e1",
        name: "Invoice_INV-2024-8847.pdf",
        size: "342 KB",
        uploadedBy: "Sarah Chen",
        uploadedAt: "2026-05-11 08:42",
      },
      {
        id: "e2",
        name: "Invoice_INV-2024-8847.pdf",
        size: "342 KB",
        uploadedBy: "S. Chen",
        uploadedAt: "2026-05-11 09:18",
      },
      {
        id: "e3",
        name: "Vendor_Contract.pdf",
        size: "342 KB",
        uploadedBy: "M.John",
        uploadedAt: "2026-05-11 08:42",
      },
    ],
    timeline: [
      {
        id: "t6",
        type: "comment",
        title: "Comment by Reviewer",
        description: "Comment added by Reviewer",
        by: "Micheal Johnson",
        byInitials: "MJ",
        byColor: "bg-indigo-600",
        timeAgo: "3 hours ago",
      },
      {
        id: "t5",
        type: "reviewer_assigned",
        title: "Assigned Case to Reviewer",
        description: "Case assigned to Micheal Johnson",
        by: "Sarah Chen",
        byInitials: "SC",
        byColor: "bg-teal-600",
        timeAgo: "5 hours ago",
      },
      {
        id: "t4",
        type: "evidence_uploaded",
        title: "Evidence uploaded",
        description: "Invoice_Acme_May23.pdf and supporting documents",
        by: "Sarah Chen",
        byInitials: "SC",
        byColor: "bg-teal-600",
        timeAgo: "2 hours ago",
      },
      {
        id: "t3",
        type: "note_added",
        title: "Investigation Note Added",
        description:
          "Identified duplicate invoice numbers and matching amounts",
        by: "Sarah Chen",
        byInitials: "SC",
        byColor: "bg-teal-600",
        timeAgo: "6 hours ago",
      },
      {
        id: "t2",
        type: "case_assigned",
        title: "Case Assigned",
        description: "Assigned to Sarah Chen for investigation",
        by: "System",
        byInitials: "DK",
        byColor: "bg-slate-600",
        timeAgo: "1 day ago",
      },
      {
        id: "t1",
        type: "case_created",
        title: "Case Created",
        description: "Created from alert #ALT-2847",
        by: "System",
        byInitials: "DK",
        byColor: "bg-slate-600",
        timeAgo: "1 day ago",
      },
    ],
    aiSummary:
      "Analysis indicates a high probability of duplicate payment processing error. Two identical transactions were submitted to the same vendor within a 4-minute window, sharing the same invoice number, amount, and approval chain. Pattern suggests system-level duplicate submission rather than fraudulent activity.",
    aiConfidence: 92,
    aiRecommendations: [
      "Contact vendor to confirm receipt and request refund for duplicate payment.",
      "Review accounts payable system controls to prevent duplicate submissions.",
      "Implement invoice number validation in payment processing workflow.",
    ],
    patternDetections: [
      "Identical invoice numbers across both transactions",
      "Same payment amount ($42,350.00)",
      "Processed through different payment batches",
      "Approved by the same procurement officer",
    ],
    totalExposure: "$84,700",
    duplicateAmount: "$42,350",
    riskScore: "98%",
    transactionCount: 2,
    comments: [
      {
        id: "c1",
        author: "Sarah Chen",
        authorInitials: "SC",
        authorColor: "bg-teal-600",
        timeAgo: "3 hours ago",
        text: "Investigation complete. Vendor confirmed system error during maintenance caused duplicate payment entry. No evidence of fraud. Recommend closure with vendor process improvement notice.",
      },
      {
        id: "c2",
        author: "Micheal Johnson",
        authorInitials: "MJ",
        authorColor: "bg-indigo-600",
        timeAgo: "1 day ago",
        text: "Review complete. Findings are thorough and well-documented. Approve for closure pending final governance sign-off.",
      },
    ],
    activityLog: [
      {
        id: "a7",
        event: "Comment added",
        by: "Micheal Johnson",
        timeAgo: "2h ago",
      },
      {
        id: "a6",
        event: "Assigned Case to Reviewer",
        by: "Sarah Chen",
        timeAgo: "5h ago",
      },
      {
        id: "a5",
        event: "Evidence uploaded",
        by: "Sarah Chen",
        timeAgo: "2h ago",
      },
      {
        id: "a4",
        event: "Vendor contacted",
        by: "Sarah Chen",
        timeAgo: "5h ago",
      },
      { id: "a3", event: "Note added", by: "Sarah Chen", timeAgo: "6h ago" },
      {
        id: "a2",
        event: "Investigation Started",
        by: "Sarah Chen",
        timeAgo: "1d ago",
      },
      { id: "a1", event: "Case assigned", by: "David K", timeAgo: "1d ago" },
    ],
    statusHistory: [
      { from: "Assigned", to: "Open", date: "May 24, 2026 at 09:30 AM" },
      { from: "Open", to: "Investigating", date: "May 24, 2026 at 10:15 AM" },
      { from: "Investigating", to: "Review", date: "May 24, 2026 at 10:15 AM" },
    ],
    investigator: {
      name: "Sarah Chen",
      role: "Senior Investigator",
      dept: "Compliance Operations",
    },
    reviewer: {
      name: "Micheal Johnson",
      role: "Lead Investigator",
      dept: "Compliance Operations",
    },
  },

  // --- NEW MOCK DATA ---
  {
    id: "CASE-2849",
    status: "Investigating",
    severity: "High",
    title: "Split Payments / Structuring – Office Furnishings",
    assignedTo: "Frank Mba",
    alertId: "ALT-2849",
    created: "2026-06-15 11:20",
    lastUpdated: "2026-05-11 08:47",
    sla: "4 hours remaining",
    employee: {
      name: "Derek Hale",
      role: "Operations Manager",
      department: "Operations",
    },
    vendor: { name: "Ergo Workspace Solutions", id: "VND-4412" },
    approver: {
      name: "Simon Riley",
      role: "VP Operations",
      department: "Executive",
    },
    linkedAlert: {
      id: "ALT-2849",
      type: "Invoice Structuring",
      date: "2026-06-15 11:15",
    },
    connectedTransactions: [
      {
        id: "TXN-88475",
        amount: "$9,800",
        date: "2026-06-12 10:00",
        status: "Completed",
      },
      {
        id: "TXN-88476",
        amount: "$9,500",
        date: "2026-06-13 14:20",
        status: "Completed",
      },
      {
        id: "TXN-88477",
        amount: "$9,950",
        date: "2026-06-14 09:15",
        status: "Completed",
      },
    ],
    investigationStarted: true,
    evidence: [
      {
        id: "e4",
        name: "PO_Batch_June.pdf",
        size: "1.2 MB",
        uploadedBy: "Frank Mba",
        uploadedAt: "2026-06-16 09:00",
      },
    ],
    timeline: [
      {
        id: "t7",
        type: "evidence_uploaded",
        title: "Evidence uploaded",
        description: "Purchase Order Batch uploaded",
        by: "Frank Mba",
        byInitials: "FM",
        byColor: "bg-orange-600",
        timeAgo: "1 day ago",
      },
      {
        id: "t8",
        type: "note_added",
        title: "Note Added",
        description:
          "Payments deliberately kept under the $10,000 approval threshold.",
        by: "Frank Mba",
        byInitials: "FM",
        byColor: "bg-orange-600",
        timeAgo: "2 days ago",
      },
    ],
    aiSummary:
      "Pattern strongly suggests intentional invoice splitting (structuring) to bypass the $10,000 mandatory executive approval threshold. Three invoices were submitted consecutively over three days for similar amounts to the same vendor.",
    aiConfidence: 88,
    aiRecommendations: [
      "Suspend further payments to vendor until review is complete.",
      "Interview the submitting employee regarding procurement policy.",
      "Consolidate invoices and route to VP for retrospective approval.",
    ],
    patternDetections: [
      "Multiple transactions just below approval threshold ($10k)",
      "Consecutive daily submissions",
      "Sequential invoice numbers from vendor",
    ],
    totalExposure: "$29,250",
    duplicateAmount: "",
    riskScore: "85%",
    transactionCount: 3,
    comments: [
      {
        id: "c3",
        author: "Frank Mba",
        authorInitials: "FM",
        authorColor: "bg-orange-600",
        timeAgo: "1 day ago",
        text: "Reached out to Derek Hale for context. He claims it was due to stock availability, but invoice dates contradict this.",
      },
    ],
    activityLog: [
      {
        id: "a8",
        event: "Evidence uploaded",
        by: "Frank Mba",
        timeAgo: "1d ago",
      },
      {
        id: "a9",
        event: "Investigation Started",
        by: "Frank Mba",
        timeAgo: "3d ago",
      },
    ],
    statusHistory: [
      { from: "New", to: "Open", date: "June 15, 2026 at 12:00 PM" },
      { from: "Open", to: "Investigating", date: "June 15, 2026 at 02:30 PM" },
    ],
    investigator: {
      name: "Frank Mba",
      role: "Financial Fraud Specialist",
      dept: "Compliance Operations",
    },
    reviewer: null,
  },
  {
    id: "CASE-2850",
    status: "Escalated",
    severity: "Critical",
    title: "Unregistered Supplier Payment – Global Tech Logistics",
    assignedTo: "Mike Thompson",
    alertId: "ALT-2850",
    created: "2026-06-17 09:05",
    lastUpdated: "2026-05-11 08:47",
    sla: "Breached",
    employee: { name: "Chloe Price", role: "IT Procurement", department: "IT" },
    vendor: { name: "Global Tech Logistics", id: "VND-UNREG" },
    approver: { name: "Mark Jefferson", role: "IT Director", department: "IT" },
    linkedAlert: {
      id: "ALT-2850",
      type: "Unregistered Vendor",
      date: "2026-06-17 08:50",
    },
    connectedTransactions: [
      {
        id: "TXN-88478",
        amount: "£125,000",
        date: "2026-06-16 16:45",
        status: "Pending",
      },
    ],
    investigationStarted: true,
    evidence: [
      {
        id: "e5",
        name: "Wire_Transfer_Req.pdf",
        size: "450 KB",
        uploadedBy: "System",
        uploadedAt: "2026-06-17 09:05",
      },
      {
        id: "e6",
        name: "Vendor_Screening_Fail.html",
        size: "12 KB",
        uploadedBy: "Mike Thompson",
        uploadedAt: "2026-06-17 10:15",
      },
    ],
    timeline: [
      {
        id: "t9",
        type: "status_change",
        title: "Case Escalated",
        description: "Escalated to Legal due to OFAC screening failure.",
        by: "Mike Thompson",
        byInitials: "MT",
        byColor: "bg-red-600",
        timeAgo: "4 hours ago",
      },
      {
        id: "t10",
        type: "note_added",
        title: "Note Added",
        description: "Vendor address matches a known shell company registry.",
        by: "Mike Thompson",
        byInitials: "MT",
        byColor: "bg-red-600",
        timeAgo: "6 hours ago",
      },
    ],
    aiSummary:
      "CRITICAL: Attempted high-value wire transfer to an unregistered vendor. Cross-referencing vendor details reveals an address match with a sanctioned entity. Transfer has been halted automatically.",
    aiConfidence: 99,
    aiRecommendations: [
      "Halt payment immediately.",
      "Notify Legal and Compliance teams.",
      "Initiate internal audit of IT Procurement approval chain.",
    ],
    patternDetections: [
      "Vendor not found in Master Vendor File",
      "High-risk geographic location",
      "First-time payment over $100k",
    ],
    totalExposure: "£125,000",
    duplicateAmount: "",
    riskScore: "100%",
    transactionCount: 1,
    comments: [
      {
        id: "c4",
        author: "Mike Thompson",
        authorInitials: "MT",
        authorColor: "bg-red-600",
        timeAgo: "4 hours ago",
        text: "Escalating immediately. Do not process any transactions for Global Tech Logistics.",
      },
    ],
    activityLog: [
      {
        id: "a10",
        event: "Case Escalated",
        by: "Mike Thompson",
        timeAgo: "4h ago",
      },
      { id: "a11", event: "Payment Halted", by: "System", timeAgo: "1d ago" },
    ],
    statusHistory: [
      { from: "New", to: "Investigating", date: "June 17, 2026 at 09:10 AM" },
      {
        from: "Investigating",
        to: "Escalated",
        date: "June 17, 2026 at 11:30 AM",
      },
    ],
    investigator: {
      name: "Mike Thompson",
      role: "Sr. AML Analyst",
      dept: "Risk Management",
    },
    reviewer: {
      name: "Helen Cho",
      role: "Chief Compliance Officer",
      dept: "Executive",
    },
  },
  {
    id: "CASE-2851",
    status: "Closed",
    severity: "Low",
    title: "Expense Anomaly – Weekend Entertainment",
    assignedTo: "Sarah Chen",
    alertId: "ALT-2851",
    created: "2026-06-01 14:22",
    lastUpdated: "2026-05-11 08:47",
    sla: "Completed",
    employee: { name: "Tom Haverford", role: "Sales Rep", department: "Sales" },
    vendor: { name: "Snakehole Lounge", id: "VND-7732" },
    approver: {
      name: "Ron Swanson",
      role: "Sales Director",
      department: "Sales",
    },
    linkedAlert: {
      id: "ALT-2851",
      type: "Out of Policy Expense",
      date: "2026-06-01 14:15",
    },
    connectedTransactions: [
      {
        id: "TXN-88479",
        amount: "$850",
        date: "2026-05-28 23:45",
        status: "Flagged",
      },
    ],
    investigationStarted: true,
    evidence: [
      {
        id: "e7",
        name: "Receipt_Scan.jpg",
        size: "2.1 MB",
        uploadedBy: "Tom Haverford",
        uploadedAt: "2026-06-01 14:10",
      },
    ],
    timeline: [
      {
        id: "t11",
        type: "status_change",
        title: "Case Closed",
        description: "Expense rejected, employee warned.",
        by: "Sarah Chen",
        byInitials: "SC",
        byColor: "bg-teal-600",
        timeAgo: "2 weeks ago",
      },
    ],
    aiSummary:
      "Expense report flagged for containing weekend entertainment charges explicitly prohibited by the T&E policy. Merchant Category Code (MCC) matches 'Bars/Taverns'.",
    aiConfidence: 95,
    aiRecommendations: ["Reject expense.", "Send policy reminder to employee."],
    patternDetections: [
      "Restricted Merchant Category Code",
      "Weekend transaction time (Saturday 11:45 PM)",
    ],
    totalExposure: "$850",
    duplicateAmount: "$92,350",
    riskScore: "45%",
    transactionCount: 1,
    comments: [
      {
        id: "c5",
        author: "Ron Swanson",
        authorInitials: "RS",
        authorColor: "bg-amber-800",
        timeAgo: "2 weeks ago",
        text: "I have spoken to Tom. Expense is denied.",
      },
    ],
    activityLog: [
      { id: "a12", event: "Case Closed", by: "Sarah Chen", timeAgo: "2w ago" },
      {
        id: "a13",
        event: "Expense Rejected",
        by: "Ron Swanson",
        timeAgo: "2w ago",
      },
    ],
    statusHistory: [
      { from: "New", to: "Open", date: "June 01, 2026 at 03:00 PM" },
      { from: "Open", to: "Closed", date: "June 03, 2026 at 10:00 AM" },
    ],
    investigator: {
      name: "Sarah Chen",
      role: "Senior Investigator",
      dept: "Compliance Operations",
    },
    reviewer: null,
  },
  {
    id: "CASE-2852",
    status: "Open",
    severity: "Medium",
    title: "Abnormal Refund Processing – Retail Store #42",
    assignedTo: "Alex Rodriguez",
    alertId: "ALT-2852",
    created: "2026-06-18 10:15",
    lastUpdated: "2026-05-11 08:47",
    sla: "3 days remaining",
    employee: {
      name: "Amy Santiago",
      role: "Store Manager",
      department: "Retail",
    },
    vendor: { name: "N/A - Customer Refund", id: "CUST-REF" },
    approver: {
      name: "Ray Holt",
      role: "Regional Manager",
      department: "Retail Ops",
    },
    linkedAlert: {
      id: "ALT-2852",
      type: "High Volume Refunds",
      date: "2026-06-18 10:10",
    },
    connectedTransactions: [
      {
        id: "TXN-88480",
        amount: "$1,200",
        date: "2026-06-18 09:30",
        status: "Completed",
      },
      {
        id: "TXN-88481",
        amount: "$950",
        date: "2026-06-18 09:45",
        status: "Completed",
      },
      {
        id: "TXN-88482",
        amount: "$1,400",
        date: "2026-06-18 10:05",
        status: "Completed",
      },
    ],
    investigationStarted: false,
    evidence: [],
    timeline: [
      {
        id: "t12",
        type: "case_created",
        title: "Case Created",
        description: "System generated based on sudden refund spike.",
        by: "System",
        byInitials: "SYS",
        byColor: "bg-gray-800",
        timeAgo: "4 hours ago",
      },
    ],
    aiSummary:
      "Store #42 has processed a highly anomalous volume of cash refunds within a 45-minute window before official store opening hours.",
    aiConfidence: 82,
    aiRecommendations: [
      "Review CCTV footage for POS terminal 3.",
      "Verify original purchase receipts for the refunded items.",
    ],
    patternDetections: [
      "Transactions outside normal business hours",
      "Cash refund ratio exceeded 200% of daily average",
    ],
    totalExposure: "$3,550",
    duplicateAmount: "$2,350",
    riskScore: "72%",
    transactionCount: 3,
    comments: [],
    activityLog: [
      {
        id: "a14",
        event: "Case created from alert ALT-2852",
        by: "System",
        timeAgo: "4h ago",
      },
    ],
    statusHistory: [
      { from: "Assigned", to: "Open", date: "June 18, 2026 at 10:20 AM" },
    ],
    investigator: {
      name: "Alex Rodriguez",
      role: "Retail Fraud Analyst",
      dept: "Loss Prevention",
    },
    reviewer: null,
  },
];

export const REVIEWERS = [
  "Micheal Johnson",
  "Alex Rodriguez",
  "Lisa K.",
  "Sarah Chen",
  "David K.",
];
