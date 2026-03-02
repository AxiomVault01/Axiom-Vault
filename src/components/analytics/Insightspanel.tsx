/**
 * InsightsPanel.tsx
 * ──────────────────
 * Renders the "Insights" section at the bottom of the Analytics page.
 * Matches Image 1 — two insight cards side by side on a light blue-gray
 * background panel, each with an icon, title, and description.
 *
 * Fully data-driven: pass any number of insights via props.
 */

import React from "react";
import { TrendingUp, Building2, LucideIcon } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

export interface Insight {
  id: string | number;
  icon: LucideIcon;
  /** Icon background + color classes  e.g. "bg-blue-50 text-blue-500" */
  iconStyle: string;
  title: string;
  description: string;
}

interface Props {
  insights?: Insight[];
  className?: string;
}

// ── Default insights ───────────────────────────────────────────────────────

const DEFAULT_INSIGHTS: Insight[] = [
  {
    id: 1,
    icon: TrendingUp,
    iconStyle: "bg-blue-50 text-blue-500",
    title: "Increasing Trend Detected",
    description:
      "Duplicate account cases have increased by 35% this month. Consider implementing stricter bank account verification during onboarding.",
  },
  {
    id: 2,
    icon: Building2,
    iconStyle: "bg-green-50 text-green-600",
    title: "Department Focus Needed",
    description:
      "Finance department shows highest risk concentration. Recommend focused audit of all finance personnel bank accounts.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────

const InsightsPanel: React.FC<Props> = ({
  insights = DEFAULT_INSIGHTS,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl bg-brand-50 border border-brand-300 px-5 py-6 dark:border-brand-500 dark:bg-brand-500/[0.15] ${className}`}
    >
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-4">Insights</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className="bg-white rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-white/[0.03] shadow-sm p-4 flex items-start gap-3 hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${insight.iconStyle}`}
              >
                <Icon size={16} />
              </div>

              {/* Text */}
              <div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-300 mb-1">
                  {insight.title}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsPanel;