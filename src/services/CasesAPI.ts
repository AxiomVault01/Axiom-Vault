import api from "./Axios";
import { Case, CaseStatus, EvidenceFile, Severity } from "../pages/Cases/CasesData";

export interface CasePerson {
  id: string;
  full_name: string;
  email?: string;
}

export interface FraudCase {
  reference: string;
  title: string;
  status: string;
  priority: string;
  investigator: CasePerson | null;
  reviewer: CasePerson | null;
  alerts_count: number;
  evidence_count: number;
  sla_due_at: string | null;
  sla_days_remaining: number | null;
  days_open: number;
  created_at: string;
  updated_at: string;
  description: string;
  created_by: CasePerson | null;
  escalation: {
    reason: string;
    reason_label: string;
    escalated_to: CasePerson | null;
    notes: string;
    escalated_at: string;
  } | null;
  alerts?: {
    reference: string;
    risk_type: string;
    title: string;
    entity_type: string;
    entity_name: string;
    entity_ref: string;
    department: string;
    severity: string;
    detected_at: string;
  }[];
  related?: {
    employees?: { id: string; name: string }[];
    vendors?: { id: string; name: string }[];
    approvers?: string[];
  };
  transactions?: {
    transaction_id: string;
    payment_date: string;
    amount: string;
    invoice_number: string;
    approver: string;
    alert: string;
  }[];
  comments_count: number;
  closed_at: string | null;
  currency: string;
  ai_summary: string;
  ai_recommendations?: string[];
}

export interface CaseComment {
  id: string;
  text: string;
  author: CasePerson | null;
  created_at: string;
}

export interface CaseEvidence {
  id: string;
  file_id: string;
  file_name: string;
  file_size?: number;
  uploaded_by?: CasePerson | null;
  created_at: string;
}

export interface CaseHistoryItem {
  id: string;
  type: string;
  detail: string;
  actor: CasePerson | null;
  created_at: string;
  from_status?: string;
  to_status?: string;
}

export interface CaseReportPerson {
  id: string;
  full_name: string;
  profile_picture?: string | null;
}

export interface CaseReportTransaction {
  transaction_id: string;
  payment_date: string;
  amount: string;
  invoice_number: string;
  approver: string;
  alert: string;
}

export interface CaseReportAlert {
  reference: string;
  title: string;
  risk_type: string;
  rule: string;
  severity: string;
  status: string;
  risk_score: number;
  confidence: number;
  entity_type: string;
  entity_name: string;
  entity_ref: string;
  department: string;
  explanation: string;
  flagged_records: CaseReportTransaction[];
  detected_at: string;
}

export interface CaseReport {
  case: FraudCase;
  alerts: CaseReportAlert[];
  analysis: {
    total_exposure: string;
    duplicate_amount: string;
    risk_score: number;
    transaction_count: number;
    currency: string;
    source: string;
  };
  related: {
    employees: { id: string; name: string; role?: string; department?: string }[];
    vendors: { id: string; name: string; bank_name?: string; registration_number?: string }[];
    approvers: { id: string; name: string; role: string; department: string }[];
  };
  evidence: {
    file_name: string;
    content_type: string;
    size: number;
    source: string;
    added_by: CaseReportPerson | null;
    added_at: string;
  }[];
  comments: {
    id: string;
    text: string;
    author: CaseReportPerson | null;
    created_at: string;
  }[];
  history: {
    id: string;
    type: string;
    actor: CaseReportPerson | null;
    from_status: string;
    to_status: string;
    detail: string;
    created_at: string;
  }[];
  generated_at: string;
  generated_by: CaseReportPerson | null;
}

export type CaseReportFormat = "pdf" | "xlsx";

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CaseAssignmentPayload {
  investigator_id: string | null;
  reviewer_id: string | null;
}

export interface CaseEscalationPayload {
  reason: string;
  escalate_to_id: string;
  priority: string;
  notes: string;
}

export interface CaseStatusPayload {
  status: string;
  note?: string;
}

const unwrap = <T>(data: T | { data: T }): T =>
  (data as { data?: T })?.data ?? (data as T);

