import { useState } from "react";
import { Case, REVIEWERS } from "../CasesData";
import { InitialAvatar, QuickActionBtn } from "./CaseShared";
import { Icons } from "./CaseConstants";

import { jsPDF } from "jspdf";

interface Props {
  caseData: Case;
  isInvestigating: boolean;
  canEscalateClose: boolean;
  handleStartInvestigation: () => void;
  handleEscalateInit: () => void;
  handleClose: () => void;
  handleReopen: () => void;
  handleAssignRole: (role: "investigator" | "reviewer", name: string) => void;
}

export default function CaseRightColumn({
  caseData,
  isInvestigating,
  canEscalateClose,
  handleStartInvestigation,
  handleEscalateInit,
  handleAssignRole,
  handleClose,
  handleReopen,
}: Props) {
  const isClosed = caseData.status === "Closed";

  // Local state to track if user has clicked re-assign for either role
  const [isReassigningInv, setIsReassigningInv] = useState(false);
  const [isReassigningRev, setIsReassigningRev] = useState(false);

  const assignRoleLocal = (role: "investigator" | "reviewer", val: string) => {
    handleAssignRole(role, val);
    if (role === "investigator") setIsReassigningInv(false);
    if (role === "reviewer") setIsReassigningRev(false);
  };

  // Generates a downloadable PDF report of the case
  const handleExportReport = () => {
    const reportContent = `
CASE REPORT: ${caseData.id}
=========================================
Title: ${caseData.title}
Status: ${caseData.status}
Severity: ${caseData.severity}
Created: ${caseData.created}

ENTITIES
-----------------------------------------
Employee: ${caseData.employee.name} (${caseData.employee.role} - ${caseData.employee.department})
Vendor: ${caseData.vendor.name} (${caseData.vendor.id})
Approver: ${caseData.approver.name} (${caseData.approver.role})

INVESTIGATION DETAILS
-----------------------------------------
Investigator: ${caseData.investigator?.name || "Unassigned"}
Reviewer: ${caseData.reviewer?.name || "Unassigned"}
Risk Score: ${caseData.riskScore || "N/A"}
Total Exposure: ${caseData.totalExposure || "N/A"}

AI SUMMARY
-----------------------------------------
${caseData.aiSummary || "No AI analysis generated yet."}

TIMELINE
-----------------------------------------
${caseData.timeline.map((t) => `[${t.timeAgo}] ${t.title} - by ${t.by}`).join("\n")}
    `.trim();

    // Create the PDF document instance — this was missing entirely before,
    // which is why `doc` was undefined and the export silently failed
    const doc = new jsPDF();

    // Split the text into lines so it doesn't run off the edge of the PDF page
    const pageMargin = 10;
    const maxLineWidth = 190; // A4 page width is ~210mm
    const textLines = doc.splitTextToSize(reportContent, maxLineWidth);

    // Add the text to the document (x: 10, y: 10)
    doc.text(textLines, pageMargin, pageMargin);

    // Trigger the download
    doc.save(`${caseData.id}_Investigation_Report.pdf`);
  };

  return (
    <div className="border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-white/2 p-6 space-y-16">
      {/* Status History */}
      <div>
        <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 dark:text-gray-400">
          Status History
        </p>
        <div className="space-y-2.5 ">
          {caseData.statusHistory.map((s, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-3.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#1a2e4a] dark:bg-blue-500 shrink-0" />
                <span>{s.from}</span>
                <span className="text-gray-300 dark:text-gray-600">
                  {Icons.longArrow}
                </span>
                <span>{s.to}</span>
              </div>
              <p className="text-xs text-gray-400 ml-3.5">{s.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Investigator */}
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-4 dark:text-gray-400">
          Assigned Investigator
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-white/3 dark:border-gray-700">
          {caseData.investigator ? (
            <>
              <div className="flex items-center gap-2.5 mb-6">
                <InitialAvatar
                  initials={caseData.investigator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                  color="bg-teal-600"
                  size="sm"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {caseData.investigator.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {caseData.investigator.role}
                  </p>
                </div>
              </div>
              {!isClosed &&
                (isReassigningInv ? (
                  <div className="space-y-4 mt-4">
                    <select
                      onChange={(e) =>
                        assignRoleLocal("investigator", e.target.value)
                      }
                      defaultValue=""
                      className="w-full border rounded-md px-2 py-1.5 text-xs bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="" disabled>
                        Select User
                      </option>
                      {REVIEWERS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setIsReassigningInv(false)}
                      className="w-full py-1 text-xs text-gray-500 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsReassigningInv(true)}
                    className="flex items-center justify-center w-full gap-1 text-xs font-semibold border rounded-lg p-1.5 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 transition-colors"
                  >
                    {Icons.reassign} Reassign
                  </button>
                ))}
            </>
          ) : (
            <p className="text-sm text-gray-500">Unassigned</p>
          )}
        </div>
      </div>

      {/* Assigned Reviewer */}
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 dark:text-gray-400">
          Assigned Reviewer
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 dark:bg-white/3 dark:border-gray-700">
          {caseData.reviewer ? (
            <>
              <div className="flex items-center gap-2.5 mb-3">
                <InitialAvatar
                  initials={caseData.reviewer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                  color="bg-indigo-600"
                  size="sm"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {caseData.reviewer.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {caseData.reviewer.role}
                  </p>
                </div>
              </div>
              {!isClosed &&
                (isReassigningRev ? (
                  <div className="space-y-2 mt-2">
                    <select
                      onChange={(e) =>
                        assignRoleLocal("reviewer", e.target.value)
                      }
                      defaultValue=""
                      className="w-full border rounded-md px-2 py-1.5 text-xs bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="" disabled>
                        Select User
                      </option>
                      {REVIEWERS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setIsReassigningRev(false)}
                      className="w-full py-1 text-xs text-gray-500 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsReassigningRev(true)}
                    className="flex items-center justify-center w-full gap-1 text-xs font-semibold border rounded-lg p-1.5 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 transition-colors"
                  >
                    {Icons.reassign} Reassign
                  </button>
                ))}
            </>
          ) : (
            <>
              <div className="flex flex-col items-center text-center py-2 px-2 mb-2">
                <div className="rounded-full p-4 bg-gray-200 mb-3 text-gray-400 dark:bg-gray-700">
                  {Icons.user}
                </div>
                <p className="text-xs text-gray-700 mb-1 font-medium dark:text-gray-300">
                  No reviewer assigned
                </p>
                <p className="text-xs text-gray-400 py-3">
                  Assign a reviewer to review the outcome of your investigation.
                </p>
              </div>
              {isInvestigating && !isClosed && (
                <div className="space-y-2">
                  <select
                    onChange={(e) =>
                      assignRoleLocal("reviewer", e.target.value)
                    }
                    defaultValue=""
                    className="w-full border rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  >
                    <option value="" disabled>
                      Select Reviewer
                    </option>
                    {REVIEWERS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quick Actions — swaps to a reduced set once the case is Closed */}
      <div>
        <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3 dark:text-gray-400">
          Quick Actions
        </p>
        {isClosed ? (
          <div className="space-y-4">
            <QuickActionBtn
              icon={Icons.play}
              label="Re-Open Investigation"
              onClick={handleReopen}
            />
            <QuickActionBtn
              icon={Icons.export}
              label="Export Report"
              onClick={handleExportReport}
            />
            <QuickActionBtn
              icon={Icons.escalate}
              label="Escalate Further"
              onClick={handleEscalateInit}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <QuickActionBtn
              icon={Icons.play}
              label="Start Investigation"
              disabled={isInvestigating}
              onClick={handleStartInvestigation}
            />
            <QuickActionBtn
              icon={Icons.export}
              label="Export Report"
              disabled={!isInvestigating}
              onClick={handleExportReport}
            />
            <QuickActionBtn
              icon={Icons.user}
              label="Assign Reviewer"
              disabled={!isInvestigating || !!caseData.reviewer}
            />
            <QuickActionBtn
              icon={Icons.escalate}
              label="Escalate Case"
              disabled={!canEscalateClose}
              onClick={handleEscalateInit}
            />
            <QuickActionBtn
              icon={Icons.close}
              label="Close Case"
              disabled={!canEscalateClose}
              onClick={handleClose}
            />
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="border-2 px-3 py-6 rounded-md">
        <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3 dark:text-gray-400 ">
          Activity Log
        </p>
        <div className="space-y-4.5">
          {caseData.activityLog.map((entry) => (
            <div key={entry.id} className="flex items-start gap-2.5">
              <span className="mt-1.5 text-gray-400 shrink-0">{Icons.dot}</span>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {entry.event}
                </p>
                <p className="text-xs text-gray-400 pt-1">
                  {entry.by} • {entry.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}