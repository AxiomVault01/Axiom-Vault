export type CaseStatus = | "New" | "Investigating" | "Under Review" | "Closed";

export type Severity = | "Critical" | "High" | "Medium" | "Low";

// type StatusFilter = "All" | CaseStatus;

export interface Case {
  id: string;
  linkedAlert: string;
  department: string;
  status: CaseStatus;
  assignedTo: string;
  severity: Severity;
  created: string;
  lastUpdated: string;
  evidenceCount: number;
}
