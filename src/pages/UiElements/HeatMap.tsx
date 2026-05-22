import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus, SlidersHorizontal } from 'lucide-react';

// Define types for our data structure
interface RiskCell {
    count: number;
    trend: 'up' | 'down' | 'stable';
    severity: 'low' | 'low-medium' | 'medium' | 'high';
}

interface RowData {
    department: string;
    risks: {
        [key: string]: RiskCell;
    };
}

const RiskHeatmap: React.FC = () => {
    const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

    // Column headers (Risk Types)
    const riskTypes = [
        'Duplicate Payments',
        'Ghost Workers',
        'Salary Anomalies',
        'Approval Violations',
        'Vendor Fraud',
    ];

    // Row data mimicking your screenshot
    const data: RowData[] = [
        {
            department: 'HR',
            risks: {
                'Duplicate Payments': { count: 3, trend: 'up', severity: 'low-medium' },
                'Ghost Workers': { count: 12, trend: 'up', severity: 'high' },
                'Salary Anomalies': { count: 8, trend: 'down', severity: 'medium' },
                'Approval Violations': { count: 2, trend: 'stable', severity: 'low' },
                'Vendor Fraud': { count: 1, trend: 'down', severity: 'low' },
            },
        },
        {
            department: 'Admin',
            risks: {
                'Duplicate Payments': { count: 7, trend: 'up', severity: 'medium' },
                'Ghost Workers': { count: 4, trend: 'stable', severity: 'low' },
                'Salary Anomalies': { count: 4, trend: 'stable', severity: 'low' },
                'Approval Violations': { count: 5, trend: 'up', severity: 'medium' },
                'Vendor Fraud': { count: 3, trend: 'stable', severity: 'low' },
            },
        },
        {
            department: 'Finance',
            risks: {
                'Duplicate Payments': { count: 2, trend: 'stable', severity: 'low' },
                'Ghost Workers': { count: 8, trend: 'down', severity: 'medium' },
                'Salary Anomalies': { count: 7, trend: 'up', severity: 'medium' },
                'Approval Violations': { count: 5, trend: 'up', severity: 'medium' },
                'Vendor Fraud': { count: 2, trend: 'down', severity: 'low' },
            },
        },
        {
            department: 'Operations',
            risks: {
                'Duplicate Payments': { count: 2, trend: 'stable', severity: 'low' },
                'Ghost Workers': { count: 9, trend: 'up', severity: 'medium' },
                'Salary Anomalies': { count: 8, trend: 'up', severity: 'high' },
                'Approval Violations': { count: 6, trend: 'down', severity: 'low' },
                'Vendor Fraud': { count: 9, trend: 'stable', severity: 'medium' },
            },
        },
        {
            department: 'Procurement',
            risks: {
                'Duplicate Payments': { count: 15, trend: 'up', severity: 'high' },
                'Ghost Workers': { count: 6, trend: 'up', severity: 'low' },
                'Salary Anomalies': { count: 11, trend: 'up', severity: 'high' },
                'Approval Violations': { count: 9, trend: 'stable', severity: 'low' },
                'Vendor Fraud': { count: 4, trend: 'down', severity: 'low' },
            },
        },
        {
            department: 'IT',
            risks: {
                'Duplicate Payments': { count: 5, trend: 'down', severity: 'medium' },
                'Ghost Workers': { count: 3, trend: 'stable', severity: 'low' },
                'Salary Anomalies': { count: 6, trend: 'up', severity: 'medium' },
                'Approval Violations': { count: 8, trend: 'up', severity: 'high' },
                'Vendor Fraud': { count: 7, trend: 'up', severity: 'medium' },
            },
        },
        {
            department: 'Marketing',
            risks: {
                'Duplicate Payments': { count: 4, trend: 'up', severity: 'low-medium' },
                'Ghost Workers': { count: 2, trend: 'stable', severity: 'low' },
                'Salary Anomalies': { count: 5, trend: 'up', severity: 'medium' },
                'Approval Violations': { count: 3, trend: 'stable', severity: 'low' },
                'Vendor Fraud': { count: 6, trend: 'down', severity: 'medium' },
            },
        },
        {
            department: 'Sales',
            risks: {
                'Duplicate Payments': { count: 9, trend: 'up', severity: 'high' },
                'Ghost Workers': { count: 5, trend: 'up', severity: 'low-medium' },
                'Salary Anomalies': { count: 10, trend: 'up', severity: 'high' },
                'Approval Violations': { count: 7, trend: 'up', severity: 'medium' },
                'Vendor Fraud': { count: 2, trend: 'stable', severity: 'low' },
            },
        },
        {
            department: 'Legal',
            risks: {
                'Duplicate Payments': { count: 1, trend: 'stable', severity: 'low' },
                'Ghost Workers': { count: 4, trend: 'down', severity: 'low' },
                'Salary Anomalies': { count: 3, trend: 'stable', severity: 'low' },
                'Approval Violations': { count: 4, trend: 'up', severity: 'low-medium' },
                'Vendor Fraud': { count: 2, trend: 'down', severity: 'low' },
            },
        },
        {
            department: 'Compliance',
            risks: {
                'Duplicate Payments': { count: 6, trend: 'up', severity: 'medium' },
                'Ghost Workers': { count: 7, trend: 'up', severity: 'medium' },
                'Salary Anomalies': { count: 9, trend: 'up', severity: 'high' },
                'Approval Violations': { count: 10, trend: 'up', severity: 'high' },
                'Vendor Fraud': { count: 5, trend: 'up', severity: 'medium' },
            },
        },
    ];

    // Helper to get Tailwind classes based on severity level
    const getSeverityStyles = (severity: RiskCell['severity'], type: string) => {
        // Special case for the single green tile under Vendor Fraud
        if (type === 'Vendor Fraud' && severity === 'low') {
            return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        }

        switch (severity) {
            case 'high':
                return 'bg-red-500 text-white font-medium';
            case 'medium':
                return 'bg-amber-600 text-white font-medium';
            case 'low-medium':
                return 'bg-amber-200 text-amber-900 border border-amber-300';
            case 'low':
            default:
                return 'bg-orange-50 text-amber-900 border border-orange-100';
        }
    };

    // Helper to render the specific trend arrow icons
    const renderTrendIcon = (trend: RiskCell['trend']) => {
        switch (trend) {
            case 'up':
                return <ArrowUp className="w-3 h-3 ml-0.5 inline" strokeWidth={3} />;
            case 'down':
                return <ArrowDown className="w-3 h-3 ml-0.5 inline" strokeWidth={3} />;
            case 'stable':
            default:
                return <Minus className="w-3 h-3 ml-0.5 inline" strokeWidth={3} />;
        }
    };

    return (
        <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100 font-sans dark:text-white dark:bg-white/3">

            {/* Header Section */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Risk Distribution Heatmap</h2>
                    <p className="text-sm text-gray-400 mt-1 dark:text-white">Risk count by department and type</p>
                </div>

                {/* View toggles & filter */}
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-medium">
                        <button
                            onClick={() => setViewMode('weekly')}
                            className={`px-4 py-1.5 rounded-lg transition-all ${viewMode === 'weekly' ? 'bg-white text-slate-800 shadow-sm' : 'text-gray-500 hover:text-slate-800'
                                }`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setViewMode('monthly')}
                            className={`px-4 py-1.5 rounded-lg transition-all ${viewMode === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-gray-500 hover:text-slate-800'
                                }`}
                        >
                            Monthly
                        </button>
                    </div>
                    <button className="p-2 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors">
                        <SlidersHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Heatmap Grid Container with simulated right-side scrollbar */}
            <div className="flex gap-4 max-h-96 overflow-y-auto">
                <div className="flex-1 overflow-x-auto overflow-y-auto cursort-pointer">
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
                            {data.map((row) => (
                                <tr key={row.department}>
                                    {/* Department Row Label */}
                                    <td className="py-3 px-3 text-left text-xs font-medium text-gray-500 align-middle dark:text-white">
                                        {row.department}
                                    </td>

                                    {/* Heatmap Matrix Cells */}
                                    {riskTypes.map((type) => {
                                        const cell = row.risks[type];
                                        return (
                                            <td key={type} className="p-2 text-center align-middle ">
                                                <div
                                                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-xs font-semibold shadow-sm transition-all hover:scale-105  ${getSeverityStyles(
                                                        cell.severity,
                                                        type
                                                    )}`}
                                                >
                                                    <span className="flex items-center justify-center">
                                                        {cell.count}
                                                        {renderTrendIcon(cell.trend)}
                                                    </span>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Decorative Scrollbar Track matching screenshot
                <div className="w-2.5 bg-slate-800 rounded-full flex flex-col justify-between py-1 px-[2px] self-stretch mt-12 mb-2">
                    <div className="w-full h-1/2 bg-white rounded-full opacity-90"></div>
                </div> */}
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

                    {/* Safe/Vendor Fraud Low */}
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
