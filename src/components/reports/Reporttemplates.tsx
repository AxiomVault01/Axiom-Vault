import React from "react";
import { AlertTriangle, TrendingUp, Users, DollarSign, LucideIcon } from "lucide-react";

export interface ReportTemplate {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  title: string;
  description: string;
  lastGenerated: string;
  onGenerate?: (id: string) => void;
}

interface Props { templates?: ReportTemplate[]; }

const DEFAULT_TEMPLATES: ReportTemplate[] = [
  { id:"fraud-detection", icon:AlertTriangle, iconBg:"bg-red-50 text-red-500",    title:"Fraud Detection Summary",  description:"Comprehensive overview of all detected fraud cases", lastGenerated:"Yesterday, 3:42 PM" },
  { id:"risk-analysis",   icon:TrendingUp,    iconBg:"bg-orange-50 text-orange-500", title:"Risk Analysis Report",     description:"Detailed risk assessment and trends",                lastGenerated:"Feb 1, 2026"        },
  { id:"employee-audit",  icon:Users,         iconBg:"bg-blue-50 text-blue-500",   title:"Employee Audit Report",    description:"Complete employee records and flag analysis",        lastGenerated:"Jan 30, 2026"       },
  { id:"financial-impact",icon:DollarSign,    iconBg:"bg-green-50 text-green-600", title:"Financial Impact Report",  description:"Estimated financial losses and recoveries",          lastGenerated:"Jan 28, 2026"       },
];

const TemplateCard: React.FC<{template:ReportTemplate}> = ({template}) => {
  const Icon = template.icon;
  return (
    <div className="flex lg:flex-row flex-col items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:shadow-sm transition-all dark:border-gray-600 dark:bg-white/[0.03] dark:hover:bg-white/[0.05]">
      <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + template.iconBg}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">{template.title}</p>
        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{template.description}</p>
        <p className="text-[11px] text-gray-400 mt-2">Last: {template.lastGenerated}</p>
      </div>
      <button onClick={() => template.onGenerate?.(template.id)}
        className="shrink-0 self-end px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors">
        Generate
      </button>
    </div>
  );
};

const ReportTemplates: React.FC<Props> = ({templates=DEFAULT_TEMPLATES}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 dark:border-gray-600 dark:bg-white/[0.03]">
    <h3 className="text-sm font-semibold text-gray-800 mb-4 dark:text-gray-300">Report Templates</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {templates.map(t => <TemplateCard key={t.id} template={t} />)}
    </div>
  </div>
);

export default ReportTemplates;