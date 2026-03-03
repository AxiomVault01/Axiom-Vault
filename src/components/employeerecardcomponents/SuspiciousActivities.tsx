import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Severity = "High" | "Medium" | "Low";
type ActivityTab = "All" | "Bank Issues" | "Payroll";

interface SuspiciousActivity {
  id: number;
  employee: string;
  riskType: string;
  severity: Severity;
  date: string;
  activityType: "Bank Issues" | "Payroll" | "Other";
}

// ─── Dashboard data ───────────────────────────────────────────────────────────

const ACTIVITIES: SuspiciousActivity[] = [
  {
    id: 1,
    employee: "James Okafor",
    riskType: "Duplicate Bank Account",
    severity: "High",
    date: "Jan 30",
    activityType: "Bank Issues",
  },
  {
    id: 2,
    employee: "Amaka Chukwu",
    riskType: "Unusual Payment Pattern",
    severity: "High",
    date: "Jan 29",
    activityType: "Payroll",
  },
  {
    id: 3,
    employee: "Tunde Adeyemi",
    riskType: "Payroll Overpayment",
    severity: "Medium",
    date: "Jan 28",
    activityType: "Payroll",
  },
  {
    id: 4,
    employee: "Ngozi Eze",
    riskType: "Duplicate Bank Account",
    severity: "High",
    date: "Jan 27",
    activityType: "Bank Issues",
  },
  {
    id: 5,
    employee: "Emeka Nwosu",
    riskType: "Missing Tax Info",
    severity: "Low",
    date: "Jan 26",
    activityType: "Other",
  },
  {
    id: 6,
    employee: "Chidinma Obiora",
    riskType: "Unusual Payment Pattern",
    severity: "Medium",
    date: "Jan 25",
    activityType: "Payroll",
  },
];

const SEVERITY_STYLES: Record<Severity, string> = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-orange-50 text-orange-600 border border-orange-200",
  Low: "bg-yellow-50 text-yellow-600 border border-yellow-200",
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<ActivityTab>("All");
  const filtered = ACTIVITIES.filter(
    (a) => activeTab === "All" || a.activityType === activeTab,
  );

  return (
    <main className="">
      {/* Suspicious Activities + Quick Actions */}
        <div className=" bg-white rounded-xl border border-gray-100 shadow-sm p-5 dark:border-gray-600 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between my-5">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300">
              Suspicious Activities
            </h3>
            <div className="flex gap-1.5">
              {(["All", "Bank Issues", "Payroll"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-400 dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto py-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100 dark:text-gray-300">
                  {["Employee", "Risk Type", "Severity", "Date", "Action"].map(
                    (h) => (
                      <th key={h} className="text-left py-2 px-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors dark:hover:bg-white/[0.03]"
                  >
                    <td className="py-4 px-2 font-medium text-gray-800 dark:text-gray-400">
                      {row.employee}
                    </td>
                    <td className="py-4 px-2 text-gray-500 dark:text-gray-400">
                      {row.riskType}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${SEVERITY_STYLES[row.severity]}`}
                      >
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-gray-400">{row.date}</td>
                    <td className="py-2.5 px-2">
                      <button className="text-orange-500 hover:text-orange-700 font-semibold transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </main>
  );
}

