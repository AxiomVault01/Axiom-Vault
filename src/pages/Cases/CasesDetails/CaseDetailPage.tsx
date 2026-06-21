import { useState, useMemo, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { MOCK_CASES, Case, CaseStatus, EvidenceFile, Severity } from "../CasesData";
import { SectionCard } from "./CaseShared";
import { Icons, SEV_BADGE, STATUS_BADGE } from "./CaseConstants";
import CaseLeftColumn from "./CaseLeftColumn";
import CaseMiddleColumn from "./CaseMiddleColumn";
import CaseRightColumn from "./CaseRightColumn";

// ── Screen: Escalate Case View ────────────────────────────────────────────────
function EscalateCaseView({
  caseData,
  onCancel,
  onEscalate,
}: {
  caseData: Case;
  onCancel: () => void;
  onEscalate: () => void;
}) {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [escalateTo, setEscalateTo] = useState("Legal Team");
  const [priority, setPriority] = useState(caseData.severity);
  const [notes, setNotes] = useState("");
  const [supportingDocs, setSupportingDocs] = useState<EvidenceFile[]>([]);

  // Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    onEscalate();
    navigate("/cases");
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newDocsFiles: EvidenceFile[] = Array.from(files).map((f) => ({
      id: `e${Date.now()}_${f.name}`,
      name: f.name,
      size: `${Math.round(f.size / 1024)} KB`,
      uploadedBy: "Sarah Chen", // Standardizing for the mock
      uploadedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    }));

    setSupportingDocs((prev) => [...prev, ...newDocsFiles]);
  };

  const handleRemoveFile = (idToRemove: string) => {
    setSupportingDocs((prev) => prev.filter((doc) => doc.id !== idToRemove));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span className="rotate-180">{Icons.arrow}</span> Back to Case
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Escalate Case
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transfer this investigation to a higher authority or specialized
            department for further review.
          </p>
        </div>

        <SectionCard title="Case Summary" className="p-6!">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">Case ID</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {caseData.id}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Reviewer</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {caseData.reviewer?.name || "Unassigned"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Department</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {caseData.employee.department}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Risk Level</p>
              <span
                className={`px-2 py-0.5 rounded-md text-xs font-semibold ${SEV_BADGE[caseData.severity]}`}
              >
                {caseData.severity}
              </span>
            </div>
          </div>
        </SectionCard>

        <div className="bg-white border border-gray-200 rounded-xl p-6 dark:bg-white/3 dark:border-gray-700 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-white">
              Escalation Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 bg-white focus:outline-none dark:bg-gray-800/30 dark:focus:bg-gray-900/90 dark:border-gray-700 dark:text-white"
            >
              <option value="" disabled>
                Select a reason...
              </option>
              <option value="financial_threshold">
                Exceeds financial approval limit
              </option>
              <option value="legal_risk">
                Potential legal or regulatory violation
              </option>
              <option value="complex_fraud">
                Requires specialized fraud analysis
              </option>
              <option value="conflict_of_interest">
                Identified conflict of interest
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-white">
              Escalate To
            </label>
            <div className="flex gap-3 flex-col md:flex-row">
              {["Legal Team", "Compliance", "Lead Investigator"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setEscalateTo(dept)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors flex items-center gap-2
                    ${escalateTo === dept ? "border-green-500 bg-green-400 text-white dark:bg-green-500/30 dark:text-white" : "border-gray-200 text-gray-600 bg-white dark:bg-gray-800/20 dark:border-gray-700 dark:text-gray-300"}`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] text-white ${dept === "Legal Team" ? "bg-blue-500" : dept === "Compliance" ? "bg-purple-500" : "bg-green-500"}`}
                  >
                    {dept
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-white">
              Priority Level
            </label>
            <div className="flex gap-3 flex-col md:flex-row">
              {["Low", "Medium", "High", "Critical"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setPriority(lvl as Severity)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors
                    ${priority === lvl ? "border-blue-500 bg-blue-400 text-white dark:bg-blue-500/30 dark:text-white" : "border-gray-200 text-gray-600 bg-white dark:bg-gray-800/20 dark:border-gray-700 dark:text-gray-300"}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-white">
              Escalation Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide detailed context about why this case requires escalation..."
              rows={5}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 bg-white resize-none focus:outline-none dark:bg-gray-800/20 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2 dark:text-white">
              Upload Supporting Documents
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors dark:border-gray-600 dark:hover:bg-gray-800/20"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-[#1a2e4a] text-white p-3 rounded-full mb-3 dark:bg-blue-600">
                {Icons.upload}
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag and drop Excel or CSV file
              </p>
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                or click to browse from your computer
              </p>
              <p className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-md mt-4 dark:bg-gray-700">
                CSV, XLS, XLSX (Max 10MB)
              </p>
            </div>

            <div className="space-y-2 mt-4">
              {supportingDocs.length > 0 && (
                <p className="text-xs text-gray-400 mb-2">
                  {supportingDocs.length} files attached
                </p>
              )}
              {supportingDocs.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-white/3 dark:border-gray-700"
                >
                  <svg
                    width="24"
                    height="28"
                    viewBox="0 0 24 28"
                    fill="none"
                    className="shrink-0"
                  >
                    <rect width="24" height="28" rx="3" fill="#fee2e2" />
                    <path
                      d="M5 8h14M5 12h14M5 16h9"
                      stroke="#dc2626"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate dark:text-white">
                      {f.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {f.size} {f.uploadedBy} • {f.uploadedAt}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(f.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md shrink-0 transition-colors dark:hover:bg-red-900/30"
                    title="Remove file"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3.5 3.5l7 7m0-7l-7 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reason}
              className={`px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors ${reason ? "bg-[#1a2e4a] hover:bg-[#152438] dark:bg-blue-600 dark:hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed dark:bg-gray-700"}`}
            >
              Escalate Case
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl p-8 w-100 flex flex-col items-center shadow-2xl dark:bg-gray-900 border dark:border-gray-500 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-5 shadow-sm">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
              Success!
            </h3>
            <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">
              Case successfully escalated
            </p>

            <button
              onClick={handleCloseModal}
              className="w-full py-3 bg-[#0f172a] text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main Controller Component ────────────────────────────────────────────────
export default function CaseDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialCase: Case | undefined = useMemo(() => {
    if (location.state?.case) return location.state.case as Case;
    return MOCK_CASES.find((c) => c.id === id);
  }, [location.state, id]);

  const [caseData, setCaseData] = useState<Case | undefined>(initialCase);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [currentView, setCurrentView] = useState<"detail" | "escalate">("detail");

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="font-medium text-gray-600 dark:text-white">Case not found</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-sm text-[#1a2e4a] font-semibold hover:underline dark:text-blue-400">
            ← Back to Cases
          </button>
        </div>
      </div>
    );
  }

  const isInvestigating = caseData.investigationStarted;
  const isClosed = caseData.status === "Closed";
  const canEscalateClose = isInvestigating && (caseData.evidence.length > 0 || caseData.comments.length > 0);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleStartInvestigation = () => {
    setCaseData((prev) => prev ? ({
      ...prev,
      investigationStarted: true,
      status: "Investigating" as CaseStatus,
      timeline: [
        { id: `t${Date.now()}`, type: "status_change", title: "Investigation Started", description: "Investigation opened", by: "Sarah Chen", byInitials: "SC", byColor: "bg-teal-600", timeAgo: "Just now" },
        ...prev.timeline,
      ],
      activityLog: [
        { id: `a${Date.now()}`, event: "Investigation Started", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
      statusHistory: [...prev.statusHistory, { from: "Open", to: "Investigating", date: new Date().toLocaleString() }],
    }) : prev);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles: EvidenceFile[] = Array.from(files).map((f) => ({
      id: `e${Date.now()}_${f.name}`,
      name: f.name,
      size: `${Math.round(f.size / 1024)} KB`,
      uploadedBy: "Sarah Chen",
      uploadedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    }));
    setCaseData((prev) => prev ? ({
      ...prev,
      evidence: [...prev.evidence, ...newFiles],
      timeline: [
        { id: `t${Date.now()}`, type: "evidence_uploaded", title: "Evidence uploaded", description: newFiles.map((f) => f.name).join(", "), by: "Sarah Chen", byInitials: "SC", byColor: "bg-teal-600", timeAgo: "Just now" },
        ...prev.timeline,
      ],
      activityLog: [
        { id: `a${Date.now()}`, event: "Evidence uploaded", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
    }) : prev);
  };

  const handleRemoveEvidence = (idToRemove: string) => {
    setCaseData((prev) => {
      if (!prev) return prev;
      const removed = prev.evidence.find((f) => f.id === idToRemove);
      return {
        ...prev,
        evidence: prev.evidence.filter((f) => f.id !== idToRemove),
        timeline: removed ? [
          { id: `t${Date.now()}`, type: "evidence_removed", title: "Evidence removed", description: removed.name, by: "Sarah Chen", byInitials: "SC", byColor: "bg-teal-600", timeAgo: "Just now" },
          ...prev.timeline,
        ] : prev.timeline,
        activityLog: removed ? [
          { id: `a${Date.now()}`, event: "Evidence removed", by: "Sarah Chen", timeAgo: "Just now" },
          ...prev.activityLog,
        ] : prev.activityLog,
      };
    });
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    await new Promise((res) => setTimeout(res, 1000));
    setCaseData((prev) => prev ? ({
      ...prev,
      aiSummary: "Analysis indicates a high probability of duplicate payment processing error. Two identical transactions were submitted to the same vendor within a 4-minute window, sharing the same invoice number, amount, and approval chain. Pattern suggests system-level duplicate submission rather than fraudulent activity.",
      aiConfidence: 92,
      aiRecommendations: [
        "Contact vendor to confirm receipt and request refund for duplicate payment.",
        "Review accounts payable system controls to prevent duplicate submissions.",
        "Implement invoice number validation in payment processing workflow.",
      ],
      patternDetections: [
        "Identical invoice numbers across both transactions",
        "Same payment amount ($42,350.00)",
        "Processed through different payment batches",
        "Approved by the same procurement officer",
      ],
    }) : prev);
    setIsGeneratingAI(false);
  };

  const handleAddComment = (commentText: string) => {
    const comment = {
      id: `c${Date.now()}`, author: "Sarah Chen", authorInitials: "SC", authorColor: "bg-teal-600",
      timeAgo: "Just now", text: commentText,
    };
    setCaseData((prev) => prev ? ({
      ...prev,
      comments: [comment, ...prev.comments],
      timeline: [
        { id: `t${Date.now()}`, type: "note_added", title: "Note Added", description: commentText, by: "Sarah Chen", byInitials: "SC", byColor: "bg-teal-600", timeAgo: "Just now" },
        ...prev.timeline,
      ],
      activityLog: [
        { id: `a${Date.now()}`, event: "Note added", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
    }) : prev);
  };

  const handleAssignRole = (role: "investigator" | "reviewer", name: string) => {
    setCaseData((prev) => {
      if (!prev) return prev;
      const historyUpdate = role === "reviewer" && !prev.reviewer
        ? [{ from: prev.status, to: "Under Review", date: new Date().toLocaleString() }]
        : [];

      return {
        ...prev,
        ...(role === "reviewer"
          ? { status: "Under Review" as CaseStatus, reviewer: { name, role: "Lead Investigator", dept: "Compliance Operations" } }
          : { investigator: { name, role: "Senior Investigator", dept: "Compliance Operations" } }),
        timeline: [
          { id: `t${Date.now()}`, type: "reassign", title: `Assigned Case to ${role === "reviewer" ? "Reviewer" : "Investigator"}`, description: `Case assigned to ${name}`, by: "System", byInitials: "SYS", byColor: "bg-slate-800", timeAgo: "Just now" },
          ...prev.timeline,
        ],
        activityLog: [
          { id: `a${Date.now()}`, event: `Assigned ${role === "reviewer" ? "Reviewer" : "Investigator"}`, by: "System", timeAgo: "Just now" },
          ...prev.activityLog,
        ],
        statusHistory: [...prev.statusHistory, ...historyUpdate],
      };
    });
  };

  const handleEscalateInit = () => setCurrentView("escalate");

  const handleEscalateSubmit = () => {
    setCaseData((prev) => prev ? ({
      ...prev,
      status: "Escalated" as CaseStatus,
      activityLog: [
        { id: `a${Date.now()}`, event: "Case escalated", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
      statusHistory: [...prev.statusHistory, { from: prev.status, to: "Escalated", date: new Date().toLocaleString() }],
    }) : prev);
    setCurrentView("detail");
  };

  const handleClose = () => {
    setCaseData((prev) => prev ? ({
      ...prev,
      status: "Closed" as CaseStatus,
      closedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      activityLog: [
        { id: `a${Date.now()}`, event: "Case closed", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
      statusHistory: [...prev.statusHistory, { from: prev.status, to: "Closed", date: new Date().toLocaleString() }],
    }) : prev);
  };

  const handleReopen = () => {
    setCaseData((prev) => prev ? ({
      ...prev,
      status: "Investigating" as CaseStatus,
      closedDate: undefined,
      activityLog: [
        { id: `a${Date.now()}`, event: "Investigation re-opened", by: "Sarah Chen", timeAgo: "Just now" },
        ...prev.activityLog,
      ],
      statusHistory: [...prev.statusHistory, { from: "Closed", to: "Investigating", date: new Date().toLocaleString() }],
    }) : prev);
  };

  // ── Escalate flow view ──────────────────────────────────────────────────
  if (currentView === "escalate") {
    return (
      <EscalateCaseView
        caseData={caseData}
        onCancel={() => setCurrentView("detail")}
        onEscalate={handleEscalateSubmit}
      />
    );
  }

  // ── Main detail view — ALWAYS the full 3-column layout ───────────────────
  return (
    <div className="min-h-full bg-gray-50 dark:bg-transparent">

      {/* Top bar */}
      <div className="bg-white px-6 py-4 dark:bg-white/3">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5">
              <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{caseData.id}</span>
              <span className={`px-3 py-0.5 rounded-md text-xs font-semibold ${STATUS_BADGE[caseData.status]}`}>{caseData.status}</span>
              <span className={`px-3 py-0.5 rounded-md text-xs font-semibold ${SEV_BADGE[caseData.severity]}`}>{caseData.severity}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-7">{caseData.title}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isClosed && (
              <>
                {canEscalateClose && (
                  <button
                    onClick={handleEscalateInit}
                    className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors border bg-[#1a2e4a] text-white hover:bg-[#152438] border-transparent dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Escalate Case
                  </button>
                )}
                <button
                  onClick={isInvestigating ? handleClose : undefined}
                  disabled={isInvestigating && !canEscalateClose}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors border border-red-200 dark:border-red-500/50
                    ${!isInvestigating
                      ? "bg-white text-gray-300 border-gray-200 cursor-not-allowed dark:bg-white/3 dark:border-gray-700 dark:text-gray-600"
                      : canEscalateClose
                        ? "bg-white text-gray-700 border-red-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                        : "bg-white text-gray-300 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-600"
                    }`}
                >
                  Close Case
                </button>
              </>
            )}
            {isClosed && (
              <button disabled className="px-4 py-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-300 bg-white cursor-not-allowed dark:bg-white/3 dark:border-gray-700 dark:text-gray-600">
                Close Case
              </button>
            )}
          </div>
        </div>

        {/* Closed success banner — sits ABOVE the grid, doesn't replace it */}
        {isClosed && (
          <div className="mt-6 bg-gray-100 dark:bg-white/4 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {Icons.check}
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">Case Closed Successfully</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Closed on {caseData.closedDate ?? "—"} by {caseData.reviewer?.name ?? "Reviewer"} · Resolution approved by Governance Review Board
                </p>
              </div>
            </div>
            <button
              onClick={handleReopen}
              className="shrink-0 px-4 py-2.5 bg-[#1a2e4a] text-white text-sm font-semibold rounded-lg hover:bg-[#152438] transition-colors whitespace-nowrap"
            >
              Re-Open Investigation
            </button>
          </div>
        )}

        {/* Meta pills — content swaps based on closed state, always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {(isClosed
            ? [
                { label: "Assigned To", value: caseData.assignedTo },
                { label: "Reviewed By", value: caseData.reviewer?.name ?? "—" },
                { label: "Review Date", value: caseData.closedDate ?? "—" },
                { label: "SLA", value: "Completed" },
              ]
            : [
                { label: "Assigned To", value: caseData.assignedTo },
                { label: "Alert", value: caseData.alertId },
                { label: "Created", value: caseData.created },
                { label: "SLA", value: caseData.sla },
              ]
          ).map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5 rounded-md py-3 px-4 border-2 dark:border-gray-600">
              <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Always the full 3-column layout, regardless of status */}
      <div className="grid grid-cols-1 mt-4 lg:grid-cols-[280px_1fr_320px] gap-0 min-h-full">
        <CaseLeftColumn caseData={caseData} />

        <CaseMiddleColumn
          caseData={caseData}
          isInvestigating={isInvestigating}
          isGeneratingAI={isGeneratingAI}
          handleGenerateAI={handleGenerateAI}
          handleAddComment={handleAddComment}
          handleFileUpload={handleFileUpload}
          handleRemoveEvidence={handleRemoveEvidence}
          fileInputRef={fileInputRef}
        />

        <CaseRightColumn
          caseData={caseData}
          isInvestigating={isInvestigating}
          canEscalateClose={canEscalateClose}
          handleStartInvestigation={handleStartInvestigation}
          handleEscalateInit={handleEscalateInit}
          handleAssignRole={handleAssignRole}
          handleClose={handleClose}
          handleReopen={handleReopen}
        />
      </div>
    </div>
  );
}
