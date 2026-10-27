import api from "./Axios";

export type Severity = "critical" | "high" | "medium" | "low";

// ── Summary ────────────────────────────────────────────────────────────────

export const SUMMARY_DAY_OPTIONS = [10, 15, 20, 25, 30] as const;
export type SummaryDays = (typeof SUMMARY_DAY_OPTIONS)[number];
export const DEFAULT_SUMMARY_DAYS: SummaryDays = 30;

export interface DashboardSummary {
  period_days: number;
  critical_alerts: number;
  open_investigations: number;
  active_cases: number;
  risk_exposure: {
    score: number;
    level: string;
    source: string;
  };
  alerts_by_severity: Record<Severity, number>;
  alerts_by_status: {
    new: number;
    investigating: number;
    escalated: number;
    false_positive: number;
  };
}

// ── Heatmap ────────────────────────────────────────────────────────────────

export const HEATMAP_PERIODS = ["weekly", "monthly", "yearly"] as const;
export type HeatmapPeriod = (typeof HEATMAP_PERIODS)[number];

export interface HeatmapCell {
  department: string;
  risk_type: string;
  count: number;
}

export interface DashboardHeatmap {
  period: HeatmapPeriod;
  departments: string[];
  risk_types: string[];
  cells: HeatmapCell[];
}

// ── Investigation queue ────────────────────────────────────────────────────

export interface InvestigationQueueItem {
  reference: string;
  risk_type: string;
  rule: string;
  title: string;
  entity_type: string;
  entity_name: string;
  entity_ref: string;
  department: string;
  severity: Severity;
  status: string;
  risk_score: number;
  confidence: number;
  assigned_reviewer: {
    id: string;
    full_name: string;
    email: string;
  } | null;
  detected_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ── Trends ─────────────────────────────────────────────────────────────────

export interface TrendDay extends Record<Severity, number> {
  date: string;
}

export interface DashboardTrends {
  days: TrendDay[];
}

// The backend may wrap payloads in a { data } envelope, so unwrap if present.
const unwrap = (data: any) => data?.data ?? data;

export const getDashboardSummary = async (
  days: SummaryDays = DEFAULT_SUMMARY_DAYS,
): Promise<DashboardSummary> => {
  const res = await api.get("/dashboard/summary/", { params: { days } });
  return unwrap(res.data);
};

export const getDashboardHeatmap = async (
  period: HeatmapPeriod,
): Promise<DashboardHeatmap> => {
  const res = await api.get("/dashboard/heatmap/", { params: { period } });
  return unwrap(res.data);
};

export const getInvestigationQueue = async (
  page = 1,
): Promise<Paginated<InvestigationQueueItem>> => {
  const res = await api.get("/dashboard/investigation-queue/", {
    params: { page },
  });
  const body = unwrap(res.data);
  // Tolerate an unpaginated array response
  if (Array.isArray(body)) {
    return { count: body.length, next: null, previous: null, results: body };
  }
  return body;
};

export const getDashboardTrends = async (): Promise<DashboardTrends> => {
  const res = await api.get("/dashboard/trends/");
  return unwrap(res.data);
};