const normalizePage = <T>(body: unknown): Paginated<T> => {
  if (Array.isArray(body)) {
    return { count: body.length, next: null, previous: null, results: body };
  }
  if (!body || typeof body !== "object" || !Array.isArray((body as Paginated<T>).results)) {
    throw new Error("The cases API returned an invalid paginated response.");
  }
  const page = body as Partial<Paginated<T>>;
  return {
    count: typeof page.count === "number" ? page.count : page.results!.length,
    next: typeof page.next === "string" ? page.next : null,
    previous: typeof page.previous === "string" ? page.previous : null,
    results: page.results as T[],
  };
};

const caseUrl = (reference: string) =>
  `/fraud/cases/${encodeURIComponent(reference)}/`;

export const getCases = async (page = 1) => {
  const results: FraudCase[] = [];
  const visited = new Set<string>();
  let next: string | null = `/fraud/cases/?page=${page}`;
  let count = 0;

  while (next) {
    if (visited.has(next)) {
      throw new Error("The cases API returned a repeated page link.");
    }
    visited.add(next);
    const responseData: unknown = (await api.get(next)).data;
    const response: Paginated<FraudCase> =
      normalizePage<FraudCase>(unwrap(responseData));
    results.push(...response.results);
    count = response.count;
    next = response.next;
  }

  return { count, next: null, previous: null, results };
};

export const createCaseFromAlerts = async (alerts: string[]) => {
  const { data } = await api.post("/fraud/cases/", { alerts });
  return unwrap<FraudCase>(data);
};

export const getCase = async (reference: string) => {
  const { data } = await api.get(caseUrl(reference));
  return unwrap<FraudCase>(data);
};

export const assignCase = async (
  reference: string,
  payload: CaseAssignmentPayload,
) => {
  const { data } = await api.put(`${caseUrl(reference)}assignment/`, payload);
  return unwrap<FraudCase>(data);
};

export const getCaseComments = async (reference: string, page = 1) => {
  const { data } = await api.get(`${caseUrl(reference)}comments/`, { params: { page } });
  return normalizePage<CaseComment>(unwrap(data));
};

export const addCaseComment = async (reference: string, text: string) => {
  const { data } = await api.post(`${caseUrl(reference)}comments/`, { text });
  return unwrap<CaseComment>(data);
};

export const escalateCase = async (
  reference: string,
  payload: CaseEscalationPayload,
) => {
  const { data } = await api.post(`${caseUrl(reference)}escalate/`, payload);
  return unwrap<FraudCase>(data);
};

export const getCaseEvidence = async (reference: string) => {
  const { data } = await api.get(`${caseUrl(reference)}evidence/`);
  return normalizePage<CaseEvidence>(unwrap(data));
};

export const attachCaseEvidence = async (
  reference: string,
  fileId: string,
) => {
  const { data } = await api.post(`${caseUrl(reference)}evidence/`, { file_id: fileId });
  return unwrap<CaseEvidence>(data);
};

export const removeCaseEvidence = async (
  reference: string,
  evidenceId: string,
) => {
  const { data } = await api.delete(
    `${caseUrl(reference)}evidence/${encodeURIComponent(evidenceId)}/`,
  );
  return data;
};

export const getCaseHistory = async (reference: string, page = 1) => {
  const { data } = await api.get(`${caseUrl(reference)}history/`, { params: { page } });
  return normalizePage<CaseHistoryItem>(unwrap(data));
};

export const updateCaseStatus = async (
  reference: string,
  payload: CaseStatusPayload,
) => {
  const { data } = await api.post(`${caseUrl(reference)}status/`, payload);
  return unwrap<FraudCase>(data);
};

export const getCaseReport = async (reference: string) => {
  const { data } = await api.get(`${caseUrl(reference)}report/`);
  return unwrap<CaseReport>(data);
};

const filenameFromDisposition = (header?: string) => {
  const match = header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return match ? decodeURIComponent(match[1]) : null;
};

