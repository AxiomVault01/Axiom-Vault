import { Link } from "react-router";
import { Case } from "../CasesData";
import { SEV_BADGE } from "./CaseConstants";


export default function CaseLeftColumn({ caseData }: { caseData: Case }) {
  return (
    <div className="border- border-gray-200 dark:border-gray-800 bg-white dark:bg-white/2 p-6 space-y-16">
      {/* Related Entities */}
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5" cy="4" r="2" stroke="#64748b" strokeWidth="1.2" />
            <path d="M1 11c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10 6.5h3M11.5 5v3" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide dark:text-gray-400">Related Entities</span>
        </div>
        <div className="space-y-3 ">
          <div className="border px-5 py-3 rounded-md dark:border-gray-800 space-y-3">
            <p className="text-xs text-gray-400 mb-1">Employee</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{caseData.employee.name}</p>
            <p className="text-xs text-gray-500">{caseData.employee.role}</p>
            <p className="text-xs text-gray-400">{caseData.employee.department}</p>
          </div>
          <div className="border px-5 py-3 rounded-md dark:border-gray-800 space-y-3">
            <p className="text-xs text-gray-400 mb-1">Vendor</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{caseData.vendor.name}</p>
            <p className="text-xs text-gray-400">{caseData.vendor.id}</p>
          </div>
          <div className="border px-5 py-3 rounded-md dark:border-gray-800 space-y-3">
            <p className="text-xs text-gray-400 mb-1">Approver</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{caseData.approver.name}</p>
            <p className="text-xs text-gray-500">{caseData.approver.role}</p>
            <p className="text-xs text-gray-400">{caseData.approver.department}</p>
          </div>
        </div>
      </div>

      {/* Linked Alerts */}
      <div>
        <div className="flex items-center gap-1.5 mb-4">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L12 12H2L7 1.5z" stroke="#64748b" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide dark:text-gray-400">Linked Alerts</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 px-4 border-2 space-y-4 border-gray-100 dark:bg-white/3 dark:border-gray-700">
          <div className="flex items-center justify-around gap-2 mb-1 ">
            <Link to={`/alerts/${caseData.linkedAlert.id}`} className="font-mono text-xs font-semibold text-[#1a2e4a] hover:underline dark:text-blue-400">
              {caseData.linkedAlert.id}
            </Link>
            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${SEV_BADGE[caseData.severity]}`}>
              {caseData.severity}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-2 dark:text-gray-300">{caseData.linkedAlert.type}</p>
          <p className="text-xs text-gray-400">{caseData.linkedAlert.date}</p>
        </div>
      </div>

      {/* Connected Transactions */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#64748b" strokeWidth="1.2" />
            <path d="M1 6h12" stroke="#64748b" strokeWidth="1.2" />
          </svg>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide dark:text-gray-400">Connected Transactions</span>
        </div>
        <div className="space-y-2">
          {caseData.connectedTransactions.map((txn) => (
            <div key={txn.id} className="bg-gray-50 rounded-lg p-3 px-4 border-2 border-gray-100 dark:bg-white/3 dark:border-gray-700 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-semibold text-gray-600 dark:text-gray-400">{txn.id}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${txn.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {txn.status}
                </span>
              </div>
              <p className="text-sm font-bold mt-3 text-gray-800 dark:text-white">{txn.amount}</p>
              <p className="text-xs text-gray-400">{txn.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}