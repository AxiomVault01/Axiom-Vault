import React, { useState } from "react";
import { FileText, AlertTriangle, TrendingUp, Users, DollarSign } from "lucide-react";
import ReportStatCards from "./Reportstatcards";
import ReportTemplates from "./Reporttemplates";
import CustomReportBuilder from "./Customreportbuilder";
import RecentReports from "./Recentreports";
import type { ReportBuilderValues } from "./Customreportbuilder";

const ReportsPage: React.FC = () => {
  const [builderOpen, setBuilderOpen] = useState(true);

  const handleGenerate     = (v: ReportBuilderValues) => console.log("generate", v);
  const handleSaveTemplate = (v: ReportBuilderValues) => console.log("save template", v);
  const handleDownload     = (id: string) => console.log("download", id);
  const handleTemplateGen  = (id: string) => console.log("template generate", id);

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-5 dark:border-gray-600 dark:bg-white/[0.0]">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight dark:text-gray-200">Reports</h1>
          <p className="text-xs text-gray-400 mt-0.5">Generate and download comprehensive audit reports</p>
        </div>
        <button
          onClick={() => setBuilderOpen(v => !v)}
          className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700 rounded-lg transition-colors shadow-sm dark:border-gray-600 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:border-gray-500"
        >
          <FileText size={14} />
          Create Custom Report
        </button>
      </div>

      <ReportStatCards />

      <ReportTemplates
        templates={[
          { id:"fraud-detection", icon:AlertTriangle, iconBg:"bg-red-50 text-red-500",      title:"Fraud Detection Summary",  description:"Comprehensive overview of all detected fraud cases", lastGenerated:"Yesterday, 3:42 PM", onGenerate:handleTemplateGen },
          { id:"risk-analysis",   icon:TrendingUp,    iconBg:"bg-orange-50 text-orange-500", title:"Risk Analysis Report",     description:"Detailed risk assessment and trends",               lastGenerated:"Feb 1, 2026",        onGenerate:handleTemplateGen },
          { id:"employee-audit",  icon:Users,         iconBg:"bg-blue-50 text-blue-500",     title:"Employee Audit Report",    description:"Complete employee records and flag analysis",        lastGenerated:"Jan 30, 2026",       onGenerate:handleTemplateGen },
          { id:"financial-impact",icon:DollarSign,    iconBg:"bg-green-50 text-green-600",   title:"Financial Impact Report",  description:"Estimated financial losses and recoveries",          lastGenerated:"Jan 28, 2026",       onGenerate:handleTemplateGen },
        ]}
      />

      {builderOpen && (
        <CustomReportBuilder
          onGenerate={handleGenerate}
          onSaveTemplate={handleSaveTemplate}
        />
      )}

      <RecentReports
        reports={[
          { id:"r1", title:"Monthly Fraud Detection - January 2026", format:"PDF",   size:"2.4 MB", date:"Feb 1, 2026",  onDownload:handleDownload },
          { id:"r2", title:"Q4 2025 Risk Analysis",                  format:"Excel", size:"5.8 MB", date:"Jan 15, 2026", onDownload:handleDownload },
          { id:"r3", title:"High-Risk Accounts Investigation",       format:"PDF",   size:"1.2 MB", date:"Jan 10, 2026", onDownload:handleDownload },
          { id:"r4", title:"Employee Payroll Audit - December",      format:"Excel", size:"4.1 MB", date:"Jan 5, 2026",  onDownload:handleDownload },
          { id:"r5", title:"Q3 2025 Compliance Report",              format:"PDF",   size:"3.7 MB", date:"Dec 28, 2025", onDownload:handleDownload },
        ]}
        onViewAll={() => console.log("view all")}
      />

    </main>
  );
};

export default ReportsPage;