// Fetches the generated file as a blob and saves it through a temporary link
export const downloadCaseReport = async (
  reference: string,
  format: CaseReportFormat,
) => {
  const response = await api.get(`${caseUrl(reference)}report/${format}/`, {
    responseType: "blob",
    timeout: 60000, // report generation can take longer than regular requests
  });
  const fileName =
    filenameFromDisposition(response.headers["content-disposition"]) ??
    `${reference}_Investigation_Report.${format}`;
  const url = URL.createObjectURL(response.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return fileName;
};

const caseStatus = (status: string): CaseStatus => {
  const normalized = status.toLowerCase().replace(/_/g, " ");
  const known: Record<string, CaseStatus> = {
    new: "New",
    open: "Open",
    investigating: "Investigating",
    "under review": "Under Review",
    escalated: "Escalated",
    closed: "Closed",
  };
  return known[normalized] ?? "Open";
};

const severity = (priority: string): Severity => {
  const normalized = priority.toLowerCase();
  if (normalized === "critical" || normalized === "high" || normalized === "medium") {
    return (normalized.charAt(0).toUpperCase() + normalized.slice(1)) as Severity;
  }
  return "Low";
};

// Keep existing case widgets compatible while displaying data returned by the cases API.
export const toCaseView = (item: FraudCase): Case => {
  const alerts = Array.isArray(item.alerts) ? item.alerts : [];
  const relatedEmployees = Array.isArray(item.related?.employees)
    ? item.related.employees
    : [];
  const relatedVendors = Array.isArray(item.related?.vendors)
    ? item.related.vendors
    : [];
  const approvers = Array.isArray(item.related?.approvers)
    ? item.related.approvers
    : [];
  const transactionsData = Array.isArray(item.transactions) ? item.transactions : [];
  const recommendations = Array.isArray(item.ai_recommendations)
    ? item.ai_recommendations
    : [];
  const alert = alerts[0];
  const employee = relatedEmployees[0];
  const vendor = relatedVendors[0];
  const approverName = approvers[0] ?? "Unspecified";
  const transactions = transactionsData.map((transaction) => ({
    id: transaction.transaction_id,
    amount: `${item.currency} ${transaction.amount}`,
    date: transaction.payment_date,
    status: "Flagged" as const,
  }));
  const iso = (value: string) => new Date(value).toLocaleString();

  return {
    id: item.reference,
    status: caseStatus(item.status),
    severity: severity(item.priority),
    title: item.title,
    assignedTo: item.investigator?.full_name ?? "Unassigned",
    alertId: alert?.reference ?? "",
    created: iso(item.created_at),
    lastUpdated: iso(item.updated_at),
    sla: item.sla_days_remaining === null
      ? "No SLA"
      : `${item.sla_days_remaining} days remaining`,
    closedDate: item.closed_at ? iso(item.closed_at) : undefined,
    employee: {
      name: employee?.name ?? alert?.entity_name ?? "Unspecified",
      role: alert?.entity_type ?? "Unknown",
      department: alert?.department ?? "Unspecified",
    },
    vendor: { name: vendor?.name ?? "Unspecified", id: vendor?.id ?? "" },
    approver: { name: approverName, role: "Approver", department: alert?.department ?? "" },
    linkedAlert: {
      id: alert?.reference ?? "",
      type: alert?.risk_type ?? "Alert",
      date: alert ? iso(alert.detected_at) : "",
    },
    connectedTransactions: transactions,
    investigationStarted: ["investigating", "under_review", "escalated", "closed"].includes(item.status.toLowerCase()),
    evidence: [],
    timeline: [],
    aiSummary: item.ai_summary || null,
    aiConfidence: null,
    aiRecommendations: recommendations,
    patternDetections: [],
    totalExposure: transactions.reduce((sum, transaction) => sum + (Number(transaction.amount.replace(/[^\d.]/g, "")) || 0), 0).toLocaleString(),
    duplicateAmount: transactions[0]?.amount ?? `${item.currency} 0`,
    riskScore: alert ? severity(alert.severity) : "N/A",
    transactionCount: transactions.length,
    comments: [],
    activityLog: [],
    statusHistory: [],
    investigator: item.investigator
      ? { name: item.investigator.full_name, role: "Investigator", dept: alert?.department ?? "" }
      : null,
    reviewer: item.reviewer
      ? { name: item.reviewer.full_name, role: "Reviewer", dept: alert?.department ?? "" }
      : null,
  };
};

export const toEvidenceView = (item: CaseEvidence): EvidenceFile => ({
  id: item.id,
  name: item.file_name,
  size: item.file_size ? `${Math.round(item.file_size / 1024)} KB` : "",
  uploadedBy: item.uploaded_by?.full_name ?? "System",
  uploadedAt: item.created_at ? new Date(item.created_at).toLocaleString() : "",
});
