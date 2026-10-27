import api from "./Axios";

export type AlertSeverity = "critical" | "high" | "medium" | "low";
export type AlertStatus = "new" | "investigating" | "escalated" | "false_positive";

export interface FraudAlert {
  reference: string;
  risk_type: string;
  rule: string;
  title: string;
  entity_type: string;
  entity_name: string;
  entity_ref: string;
  department: string;
  severity: AlertSeverity;
  status: AlertStatus;
  risk_score: number;
  confidence: number;
  assigned_reviewer: { id: string; full_name: string; email: string } | null;
  detected_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AlertFilters {
  page: number;
  department?: string;
  severity?: AlertSeverity;
  status?: AlertStatus;
  rule?: string;
}

export interface AlertDetail extends FraudAlert {
  explanation: string;
  confidence_source: string;
  flagged_records: {
    transaction_id: string;
    payment_date: string;
    amount: string;
    invoice_number: string;
    approver: string;
  }[];
  timeline: { date: string; label: string; detail: string }[];
  evidence: unknown[];
  currency: string;
  upload: {
    id: string;
    kind: string;
    file_name: string;
    created_at: string;
  } | null;
  notes_count: number;
  case: unknown;
  ai_summary: string;
  ai_recommendations: string[];
  pattern_detections: unknown[];
  ai_confidence: number | null;
  updated_at: string;
}

export interface AlertHistoryItem {
  id: string;
  type: string;
  actor: { id: string; full_name: string } | null;
  from_status: string;
  to_status: string;
  detail: string;
  created_at: string;
}

export interface AlertNote {
  id: string;
  text: string;
  author: { id: string; full_name: string } | null;
  created_at: string;
}

export interface AddAlertNotePayload {
  text: string;
}

export interface AssignAlertReviewerPayload {
  reviewer_id: string | null;
}

export interface UpdateAlertStatusPayload {
  status: AlertStatus;
  note: string;
}

const unwrap = <T>(data: T | { data: T }): T =>
  (data as { data?: T })?.data ?? (data as T);

const normalizePage = <T>(body: unknown): Paginated<T> => {
  let payload = body as Partial<Paginated<T>> | { results?: unknown };
  // Accept the extra one-item wrapper found in some API responses.
  while (Array.isArray(payload.results) && payload.results.length === 1) {
    const first = payload.results[0];
    if (!first || typeof first !== "object" || !("results" in first)) break;
    payload = first as Partial<Paginated<T>>;
  }
  if (!Array.isArray(payload.results)) {
    throw new Error("The alerts API returned an invalid paginated response.");
  }
  return {
    count: typeof (payload as Paginated<T>).count === "number"
      ? (payload as Paginated<T>).count
      : payload.results.length,
    next: typeof (payload as Paginated<T>).next === "string"
      ? (payload as Paginated<T>).next
      : null,
    previous: typeof (payload as Paginated<T>).previous === "string"
      ? (payload as Paginated<T>).previous
      : null,
    results: payload.results as T[],
  };
};

export const getFraudAlerts = async (filters: AlertFilters) => {
  const { data } = await api.get("/fraud/alerts/", {
    params: {
      page: filters.page,
      department: filters.department || undefined,
      severity: filters.severity || undefined,
      status: filters.status || undefined,
      rule: filters.rule || undefined,
    },
  });
  return normalizePage<FraudAlert>(unwrap(data));
};

export const getFraudAlert = async (reference: string) => {
  const { data } = await api.get(`/fraud/alerts/${encodeURIComponent(reference)}/`);
  return unwrap<AlertDetail>(data);
};

export const getAlertHistory = async (reference: string, page: number) => {
  const { data } = await api.get(
    `/fraud/alerts/${encodeURIComponent(reference)}/history/`,
    { params: { page } },
  );
  return normalizePage<AlertHistoryItem>(unwrap(data));
};

export const getAlertNotes = async (reference: string, page: number) => {
  const { data } = await api.get(
    `/fraud/alerts/${encodeURIComponent(reference)}/notes/`,
    { params: { page } },
  );
  return normalizePage<AlertNote>(unwrap(data));
};

// Creates an alert note; the alert detail page refreshes its note list after success.
export const addAlertNote = async (
  reference: string,
  payload: AddAlertNotePayload,
) => {
  const { data } = await api.post(
    `/fraud/alerts/${encodeURIComponent(reference)}/notes/`,
    payload,
  );
  return unwrap<AlertNote>(data);
};

// Assigns the specified reviewer, or clears the reviewer when reviewer_id is null.
export const assignAlertReviewer = async (
  reference: string,
  payload: AssignAlertReviewerPayload,
) => {
  const { data } = await api.put(
    `/fraud/alerts/${encodeURIComponent(reference)}/reviewer/`,
    payload,
  );
  return unwrap<AlertDetail>(data);
};

// Updates the alert status and records the accompanying explanation.
export const updateAlertStatus = async (
  reference: string,
  payload: UpdateAlertStatusPayload,
) => {
  const { data } = await api.post(
    `/fraud/alerts/${encodeURIComponent(reference)}/status/`,
    payload,
  );
  return unwrap<AlertDetail>(data);
};
