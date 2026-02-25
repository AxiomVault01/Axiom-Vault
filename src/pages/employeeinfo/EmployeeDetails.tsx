import { useParams, useNavigate } from "react-router";
import {
  X,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  Building,
  Briefcase,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react";
import { employees } from "../UiElements/Constants";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find employee by ID
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-gray-600">Employee not found</p>
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

  // Mock related employees for duplicate account risk
  const relatedEmployees = [
    "Grace Jame",
    "Ade Reyes",
    "Rose Green",
    "Luis Ali",
  ];

  // Check if employee is verified or flagged
  const isVerified = employee.status?.toLowerCase() === "verified";

  // Mock payroll history data
  const payrollHistory = [
    { period: "Jan 2026", amount: "₦65,000", status: "Paid" },
    { period: "Dec 2025", amount: "₦65,000", status: "Paid" },
    { period: "Nov 2025", amount: "₦65,000", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 dark:bg-black dark:text-white">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden  dark:bg-black dark:text-white">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Employee Record Details {isVerified ? "Verified" : "Flagged"}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 transition"
            title="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Employee Header Section */}
        <div
          className={`p-4 sm:p-6 md:p-8 border-b ${isVerified ? "bg-green-50" : "bg-gradient-to-r from-blue-50 to-transparent"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ${isVerified ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-blue-400 to-blue-600"}`}
            >
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {employee.name}
                </h2>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit ${isVerified ? "bg-green-100 text-green-700  dark:bg-black dark:text-white" : "bg-red-100 text-red-700  dark:bg-black dark:text-white"}`}
                >
                  {employee.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Employee ID: {employee.id}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Alert Section - Only show for Flagged */}
        {!isVerified && (
          <div className="p-4 sm:p-6 md:p-8 bg-red-50 border-b  dark:bg-black dark:text-white">
            <div className="flex gap-4">
              <AlertTriangle
                className="text-red-600 flex-shrink-0 mt-1"
                size={24}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800">
                  Risk Alert: {employee.risk}
                </h3>
                <p className="text-sm text-red-700 mt-2">
                  This employee's bank account is shared with 4 other
                  employee(s).
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {relatedEmployees.map((name) => (
                    <button
                      key={name}
                      className="px-3 py-1 bg-white border border-red-300 rounded-lg text-xs text-red-700 hover:bg-red-50 transition  dark:bg-black dark:text-white"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          {/* Personal Information & Employment Details - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
                <User size={20} className="text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <InfoField
                  icon={<Mail size={18} />}
                  label="Email"
                  value="maria.amos@company.com"
                />
                <InfoField
                  icon={<Phone size={18} />}
                  label="Phone"
                  value="+234 912 345 6789"
                />
                <InfoField
                  icon={<MapPin size={18} />}
                  label="Address"
                  value="Lagos, Nigeria"
                />
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 dark:text-white">
                <Briefcase size={20} className="text-blue-600" />
                Employment Details
              </h3>
              <div className="space-y-4">
                <InfoField
                  icon={<Building size={18} />}
                  label="Department"
                  value={employee.department}
                />
                <InfoField
                  icon={<Briefcase size={18} />}
                  label="Position"
                  value={employee.role}
                />
                <InfoField
                  icon={<Calendar size={18} />}
                  label="Hire Date"
                  value="2021-04-18"
                />
                <InfoField
                  icon={<User size={18} />}
                  label="Supervisor"
                  value="CEO Office"
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className=" dark:bg-black dark:text-white">
            <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">
              Financial Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4  dark:bg-black ">
                <p className="text-xs text-gray-600 dark:text-white">
                  Current Salary
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 dark:text-white">
                  ₦65,000
                </p>
                <p className="text-xs text-gray-500 mt-1 dark:text-white">
                  per month
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 dark:bg-black">
                <p className="text-xs text-gray-600 dark:text-white">
                  Bank Account
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2 dark:text-white">
                  **** **** **** {employee.bank?.slice(-4)}
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
                <thead className="bg-gray-50 dark:bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase dark:text-white">
                      Period
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700 text-xs uppercase dark:text-white">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase dark:text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {payrollHistory.map((record, idx) => (
                    <tr key={idx} className="">
                      <td className="px-4 py-3 text-gray-800 dark:text-white">
                        {record.period}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white">
                        {record.amount}
                      </td>
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

        {/* Risk Assessment Section - Only show for Flagged */}
        {!isVerified && (
          <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t  dark:bg-black dark:text-white">
            <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">
              Risk Assessment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RiskCard label="Risk Type" value={employee.risk} color="red" />
              <RiskCard
                label="Severity"
                value={employee.severity}
                color={
                  employee.severity === "Critical"
                    ? "red"
                    : employee.severity === "High"
                      ? "orange"
                      : "yellow"
                }
              />
              <RiskCard
                label="Status"
                value={employee.status}
                color="red"
                icon={<AlertTriangle size={16} />}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end  dark:bg-black dark:text-white">
          <button
            onClick={() => navigate(-1)}
            className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base font-medium text-gray-700 dark:text-white transition"
          >
            Close
          </button>
          {!isVerified && (
            <>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm sm:text-base font-medium transition">
                Mark as Verified
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm sm:text-base font-medium transition">
                Escalate Case
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Info Field Component
const InfoField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3">
    <div className="text-blue-600 flex-shrink-0 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-600 dark:text-white">{label}</p>
      <p className="text-sm sm:text-base font-medium text-gray-800 mt-1 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

// Risk Card Component
const RiskCard = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: "red" | "orange" | "yellow";
  icon?: React.ReactNode;
}) => {
  const colorClasses = {
    red: "bg-red-100 text-red-700",
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
