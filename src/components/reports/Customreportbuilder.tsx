import React, { useState } from "react";
import { Download, Save, Calendar } from "lucide-react";

type TimePeriod   = "Week" | "Month" | "Quarter" | "Year";
type ExportFormat = "PDF" | "Excel" | "CSV";

export interface ReportBuilderValues {
  reportType:   string;
  timePeriod:   TimePeriod;
  startDate:    string;
  endDate:      string;
  exportFormat: ExportFormat;
}

interface Props {
  onGenerate?:     (v: ReportBuilderValues) => void;
  onSaveTemplate?: (v: ReportBuilderValues) => void;
}

const REPORT_TYPES = [
  "Fraud Detection Summary",
  "Risk Analysis Report",
  "Employee Audit Report",
  "Financial Impact Report",
];

const TIME_PERIODS: TimePeriod[]   = ["Week","Month","Quarter","Year"];
const EXPORT_FMTS:  ExportFormat[] = ["PDF","Excel","CSV"];

const inp = "w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-lg " +
            "px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors";

const CustomReportBuilder: React.FC<Props> = ({ onGenerate, onSaveTemplate }) => {
  const [reportType,   setReportType]   = useState(REPORT_TYPES[0]);
  const [timePeriod,   setTimePeriod]   = useState<TimePeriod>("Week");
  const [startDate,    setStartDate]    = useState("");
  const [endDate,      setEndDate]      = useState("");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("PDF");

  const vals: ReportBuilderValues = { reportType, timePeriod, startDate, endDate, exportFormat };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 dark:border-gray-600 dark:bg-white/[0.03]">
      <h3 className="text-sm font-semibold text-gray-800 mb-5 dark:text-gray-300">Custom Report Builder</h3>

      <div className="space-y-5">
        {/* Row 1 – Report Type + Time Period */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Report Type dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Report Type</label>
            <div className="relative">
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className={inp + " appearance-none pr-9 dark:bg-gray-700 dark:text-gray-200"}
              >
                {REPORT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                   width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Time Period segmented toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Time Period</label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {TIME_PERIODS.map(p => (
                <button key={p} onClick={() => setTimePeriod(p)}
                  className={"flex-1 py-2.5 text-xs font-semibold transition-colors " +
                    (timePeriod === p
                      ? "bg-brand-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200")}
                >{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 – Start Date + End Date */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {([
            { label:"Start Date", val:startDate, set:setStartDate },
            { label:"End Date",   val:endDate,   set:setEndDate   },
          ] as const).map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Calendar size={14} />
                </span>
                <input type="date" value={val} onChange={e => set(e.target.value)}
                  className={inp + " pl-9 dark:bg-gray-700 dark:text-gray-300"} />
              </div>
            </div>
          ))}
        </div>
        

        {/* Row 3 – Export Format custom radio */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2.5 dark:text-gray-400">Export Format</label>
          <div className="flex items-center gap-6">
            {EXPORT_FMTS.map(fmt => {
              const active = exportFormat === fmt;
              return (
                <label key={fmt} className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="relative flex items-center justify-center">
                    <input type="radio" name="exportFormat" value={fmt}
                      checked={active} onChange={() => setExportFormat(fmt)} className="sr-only" />
                    <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors " +
                      (active ? "border-brand-500" : "border-gray-300")}>
                      {active && <span className="w-2 h-2 rounded-full bg-brand-500 block" />}
                    </span>
                  </span>
                  <span className={"text-sm " + (active ? "text-gray-800 font-medium" : "text-gray-500")}>
                    {fmt}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Row 4 – Action buttons */}
        <div className="flex items-center gap-3 pt-1">
          <button onClick={() => onGenerate?.(vals)}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            <Download size={14} />
            Generate Report
          </button>
          <button onClick={() => onSaveTemplate?.(vals)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 transition-colors dark:hover:bg-gray-300">
            <Save size={14} />
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomReportBuilder;