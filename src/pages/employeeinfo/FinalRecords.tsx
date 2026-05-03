import React, { useState, useMemo } from "react";
import { EmployeeRecord } from "./FileUploadPage";

interface EmployeeRecordsDisplayProps {
  records: EmployeeRecord[];
  onUploadFile: () => void;
}

type RiskType = "Duplicate Account" | "Ghost Employee" | "Salary Anomaly" | "Clean";
type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Flagged" | "Verified" | "Under Review";

interface EnrichedRecord extends EmployeeRecord {
  riskType: RiskType;
  severity: Severity;
  recordStatus: Status;
  sharedWith?: number;
}

// Deterministic mock risk assignment based on record data
function assignRisk(record: EmployeeRecord, allRecords: EmployeeRecord[]): Pick<EnrichedRecord, "riskType" | "severity" | "recordStatus" | "sharedWith"> {
  const accountMatches = allRecords.filter(
    (r) => r.bankAccount === record.bankAccount && r.employeeId !== record.employeeId
  ).length;

  if (accountMatches > 0) {
    const severity: Severity = accountMatches >= 3 ? "Critical" : accountMatches >= 2 ? "High" : "Medium";
    return { riskType: "Duplicate Account", severity, recordStatus: "Flagged", sharedWith: accountMatches };
  }

  // Use employeeId hash for deterministic ghost/salary assignment
  const idNum = parseInt(record.employeeId.replace(/\D/g, "").slice(-3) || "0", 10);
  if (idNum % 7 === 0) {
    return { riskType: "Ghost Employee", severity: "Medium", recordStatus: "Verified" };
  }
  if (idNum % 5 === 0) {
    return { riskType: "Salary Anomaly", severity: "Critical", recordStatus: "Verified" };
  }

  return { riskType: "Clean", severity: "Low", recordStatus: "Verified" };
}

function maskAccount(account: string): string {
  if (!account) return "—";
  const digits = account.replace(/\D/g, "");
  return `**** **** **** ${digits.slice(-4)}`;
}

const SEVERITY_STYLE: Record<Severity, { bg: string; color: string }> = {
  Critical: { bg: "#fee2e2", color: "#dc2626" },
  High:     { bg: "#ffedd5", color: "#ea580c" },
  Medium:   { bg: "#fef9c3", color: "#ca8a04" },
  Low:      { bg: "#dcfce7", color: "#16a34a" },
};

const RISK_STYLE: Record<RiskType, { bg: string; color: string }> = {
  "Duplicate Account": { bg: "#fee2e2", color: "#dc2626" },
  "Ghost Employee":    { bg: "#fce7f3", color: "#db2777" },
  "Salary Anomaly":   { bg: "#ffedd5", color: "#ea580c" },
  "Clean":            { bg: "#dcfce7", color: "#16a34a" },
};

