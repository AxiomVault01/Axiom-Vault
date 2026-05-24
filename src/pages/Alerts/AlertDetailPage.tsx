import { useLocation, useParams, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import {
  MOCK_ALERTS,
  Alert,
  Severity,
  DETAIL_DATA,
  EvidenceFile,
} from "./AlertsData";

// Fallback for alerts without extended detail
function buildFallbackDetail(alert: Alert) {
  return {
    title: `${alert.riskType} detected in ${alert.department}`,
    flaggedRecords: alert.flaggedTransactions.map((t) => ({
      txnId: t.id,
      date: t.date,
      amount: t.amount,
      invoice: "—",
      approver: "—",
    })),
    timeline: [
      {
        label: "Awaiting Decision",
        sub: "No action taken yet",
        date: "Today",
        color: "blue" as const,
      },
      ...alert.timeline.map((t) => ({
        label: t.event.split("—")[0].trim(),
        sub: t.event.split("—")[1]?.trim() ?? "",
        date: t.time.split(" ")[0],
        color:
          t.type === "alert"
            ? ("red" as const)
            : t.type === "action"
              ? ("blue" as const)
              : ("gray" as const),
      })),
    ],
    evidence: [] as EvidenceFile[],
    reviewers: [
      alert.assigned === "Auto-assigned" ? "Auto-assigned" : alert.assigned,
    ],
  };
}

// ── Severity styles ───────────────────────────────────────────────────────────
const SEV_BADGE: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-600 border border-red-200",
  High: "bg-orange-100 text-orange-600 border border-orange-200",
  Medium: "bg-yellow-100 text-yellow-600 border border-yellow-200",
  Low: "bg-blue-100 text-blue-600 border border-blue-200",
};

const DOT_COLOR: Record<"red" | "blue" | "gray", string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  gray: "bg-gray-300",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AlertDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [reviewer, setReviewer] = useState("");

  const alert: Alert | undefined = useMemo(() => {
    if (location.state?.alert) return location.state.alert as Alert;
    return MOCK_ALERTS.find((a) => a.id === id);
  }, [location.state, id]);

  const detail = useMemo(() => {
    if (!alert) return null;
    return DETAIL_DATA[alert.id] ?? buildFallbackDetail(alert);
  }, [alert]);

  if (!alert || !detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 font-medium dark:text-white">
            Alert not found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 text-sm text-[#1a2e4a] font-semibold hover:underline dark:text-blue-400"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  // reviewer default
  const reviewerOptions = detail.reviewers;
  const activeReviewer = reviewer || reviewerOptions[0];

  return (
    <div className="min-h-full bg-white dark:bg-transparent">
      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <div className="flex items-start flex-col md:flex-row justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 4L6 9l5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
              {alert.id}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${SEV_BADGE[alert.severity]}`}
            >
              {alert.severity}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white max-w-2xl leading-snug">
            {detail.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4 mt-4 md:mt-1">
          <button className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-white/5">
            Mark False Positive
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold bg-[#1a2e4a] text-white rounded-lg hover:bg-[#152438] transition-colors"
            onClick={() => navigate("/investigations")}
          >
            Convert to Case
          </button>
        </div>
      </div>

      {/* ── 4 Meta cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
        {[
          { label: "RISK TYPE", value: alert.riskType },
          { label: "DEPARTMENT", value: alert.department },
          { label: "CONFIDENCE SCORE", value: `${alert.confidence}%` },
          {
            label: "AUTO-ASSIGNED TO",
            value:
              alert.assigned === "Auto-assigned"
                ? "Sarah J. Miles"
                : alert.assigned,
          },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white dark:bg-gray-900 px-5 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-sm font-bold text-gray-800 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left — main content */}
        <div className="lg:col-span-2 divide-y divide-gray-100 dark:divide-gray-800">
          {/* Why This Was Flagged */}
          <div className="p-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-base font-bold text-gray-900 mb-3 dark:text-white">
                Why This Was Flagged
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                {alert.description}
              </p>
              <div className="mt-4 inline-block bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 dark:bg-white/3 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Detected
                </p>
                <p className="text-sm font-semibold text-gray-700 mt-0.5 dark:text-white">
                  {alert.detected}
                </p>
              </div>
            </div>
          </div>

          {/* Flagged Records */}
          <div className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-4 dark:text-white">
              Flagged Records
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-100 rounded-lg overflow-hidden dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/3">
                    {[
                      "Transaction ID",
                      "Date",
                      "Amount",
                      "Invoice",
                      "Approver",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide dark:text-gray-400 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {detail.flaggedRecords.map((rec) => (
                    <tr
                      key={rec.txnId}
                      className="hover:bg-gray-50 dark:hover:bg-white/2"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1a2e4a] dark:text-blue-400 whitespace-nowrap">
                        {rec.txnId}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {rec.date}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white whitespace-nowrap">
                        {rec.amount}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {rec.invoice}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {rec.approver}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Event Timeline */}
          <div className="p-6">
            <h2 className="text-base font-bold text-gray-900 mb-5 dark:text-white">
              Event Timeline
            </h2>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-2.5 top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-5">
                {detail.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 relative">
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white dark:border-gray-900 shrink-0 mt-0.5 z-10 ${DOT_COLOR[item.color]}`}
                    />
                    <div className="flex-1 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 dark:text-gray-400">
                          {item.sub}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="border-l border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          {/* Evidence */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="#f59e0b"
                  strokeWidth="1.4"
                />
                <path
                  d="M6 6.5C6 5.4 6.9 5 8 5s2 .4 2 1.5c0 .8-.5 1.2-1 1.5L8 8.5v.5"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="10.5" r=".5" fill="#f59e0b" />
              </svg>
              <h2 className="text-sm font-bold text-gray-800 dark:text-white">
                Evidence
              </h2>
              <span className="text-xs text-gray-400">
                {detail.evidence.length} files
              </span>
            </div>

            {detail.evidence.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                No evidence files attached.
              </p>
            ) : (
              <div className="space-y-2 mb-3">
                {detail.evidence.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-white/3 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="shrink-0"
                      >
                        <rect
                          x="2"
                          y="1"
                          width="10"
                          height="12"
                          rx="1.5"
                          stroke="#94a3b8"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M4 5h6M4 7.5h6M4 10h4"
                          stroke="#94a3b8"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate dark:text-white">
                          {f.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {f.size} • {f.source}
                        </p>
                      </div>
                    </div>
                    <button className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 2v7M4 6l3 3 3-3"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 11h10"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-white/5">
              Download Evidence
            </button>
          </div>

          {/* Assignment & Notes */}
          <div className="p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4 dark:text-white">
              Assignment And Notes
            </h2>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 dark:text-gray-400">
                Reviewer
              </label>
              <div className="relative">
                <select
                  value={activeReviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/3 dark:border-gray-700 dark:text-white pr-8"
                >
                  {reviewerOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <path
                    d="M3 4.5l3 3 3-3"
                    stroke="#94a3b8"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 dark:text-gray-400">
                Instruction To Reviewer
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
                placeholder="Write instructions for the reviewer before escalating"
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 dark:bg-white/3 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-600"
              />
              <p className="text-right text-xs text-gray-400 mt-1">
                {note.length}/500
              </p>
            </div>

            <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-white dark:hover:bg-white/5">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
