import { useState } from "react";
import { Case } from "../CasesData";
import { SectionCard, InitialAvatar } from "./CaseShared";
import { Icons } from "./CaseConstants";


interface Props {
  caseData: Case;
  isInvestigating: boolean;
  isGeneratingAI: boolean;
  handleGenerateAI: () => void;
  handleAddComment: (comment: string) => void;
  handleFileUpload: (files: FileList | null) => void;
  handleRemoveEvidence: (id: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function CaseMiddleColumn({
  caseData,
  isInvestigating,
  isGeneratingAI,
  handleGenerateAI,
  handleAddComment,
  handleFileUpload,
  handleRemoveEvidence,
  fileInputRef,
}: Props) {
  const [newComment, setNewComment] = useState("");

  const submitComment = () => {
    if (!newComment.trim()) return;
    handleAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="p-5 space-y-6 overflow-y-auto">
      {/* Investigation Timeline */}
      <SectionCard title="Investigation Timeline" className="shadow-sm">
        <p className="text-xs text-gray-400 mb-6">
          Complete audit trail of case activities
        </p>
        <div className="relative">
          <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-8">
            {caseData.timeline.map((item) => (
              <div key={item.id} className="flex gap-5">
                <InitialAvatar
                  initials={item.byInitials}
                  color={item.byColor}
                  size="sm"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </p>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">by {item.by}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Evidence & Documents */}
      <SectionCard
        title="Evidence & Documents"
        action={
          isInvestigating ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleFileUpload(e.target.files);
                  e.target.value = ""; // allow re-uploading the same file name
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1a2e4a] text-[#1a2e4a] text-xs font-semibold rounded-lg hover:bg-[#1a2e4a] hover:text-white transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {Icons.upload} Upload File
              </button>
            </>
          ) : null
        }
      >
        {caseData.evidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4 text-gray-400 dark:bg-gray-700">
              <svg width="34" height="34" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 9V2M4 5l3-3 3 3"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11h10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-400">No evidence uploaded yet.</p>
            {isInvestigating && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 px-4 py-2 bg-[#1a2e4a] text-white text-xs font-semibold rounded-lg hover:bg-[#152438] transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Upload Evidence
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 mb-2">
              {caseData.evidence.length} files attached
            </p>
            {caseData.evidence.map((f) => (
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
                {isInvestigating && (
                  <button
                    onClick={() => handleRemoveEvidence(f.id)}
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
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Transaction Analysis */}
      {isInvestigating && (
        <SectionCard title="Transaction Analysis">
          <p className="text-xs text-gray-400 mb-4">
            Financial impact and patterns
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 dark:bg-white/3">
              <p className="text-xs text-gray-400">Total Exposure</p>
              <p className="text-lg font-bold text-gray-800 mt-1 dark:text-white">
                {caseData.totalExposure}
              </p>
              <p className="text-xs text-gray-400">
                {caseData.transactionCount} transactions
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 dark:bg-red-900/20">
              <p className="text-xs text-red-400">Duplicate Amount</p>
              <p className="text-lg font-bold text-red-600 mt-1">
                {caseData.duplicateAmount}
              </p>
              <p className="text-xs text-red-400">Requires recovery</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 dark:bg-white/3">
              <p className="text-xs text-gray-400">Risk Score</p>
              <p className="text-lg font-bold text-gray-800 mt-1 dark:text-white">
                {caseData.riskScore}
              </p>
              <p className="text-xs text-gray-400">High confidence</p>
            </div>
          </div>
          {caseData.patternDetections.length > 0 && (
            <div className="bg-indigo-50 rounded-lg p-5 border-2 border-blue-200 dark:bg-indigo-900/20">
              <p className="text-xs font-semibold text-indigo-700 mb-2 dark:text-indigo-300">
                Pattern Detection
              </p>
              <ul className="space-y-1">
                {caseData.patternDetections.map((p, i) => (
                  <li
                    key={i}
                    className="text-xs text-indigo-600 dark:text-indigo-300 flex items-start gap-1.5"
                  >
                    <span className="mt-1">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>
      )}

      {/* AI Investigation Summary */}
      <div
        className={`border rounded-xl p-5 ${isInvestigating ? "bg-linear-to-br from-indigo-50 to-purple-50 border-indigo-100 dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-800" : "bg-indigo-100/60 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isInvestigating ? Icons.sparkle : null}
            <span
              className={`text-sm font-bold ${isInvestigating ? "text-indigo-800 dark:text-indigo-300" : "text-gray-800 dark:text-white"}`}
            >
              AI Investigation Summary
            </span>
            {caseData.aiConfidence && isInvestigating && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full dark:bg-indigo-800 dark:text-indigo-200">
                {caseData.aiConfidence}% Confidence
              </span>
            )}
          </div>
        </div>
        {!isInvestigating ? (
          <>
            <p className="text-xs text-indigo-600 mb-4 dark:text-indigo-300">
              Automated analysis and recommendations
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-gray-100 rounded-full p-4 my-5 text-gray-400 dark:bg-gray-700">
                {Icons.padlock}
              </div>
              <p className="text-sm mb-4 text-gray-500 dark:text-gray-400 w-2/3 justify-center items-center text-center">
                AI analysis will appear once investigation activity begins.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-indigo-600 mb-4 dark:text-indigo-300">
              Automated analysis and recommendations
            </p>
            {caseData.aiSummary ? (
              <>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-800 mb-2 dark:text-white">
                    Investigation Summary
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                    {caseData.aiSummary}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2 dark:text-white">
                    Recommended Actions
                  </p>
                  <ul className="space-y-1.5">
                    {caseData.aiRecommendations.map((rec, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="mb-3 opacity-40"
                >
                  <rect
                    x="4"
                    y="4"
                    width="28"
                    height="28"
                    rx="6"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 18h12M18 12v12"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-sm text-indigo-600 dark:text-indigo-300 mb-4">
                  {isGeneratingAI
                    ? "Analyzing case data..."
                    : "AI analysis ready to begin"}
                </p>
                <button
                  onClick={handleGenerateAI}
                  disabled={isGeneratingAI}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isGeneratingAI ? "bg-indigo-200 text-indigo-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                >
                  {isGeneratingAI ? "Generating..." : "Generate AI Summary"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Investigation Notes & Comments */}
      <SectionCard title="Investigation Notes & Comments">
        <p className="text-xs text-gray-400 mb-4">
          Internal collaboration and findings
        </p>
        {!isInvestigating ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 rounded-full p-4 mb-4 text-gray-400 dark:bg-gray-700">
              {Icons.comment}
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1 dark:text-white">
              No comments or notes yet.
            </p>
            <p className="text-sm text-gray-500 text-center dark:text-gray-400">
              Collaboration will appear here once the investigation begins.
            </p>
          </div>
        ) : (
          <>
            {caseData.comments.length > 0 && (
              <div className="space-y-4 mb-4">
                {caseData.comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <InitialAvatar
                      initials={c.authorInitials}
                      color={c.authorColor}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                          {c.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {c.timeAgo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300">
                        {c.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {caseData.comments.length === 0 && (
              <div className="flex flex-col items-center py-6 text-center mb-4">
                <div className="text-gray-300 mb-2">{Icons.comment}</div>
                <p className="text-sm text-gray-400">
                  No comments or notes yet.
                </p>
              </div>
            )}

            <div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add investigation notes or comment..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 dark:bg-white/3 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-600"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    newComment.trim()
                      ? "bg-[#1a2e4a] text-white hover:bg-[#152438] dark:bg-blue-600 dark:hover:bg-blue-700"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed dark:bg-white/3 dark:text-gray-600"
                  }`}
                >
                  Add comment
                </button>
              </div>
            </div>
          </>
        )}
      </SectionCard>
    </div>
  );
}