export default function FinalRecords({ records, onUploadFile }: EmployeeRecordsDisplayProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All Status" | Status>("All Status");

  const enriched: EnrichedRecord[] = useMemo(() =>
    records
      .filter((r) => r.status === "Validated")
      .map((r) => ({ ...r, ...assignRisk(r, records) })),
    [records]
  );

  const totalEmployees = enriched.length;
  const flaggedRecords = enriched.filter((r) => r.recordStatus === "Flagged").length;
  const verifiedClean = enriched.filter((r) => r.recordStatus === "Verified").length;
  const underReview = enriched.filter((r) => r.recordStatus === "Under Review").length;

  const filtered = useMemo(() => {
    return enriched.filter((r) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.employeeId.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "All Status" || r.recordStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enriched, search, statusFilter]);

  const handleExport = () => {
    const headers = ["Employee ID", "Full Name", "Department", "Position", "Bank Account", "Risk Type", "Severity", "Status"];
    const rows = filtered.map((r) =>
      [r.employeeId, r.fullName, r.department, r.position, r.bankAccount, r.riskType, r.severity, r.recordStatus].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7" cy="6" r="3" stroke="#475569" strokeWidth="1.4"/>
                <circle cx="13" cy="8" r="2.5" stroke="#475569" strokeWidth="1.4"/>
                <path d="M1 17c0-3 2.7-5 6-5s6 2 6 5" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M17 14c1.2.6 2 1.8 2 3" stroke="#475569" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ),
            value: totalEmployees,
            label: "Total Employees",
            color: "#475569",
            border: "#e2e8f0",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L18 17H2L10 3z" stroke="#dc2626" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
                <path d="M10 9v4" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="10" cy="14.5" r="0.5" fill="#dc2626"/>
              </svg>
            ),
            value: flaggedRecords,
            label: "Flagged Records",
            color: "#dc2626",
            border: "#fecaca",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#16a34a" strokeWidth="1.4"/>
                <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            value: verifiedClean,
            label: "Verified Clean",
            color: "#16a34a",
            border: "#bbf7d0",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h10M3 14h7" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="16" cy="13" r="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2"/>
              </svg>
            ),
            value: underReview,
            label: "Under Review",
            color: "#94a3b8",
            border: "#e2e8f0",
          },
        ].map(({ icon, value, label, color, border }) => (
          <div key={label} style={{
            background: "white",
            border: `1px solid ${border}`,
            borderRadius: "10px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "8px",
              background: "#f8fafc",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginTop: "2px" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter + Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
            position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
            color: "var(--color-text-secondary)",
          }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, employee ID, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem 1rem 0.6rem 2.25rem",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "0.875rem",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
        </div>

        {/* Status Filter */}
        {(["All Status", "Flagged", "Verified", "Under Review"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "8px",
              border: statusFilter === s ? "none" : "1px solid #e2e8f0",
              background: statusFilter === s ? "#1a2e4a" : "white",
              color: statusFilter === s ? "white" : "var(--color-text-primary)",
              fontWeight: 500,
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </button>
        ))}

        {/* Export */}
        <button
          onClick={handleExport}
          style={{
            padding: "0.55rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#1a2e4a",
            color: "white",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v7M4 6l3 3 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Export
        </button>

        {/* Upload File */}
        <button
          onClick={onUploadFile}
          style={{
            padding: "0.55rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#1a2e4a",
            color: "white",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 9V2M4 5l3-3 3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Upload File
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "780px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Employee", "Department", "Bank Account", "Risk Type", "Severity", "Status", "Actions"].map((col) => (
                  <th key={col} style={{
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)", fontSize: "0.9rem" }}>
                    No records match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((record, idx) => {
                  const riskStyle = RISK_STYLE[record.riskType];
                  const sevStyle = SEVERITY_STYLE[record.severity];
                  return (
                    <tr key={record.employeeId} style={{
                      borderBottom: idx < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                      transition: "background 0.1s",
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      {/* Employee */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{record.fullName}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginTop: "1px" }}>
                          {record.employeeId}
                        </div>
                      </td>

                      {/* Department */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <div style={{ fontSize: "0.875rem" }}>{record.department}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", marginTop: "1px" }}>
                          {record.position}
                        </div>
                      </td>

                      {/* Bank Account */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <div style={{ fontSize: "0.85rem", fontFamily: "monospace" }}>
                          {maskAccount(record.bankAccount)}
                        </div>
                        {record.sharedWith && record.sharedWith > 0 && (
                          <div style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "2px" }}>
                            Shared with {record.sharedWith} {record.sharedWith === 1 ? "other" : "others"}
                          </div>
                        )}
                      </td>

                      {/* Risk Type */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <span style={{
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "0.775rem",
                          fontWeight: 600,
                          background: riskStyle.bg,
                          color: riskStyle.color,
                          whiteSpace: "nowrap",
                        }}>
                          {record.riskType}
                        </span>
                      </td>

                      {/* Severity */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <span style={{
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "0.775rem",
                          fontWeight: 600,
                          background: sevStyle.bg,
                          color: sevStyle.color,
                          whiteSpace: "nowrap",
                        }}>
                          {record.severity}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        {record.recordStatus === "Flagged" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#dc2626", fontSize: "0.85rem", fontWeight: 500 }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M7 2.5L12.5 12H1.5L7 2.5z" stroke="#dc2626" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
                              <path d="M7 6v3" stroke="#dc2626" strokeWidth="1.3" strokeLinecap="round"/>
                            </svg>
                            Flagged
                          </span>
                        ) : record.recordStatus === "Verified" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#16a34a", fontSize: "0.85rem", fontWeight: 500 }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="5.5" stroke="#16a34a" strokeWidth="1.3"/>
                              <path d="M4.5 7l2 2 3-3" stroke="#16a34a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Verified
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500 }}>
                            Under Review
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "0.9rem 1rem" }}>
                        <button
                          onClick={() => alert(`Viewing details for ${record.fullName}`)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#1a2e4a",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            padding: 0,
                            textDecoration: "underline",
                            textUnderlineOffset: "2px",
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}