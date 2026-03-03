/**
 * ReportStatCards.tsx
 * Four KPI cards: Reports This Month / Cases Documented /
 * Total Downloads / Avg. Report Size
 */

import React from "react";
import { FileText, AlertTriangle, Download, File } from "lucide-react";

export interface StatCardItem {
  label: string;
  value: string | number;
  sub: string;
  subColor?: string;
  icon: React.ElementType;
  iconBg: string;
}

interface Props {
  stats?: StatCardItem[];
}

const DEFAULT_STATS: StatCardItem[] = [
  {
    label: "Reports This Month",
    value: 24,
    sub: "+6 from last month",
    subColor: "text-green-600",
    icon: FileText,
    iconBg: "bg-blue-50 text-blue-500",
  },
  {
    label: "Cases Documented",
    value: 156,
    sub: "+12 from last month",
    subColor: "text-green-600",
    icon: AlertTriangle,
    iconBg: "bg-red-50 text-red-500",
  },
  {
    label: "Total Downloads",
    value: 89,
    sub: "Last 30 days",
    subColor: "text-gray-400",
    icon: Download,
    iconBg: "bg-green-50 text-green-600",
  },
  {
    label: "Avg. Report Size",
    value: "3.2 MB",
    sub: "Across all formats",
    subColor: "text-gray-400",
    icon: File,
    iconBg: "bg-purple-50 text-purple-500",
  },
];

const ReportStatCards: React.FC<Props> = ({ stats = DEFAULT_STATS }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
    {stats.map((s) => {
      const Icon = s.icon;
      return (
        <div
          key={s.label}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow dark:border-gray-600 dark:bg-white/[0.03] dark:text-white"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">{s.label}</p>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.iconBg}`}>
              <Icon size={15} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 tracking-tight leading-none dark:text-gray-300">
            {s.value}
          </p>
          <p className={`text-xs font-medium ${s.subColor ?? "text-green-600"}`}>
            {s.sub}
          </p>
        </div>
      );
    })}
  </div>
);

export default ReportStatCards;