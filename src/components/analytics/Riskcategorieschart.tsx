/**
 * RiskCategoriesChart.tsx
 * ────────────────────────
 * Pie chart: Duplicate Accounts / Invalid Details / Unusual Patterns / Missing Info.
 *
 * Uses a standard Pie (not Doughnut) with percentage labels baked into the
 */

import React from "react";
import { Pie } from "react-chartjs-2";
import type { ChartOptions, Plugin } from "chart.js";

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

export interface RiskCategory {
  label: string;
  value: number; // percentage  0-100
  color: string;
}

interface Props {
  categories?: RiskCategory[];
  className?: string;
}

// ── Default data ───────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: RiskCategory[] = [
  { label: "Duplicate Accounts", value: 35, color: "#d92d20" },
  { label: "Missing Info", value: 15, color: "#9CA3AF" },
  { label: "Unusual Patterns", value: 25, color: "#8B5CF6" },
  { label: "Invalid Details", value: 25, color: "#F97316" },
];

// ── Inline % labels plugin ─────────────────────────────────────────────────
// Draws bold white percentage text at the centroid of each slice.

const percentLabelPlugin: Plugin<"pie"> = {
  id: "percentLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);

    meta.data.forEach((element, i) => {
      const arc = element as ArcElement; // Explicit cast
      const dataset = chart.data.datasets[0];
      const value = dataset.data[i] as number;

      if (value < 8) return;

      // Now TypeScript knows x and y are numbers and tooltipPosition exists
      const { x, y } = arc.tooltipPosition(true);

      ctx.save();
      ctx.font = "12px system-ui, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${value}%`, x, y);
      ctx.restore();
    });
  },
};

// ── Component ──────────────────────────────────────────────────────────────

const RiskCategoriesChart: React.FC<Props> = ({
  categories = DEFAULT_CATEGORIES,
  className = "",
}) => {
  const chartData = {
    labels: categories.map((c) => c.label),
    datasets: [
      {
        data: categories.map((c) => c.value),
        backgroundColor: categories.map((c) => c.color),
        borderWidth: 2,
        borderColor: "#FFFFFF",
        hoverOffset: 21,
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
          Risk Categories
        </h3>
      </div>

      <div className="flex items-center gap-6 flex-1 relative py-3">
        {/* Pie */}
        <div className="lg:h-60 lg:w-60 shrink-0 p-2 w-50 h-50">
          <Pie
            data={chartData}
            options={options}
            plugins={[percentLabelPlugin]}
          />
        </div>

        {/* Legend */}
        <ul className="space-y-1 text-xs absolute top-0 lg:right-10 right-0">
          {categories.map((c) => (
            <li key={c.label} className="flex items-center lg:gap-3 gap-1">
              <span
                className="w-3 h-3 shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-gray-600 flex-1">{c.label}</span>
              {/* <span className="font-bold text-gray-800 tabular-nums ml-4">
                {c.value}%
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RiskCategoriesChart;
