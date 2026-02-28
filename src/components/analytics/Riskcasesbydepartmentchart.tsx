/**
 * RiskCasesByDepartmentChart.tsx
 * ───────────────────────────────
 * Vertical bar chart: flagged risk cases per department.
 */

import React from "react";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";


// ── Types ──────────────────────────────────────────────────────────────────

export interface DeptCaseData {
  department: string;
  cases: number;
}

interface Props {
  data?: DeptCaseData[];
  className?: string;
}

// ── Default data ───────────────────────────────────────────────────────────

const DEFAULT_DATA: DeptCaseData[] = [
  { department: "Finance", cases: 18 },
  { department: "IT", cases: 9 },
  { department: "HR", cases: 6 },
  { department: "Operations", cases: 5 },
  { department: "Admin", cases: 3 },
  { department: "Sales", cases: 4 },
  { department: "Marketing", cases: 1 },
];

// ── Component ──────────────────────────────────────────────────────────────

const RiskCasesByDepartmentChart: React.FC<Props> = ({
  data = DEFAULT_DATA,
  className = "",
}) => {
  const maxVal = Math.max(...data.map((d) => d.cases));
  const yMax = Math.ceil((maxVal + 2) / 4) * 4; // round up to nearest 4

  const chartData = {
    labels: data.map((d) => d.department),
    datasets: [
      {
        label: "Cases",
        data: data.map((d) => d.cases),
        backgroundColor: "#3B82F6",
        hoverBackgroundColor: "#2563EB",
        borderRadius: 5,
        borderSkipped: false,
        barPercentage: 0.85,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} cases`,
        },
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
        max: yMax,
        grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
        border: { display: false },
        ticks: {
          font: { size: 10 },
          color: "#9CA3AF",
          stepSize: 4,
        },
      },
    },
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          Risk Cases by Department
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Total flagged cases per department
        </p>
      </div>
      <div className="h-62 mb-2">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RiskCasesByDepartmentChart;
