import React, { useState, useCallback, useRef } from "react";

interface FileUploadPageProps {
  onValidationComplete: (data: EmployeeRecord[], file: File) => void;
}

export interface EmployeeRecord {
  employeeId: string;
  fullName: string;
  department: string;
  position: string;
  bankAccount: string;
  status: "Validated" | "Error";
  errors?: string[];
  issues?: ValidationIssue[];
}

export interface ValidationIssue {
  column: string;
  type: "Missing Value" | "Empty Field" | "Invalid Format";
  message: string;
}

// Shown in the "Required Columns (payroll)" panel
const REQUIRED_COLUMNS = [
  "Employee ID",
  "Full Name",
  "Department",
  "Position",
  "Bank Account Number",
  "Salary Amount",
  "Payment Date",
  "Attendance Days",
  "Employment Status and Exit Date",
  "Approver ID",
];

// Columns enforced during validation: lower-cased header -> accepted aliases
const COLUMN_MAP: Record<string, string[]> = {
  "employee id": ["employee id"],
  "full name": ["full name"],
  department: ["department"],
  position: ["position"],
  "bank account": ["bank account", "bank account number"],
};

function pick(row: Record<string, string>, column: string): string {
  for (const alias of COLUMN_MAP[column]) {
    const value = String(row[alias] ?? "").trim();
    if (value) return value;
  }
  return "";
}

async function parseFile(file: File): Promise<Record<string, string>[]> {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
    raw: false,
  }) as Record<string, string>[];
  return data;
}

function validateRows(rows: Record<string, string>[]): EmployeeRecord[] {
  return rows.map((row) => {
    const errors: string[] = [];
    const normalizedRow: Record<string, string> = {};
    Object.entries(row).forEach(([k, v]) => {
      normalizedRow[k.trim().toLowerCase()] = v;
    });

    const employeeId = pick(normalizedRow, "employee id");
    const fullName = pick(normalizedRow, "full name");
    const department = pick(normalizedRow, "department");
    const position = pick(normalizedRow, "position");
    const bankAccount = pick(normalizedRow, "bank account");

    const issues: ValidationIssue[] = [];
    if (!employeeId)
      issues.push({ column: "Employee ID", type: "Missing Value", message: "Employee ID is required" });
    if (!fullName)
      issues.push({ column: "Employee", type: "Missing Value", message: "Employee name is required" });
    if (!department)
      issues.push({ column: "Department", type: "Empty Field", message: "Department cannot be blank" });
    if (!position)
      issues.push({ column: "Position", type: "Empty Field", message: "Position cannot be blank" });
    if (!bankAccount)
      issues.push({ column: "Bank Account", type: "Missing Value", message: "Bank account number is required" });
    else if (!/^\d{6,20}$/.test(bankAccount.replace(/[\s-]/g, "")))
      issues.push({ column: "Bank Account", type: "Invalid Format", message: "Must be a valid account number" });

    issues.forEach((issue) => errors.push(`${issue.column}: ${issue.message}`));

    return {
      employeeId,
      fullName,
      department,
      position,
      bankAccount,
      status: errors.length === 0 ? "Validated" : "Error",
      errors,
      issues,
    };
  });
}

