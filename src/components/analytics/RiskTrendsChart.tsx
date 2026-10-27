/**
 * RiskTrendsChart.tsx
 * ────────────────────
 * Line chart: Critical / High Risk / Medium Risk trends over 30 days.
 *
 * Props allow you to swap in live data from your API without touching
 * the chart config.
 */

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useDashboardTrends } from "../../hooks/useDashboardData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// ── Types ──────────────────────────────────────────────────────────────────

export interface RiskTrendDataPoint {
  label: string; // x-axis label  e.g. "Jan 1"
  critical: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk?: number;
}

interface Props {
  data?: RiskTrendDataPoint[];
  className?: string;
}

// "2026-10-14" -> "Oct 14" (parsed as a local date to avoid TZ shifts)
const formatDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// ── Legend pill ────────────────────────────────────────────────────────────

const LegendPill: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <span className="flex items-center gap-1.5 text-xs text-gray-500">
    <span
      className="inline-block w-6 h-[4px] rounded-full"
      style={{ backgroundColor: color }}
    />
    {label}
  </span>
);

// ── Component ──────────────────────────────────────────────────────────────

const RiskTrendsChart: React.FC<Props> = ({ data: dataProp, className = "" }) => {
  // Fall back to the API when no data is passed in
  const { data: trends, isLoading, isError } = useDashboardTrends();

  const data = useMemo<RiskTrendDataPoint[]>(
    () =>
      dataProp ??
      (trends?.days ?? []).map((d) => ({
        label: formatDay(d.date),
        critical: d.critical,
        highRisk: d.high,
        mediumRisk: d.medium,
        lowRisk: d.low,
      })),
    [dataProp, trends],
  );

  const labels = data.map((d) => d.label);
  const critical = data.map((d) => d.critical);
  const highRisk = data.map((d) => d.highRisk);
  const mediumRisk = data.map((d) => d.mediumRisk);
  const lowRisk = data.map((d) => d.lowRisk ?? 0);

  const maxValue = Math.max(0, ...critical, ...highRisk, ...mediumRisk, ...lowRisk);
  // Leave a little headroom above the highest point
  const yMax = Math.max(5, Math.ceil(maxValue * 1.2));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Critical",
        data: critical,
        borderColor: "#d92d20",
        backgroundColor: "rgba(239,68,68,0)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 3,
        pointBackgroundColor: "#d92d20",
        pointBorderWidth: 0,
      },
      {
        label: "High Risk",
        data: highRisk,
        borderColor: "#F97316",
        backgroundColor: "rgba(249,115,22,0)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 3,
        pointBackgroundColor: "#F97316",
        pointBorderWidth: 0,
      },
      {
        label: "Medium Risk",
        data: mediumRisk,
        borderColor: "#EAB308",
        backgroundColor: "rgba(234,179,8,0)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 3,
        pointBackgroundColor: "#EAB308",
        pointBorderWidth: 0,
      },
      {
        label: "Low Risk",
        data: lowRisk,
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0)",
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 2,
        pointHoverRadius: 3,
        pointBackgroundColor: "#22C55E",
        pointBorderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#D1D5DB",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 11 }, color: "#9CA3AF" },
      },
      y: {
        min: 0,
        max: yMax,
        grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
        border: { display: false, dash: [4, 4] },
        ticks: { font: { size: 11 }, color: "#9CA3AF", precision: 0 },
      },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 tracking-tight">
          Risk Trends (Last {data.length || 30} Days)
        </h3>
      </div>

      <div className="py-3">
        {/* Custom legend */}
        <div className="flex flex-wrap items-center gap-5 mb-4">
          <LegendPill color="#d92d20" label="Critical" />
          <LegendPill color="#F97316" label="High Risk" />
          <LegendPill color="#EAB308" label="Medium Risk" />
          <LegendPill color="#22C55E" label="Low Risk" />
        </div>
        <div className="h-52 relative">
          {!dataProp && (isLoading || isError || data.length === 0) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              {isLoading
                ? "Loading trends..."
                : isError
                  ? "Couldn't load risk trends."
                  : "No trend data yet."}
            </div>
          )}
          <Line
            data={chartData}
            options={options}
            redraw={true}
            id="risk-trends-line-chart"
          />
        </div>
      </div>
    </div>
  );
};

export default RiskTrendsChart;
