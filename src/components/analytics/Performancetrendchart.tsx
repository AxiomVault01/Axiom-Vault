/**
 * PerformanceTrendChart.tsx
 * ──────────────────────────
 * Grouped bar chart: Detected / False Positive / Resolved over 6 months.
 *
 */

import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";


// ── Types ──────────────────────────────────────────────────────────────────

export interface PerformanceMonth {
  month: string; // e.g. "Aug"
  detected: number;
  falsePositive: number;
  resolved: number;
}

interface Props {
  data?: PerformanceMonth[];
  className?: string;
}

// ── Default data ───────────────────────────────────────────────────────────

const DEFAULT_DATA: PerformanceMonth[] = [
  { month: "Aug", detected: 35, falsePositive: 28, resolved: 25 },
  { month: "Sep", detected: 48, falsePositive: 35, resolved: 30 },
  { month: "Oct", detected: 55, falsePositive: 52, resolved: 38 },
  { month: "Nov", detected: 70, falsePositive: 58, resolved: 62 },
  { month: "Dec", detected: 65, falsePositive: 52, resolved: 55 },
  { month: "Jan", detected: 82, falsePositive: 10, resolved: 82 },
];

// ── Component ──────────────────────────────────────────────────────────────

const PerformanceTrendChart: React.FC<Props> = ({
  data = DEFAULT_DATA,
  className = "",
}) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Detected",
        data: data.map((d) => d.detected),
        backgroundColor: "#3B82F6",
        hoverBackgroundColor: "#2563EB",
        borderRadius: 2,
        borderSkipped: false,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },

      {
        label: "Resolved",
        data: data.map((d) => d.resolved),
        backgroundColor: "#10B981",
        hoverBackgroundColor: "#059669",
        borderRadius: 2,
        borderSkipped: false,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
      {
        label: "False Positive",
        data: data.map((d) => d.falsePositive),
        backgroundColor: "#9CA3AF",
        hoverBackgroundColor: "#6B7280",
        borderRadius: 2,
        borderSkipped: false,
        barPercentage: 0.8,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: { size: 10 },
          boxWidth: 10,
          boxHeight: 10,
          padding: 16,
          color: "#6B7280",
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
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
        ticks: { font: { size: 10 }, color: "#9CA3AF" },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
        border: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#9CA3AF",
          stepSize: 25,
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          6-Month Performance Trend
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Detection vs Resolution rate
        </p>
      </div>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceTrendChart;
