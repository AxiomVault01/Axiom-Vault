import React, { useMemo, useState } from 'react';
import { Minus, SlidersHorizontal } from 'lucide-react';
import { useDashboardHeatmap } from '../../hooks/useDashboardData';
import { HEATMAP_PERIODS, HeatmapPeriod } from '../../services/DashboardDataAPI';

type CellSeverity = 'safe' | 'low' | 'low-medium' | 'medium' | 'high';

const PERIOD_LABELS: Record<HeatmapPeriod, string> = {
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
};

// Buckets a cell by its share of the busiest cell in the current period
const getSeverity = (count: number, max: number): CellSeverity => {
    if (count <= 0 || max <= 0) return 'safe';
    const ratio = count / max;
    if (ratio >= 0.75) return 'high';
    if (ratio >= 0.5) return 'medium';
    if (ratio >= 0.25) return 'low-medium';
    return 'low';
};

// Helper to get Tailwind classes based on severity level
const getSeverityStyles = (severity: CellSeverity) => {
    switch (severity) {
        case 'high':
            return 'bg-red-500 text-white font-medium';
        case 'medium':
            return 'bg-amber-600 text-white font-medium';
        case 'low-medium':
            return 'bg-amber-200 text-amber-900 border border-amber-300';
        case 'low':
            return 'bg-orange-50 text-amber-900 border border-orange-100';
        case 'safe':
        default:
            return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    }
};

const RiskHeatmap: React.FC = () => {
    const [viewMode, setViewMode] = useState<HeatmapPeriod>('weekly');
    const { data, isLoading, isError } = useDashboardHeatmap(viewMode);

    const riskTypes = data?.risk_types ?? [];
    const departments = data?.departments ?? [];

    // department -> risk_type -> count
    const { counts, max } = useMemo(() => {
        const counts: Record<string, Record<string, number>> = {};
        let max = 0;
        for (const cell of data?.cells ?? []) {
            (counts[cell.department] ??= {})[cell.risk_type] = cell.count;
            max = Math.max(max, cell.count);
        }
        return { counts, max };
    }, [data]);

    const isEmpty = !isLoading && (isError || departments.length === 0 || riskTypes.length === 0);

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100 font-sans dark:text-white dark:bg-white/3">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-4  items-start justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Risk Distribution Heatmap</h2>
                    <p className="text-sm text-gray-400 mt-1 dark:text-white">Risk count by department and type</p>
                </div>

                {/* View toggles & filter */}
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-medium ">
                        {HEATMAP_PERIODS.map((period) => (
                            <button
                                key={period}
                                onClick={() => setViewMode(period)}
                                className={`px-4 py-1.5 rounded-lg transition-all ${viewMode === period ? 'bg-white text-slate-800 shadow-sm' : 'text-gray-500 hover:text-slate-800'
                                    }`}
                            >
                                {PERIOD_LABELS[period]}
                            </button>
                        ))}
                    </div>
                    <button className="p-2 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Heatmap Grid Container */}
            <div className="flex gap-4 max-h-96 overflow-y-auto">
                <div className="relative flex-1 overflow-x-auto overflow-y-auto cursor-pointer min-h-40">
                    {isLoading || isEmpty ? (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 dark:bg-slate-900/90 p-6">
                            <div className="max-w-xs text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    <Minus className="h-5 w-5" strokeWidth={3} />
                                </div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {isLoading
                                        ? 'Loading heatmap data...'
                                        : isError
                                            ? "Couldn't load heatmap data"
                                            : 'No heatmap data available'}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {isLoading
                                        ? 'Please wait while the risk distribution loads.'
                                        : isError
                                            ? 'Something went wrong. Please try again later.'
                                            : 'There is currently no risk data to display. Adjust your filters or try again later.'}
                                </p>
                            </div>
                        </div>
                    ) : null}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {/* Empty corner header */}
                                <th className="w-32 py-2 px-3"></th>
                                {riskTypes.map((type) => (
                                    <th key={type} className="w-28 py-2 px-3 text-center text-[11px] font-medium text-gray-400 dark:text-white leading-tight align-bottom pb-4">
                                        <div className="max-w-21.5 mx-auto wrap-break-words">
                                            {type}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department}>
                                    {/* Department Row Label */}
                                    <td className="py-3 px-3 text-left text-xs font-medium text-gray-500 align-middle dark:text-white">
                                        {department}
                                    </td>

                                    {/* Heatmap Matrix Cells */}
                                    {riskTypes.map((type) => {
                                        const count = counts[department]?.[type] ?? 0;
                                        return (
                                            <td key={type} className="p-2 text-center align-middle ">
                                                <div
                                                    title={`${department} · ${type}: ${count}`}
                                                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-xs font-semibold shadow-sm transition-all hover:scale-105  ${getSeverityStyles(
                                                        getSeverity(count, max)
                                                    )}`}
                                                >
                                                    {count}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Legend Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 dark:text-white">Severity Levels</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    {/* High Severity */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-lg bg-red-500 shadow-sm"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-white">High Risk</span>
                    </div>

                    {/* Medium Severity */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-lg bg-amber-600 shadow-sm"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-white">Medium Risk</span>
                    </div>

                    {/* Low-Medium Severity */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-lg bg-amber-200 border border-amber-300 shadow-sm"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-white">Low-Medium Risk</span>
                    </div>

                    {/* Low Severity */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-lg bg-orange-50 border border-orange-100 shadow-sm"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-white">Low Risk</span>
                    </div>

                    {/* No detections */}
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-lg bg-emerald-100 border border-emerald-200 shadow-sm"></div>
                        <span className="text-xs font-medium text-gray-600 dark:text-white">Safe</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskHeatmap;
