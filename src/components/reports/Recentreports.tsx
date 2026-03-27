import React from "react";
import { FileText, Download, ListFilter } from "lucide-react";

export type ReportFormat = "PDF" | "Excel" | "CSV";

export interface RecentReport {
  id: string;
  title: string;
  format: ReportFormat;
  size: string;
  date: string;
  onDownload?: (id: string) => void;
}

interface Props {
  reports?: RecentReport[];
  onViewAll?: () => void;
}

const DEFAULT_REPORTS: RecentReport[] = [
  { id:"r1", title:"Monthly Fraud Detection - January 2026", format:"PDF",   size:"2.4 MB", date:"Feb 1, 2026"  },
  { id:"r2", title:"Q4 2025 Risk Analysis",                  format:"Excel", size:"5.8 MB", date:"Jan 15, 2026" },
  { id:"r3", title:"High-Risk Accounts Investigation",       format:"PDF",   size:"1.2 MB", date:"Jan 10, 2026" },
  { id:"r4", title:"Employee Payroll Audit - December",      format:"Excel", size:"4.1 MB", date:"Jan 5, 2026"  },
  { id:"r5", title:"Q3 2025 Compliance Report",              format:"PDF",   size:"3.7 MB", date:"Dec 28, 2025" },
];

const FORMAT_BADGE: Record<ReportFormat, string> = {
  PDF:   "bg-red-50 text-red-600",
  Excel: "bg-green-50 text-green-700",
  CSV:   "bg-gray-100 text-gray-600",
};

const ReportRow: React.FC<{ report: RecentReport }> = ({ report }) => (
  <div className="flex flex-col lg:flex-row items-center gap-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 rounded-lg px-2 -mx-2 transition-colors dark:border-gray-700 dark:hover:bg-white/[0.05]">
    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
      <FileText size={16} className="text-brand-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-800 truncate dark:text-gray-300">{report.title}</p>
      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
        <span className={"text-[10px] font-semibold px-1.5 py-0.5 rounded " + FORMAT_BADGE[report.format]}>
          {report.format}
        </span>
        <span className="text-xs text-gray-400">{report.size}</span>
        <span className="text-gray-300 text-xs">•</span>
        <span className="text-xs text-gray-400">{report.date}</span>
      </div>
    </div>
    <button
      onClick={() => report.onDownload?.(report.id)}
      className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-brand-500 active:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
    >
      <Download size={12} />
      Download
    </button>
  </div>
);

const RecentReports: React.FC<Props> = ({ reports = DEFAULT_REPORTS, onViewAll }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 dark:border-gray-600 dark:bg-white/[0.03]">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300">Recent Reports</h3>
      <button
        onClick={onViewAll}
        className="flex items-center gap-1.5 text-xs text-brand-500 font-medium transition-colors"
      >
        View All <ListFilter size={12} />
      </button>
    </div>
    <div>
      {reports.map(r => <ReportRow key={r.id} report={r} />)}
    </div>
  </div>
);

export default RecentReports;