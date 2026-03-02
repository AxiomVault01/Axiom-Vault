/**
 * RiskTrendsChart.tsx
 * ────────────────────
 * Line chart: Critical / High Risk / Medium Risk trends over 30 days.
 *
 * Props allow you to swap in live data from your API without touching
 * the chart config.
 */

import React from "react";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";


// ── Types ──────────────────────────────────────────────────────────────────

export interface RiskTrendDataPoint {
  label: string; // x-axis label  e.g. "Jan 1"
  critical: number;
  highRisk: number;
  mediumRisk: number;
}

interface Props {
  data?: RiskTrendDataPoint[];
  className?: string;
}

// ── Default mock data ──────────────────────────────────────────────────────

const DEFAULT_DATA: RiskTrendDataPoint[] = [
  { label: "Jan 1", critical: 15, highRisk: 45, mediumRisk: 28 },
  { label: "Jan 5", critical: 20, highRisk: 50, mediumRisk: 30 },
  { label: "Jan 10", critical: 22, highRisk: 52, mediumRisk: 35 },
  { label: "Jan 15", critical: 28, highRisk: 55, mediumRisk: 40 },
  { label: "Jan 20", critical: 25, highRisk: 68, mediumRisk: 42 },
  { label: "Jan 25", critical: 35, highRisk: 65, mediumRisk: 44 },
  { label: "Jan 30", critical: 40, highRisk: 68, mediumRisk: 46 },
];

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

const RiskTrendsChart: React.FC<Props> = ({
  data = DEFAULT_DATA,
  className = "",
}) => {
  const labels = data.map((d) => d.label);
  const critical = data.map((d) => d.critical);
  const highRisk = data.map((d) => d.highRisk);
  const mediumRisk = data.map((d) => d.mediumRisk);

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
        min: 15,
        max: 75,
        grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
        border: { display: false, dash: [4, 4] },
        ticks: { font: { size: 11 }, color: "#9CA3AF", stepSize: 10 },
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
          Risk Trends (Last 30 Days)
        </h3>
      </div>
      {/* Custom legend */}
      <div className="flex items-center gap-5 mb-4">
        <LegendPill color="#d92d20" label="Critical" />
        <LegendPill color="#F97316" label="High Risk" />
        <LegendPill color="#EAB308" label="Medium Risk" />
      </div>
      <div className="h-52">
        <Line data={chartData} options={options} redraw={true} id="risk-trends-line-chart" />
      </div>
    </div>
  );
};

export default RiskTrendsChart;
