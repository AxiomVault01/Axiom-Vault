import { AlertTriangle, Briefcase, Search, Shield } from "lucide-react";
import { ReactNode, useState } from "react";
import useDashboardStats from "../../hooks/useDashboardData";
import {
  DEFAULT_SUMMARY_DAYS,
  SUMMARY_DAY_OPTIONS,
  SummaryDays,
} from "../../services/DashboardDataAPI";

type Props = {
  id: number;
  icon?: ReactNode;
  label: string;
  amount: number;
  description: string;
  statuscolor: string;
  bgcolor?: string;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function EcommerceMetrics({
  empty = false,
}: {
  empty?: boolean;
}) {
  const [days, setDays] = useState<SummaryDays>(DEFAULT_SUMMARY_DAYS);
  const { data, isLoading, isError } = useDashboardStats(days, !empty);

  const riskLevel = data?.risk_exposure.level;

  const metrics: Props[] = [
    {
      id: 1,
      icon: <AlertTriangle size={16} />,
      statuscolor: "text-red-500",
      bgcolor: "bg-red-100",
      label: "Critical Alerts",
      amount: data?.critical_alerts ?? 0,
      description: "Needs immediate attention",
    },
    {
      id: 2,
      icon: <Search size={16} />,
      statuscolor: "text-blue-800",
      bgcolor: "bg-blue-100",
      label: "Open Investigations",
      amount: data?.open_investigations ?? 0,
      description: "Active cases in progress",
    },
    {
      id: 3,
      icon: <Briefcase size={16} />,
      statuscolor: "text-purple-800",
      bgcolor: "bg-purple-100",
      label: "Active Cases",
      amount: data?.active_cases ?? 0,
      description: "Total ongoing workflows",
    },
    {
      id: 4,
      icon: <Shield size={16} />,
      statuscolor: "text-amber-500",
      bgcolor: "bg-amber-100",
      label: "Risk Exposure Score",
      amount: data?.risk_exposure.score ?? 0,
      description: riskLevel
        ? `Out of 100 - ${capitalize(riskLevel)} risk level`
        : "Out of 100",
    },
  ];

  const description = (metric: Props) => {
    if (empty) return "No data available yet";
    if (isLoading) return "Loading...";
    if (isError) return "Couldn't load data";
    return metric.description;
  };

  return (
    <div className="-mt-6">
      {!empty && (
        <div className="flex items-center justify-end gap-2 mb-3">
          <label
            htmlFor="summary-days"
            className="text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            Period
          </label>
          <select
            id="summary-days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value) as SummaryDays)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            {SUMMARY_DAY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                Last {d} days
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 md:p-5"
          >
            <div className="flex flex-col gap-y-3 mt-3">
              <div>
                <div
                  className={`text-sm  p-2 dark:text-gray-400 w-fit rounded-lg mb-2 ${metric.bgcolor} ${metric.statuscolor}`}
                >
                  {metric.icon}
                </div>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {metric.label}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {empty || isLoading ? 0 : metric.amount}
                </h4>
              </div>
              <span className="flex items-center text-gray-500 gap-1 pt-1 text-xs">
                {description(metric)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
