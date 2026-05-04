import { useParams, useNavigate, useLocation } from "react-router";
import {
  X, Mail, Phone, MapPin, AlertTriangle,
  Building, Briefcase, Calendar, User, TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import { EmployeeRecord } from "./FileUploadPage";

// ── risk helpers (same logic as EmployeeRecordsDisplay) ──────────────────────
type RiskType = "Duplicate Account" | "Ghost Employee" | "Salary Anomaly" | "Clean";
type Severity = "Critical" | "High" | "Medium" | "Low";
type RecordStatus = "Flagged" | "Verified" | "Under Review";

interface EnrichedRecord extends EmployeeRecord {
  riskType: RiskType;
  severity: Severity;
  recordStatus: RecordStatus;
  sharedWith?: number;
  sharedWithNames?: string[];
}

function assignRisk(record: EmployeeRecord, allRecords: EmployeeRecord[]): Omit<EnrichedRecord, keyof EmployeeRecord> {
  const duplicates = allRecords.filter(
    (r) => r.bankAccount === record.bankAccount && r.employeeId !== record.employeeId
  );

  if (duplicates.length > 0) {
    const severity: Severity = duplicates.length >= 3 ? "Critical" : duplicates.length >= 2 ? "High" : "Medium";
    return {
      riskType: "Duplicate Account",
      severity,
      recordStatus: "Flagged",
      sharedWith: duplicates.length,
      sharedWithNames: duplicates.map((d) => d.fullName),
    };
  }

  const idNum = parseInt(record.employeeId.replace(/\D/g, "").slice(-3) || "0", 10);
  if (idNum % 7 === 0) return { riskType: "Ghost Employee", severity: "Medium", recordStatus: "Verified" };
  if (idNum % 5 === 0) return { riskType: "Salary Anomaly", severity: "Critical", recordStatus: "Verified" };
  return { riskType: "Clean", severity: "Low", recordStatus: "Verified" };
}

function maskAccount(account: string): string {
  if (!account) return "—";
  return `**** **** **** ${account.replace(/\D/g, "").slice(-4)}`;
}

// ── mock payroll (replace with real data when available) ─────────────────────
const payrollHistory = [
  { period: "Jan 2026", amount: "₦65,000", status: "Paid" },
  { period: "Dec 2025", amount: "₦65,000", status: "Paid" },
  { period: "Nov 2025", amount: "₦65,000", status: "Paid" },
];

// ─────────────────────────────────────────────────────────────────────────────

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // EnrichedRecord passed directly via router state from EmployeeRecordsDisplay
  // It already has riskType, severity, recordStatus, sharedWith computed
  const employee: EnrichedRecord | undefined = useMemo(() => {
    const raw = location.state?.employee;
    if (!raw) return undefined;
    // If already enriched (has riskType), use as-is; otherwise enrich now
    if (raw.riskType) return raw as EnrichedRecord;
    return { ...raw, ...assignRisk(raw, [raw]) };
  }, [location.state]);

  // ── not found ────────────────────────────────────────────────────────────
  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 dark:bg-white/[0.03]">
        <div className="bg-white rounded-lg p-6 text-center dark:bg-white/[0.03]">
          <p className="text-gray-600 dark:text-white">Employee not found.</p>
          <p className="text-xs text-gray-400 mt-1 dark:text-white/60">
            Try navigating here from the Employee Records table.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isVerified = employee.recordStatus === "Verified";
  const isFlagged  = employee.recordStatus === "Flagged";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 dark:bg-white/[0.03] dark:text-white">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden dark:bg-white/[0.03] dark:text-white">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Employee Record Details —{" "}
            <span className={isVerified ? "text-green-600" : "text-red-600"}>
              {employee.recordStatus}
            </span>
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 transition dark:text-white/60 dark:hover:text-gray-300"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* ── Employee hero ─────────────────────────────────────────────── */}
        <div className={`p-4 sm:p-6 md:p-8 border-b ${isVerified ? "bg-green-50" : "bg-gradient-to-r from-blue-50 to-transparent"} dark:bg-white/[0.03]`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ${isVerified ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-blue-400 to-blue-600"}`}>
              {employee.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  {employee.fullName}
                </h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit ${isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {employee.recordStatus}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 dark:text-white/60">
                Employee ID: {employee.employeeId}
              </p>
            </div>
          </div>
        </div>

        {/* ── Risk Alert (Flagged only) ─────────────────────────────────── */}
        {isFlagged && (
          <div className="p-4 sm:p-6 md:p-8 bg-red-50 border-b dark:bg-white/[0.03]">
            <div className="flex gap-4">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">
                  Risk Alert: {employee.riskType}
                </h3>
                <p className="text-sm text-red-700 mt-2 dark:text-red-300">
                  This employee's bank account is shared with {employee.sharedWith} other employee(s).
                </p>
                {employee.sharedWithNames && employee.sharedWithNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {employee.sharedWithNames.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1 bg-white border border-red-300 rounded-lg text-xs text-red-700 dark:bg-black dark:text-white"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">

          {/* Personal & Employment — two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
                <User size={20} className="text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <InfoField icon={<Mail size={18} />}  label="Email"   value={`${employee.fullName.split(" ")[0].toLowerCase()}.${employee.fullName.split(" ")[1]?.toLowerCase() ?? ""}@company.com`} />
                <InfoField icon={<Phone size={18} />} label="Phone"   value="+234 912 345 6789" />
                <InfoField icon={<MapPin size={18} />} label="Address" value="Lagos, Nigeria" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
                <Briefcase size={20} className="text-blue-600" />
                Employment Details
              </h3>
              <div className="space-y-4">
                <InfoField icon={<Building size={18} />}  label="Department" value={employee.department} />
                <InfoField icon={<Briefcase size={18} />} label="Position"   value={employee.position} />
                <InfoField icon={<Calendar size={18} />}  label="Hire Date"  value="2021-04-18" />
                <InfoField icon={<User size={18} />}      label="Supervisor"  value="CEO Office" />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">
              Financial Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 dark:bg-white/[0.03]">
                <p className="text-xs text-gray-600 dark:text-white">Current Salary</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 dark:text-white">₦65,000</p>
                <p className="text-xs text-gray-500 mt-1 dark:text-white">per month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 dark:bg-white/[0.03]">
                <p className="text-xs text-gray-600 dark:text-white">Bank Account</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 dark:text-white">
                  {maskAccount(employee.bankAccount)}
                </p>
              </div>
            </div>
          </div>

          {/* Payroll History */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
              <TrendingUp size={20} className="text-blue-600" />
              Payroll History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-white/[0.03]">
                  <tr>
                    {["Period", "Amount", "Status"].map((h) => (
                      <th key={h} className={`px-4 py-3 font-semibold text-gray-700 text-xs uppercase dark:text-white ${h === "Amount" ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {payrollHistory.map((record, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 text-gray-800 dark:text-white">{record.period}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white">{record.amount}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Risk Assessment (Flagged only) ───────────────────────────── */}
        {isFlagged && (
          <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t dark:bg-white/[0.03]">
            <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">Risk Assessment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RiskCard label="Risk Type" value={employee.riskType} color="red" />
              <RiskCard
                label="Severity"
                value={employee.severity}
                color={employee.severity === "Critical" ? "red" : employee.severity === "High" ? "orange" : "yellow"}
              />
              <RiskCard
                label="Status"
                value={employee.recordStatus}
                color="red"
                icon={<AlertTriangle size={16} />}
              />
            </div>
          </div>
        )}

        {/* ── Action Buttons ───────────────────────────────────────────── */}
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end dark:bg-white/[0.03]">
          <button
            onClick={() => navigate(-1)}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 dark:text-white transition hover:bg-gray-100 dark:hover:bg-white/[0.05]"
          >
            Close
          </button>
          {isFlagged && (
            <>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition">
                Mark as Verified
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition">
                Escalate Case
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const InfoField = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex gap-3">
    <div className="text-blue-600 flex-shrink-0 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-600 dark:text-white">{label}</p>
      <p className="text-sm sm:text-base font-medium text-gray-800 mt-1 dark:text-white">{value}</p>
    </div>
  </div>
);

const RiskCard = ({
  label, value, color, icon,
}: {
  label: string; value: string; color: "red" | "orange" | "yellow"; icon?: React.ReactNode;
}) => {
  const colorClasses = {
    red:    "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]}`}>
      <p className="text-xs font-medium opacity-75">{label}</p>
      <div className="flex items-center gap-2 mt-2">
        {icon}
        <p className="text-sm sm:text-base font-bold">{value}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;