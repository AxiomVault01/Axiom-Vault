import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import {Link} from "react-router"

// Define the shape of our data
interface AlertItem {
    id: string;
    entityName: string;
    riskType: string;
    department: string;
    severity: 'Critical' | 'High' | 'Low';
    severityColor: 'red' | 'orange' | 'blue'; // Handled individually based on UI specs
    confidence: number;
    confidenceColor: string; // Tailwind color class for progress bar
    status: 'New' | 'Investigating' | 'Escalated';
}

const RiskAlertsTable: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Table rows containing mock data extracted from the screenshot
    const alerts: AlertItem[] = [
        {
            id: 'ALT-2847',
            entityName: 'James Mitchell',
            riskType: 'Duplicate Payment',
            department: 'Procurement',
            severity: 'Critical',
            severityColor: 'red',
            confidence: 98,
            confidenceColor: 'bg-emerald-600',
            status: 'New',
        },
        {
            id: 'ALT-2848',
            entityName: 'Phantom Solutions LLC',
            riskType: 'Ghost Vendor',
            department: 'Finance',
            severity: 'Critical',
            severityColor: 'red',
            confidence: 95,
            confidenceColor: 'bg-emerald-600',
            status: 'Investigating',
        },
        {
            id: 'ALT-2849',
            entityName: 'Rebecca Torres',
            riskType: 'Salary Anomaly',
            department: 'HR',
            severity: 'Critical',
            severityColor: 'orange', // Note: Image shows light orange/yellow background for this "Critical"
            confidence: 87,
            confidenceColor: 'bg-blue-600',
            status: 'New',
        },
        {
            id: 'ALT-2850',
            entityName: 'Marcus Chen',
            riskType: 'Approval Bypass',
            department: 'Operations',
            severity: 'High',
            severityColor: 'orange',
            confidence: 92,
            confidenceColor: 'bg-emerald-600',
            status: 'Escalated',
        },
        {
            id: 'ALT-2851',
            entityName: 'Global Tech Supplies',
            riskType: 'Invoice Pattern',
            department: 'Procurement',
            severity: 'High',
            severityColor: 'orange',
            confidence: 78,
            confidenceColor: 'bg-amber-600',
            status: 'Investigating',
        },
        {
            id: 'ALT-2852',
            entityName: 'Sarah Anderson',
            riskType: 'Overtime Fraud',
            department: 'HR',
            severity: 'Low',
            severityColor: 'blue',
            confidence: 82,
            confidenceColor: 'bg-blue-600',
            status: 'New',
        },
        {
            id: 'ALT-2853',
            entityName: 'Tech Innovations Inc',
            riskType: 'Vendor Fraud',
            department: 'Finance',
            severity: 'Low',
            severityColor: 'blue',
            confidence: 89,
            confidenceColor: 'bg-blue-600',
            status: 'New',
        },
        {
            id: 'ALT-2854',
            entityName: 'David Park',
            riskType: 'Ghost Worker',
            department: 'HR',
            severity: 'Critical',
            severityColor: 'red',
            confidence: 94,
            confidenceColor: 'bg-emerald-600',
            status: 'Escalated',
        },
    ];

    // Helper styles mapping for specific severity pills
    const getSeverityStyles = (color: AlertItem['severityColor']) => {
        switch (color) {
            case 'red':
                return 'bg-red-100 text-red-600 border border-red-200';
            case 'orange':
                return 'bg-amber-100 text-amber-600 border border-amber-200';
            case 'blue':
                return 'bg-blue-50 text-blue-500 border border-blue-200';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    // Helper styles mapping for specific status states
    const getStatusStyles = (status: AlertItem['status']) => {
        switch (status) {
            case 'New':
                return 'bg-blue-100 text-blue-600';
            case 'Investigating':
                return 'bg-orange-50 text-orange-400 font-medium';
            case 'Escalated':
                return 'bg-red-100 text-red-400 font-medium';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    // Filter rows matching input
    const filteredAlerts = alerts.filter(
        (alert) =>
            alert.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alert.riskType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans dark:bg-white/3 dark:text-white">

            {/* Top Filter and Search Action Row */}
            <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 max-w-xl relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search employees, accounts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/3  text-slate-700 placeholder-gray-400 text-sm pl-10 pr-4 py-2 rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors dark:text-white dark:bg-white/3">
                        <SlidersHorizontal size={16} />
                    </button>
                    <Link to="/alerts">
                        <button className="text-[10px] font-medium text-amber-700 hover:underline">
                            View all...
                        </button>
                    </Link>
                </div>
            </div>

            {/* Main Alerts Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100/70 border-b   border-gray-100 text-[11px] font-semibold text-slate-700">
                            <th className="py-3 px-6">Alert Id</th>
                            <th className="py-3 px-6">Employee/Vendor</th>
                            <th className="py-3 px-6">Risk Type</th>
                            <th className="py-3 px-6">Department</th>
                            <th className="py-3 px-6 text-center">Severity</th>
                            <th className="py-3 px-6">Confidence</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[10px] text-gray-600 dark:text-white">
                        {filteredAlerts.map((alert) => (
                            <tr key={alert.id} className="hover:bg-gray-50/50 transition-colors">
                                {/* Alert ID */}
                                <td className="py-4 px-6 text-gray-400 font-medium dark:text-white">
                                    {alert.id}
                                </td>

                                {/* Employee / Vendor */}
                                <td className="py-4 px-6 font-medium text-slate-700 dark:text-white">
                                    {alert.entityName}
                                </td>

                                {/* Risk Type */}
                                <td className="py-4 px-6 text-gray-500 dark:text-white">
                                    {alert.riskType}
                                </td>

                                {/* Department */}
                                <td className="py-4 px-6 text-gray-500 dark:text-white">
                                    {alert.department}
                                </td>

                                {/* Severity Badge */}
                                <td className="py-4 px-6 text-center">
                                    <span className={`inline-block text-[10px] uppercase tracking-wide font-semibold px-2.5 py-0.5 rounded-md ${getSeverityStyles(alert.severityColor)}`}>
                                        {alert.severity}
                                    </span>
                                </td>

                                {/* Confidence Meter */}
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3 max-w-35">
                                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${alert.confidenceColor} rounded-full`}
                                                style={{ width: `${alert.confidence}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-semibold text-slate-700 whitespace-nowrap dark:text-white">
                                            {alert.confidence}%
                                        </span>
                                    </div>
                                </td>

                                {/* Status Badge */}
                                <td className="py-4 px-6 text-center">
                                    <span className={`inline-block text-[10px] font-semibold px-3 py-1 rounded ${getStatusStyles(alert.status)}`}>
                                        {alert.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiskAlertsTable;
