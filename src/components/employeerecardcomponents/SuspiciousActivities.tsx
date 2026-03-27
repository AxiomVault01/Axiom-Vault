import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Severity = "Critical"  | "High" | "Medium" | "Low";
type ActivityTab = "All" | "Bank Issues" | "Payroll";

interface SuspiciousActivity {
  id: number;
  img: string;
  employee: string;
  employeeID: number;
  riskType: string;
  severity: Severity;
  date: string;
  action: string;
  activityType: "Bank Issues" | "Payroll" | "Other";
}

// ─── Dashboard data ───────────────────────────────────────────────────────────

const ACTIVITIES: SuspiciousActivity[] = [
  {
    id: 1,
    img: '/public/images/user/user-02.jpg',
    employee: "James Okafor",
    employeeID: 4352,
    riskType: "Duplicate Bank Account",
    severity: "High",
    date: "Jan 30, 2025",
    activityType: "Bank Issues",
    action: "Review"
  },
  {
    id: 2,
    employee: "Amaka Chukwu",
    img: '/public/images/user/user-03.jpg',
    employeeID: 3352,
    riskType: "Unusual Payment Pattern",
    severity: "Critical",
    date: "Jan 26, 2025",
    activityType: "Other",
    action: "Investigate"
  },
  {
    id: 3,
    employee: "Tunde Adeyemi",
    img: '/public/images/user/user-04.jpg',
    employeeID: 4212,
    riskType: "Payroll Overpayment",
    severity: "Medium",
    date: "Jan 28, 2025",
    activityType: "Payroll",
    action: "Verify"
  },
  {
    id: 4,
    employee: "Ngozi Eze",
    img: '/public/images/user/user-05.jpg',
    employeeID: 1989,
    riskType: "Duplicate Bank Account",
    severity: "High",
    date: "Jan 27, 2025",
    activityType: "Bank Issues",
    action: "Review"
  },
  {
    id: 5,
    employee: "Emeka Nwosu",
    img: '/public/images/user/user-06.jpg',
    employeeID: 7190,
    riskType: "Missing Tax Info",
    severity: "Critical",
    date: "Jan 26, 2025",
    activityType: "Payroll",
    action: "Investigate"
  },
];

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-red-100 text-red-700 border border-red-300",
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
                  {["", "Employee", "Risk Type", "Severity", "Date", "Action"].map(
                    (h) => (
                      <th key={h} className="text-left py-2 px-2 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors dark:hover:bg-white/[0.03]"
                  >
                    <td className="w-7 h-5">
                      <img src={row.img} alt="" />
                    </td>
                    <td className="py-4 px-2 font-medium flex flex-col text-gray-800 dark:text-gray-400">
                       <span>{row.employee}</span>
                      <span className="font-extralight">#EMP-{row.employeeID}</span>
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
                      <button className="text-brand-400 hover:text-orange-700 font-semibold transition-colors">
                        {row.action}
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

