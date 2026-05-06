import React from "react";
import { EmployeeRecord } from "./FileUploadPage";

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

export default function ValidationResultsPage({
  records,
  onUploadToRecords,
  onCancelReupload,
}: ValidationResultsPageProps) {
  const totalRows = records.length;
  const validRows = records.filter((r) => r.status === "Validated").length;
  const errorRows = records.filter((r) => r.status === "Error").length;

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