export default function FileUploadPage({
  onValidationComplete,
}: FileUploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (
      !allowed.includes(f.type) &&
      !["csv", "xls", "xlsx"].includes(ext ?? "")
    ) {
      setError("Please upload a CSV, XLS, or XLSX file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File exceeds 10MB limit.");
      return;
    }
    setError(null);
    setProgress(0);
    setFile(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleValidate = async () => {
    if (!file) return;
    setIsValidating(true);
    setError(null);
    setProgress(15);

    try {
      const rows = await parseFile(file);
      setProgress(60);

      if (rows.length === 0) {
        setError("The file appears to be empty or unreadable.");
        setIsValidating(false);
        return;
      }

      // Check headers
      const firstRow = rows[0];
      const headers = Object.keys(firstRow).map((h) => h.trim().toLowerCase());
      const missingCols = Object.keys(COLUMN_MAP).filter(
        (col) => !COLUMN_MAP[col].some((alias) => headers.includes(alias)),
      );

      if (missingCols.length > 0) {
        setError(
          `Missing required columns: ${missingCols
            .map((c) => c.replace(/\b\w/g, (l) => l.toUpperCase()))
            .join(", ")}`,
        );
        setIsValidating(false);
        setProgress(0);
        return;
      }

      // Simulate async processing
      await new Promise((res) => setTimeout(res, 300));
      const records = validateRows(rows);
      setProgress(100);
      onValidationComplete(records, file);
    } catch {
      setError("Failed to read the file. Please check it and try again.");
      setProgress(0);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div style={{ padding: "2rem 2.5rem" }}>
      <h1
        className="dark:text-gray-300"
        style={{ fontSize: "1.75rem", fontWeight: 600, margin: "0 0 0.25rem" }}
      >
        Initial File Upload
      </h1>
      <p className="dark:text-gray-400 text-[var(--color-text-secondary)] mb-8 text-[0.95rem]">
        Upload payroll or vendor payment data to begin anomaly detection
      </p>

      <div className="flex flex-col-reverse sm:flex-row gap-6 items-start">
        {/* Upload Zone */}
        <div className="flex-1 w-full sm:w-auto">
          <div
            onClick={() => !file && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center gap-3 text-center min-h-[280px] px-8 py-17 rounded-[12px] border-2 border-dotted transition-all duration-200 ${file ? "cursor-default" : "cursor-pointer"} ${
              isDragging
                ? "border-[#1a2e4a] bg-[#f0f4f8] dark:bg-blue-900/20 dark:border-gray-600"
                : "border-[#cbd5e1] bg-white dark:bg-white/[0.03] dark:border-gray-400"
            }
          `}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              style={{ display: "none" }}
              onChange={onInputChange}
            />

            {/* Cloud Upload Icon */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#C7D7F5" />
              <path
                d="M16 28c-2.2-0.5-4-2.5-4-5a5 5 0 0 1 8.3-3.8A7 7 0 1 1 31 28"
                stroke="#1E4FA8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M20 32l4-4 4 4M24 28v8"
                stroke="#1E4FA8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div>
              <p
                className="dark:text-gray-300"
                style={{
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  margin: "0 0 0.25rem",
                }}
              >
                Upload Employee Data
              </p>
              {file ? (
                <p className="text-[#1a2e4a] font-medium m-0 dark:text-gray-400">
                  {file.name}
                </p>
              ) : (
                <>
                  <p className="dark:text-gray-400 text-secondary mb-1 text-[0.9rem]">
                    Drag and drop Excel or CSV file
                  </p>
                  <p className="dark:text-gray-400 text-gray-500 mb-1 text-[0.85rem]">
                    or click to browse from your computer
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded text-[0.85rem] text-[var(--color-text-secondary)] dark:bg-white/[0.05] dark:text-gray-400">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="2"
                  width="14"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 6h6M5 9h4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              CSV, XLS, XLSX (Max 10MB)
            </div>

            {file && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setError(null);
                  setProgress(0);
                }}
                className="bg-transparent border border-gray-500 rounded-[6px] px-3 py-1 cursor-pointer text-[0.8rem] text-[var(--color-text-secondary)] dark:text-gray-400"
              >
                Remove file
              </button>
            )}
          </div>

          {error && (
            <div className="mt-3 px-4 py-3 bg-[#fef2f2] border border-[#fecaca] rounded-[8px] text-[#dc2626] text-sm dark:bg-white/[0.15] dark:border-red-300 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            onClick={handleValidate}
            disabled={!file || isValidating}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.875rem",
              background: file && !isValidating ? "#1a2e4a" : "#94a3b8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: file && !isValidating ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "background 0.2s",
            }}
          >
            {isValidating ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="20 8"
                  />
                </svg>
                Validating...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M5.5 8l2 2 3-3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Validate File
              </>
            )}
          </button>

          {/* Upload progress */}
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-gray-100 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[#1a2e4a] dark:text-gray-300">
              <path
                d="M2 5.5A1.5 1.5 0 0 1 3.5 4h4l2 2h7A1.5 1.5 0 0 1 18 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9z"
                fill="currentColor"
              />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="mb-2 truncate text-xs text-gray-700 dark:text-gray-300">
                {file
                  ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)`
                  : "No file was selected"}
              </p>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-[#1a2e4a] transition-all duration-300 dark:bg-blue-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="w-9 text-right text-xs text-gray-500 dark:text-gray-400">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Required Columns Panel */}
        <div
          className="bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-white/[0.03]"
          style={{
            width: "270px",
            borderRadius: "12px",
            padding: "1.25rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="16" height="16" rx="3" fill="#1a2e4a" />
              <path
                d="M5 6h8M5 9h8M5 12h5"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-bold text-[0.9rem] dark:text-white">
              Required Columns (payroll)
            </span>
          </div>
          <p className="text-[0.8rem] text-[var(--color-text-secondary)] mb-3 leading-normal dark:text-gray-400">
            Ensure your spreadsheet contains these exact headers for successful
            processing:
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            {REQUIRED_COLUMNS.map((col) => (
              <div
                key={col}
                className="text-sm text-[#1e293b] dark:text-gray-300"
              >
                {col}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
