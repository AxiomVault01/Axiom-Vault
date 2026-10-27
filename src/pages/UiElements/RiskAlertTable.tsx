import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { useFraudAlerts } from "../../hooks/useAlerts";
import { AlertStatus, FraudAlert } from "../../services/AlertsAPI";

const severityStyles: Record<FraudAlert["severity"], string> = {
  critical: "bg-red-100 text-red-700 border border-red-200",
  high: "bg-orange-100 text-orange-700 border border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  low: "bg-blue-100 text-blue-700 border border-blue-200",
};

const statusStyles: Record<AlertStatus, string> = {
  new: "bg-slate-100 text-slate-600",
  investigating: "bg-purple-100 text-purple-700",
  escalated: "bg-red-100 text-red-700",
  false_positive: "bg-gray-100 text-gray-600",
};

const confidenceColor = (confidence: number) =>
  confidence >= 90 ? "bg-green-500" : confidence >= 75 ? "bg-blue-500" : "bg-orange-400";

const displayStatus = (status: AlertStatus) =>
  status === "false_positive"
    ? "False Positive"
    : status.charAt(0).toUpperCase() + status.slice(1);

export default function RiskAlertsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  // Use the same fraud-alert API as the Alerts page instead of dashboard-only mock rows.
  const alertsQuery = useFraudAlerts({ page: 1 });
  const filteredAlerts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return (alertsQuery.data?.results ?? [])
      .filter((alert) =>
        !query ||
        alert.entity_name.toLowerCase().includes(query) ||
        alert.reference.toLowerCase().includes(query) ||
        alert.risk_type.toLowerCase().includes(query) ||
        alert.department.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [alertsQuery.data, searchTerm]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:bg-white/3 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees, accounts..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-gray-100 bg-gray-50 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-gray-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/3"
          />
        </div>
        <Link
          to="/alerts"
          className="shrink-0 text-xs font-medium text-amber-700 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-100/70 text-[11px] font-semibold text-slate-700 dark:text-gray-300">
              {["Alert ID", "Employee/Vendor", "Risk Type", "Department", "Severity", "Confidence", "Status", "Action"].map((heading) => (
                <th key={heading} className="whitespace-nowrap px-6 py-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-600 dark:text-white dark:divide-gray-800">
            {alertsQuery.isLoading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                  Loading alerts...
                </td>
              </tr>
            ) : alertsQuery.isError ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-sm text-red-500">
                  <p>Could not load dashboard alerts.</p>
                  <button
                    type="button"
                    onClick={() => alertsQuery.refetch()}
                    disabled={alertsQuery.isFetching}
                    className="mt-2 font-semibold underline disabled:opacity-50"
                  >
                    {alertsQuery.isFetching ? "Retrying..." : "Retry"}
                  </button>
                </td>
              </tr>
            ) : filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                  {searchTerm ? `No alerts found for "${searchTerm}".` : "No alerts available."}
                </td>
              </tr>
            ) : (
              filteredAlerts.map((alert) => (
                <tr key={alert.reference} className="transition-colors hover:bg-gray-50/50 dark:hover:bg-white/2">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500 dark:text-white">
                    {alert.reference}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-700 dark:text-white">
                    {alert.entity_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 dark:text-white">
                    {alert.risk_type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 dark:text-white">
                    {alert.department}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <span className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${severityStyles[alert.severity]}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex max-w-35 items-center gap-3">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${confidenceColor(alert.confidence)}`}
                          style={{ width: `${Math.min(100, Math.max(0, alert.confidence))}%` }}
                        />
                      </div>
                      <span className="whitespace-nowrap text-[10px] font-semibold text-slate-700 dark:text-white">
                        {alert.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <span className={`inline-block rounded px-3 py-1 text-[10px] font-semibold ${statusStyles[alert.status]}`}>
                      {displayStatus(alert.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Link
                      to={`/alerts/${encodeURIComponent(alert.reference)}`}
                      className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
