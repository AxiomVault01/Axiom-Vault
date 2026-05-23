export type Severity = "Critical" | "High" | "Medium" | "Low";
export type AlertStatus = "New" | "Investigating" | "Escalated" | "Resolved";

export interface Alert {
  id: string;
  employee: string;
  riskType: string;
  department: string;
  severity: Severity;
  confidence: number;
  status: AlertStatus;
  detected: string;
  assigned: string;
  description: string;
  flaggedTransactions: { id: string; amount: string; date: string }[];
  timeline: { event: string; time: string; type: "alert" | "action" | "system" }[];
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "ALT-2847",
    employee: "James Mitchell",
    riskType: "Duplicate Payment",
    department: "Procurement",
    severity: "Critical",
    confidence: 98,
    status: "New",
    detected: "2026-05-11 08:42",
    assigned: "Auto-assigned",
    description: "Duplicate payment detected. The same invoice (INV-2024-0892) was submitted and processed twice by James Mitchell within a 3-day window, paid to the same vendor account from different cost centers.",
    flaggedTransactions: [
      { id: "TXN-00214", amount: "₦485,000", date: "2026-05-09" },
      { id: "TXN-00455", amount: "₦485,000", date: "2026-05-11" },
    ],
    timeline: [
      { event: "Alert Generated — ALT-2847 created by anomaly engine", time: "2026-05-11 08:42", type: "alert" },
      { event: "Second payment TXN-00455 processed", time: "2026-05-11 08:40", type: "system" },
      { event: "First payment TXN-00214 processed", time: "2026-05-09 14:22", type: "system" },
    ],
  },
  {
    id: "ALT-2848",
    employee: "Phantom Solutions LLC",
    riskType: "Ghost Vendor",
    department: "Finance",
    severity: "Critical",
    confidence: 95,
    status: "Investigating",
    detected: "2026-05-11 08:14",
    assigned: "Alex R.",
    description: "Payments made to a vendor with no verifiable business registration, no physical address, and no prior procurement history. Pattern consistent with shell company fraud.",
    flaggedTransactions: [
      { id: "TXN-00198", amount: "₦1,200,000", date: "2026-05-08" },
      { id: "TXN-00201", amount: "₦950,000", date: "2026-05-10" },
    ],
    timeline: [
      { event: "Investigation opened by Alex R.", time: "2026-05-11 09:15", type: "action" },
      { event: "Alert Generated — ALT-2848 created", time: "2026-05-11 08:14", type: "alert" },
    ],
  },
  {
    id: "ALT-2849",
    employee: "Rebecca Torres",
    riskType: "Salary Anomaly",
    department: "HR",
    severity: "Critical",
    confidence: 87,
    status: "New",
    detected: "2026-05-11 07:23",
    assigned: "Auto-assigned",
    description: "Employee salary was modified three times in 30 days without corresponding HR approval records. Net change of +₦85,000/month above approved grade.",
    flaggedTransactions: [
      { id: "TXN-00177", amount: "₦320,000", date: "2026-05-01" },
      { id: "TXN-00188", amount: "₦375,000", date: "2026-05-07" },
      { id: "TXN-00210", amount: "₦405,000", date: "2026-05-11" },
    ],
    timeline: [
      { event: "Alert Generated — ALT-2849 created", time: "2026-05-11 07:23", type: "alert" },
      { event: "Third salary modification processed", time: "2026-05-11 07:20", type: "system" },
    ],
  },
  {
    id: "ALT-2850",
    employee: "Marcus Chen",
    riskType: "Approval Bypass",
    department: "Operations",
    severity: "High",
    confidence: 92,
    status: "Escalated",
    detected: "2026-05-11 06:15",
    assigned: "Lisa K.",
    description: "Purchase orders totaling ₦2.4M processed without required dual-approval. System audit trail shows approval timestamps within 4 seconds of each other from the same IP address.",
    flaggedTransactions: [
      { id: "TXN-00155", amount: "₦1,100,000", date: "2026-05-10" },
      { id: "TXN-00160", amount: "₦1,300,000", date: "2026-05-10" },
    ],
    timeline: [
      { event: "Case escalated by Lisa K.", time: "2026-05-11 10:30", type: "action" },
      { event: "Alert Generated — ALT-2850 created", time: "2026-05-11 06:15", type: "alert" },
    ],
  },
  {
    id: "ALT-2851",
    employee: "Global Tech Supplies",
    riskType: "Invoice Pattern",
    department: "Procurement",
    severity: "High",
    confidence: 78,
    status: "Investigating",
    detected: "2026-05-11 05:47",
    assigned: "Sarah C.",
    description: "Vendor invoices consistently submitted just below the ₦500,000 approval threshold. 11 invoices in 60 days ranging ₦480,000–₦499,000, classic threshold manipulation pattern.",
    flaggedTransactions: [
      { id: "TXN-00101", amount: "₦495,000", date: "2026-04-15" },
      { id: "TXN-00119", amount: "₦488,000", date: "2026-04-28" },
      { id: "TXN-00133", amount: "₦499,000", date: "2026-05-05" },
    ],
    timeline: [
      { event: "Investigation opened by Sarah C.", time: "2026-05-11 08:00", type: "action" },
      { event: "Alert Generated — ALT-2851 created", time: "2026-05-11 05:47", type: "alert" },
    ],
  },
  {
    id: "ALT-2852",
    employee: "Sarah Anderson",
    riskType: "Overtime Fraud",
    department: "HR",
    severity: "Low",
    confidence: 82,
    status: "New",
    detected: "2026-05-11 04:31",
    assigned: "Auto-assigned",
    description: "Overtime claims submitted for periods when building access logs show employee was not on-site. 14 discrepancies over 6 weeks totaling ₦62,000 in unverified overtime.",
    flaggedTransactions: [
      { id: "TXN-00089", amount: "₦18,500", date: "2026-04-20" },
      { id: "TXN-00094", amount: "₦22,000", date: "2026-04-27" },
    ],
    timeline: [
      { event: "Alert Generated — ALT-2852 created", time: "2026-05-11 04:31", type: "alert" },
    ],
  },
  {
    id: "ALT-2853",
    employee: "Tech Innovations Inc",
    riskType: "Vendor Fraud",
    department: "Finance",
    severity: "Low",
    confidence: 89,
    status: "New",
    detected: "2026-05-10 18:22",
    assigned: "Auto-assigned",
    description: "Vendor bank account changed 3 days before large payment. New account linked to a previously flagged entity in the system fraud database.",
    flaggedTransactions: [
      { id: "TXN-00077", amount: "₦750,000", date: "2026-05-10" },
    ],
    timeline: [
      { event: "Alert Generated — ALT-2853 created", time: "2026-05-10 18:22", type: "alert" },
    ],
  },
  {
    id: "ALT-2854",
    employee: "David Park",
    riskType: "Ghost Worker",
    department: "HR",
    severity: "Critical",
    confidence: 94,
    status: "Escalated",
    detected: "2026-05-10 16:45",
    assigned: "Lisa K.",
    description: "Employee on payroll with no biometric check-ins, no system logins, and no deliverables recorded in 4 months. HR records show active employment status.",
    flaggedTransactions: [
      { id: "TXN-00055", amount: "₦280,000", date: "2026-05-01" },
      { id: "TXN-00031", amount: "₦280,000", date: "2026-04-01" },
    ],
    timeline: [
      { event: "Case escalated by Lisa K.", time: "2026-05-11 09:00", type: "action" },
      { event: "Alert Generated — ALT-2854 created", time: "2026-05-10 16:45", type: "alert" },
    ],
  },
];