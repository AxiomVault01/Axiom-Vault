import React, { useMemo, useState } from "react";
import {
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  DownloadIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Case, CaseStatus, Severity } from "../../pages/Cases/CasesData";

interface Props {
  data: Case[];
}

type StatusFilter = "All" | CaseStatus;
const STAT_FILTERS: StatusFilter[] = [
  "All",
  "New",
  "Investigating",
  "Under Review",
  "Closed",
];

const STATUS_STYLES: Record<CaseStatus, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Open: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Investigating: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "Under Review": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Escalated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Closed: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function CasesTable({ data }: Props) {
  const navigate = useNavigate();

  // Search + pill filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  // Floating filter panel
  const [showFilters, setShowFilters] = useState(false);
  const [statusOpen, setStatusOpen] = useState(true);
  const [riskOpen, setRiskOpen] = useState(true);
  const [investigatorOpen, setInvestigatorOpen] = useState(true);

  const [selectedStatuses, setSelectedStatuses] = useState<CaseStatus[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<Severity[]>([]);
  const [selectedInvestigators, setSelectedInvestigators] = useState<string[]>([]);

  // Modal State for Alert Flag Reason
  const [selectedAlertCase, setSelectedAlertCase] = useState<Case | null>(null);

  // Dynamically extract unique investigators from the data
  const availableInvestigators = useMemo(() => {
    const investigators = data.map((c) => c.assignedTo).filter(Boolean);
    return Array.from(new Set(investigators));
  }, [data]);

  const toggleSelection = <T,>(
    value: T,
    _selected: T[],
    setSelected: React.Dispatch<React.SetStateAction<T[]>>,
  ) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Pill counts — based on Case.status
  const counts = useMemo(
    () => ({
      All: data.length,
      New: data.filter((c) => c.status === "New").length,
      Investigating: data.filter((c) => c.status === "Investigating").length,
      "Under Review": data.filter((c) => c.status === "Under Review").length,
      Closed: data.filter((c) => c.status === "Closed").length,
    }),
    [data],
  );

  // Single combined filter — search + pill + floating panel selections
  const filteredCases = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter((item) => {
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.linkedAlert.id.toLowerCase().includes(q) ||
        item.employee.department.toLowerCase().includes(q) ||
        (item.assignedTo && item.assignedTo.toLowerCase().includes(q));

      const matchesPillStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesPanelStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(item.status);

      const matchesRisk =
        selectedRisks.length === 0 || selectedRisks.includes(item.severity);

      const matchesInvestigator =
        selectedInvestigators.length === 0 ||
        (item.assignedTo && selectedInvestigators.includes(item.assignedTo));

      return (
        matchesSearch &&
        matchesPillStatus &&
        matchesPanelStatus &&
        matchesRisk &&
        matchesInvestigator
      );
    });
  }, [
    data,
    search,
    statusFilter,
    selectedStatuses,
    selectedRisks,
    selectedInvestigators,
  ]);

  const handleExport = () => {
    const headers = [
      "Case ID",
      "Linked Alert",
      "Department",
      "Status",
      "Assigned To",
      "Severity",
      "Created",
      "Last Updated",
      "Evidence Count",
    ];
    const rows = filteredCases.map((c) =>
      [
        c.id,
        c.linkedAlert.id,
        c.employee.department,
        c.status,
        c.assignedTo,
        c.severity,
        c.created,
        c.lastUpdated,
        c.evidence.length,
      ].join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cases.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-200">
      {/* Status Filter Pills */}
      <div className="flex flex-wrap gap-2 mt-5 mb-4">
        {STAT_FILTERS.map((f) => {
          const active = statusFilter === f;
          const pill: Record<StatusFilter, string> = {
            All: active
              ? "bg-[#1a2e4a] text-white dark:bg-blue-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
            New: active
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
            Open: active
              ? "bg-slate-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
            Investigating: active
              ? "bg-orange-500 text-white"
              : "bg-orange-100 text-orange-700 hover:bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50",
            "Under Review": active
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-700 hover:bg-purple-50 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50",
            Escalated: active
              ? "bg-red-600 text-white"
              : "bg-red-100 text-red-700 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50",
            Closed: active
              ? "bg-gray-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
          };
          return (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${pill[f]}`}
            >
              {f === "All"
                ? `All Cases (${counts.All})`
                : `${f} (${counts[f as keyof typeof counts]})`}
            </button>
          );
        })}
      </div>

      {/* Search + Filter + Export */}
      <div className="flex items-center justify-between gap-3 relative">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search cases by ID, Alert, Dept, or Assignee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-[#101828] dark:text-white dark:focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-brand-950 dark:text-gray-200 dark:hover:bg-gray-900 transition-colors"
          >
            <Filter size={16} />
          </button>
          <button
            onClick={handleExport}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700 rounded-lg transition-colors shadow-sm dark:bg-brand-950 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Export All
            <DownloadIcon size={14} />
          </button>
        </div>

        {/* Floating Dropdown */}
        {showFilters && (
          <div className="absolute right-0 top-14 z-20 w-80 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-boxdark custom-scrollbar">
            <h3 className="mb-4 text-sm font-semibold dark:text-white">Filters</h3>

            {/* Investigation Status */}
            <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
              <button
                onClick={() => setStatusOpen((prev) => !prev)}
                className="flex w-full items-center justify-between dark:text-gray-200"
              >
                <span className="text-sm font-medium">Investigation Status</span>
                {statusOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {statusOpen && (
                <div className="mt-3 space-y-2">
                  {(
                    [
                      "New",
                      "Open",
                      "Investigating",
                      "Under Review",
                      "Escalated",
                      "Closed",
                    ] as CaseStatus[]
                  ).map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 text-sm dark:text-gray-300 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() =>
                          toggleSelection(
                            status,
                            selectedStatuses,
                            setSelectedStatuses,
                          )
                        }
                        className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Level */}
            <div className="border-b border-gray-100 dark:border-gray-700 py-4">
              <button
                onClick={() => setRiskOpen((prev) => !prev)}
                className="flex w-full items-center justify-between dark:text-gray-200"
              >
                <span className="text-sm font-medium">Risk Level</span>
                {riskOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {riskOpen && (
                <div className="mt-3 space-y-2">
                  {(["Low", "Medium", "High", "Critical"] as Severity[]).map(
                    (risk) => (
                      <label
                        key={risk}
                        className="flex items-center gap-2 text-sm dark:text-gray-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRisks.includes(risk)}
                          onChange={() =>
                            toggleSelection(risk, selectedRisks, setSelectedRisks)
                          }
                          className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                        />
                        {risk}
                      </label>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Assigned Investigator */}
            <div className="pt-4">
              <button
                onClick={() => setInvestigatorOpen((prev) => !prev)}
                className="flex w-full items-center justify-between dark:text-gray-200"
              >
                <span className="text-sm font-medium">Assigned Investigator</span>
                {investigatorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {investigatorOpen && (
                <div className="mt-3 space-y-3">
                  {availableInvestigators.map((investigator) => (
                    <label
                      key={investigator}
                      className="flex items-center gap-3 text-sm dark:text-gray-300 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedInvestigators.includes(investigator)}
                        onChange={() =>
                          toggleSelection(
                            investigator,
                            selectedInvestigators,
                            setSelectedInvestigators,
                          )
                        }
                        className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {investigator
                          .split(" ")
                          .map((n) => n[0].toUpperCase())
                          .join("")}
                      </span>
                      {investigator}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-white/3 dark:border-gray-700 shadow-sm">
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <table className="min-w-350 w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider dark:bg-white/3">
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Case ID</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Linked Alert</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Department</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Status</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Assigned To</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Severity</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Created</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Last Updated</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Evidence</th>
                <th className="px-7 py-4 text-left text-xs font-semibold uppercase tracking-wide whitespace-nowrap dark:text-gray-400 text-gray-900 ">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-600 dark:divide-gray-700 dark:text-gray-300">
              {filteredCases.length > 0 ? (
                filteredCases.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-4.5 font-medium text-gray-900 dark:text-white">
                      {item.id}
                    </td>

                    <td className="px-4 py-4.5 font-medium">
                      <button
                        onClick={() => setSelectedAlertCase(item)}
                        className="text-[#B86C41] hover:underline font-mono  transition-colors"
                      >
                        {item.linkedAlert.id}
                      </button>
                    </td>

                    <td className="px-4 py-4.5 text-gray-500 dark:text-gray-400">
                      {item.employee.department}
                    </td>

                    <td className="px-4 py-4.5 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${STATUS_STYLES[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4.5 text-gray-600 dark:text-gray-300">
                      {item.assignedTo}
                    </td>

                    <td className="px-4 py-4.5 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${SEVERITY_STYLES[item.severity]}`}
                      >
                        {item.severity}
                      </span>
                    </td>

                    <td className="px-4 py-4.5 text-gray-500 dark:text-gray-400 text-[13px]">
                      {item.created}
                    </td>

                    <td className="px-4 py-4.5 text-gray-500 dark:text-gray-400 text-[13px]">
                      {item.lastUpdated}
                    </td>

                    <td className="px-4 py-4.5 text-center">
                      <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {item.evidence.length}
                      </span>
                    </td>

                    <td className="px-4 py-4.5 align-middle text-center">
                      <button
                        onClick={() =>
                          navigate(`/cases/${item.id}`, {
                            state: { case: item },
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                      >
                        <Eye size={16} />
                        Open
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="p-10 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No matching cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Linked Alert Modal Overlay */}
      {selectedAlertCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl p-6 w-137.5 max-w-[90vw] shadow-2xl dark:bg-gray-900 dark:border-gray-300 animate-in fade-in zoom-in duration-200">
            {/* Modal Internal Card */}
            <div className="border border-gray-200 rounded-xl overflow-hidden relative dark:border-gray-700 mb-6">
              {/* Red accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3 dark:text-white pl-2">
                  Why this was Flagged
                </h3>
                <div className="h-px bg-gray-200 w-full mb-4 dark:bg-gray-700"></div>
                <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                  {selectedAlertCase.aiSummary ||
                    `The system identified anomalies matching the profile for ${selectedAlertCase.linkedAlert.type}. Transactions were flagged under alert ID ${selectedAlertCase.linkedAlert.id} for further compliance review.`}
                </p>

                {/* Detected Box */}
                <div className="mt-5 border border-gray-200 bg-gray-50 rounded-lg p-3 inline-block dark:bg-gray-900/50 dark:border-gray-700">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1 dark:text-gray-400">
                    Detected
                  </p>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {/* Displaying either the specific alert date or falling back to case creation date */}
                    {selectedAlertCase.linkedAlert.date || selectedAlertCase.created}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-center">
              <button
                onClick={() => setSelectedAlertCase(null)}
                className="px-8 py-2.5 bg-[#0f172a] text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 w-40"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}