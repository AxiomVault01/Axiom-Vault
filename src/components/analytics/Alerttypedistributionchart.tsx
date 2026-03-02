/**
 * AlertTypeDistributionChart.tsx
 * ───────────────────────────────
 *
 */

import React from "react";
import { Pie } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";


// ── Types ──────────────────────────────────────────────────────────────────

export interface AlertSlice {
  label: string;
  value: number; // percentage  0–100
  color: string;
  /** Tailwind text-color class for the callout label */
  labelClass: string;
  /** Positioning style for the floating callout */
  calloutStyle: React.CSSProperties;
}

interface Props {
  slices?: AlertSlice[];
  className?: string;
}

// ── Default data ───────────────────────────────────────────────────────────

const DEFAULT_SLICES: AlertSlice[] = [
  {
    label: "Duplicate Accounts",
    value: 51,
    color: "#d92d20",
    labelClass: "text-red-600",
    calloutStyle: { top: "10%", left: "15%", transform: "translateX(100%)" },
  },
  {
    label: "High Value Anomalies",
    value: 25,
    color: "#F97316",
    labelClass: "text-orange-500",
    calloutStyle: { bottom: 0, left: "-15%" },
  },
  {
    label: "Pattern Anomalies",
    value: 15,
    color: "#EAB308",
    labelClass: "text-yellow-500",
    calloutStyle: { top: "35%", left: "-20%" },
  },
  {
    label: "Geographic Issues",
    value: 9,
    color: "#3B82F6",
    labelClass: "text-blue-500",
    calloutStyle: { top: 0, right: "60%", transform: "translateY(-50%)" },
  },
];

// ── Component ──────────────────────────────────────────────────────────────

const AlertTypeDistributionChart: React.FC<Props> = ({
  slices = DEFAULT_SLICES,
  className = "",
}) => {
  const chartData = {
    labels: slices.map((s) => s.label),
    datasets: [
      {
        data: slices.map((s) => s.value),
        backgroundColor: slices.map((s) => s.color),
        borderWidth: 2,
        borderColor: "#FFFFFF",
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#D1D5DB",
        padding: 10,
        cornerRadius: 8,
        callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-5 flex flex-col ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 tracking-tight">
          Alert Type Distribution
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Breakdown of detected fraud patterns
        </p>
      </div>
      <div className="flex items-center justify-center p-5">
        {/* Pie + floating callout labels */}
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{ width: 220, height: 220 }}
        >
          {/* Pie canvas */}
          <div className="lg:h-44 lg:w-44 h-36 w-36">
            <Pie data={chartData} options={options} />
          </div>

          {/* Floating callout labels */}
          {slices.map((s) => (
            <span
              key={s.label}
              className={`absolute text-[10px] font-semibold whitespace-nowrap pointer-events-none ${s.labelClass}`}
              style={s.calloutStyle}
            >
              {s.label} {s.value}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertTypeDistributionChart;
