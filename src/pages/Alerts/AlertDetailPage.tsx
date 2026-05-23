import { useLocation, useParams, useNavigate, Link } from "react-router";
import { useMemo } from "react";
import { MOCK_ALERTS, Alert, Severity, AlertStatus } from "./AlertsData";

const SEV_STYLES: Record<Severity, { badge: string; bg: string; text: string }> = {
  Critical: { badge: "bg-red-100 text-red-700 border border-red-200",    bg: "bg-red-50",     text: "text-red-800" },
  High:     { badge: "bg-orange-100 text-orange-700 border border-orange-200", bg: "bg-orange-50", text: "text-orange-800" },
  Medium:   { badge: "bg-yellow-100 text-yellow-700 border border-yellow-200", bg: "bg-yellow-50", text: "text-yellow-800" },
  Low:      { badge: "bg-blue-100 text-blue-700 border border-blue-200",  bg: "bg-blue-50",    text: "text-blue-800" },
};

const STATUS_STYLES: Record<AlertStatus, string> = {
  New:           "bg-slate-100 text-slate-600",
  Investigating: "bg-purple-100 text-purple-700",
  Escalated:     "bg-red-100 text-red-700",
  Resolved:      "bg-green-100 text-green-700",
};

const CONFIDENCE_COLOR = (n: number) =>
  n >= 90 ? "bg-green-500" : n >= 75 ? "bg-blue-500" : "bg-orange-400";

const TIMELINE_ICONS: Record<string, JSX.Element> = {
  alert: (
    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 2L11.5 11H1.5L6.5 2z" stroke="#dc2626" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
        <path d="M6.5 5.5v3" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  ),
  action: (
    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="#2563eb" strokeWidth="1.2"/>
        <path d="M4.5 6.5l1.5 1.5 2.5-2.5" stroke="#2563eb" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ),
  system: (
    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1.5" y="2.5" width="10" height="8" rx="1.5" stroke="#64748b" strokeWidth="1.2"/>
        <path d="M4.5 10.5v1.5M8.5 10.5v1.5M3 12h7" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  ),
};

export default function AlertDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer router state (passed from table row), fall back to mock data lookup
  const alert: Alert | undefined = useMemo(() => {
    if (location.state?.alert) return location.state.alert as Alert;
    return MOCK_ALERTS.find((a) => a.id === id);
  }, [location.state, id]);

  if (!alert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 dark:bg-white/[0.03]">
        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
          <p className="text-gray-600 dark:text-white font-medium">Alert not found</p>
          <p className="text-xs text-gray-400 mt-1">ID: {id}</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-[#1a2e4a] text-sm font-semibold hover:underline">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const sev = SEV_STYLES[alert.severity];
  const isCriticalOrHigh = alert.severity === "Critical" || alert.severity === "High";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-white/[0.03]">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link to="/alerts" className="hover:text-gray-600 transition-colors">Alerts</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium dark:text-white">{alert.id}</span>
        </div>

        {/* Header card */}
        <div className={`rounded-2xl p-5 sm:p-6 mb-4 ${sev.bg} border border-gray-100`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{alert.id}</span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${sev.badge}`}>
                  {alert.severity}
                </span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[alert.status]}`}>
                  {alert.status}
                </span>
              </div>
              <h1 className={`text-xl sm:text-2xl font-bold mb-1 ${sev.text}`}>
                {alert.riskType}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {alert.employee} · {alert.department}
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="self-start p-2 rounded-lg hover:bg-white/60 transition-colors text-gray-500"
              title="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Confidence bar */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-gray-500 shrink-0">Confidence</span>
            <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${CONFIDENCE_COLOR(alert.confidence)} transition-all`}
                style={{ width: `${alert.confidence}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 shrink-0">{alert.confidence}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-4">

            {/* Why This Alert */}
            {isCriticalOrHigh && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/[0.03] dark:border-gray-700">
                <h2 className="text-sm font-bold text-gray-800 mb-3 dark:text-white">Why This Alert</h2>
                <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                  {alert.description}
                </p>
              </div>
            )}

            {/* Flagged Transactions */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/[0.03] dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-800 mb-3 dark:text-white">Flagged Transactions</h2>
              <div className="space-y-2">
                {alert.flaggedTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-white/[0.03] dark:border-gray-700"
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#1a2e4a] dark:text-blue-400">
                        {txn.id}
                      </span>
                      <span className="text-xs text-gray-400 ml-2">{txn.date}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{txn.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description (for non-critical) */}
            {!isCriticalOrHigh && (
              <div className="bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/[0.03] dark:border-gray-700">
                <h2 className="text-sm font-bold text-gray-800 mb-3 dark:text-white">Description</h2>
                <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                  {alert.description}
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/[0.03] dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-800 mb-4 dark:text-white">Alert Timeline</h2>
              <div className="space-y-4">
                {alert.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    {TIMELINE_ICONS[item.type]}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.event}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — meta + actions */}
          <div className="space-y-4">

            {/* Alert Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/[0.03] dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-800 mb-3 dark:text-white">Alert Info</h2>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Alert ID",    value: alert.id },
                  { label: "Detected",   value: alert.detected },
                  { label: "Assigned",   value: alert.assigned },
                  { label: "Department", value: alert.department },
                  { label: "Risk Type",  value: alert.riskType },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="font-medium text-gray-800 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 dark:bg-white/[0.03] dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-800 mb-3 dark:text-white">Actions</h2>
              <button className="w-full py-2.5 bg-[#1a2e4a] text-white text-sm font-semibold rounded-lg hover:bg-[#152438] transition-colors">
                Escalate to Case
              </button>
              <button className="w-full py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                Mark as Resolved
              </button>
              <button className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-white/[0.05]">
                Mark as False Positive
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-400"
              >
                ← Back to Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}