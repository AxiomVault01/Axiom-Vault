import { ReactNode } from "react";
import { EmployeeRecord, ValidationIssue } from "./FileUploadPage";

interface ValidationResultsPageProps {
  records: EmployeeRecord[];
  file: File;
  onUploadToRecords: () => void;
  onCancelReupload: () => void;
}

function maskAccount(account: string): string {
  if (!account) return "—";
  const digits = account.replace(/\D/g, "");
  return `**** **** **** ${digits.slice(-4)}`;
}

// Spreadsheet row number: data starts on row 2 (row 1 is the header)
type RowIssue = ValidationIssue & { row: number };

function collectIssues(records: EmployeeRecord[]): RowIssue[] {
  return records.flatMap((record, idx) =>
    (record.issues?.length
      ? record.issues
      : (record.errors ?? []).map(
          (message): ValidationIssue => ({ column: "—", type: "Missing Value", message }),
        )
    ).map((issue) => ({ ...issue, row: idx + 2 })),
  );
}

function downloadErrorReport(issues: RowIssue[], fileName: string) {
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [
    ["Row No.", "Column Name", "Issue Type", "Message"].map(escape).join(","),
    ...issues.map((i) => [i.row, i.column, i.type, i.message].map(escape).join(",")),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName.replace(/\.[^.]+$/, "")}-error-report.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function StatCard({
  icon,
  value,
  label,
  valueClass = "text-gray-900 dark:text-gray-300",
}: {
  icon: ReactNode;
  value: number;
  label: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 dark:bg-white/[0.06]">
        {icon}
      </div>
      <div>
        <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}

function ValidationFailedView({
  records,
  file,
  onCancelReupload,
}: Omit<ValidationResultsPageProps, "onUploadToRecords">) {
  const issues = collectIssues(records);
  const totalRows = records.length;
  const validRows = records.filter((r) => r.status === "Validated").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 m-0 dark:text-gray-300">
          Validation Failed
        </h1>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Review the issue identified in your recent upload.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 lg:max-w-3xl">
        <StatCard
          value={totalRows}
          label="Total Rows"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8" cy="6" r="3" stroke="#64748b" strokeWidth="1.5" />
              <path d="M2 16c0-3 2.7-5 6-5s6 2 6 5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16 13c1.7.5 3 1.7 3 3" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          value={validRows}
          label="Valid Rows"
          valueClass="text-gray-500 dark:text-gray-400"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#16a34a" strokeWidth="1.5" />
              <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          value={issues.length}
          label="Errors Found"
          icon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L18 17H2L10 3z" stroke="#dc2626" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 9v4M10 14.5v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* Issues table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0">
              <tr className="bg-slate-50 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                {["Row No.", "Column Name", "Issue Type", "Message"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap dark:text-gray-400"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
              {issues.map((issue, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.06]">
                  <td className="px-4 py-4 text-gray-500 dark:text-gray-400">{issue.row}</td>
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300">
                    {issue.column}
                  </td>
                  <td className="px-4 py-4 text-gray-700 whitespace-nowrap dark:text-gray-400">{issue.type}</td>
                  <td className="px-4 py-4 text-gray-500 dark:text-gray-400">{issue.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to fix */}
      <div className="flex items-start gap-4 rounded-xl bg-gray-200 px-6 py-5 shadow-md mb-10 lg:max-w-3xl dark:bg-white/[0.06]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-1 shrink-0 text-gray-900 dark:text-gray-300">
          <rect x="1.5" y="3.5" width="15" height="11" rx="2" fill="currentColor" />
          <path d="M2.5 5l6.5 4.5L15.5 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">How to fix these issues?</p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Please correct the issues in your spreadsheet and re-upload
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-14 lg:max-w-3xl">
        <button
          onClick={() => downloadErrorReport(issues, file.name)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-[#0B1F44] bg-white border border-[#0B1F44] hover:bg-gray-50 transition-colors cursor-pointer dark:bg-transparent dark:text-gray-200 dark:border-gray-600 dark:hover:bg-white/5"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download Error Report
        </button>
        <button
          onClick={onCancelReupload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm text-white bg-[#0B1F44] hover:bg-[#152438] transition-colors cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
            <path d="M5.5 8l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Upload Corrected File
        </button>
      </div>
    </div>
  );
}

export default function ValidationResultsPage({
  records,
  file,
  onUploadToRecords,
  onCancelReupload,
}: ValidationResultsPageProps) {
  const totalRows = records.length;
  const validRows = records.filter((r) => r.status === "Validated").length;
  const errorRows = records.filter((r) => r.status === "Error").length;

  if (errorRows > 0) {
    return (
      <ValidationFailedView
        records={records}
        file={file}
        onCancelReupload={onCancelReupload}
      />
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 m-0 dark:text-gray-300">
            Validation Successfully
          </h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Upload your organization's employee database to begin the risk assessment and compliance audit process
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Total Rows */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8" cy="6" r="3" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="14" cy="8" r="2.5" stroke="#64748b" strokeWidth="1.5" />
              <path d="M2 16c0-3 2.7-5 6-5s6 2 6 5" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16 13c1.7.5 3 1.7 3 3" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-300">{totalRows}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Rows</div>
          </div>
        </div>

        {/* Valid Rows */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="#16a34a" strokeWidth="1.5" />
              <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{validRows}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Valid Rows</div>
          </div>
        </div>

        {/* Errors Found */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${errorRows > 0 ? "bg-red-50" : "bg-slate-100"}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3L18 17H2L10 3z"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M10 9v4M10 14.5v.5"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className={`text-2xl font-bold ${errorRows > 0 ? "text-red-600" : "text-gray-900 dark:text-gray-300"}`}>
              {errorRows}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Errors Found</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 dark:border-gray-700 dark:bg-white/[0.06]">
                {["Employee ID", "Full Name", "Department", "Position", "Account No", "Status"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap dark:text-gray-400"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50 transition-colors ${idx < records.length - 1 ? "border-b border-slate-100" : ""} dark:border-gray-700 dark:hover:bg-white/[0.06]`}
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {record.employeeId}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400">
                    {record.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {record.department}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap dark:text-gray-400">
                    {record.position}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono whitespace-nowrap dark:text-gray-400">
                    {maskAccount(record.bankAccount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        record.status === "Validated"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:w-md md:w-lg lg:w-xl">
        <button
          onClick={onUploadToRecords}
          disabled={validRows === 0}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm text-white transition-colors ${
            validRows > 0
              ? "bg-[#1a2e4a] hover:bg-[#152438] cursor-pointer"
              : "bg-slate-400 cursor-not-allowed"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
            <path d="M5.5 8l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Upload to Records
        </button>

        <button
          onClick={onCancelReupload}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm text-red-500 bg-white border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#dc2626" strokeWidth="1.5" />
            <path d="M5.5 8l2 2 3-3" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Cancel & Re-upload
        </button>
      </div>
    </div>
  );
}