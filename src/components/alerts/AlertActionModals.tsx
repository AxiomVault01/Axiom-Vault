import { useEffect, useState, ReactNode } from "react";
import { Check } from "lucide-react";

// ── Shared overlay ────────────────────────────────────────────────────────────

function ModalShell({
  isOpen,
  onClose,
  className = "",
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-500/60 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full rounded-xl bg-white shadow-xl dark:bg-gray-900 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

const PRIMARY_BTN =
  "rounded-lg bg-[#0B1F44] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#152438] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700";
const OUTLINE_BTN =
  "rounded-lg border border-[#0B1F44] bg-white px-4 py-3 text-sm font-medium text-[#0B1F44] transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-transparent dark:text-gray-200 dark:hover:bg-white/5";

// ── No Reviewer Assigned ──────────────────────────────────────────────────────

export function NoReviewerModal({
  isOpen,
  onClose,
  onAcceptAndConvert,
  onChangeReviewer,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndConvert: () => void;
  onChangeReviewer: () => void;
}) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} className="max-w-3xl px-6 py-16 sm:px-10">
      <div className="flex flex-col items-center">
        <h2 className="border-b border-gray-300 px-2 pb-2 text-xl font-semibold text-gray-900 dark:border-gray-700 dark:text-white sm:text-2xl">
          No Reviewer Assigned
        </h2>
        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <button type="button" onClick={onAcceptAndConvert} className={OUTLINE_BTN}>
            Accept Auto-assigned &amp; Convert
          </button>
          <button type="button" onClick={onChangeReviewer} className={`${PRIMARY_BTN} sm:min-w-72`}>
            Change Reviewer
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

// ── Explanation for False Positive ────────────────────────────────────────────

export function FalsePositiveModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  // Start each opening with an empty reason
  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);

  const trimmed = reason.trim();

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} className="max-w-4xl p-6 sm:p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (trimmed) onConfirm(trimmed);
        }}
      >
        <h2 className="mb-8 text-lg font-semibold text-gray-900 dark:text-white">
          Explanation for False Positive
        </h2>
        <textarea
          autoFocus
          value={reason}
          onChange={(e) => setReason(e.target.value.slice(0, 500))}
          placeholder="Enter reason...(eg Incorrect vendor matching)"
          rows={8}
          className="w-full resize-none rounded-lg border border-gray-200 border-l-4 border-l-red-600 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:border-l-red-500 dark:bg-white/3 dark:text-white"
        />
        <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button type="button" onClick={onClose} className={`${OUTLINE_BTN} py-2.5`}>
            Cancel
          </button>
          <button type="submit" disabled={!trimmed} className={`${PRIMARY_BTN} sm:min-w-72`}>
            Confirm False Positive
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

// ── Success ───────────────────────────────────────────────────────────────────

export function AlertSuccessModal({
  isOpen,
  onClose,
  message,
  onGoToDashboard,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onGoToDashboard: () => void;
}) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} className="max-w-md px-8 pb-10 pt-8">
      <div className="flex flex-col items-center text-center">
        <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <Check size={22} strokeWidth={3} className="text-green-500" />
          </span>
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success!</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        <button type="button" onClick={onGoToDashboard} className={`${PRIMARY_BTN} mt-10 w-full`}>
          Go to Dashboard
        </button>
      </div>
    </ModalShell>
  );
}
