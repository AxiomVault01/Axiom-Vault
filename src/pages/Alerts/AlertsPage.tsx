import { useState, useMemo } from "react";
import { Link } from "react-router";
import { MOCK_ALERTS, Alert, Severity, AlertStatus } from "./AlertsData";

// ── helpers ──────────────────────────────────────────────────────────────────

const SEV_STYLES: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-700 border border-red-200",
  High:     "bg-orange-100 text-orange-700 border border-orange-200",
  Medium:   "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Low:      "bg-blue-100 text-blue-700 border border-blue-200",
};

const STATUS_STYLES: Record<AlertStatus, string> = {
  New:           "bg-slate-100 text-slate-600",
  Investigating: "bg-purple-100 text-purple-700",
  Escalated:     "bg-red-100 text-red-700",
  Resolved:      "bg-green-100 text-green-700",
};

const CONFIDENCE_COLOR = (n: number) =>
  n >= 90 ? "bg-green-500" : n >= 75 ? "bg-blue-500" : "bg-orange-400";

type SeverityFilter = "All" | Severity;

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="12" cy="12" r="8" stroke="#94a3b8" strokeWidth="1.8"/>
          <path d="M18 18l5 5" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-2">No Alert yet</h3>
      <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8">
        Alert are automatically generated when suspicious patterns are detected
        in uploaded payroll or vendor payment data. upload your data to start
        detecting anomalies.
      </p>

      {/* How to get started */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 text-left mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-4">How to Get Started</p>
        <div className="space-y-4">
          {[
            { n: 1, title: "Upload Your Data", desc: "Upload your payroll or vendor payment spreadsheet to begin anomaly detection" },
            { n: 2, title: "Review Alerts", desc: "The system will automatically flag suspicious patterns generate alerts for your view" },
            { n: 3, title: "Take Action on Alerts", desc: "Escalate critical alerts to cases, mark false positives, or archive low priority findings" },
          ].map(({ n, title, desc }) => (
            <div key={n} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1a2e4a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {n}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload CTA */}
      <div className="w-full max-w-md border border-dashed border-gray-300 rounded-xl p-6 text-center">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mx-auto mb-3">
          <path d="M14 4v14M8 10l6-6 6 6" stroke="#1a2e4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 22h20" stroke="#1a2e4a" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <p className="text-sm font-semibold text-gray-800">Upload Employee Data</p>
        <p className="text-xs text-gray-500 mt-1 mb-3">
          Start by uploading your Payroll or Vendor payment data
        </p>
        <Link
          to="/employee-records"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a2e4a] hover:underline underline-offset-2"
        >
          Get Started
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const SEV_FILTERS: SeverityFilter[] = ["All", "Critical", "High", "Medium", "Low"];

interface AlertsPageProps {
  /** Pass an empty array to show the empty state */
  alerts?: Alert[];
}

export default function AlertsPage({ alerts = MOCK_ALERTS }: AlertsPageProps) {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("All");

  const counts = useMemo(() => ({
    All:      alerts.length,
    Critical: alerts.filter((a) => a.severity === "Critical").length,
    High:     alerts.filter((a) => a.severity === "High").length,
    Medium:   alerts.filter((a) => a.severity === "Medium").length,
    Low:      alerts.filter((a) => a.severity === "Low").length,
  }), [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.employee.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.riskType.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q);
      const matchSev = severityFilter === "All" || a.severity === severityFilter;
      return matchSearch && matchSev;
    });
  }, [alerts, search, severityFilter]);

  const handleExport = () => {
    const headers = ["Alert ID", "Employee/Vendor", "Risk Type", "Department", "Severity", "Confidence", "Status", "Detected", "Assigned"];
    const rows = filtered.map((a) =>
      [a.id, a.employee, a.riskType, a.department, a.severity, `${a.confidence}%`, a.status, a.detected, a.assigned].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "alerts.csv"; anchor.click();
    URL.revokeObjectURL(url);
  };

  const isEmpty = alerts.length === 0;

  return (
    <div className="flex flex-col h-full p-2 sm:p-4 lg:p-2 overflow-hidden">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and manage risk alerts across your organization
          </p>
        </div>
        {!isEmpty && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 text-sm font-semibold rounded-lg hover:bg-[#1a2e4a] hover:text-white transition-colors"
          >
            Export All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          {/* Severity Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-5 mb-4">
            {SEV_FILTERS.map((f) => {
              const active = severityFilter === f;
              const pill: Record<SeverityFilter, string> = {
                All:      active ? "bg-[#1a2e4a] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                Critical: active ? "bg-red-600 text-white"   : "bg-red-50 text-red-600 hover:bg-red-100",
                High:     active ? "bg-orange-500 text-white": "bg-orange-50 text-orange-600 hover:bg-orange-100",
                Medium:   active ? "bg-yellow-500 text-white": "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
                Low:      active ? "bg-blue-500 text-white"  : "bg-blue-50 text-blue-600 hover:bg-blue-100",
              };
              return (
                <button
                  key={f}
                  onClick={() => setSeverityFilter(f)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${pill[f]}`}
                >
                  {f === "All" ? `All Alerts (${counts.All})` : `${f} (${counts[f]})`}
                </button>
              );
            })}
          </div>

          {/* Search + Filter bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search employees, accounts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-white/[0.03] dark:border-gray-700 dark:text-white"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="#64748b" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col min-h-0 flex-1 dark:bg-white/[0.03] dark:border-gray-700">
            <div className="overflow-auto flex-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-100 dark:bg-white/[0.03]">
                    {["Alert Id", "Employee/Vendor", "Risk Type", "Department", "Severity", "Confidence", "Status", "Detected", "Assigned", "Action"].map((h) => (
                      <th key={h} className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-12 text-gray-400 text-sm">
                        No alerts match your search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50 transition-colors dark:hover:bg-white/[0.02]">
                        <td className="px-4 py-3.5 font-mono text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {alert.id}
                        </td>
                        <td className="px-7 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                          {alert.employee}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap dark:text-gray-300">
                          {alert.riskType}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {alert.department}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex px-3 py-0.5 rounded-sm text-xs whitespace-nowrap ${SEV_STYLES[alert.severity]}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${CONFIDENCE_COLOR(alert.confidence)}`}
                                style={{ width: `${alert.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {alert.confidence}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex px-3 py-0.5 rounded-sm text-xs whitespace-nowrap ${STATUS_STYLES[alert.status]}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400">
                          {alert.detected}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {alert.assigned}
                        </td>
                        <td className="px-4 py-3.5">
                          <Link
                            to={`/alerts/${alert.id}`}
                            state={{ alert }}
                            className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 px-2 py-1 rounded-sm text-blue-500 hover:underline underline-offset-2 whitespace-nowrap dark:text-blue-400"
                          >
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                              <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
                            </svg>
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing 1–{filtered.length} of {filtered.length} alerts
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors" disabled>
                  ← Previous
                </button>
                <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold bg-[#1a2e4a] text-white rounded-lg">
                  01
                </span>
                <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors" disabled>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}