/**
 * ResolutionTimeframeChart.tsx
 * ─────────────────────────────
 * Horizontal bar chart: time buckets for resolving flagged cases.
 */

import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";


// ── Types ──────────────────────────────────────────────────────────────────

export interface ResolutionBucket {
  label: string; // e.g. "< 24 hrs"
  count: number;
}

interface Props {
  data?: ResolutionBucket[];
  className?: string;
}

// ── Default data ───────────────────────────────────────────────────────────

const DEFAULT_DATA: ResolutionBucket[] = [
  { label: "< 24 hrs", count: 27 },
  { label: "1-3 days", count: 35 },
  { label: "4-7 days", count: 18 },
  { label: "> 7 days", count: 12 },
];

// ── Component ──────────────────────────────────────────────────────────────

const ResolutionTimeframeChart: React.FC<Props> = ({
  data = DEFAULT_DATA,
  className = "",
}) => {
  const maxCount = Math.max(...data.map((d) => d.count));
  const xMax = Math.ceil((maxCount + 2) / 5) * 5; // round up to nearest 5
  
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Cases",
        data: data.map((d) => d.count),
        backgroundColor: "#10B981",
        hoverBackgroundColor: "#059669",
        borderRadius: 2,
        borderSkipped: false,
        barPercentage: 0.95,
        categoryPercentage: 0.75,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#D1D5DB",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.x} cases`,
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: xMax,
        grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
        border: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#9CA3AF",
          stepSize: 9,
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm p-5 flex flex-col ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 tracking-tight">
          Resolution Timeframe
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Time taken to resolve flagged cases
        </p>
      </div>
      <div className="h-62 mb-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ResolutionTimeframeChart;
