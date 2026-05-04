import { useState, useMemo, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import { EmployeeRecord } from "./FileUploadPage";
// import Badge from "./Badge";
import Badge from "../../components/ui/badge/Badge";
import { useEmployeeRecords } from "./EmployeeRecordsContext";

interface EmployeeRecordsDisplayProps {
  records: EmployeeRecord[];
  onUploadFile: () => void;
}

type RiskType = "Duplicate Account" | "Ghost Employee" | "Salary Anomaly" | "Clean";
type Severity = "Critical" | "High" | "Medium" | "Low";
type RecordStatus = "Flagged" | "Verified" | "Under Review";

interface EnrichedRecord extends EmployeeRecord {
  riskType: RiskType;
  severity: Severity;
  recordStatus: RecordStatus;
  sharedWith?: number;
}

function assignRisk(
  record: EmployeeRecord,
  allRecords: EmployeeRecord[]
): Pick<EnrichedRecord, "riskType" | "severity" | "recordStatus" | "sharedWith"> {
  const accountMatches = allRecords.filter(
    (r) => r.bankAccount === record.bankAccount && r.employeeId !== record.employeeId
  ).length;

  if (accountMatches > 0) {
    const severity: Severity =
      accountMatches >= 3 ? "Critical" : accountMatches >= 2 ? "High" : "Medium";
    return { riskType: "Duplicate Account", severity, recordStatus: "Flagged", sharedWith: accountMatches };
  }

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

// Map severity → Badge color prop
const severityColor: Record<Severity, "error" | "warning" | "info" | "success"> = {
  Critical: "error",
  High:     "warning",
  Medium:   "info",
  Low:      "success",
};

// Map risk type → Badge color prop
const riskColor: Record<RiskType, "error" | "warning" | "success" | "info"> = {
  "Duplicate Account": "error",
  "Ghost Employee":    "error",
  "Salary Anomaly":   "warning",
  "Clean":            "success",
};

export default function FinalRecords({
  records,
  onUploadFile,
}: EmployeeRecordsDisplayProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All Status" | RecordStatus>("All Status");

  // Sync validated records into context so EmployeeDetails can look them up by ID
  const { setRecords } = useEmployeeRecords();
  useEffect(() => {
    const validated = records.filter((r) => r.status === "Validated");
    setRecords(validated);
  }, [records, setRecords]);

  const enriched: EnrichedRecord[] = useMemo(
    () =>
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

  // Tanstack column definitions
  const columns = useMemo<ColumnDef<EnrichedRecord>[]>(
    () => [
      {
        header: "Employee",
        cell: ({ row }) => (
          <div>
            <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-300">
              {row.original.fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{row.original.employeeId}</p>
          </div>
        ),
      },
      {
        header: "Department",
        cell: ({ row }) => (
          <div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400">{row.original.department}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{row.original.position}</p>
          </div>
        ),
      },
      {
        header: "Bank Account",
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <span className="text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-400">
              {maskAccount(row.original.bankAccount)}
            </span>
            {row.original.sharedWith && row.original.sharedWith > 0 && (
              <Badge color="error" size="sm">
                Shared with {row.original.sharedWith} {row.original.sharedWith === 1 ? "other" : "others"}
              </Badge>
            )}
          </div>
        ),
      },
      {
        header: "Risk Type",
        cell: ({ row }) => (
          <Badge color={riskColor[row.original.riskType]} size="sm">
            {row.original.riskType}
          </Badge>
        ),
      },
      {
        header: "Severity",
        cell: ({ row }) => (
          <Badge color={severityColor[row.original.severity]} size="sm">
            {row.original.severity}
          </Badge>
        ),
      },
      {
        header: "Status",
        cell: ({ row }) => {
          const isFlagged  = row.original.recordStatus === "Flagged";
          const isVerified = row.original.recordStatus === "Verified";
          return (
            <Badge
              color={isVerified ? "success" : isFlagged ? "error" : "warning"}
              size="sm"
              startIcon={
                isFlagged ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L6 11H2L6 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
                    <path d="M6 5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : isVerified ? (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M3.5 6l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : undefined
              }
            >
              {row.original.recordStatus}
            </Badge>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div>
            <Link
              to={`/employee/${row.original.employeeId}`}
              state={{ employee: row.original }}
              className="hidden md:block text-xs sm:text-sm font-semibold text-[#1a2e4a] hover:underline underline-offset-2 dark:text-brand-600"
            >
              View Details
            </Link>
            <Link
              to={`/employee/${row.original.employeeId}`}
              state={{ employee: row.original }}
              className="md:hidden text-[#1a2e4a] dark:text-brand-600"
            >
              <Eye size={16} />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 ">
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7" cy="6" r="3" stroke="#475569" strokeWidth="1.4" />
                <circle cx="13" cy="8" r="2.5" stroke="#475569" strokeWidth="1.4" />
                <path d="M1 17c0-3 2.7-5 6-5s6 2 6 5" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M17 14c1.2.6 2 1.8 2 3" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ),
            value: totalEmployees,
            label: "Total Employees",
            valueClass: "text-gray-900 dark:text-gray-300",
            borderClass: "border-gray-200",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L18 17H2L10 3z" stroke="#dc2626" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                <path d="M10 9v4" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="14.5" r="0.5" fill="#dc2626" />
              </svg>
            ),
            value: flaggedRecords,
            label: "Flagged Records",
            valueClass: "text-red-600",
            borderClass: "border-red-200",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#16a34a" strokeWidth="1.4" />
                <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
            value: verifiedClean,
            label: "Verified Clean",
            valueClass: "text-green-600",
            borderClass: "border-green-200",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h10M3 14h7" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="16" cy="13" r="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" />
              </svg>
            ),
            value: underReview,
            label: "Under Review",
            valueClass: "text-slate-400",
            borderClass: "border-gray-200",
          },
        ].map(({ icon, value, label, valueClass, borderClass }) => (
          <div
            key={label}
            className={`bg-white border ${borderClass} rounded-xl p-4 flex items-center gap-3 dark:border-gray-800 dark:bg-white/[0.03]`}
          >
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <div className={`text-2xl font-bold leading-none ${valueClass}`}>{value}</div>
              <div className="text-xs text-gray-500 mt-0.5 dark:text-gray-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden dark:bg-white/[0.03] dark:border-gray-700">
        {/* Filters */}
        <div className="p-3 sm:p-4 border-b flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-1/2">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              width="14" height="14" viewBox="0 0 16 16" fill="none"
            >
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              placeholder="Search by name, employee ID, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-400"
            />
          </div>

          {/* Right controls */}
          <div className="flex gap-2 sm:gap-3 items-center">
            {/* Status dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-white/[0.03] dark:border-gray-700 dark:text-white dark:focus:bg-[#1a2e4a]"
            >
              <option value="All Status">All Status</option>
              <option value="Flagged">Flagged Only</option>
              <option value="Verified">Verified Only</option>
              <option value="Under Review">Pending Only</option>
            </select>

            {/* Export */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-[#1a2e4a] hover:bg-[#152438] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v7M4 6l3 3 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Export
            </button>

            {/* Upload File */}
            <button
              onClick={onUploadFile}
              className="flex items-center gap-1.5 bg-[#1a2e4a] hover:bg-[#152438] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 9V2M4 5l3-3 3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Upload File
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs dark:bg-white/[0.03] dark:text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 sm:px-5 py-3 text-left font-semibold tracking-wide whitespace-nowrap"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-10 text-gray-400 text-sm">
                    No employees found matching your criteria.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition-colors dark:hover:bg-white/[0.02]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 sm:px-5 py-3 whitespace-nowrap xl:whitespace-pre-wrap "
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}