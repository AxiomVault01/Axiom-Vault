
// ── Severity / Status style maps ─────────────────────────────────────────────
export const SEV_BADGE: Record<string, string> = {
  Critical: "bg-red-100 text-red-600 border border-red-200",
  High: "bg-orange-100 text-orange-600 border border-orange-200",
  Medium: "bg-yellow-100 text-yellow-600 border border-yellow-200",
  Low: "bg-blue-100 text-blue-600 border border-blue-200",
};

export const STATUS_BADGE: Record<string, string> = {
  New: "bg-blue-100 text-blue-600 border border-blue-200",
  Open: "bg-slate-100 text-slate-600 border border-slate-200",
  Investigating: "bg-amber-100 text-amber-600 border border-amber-200",
  "Under Review": "bg-purple-100 text-purple-600 border border-purple-200",
  Escalated: "bg-red-100 text-red-700 border border-red-200",
  Closed: "bg-gray-100 text-gray-500 border border-gray-200",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
export const Icons = {
  arrow: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  longArrow: <svg width="28" height="8" viewBox="0 0 28 8" fill="none"><path d="M1 4h22M20 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  padlock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  export: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  user: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M2 12c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  escalate: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 12H2L7 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" /><path d="M7 6v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  close: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" /><path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  play: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 5l4 2-4 2V5z" fill="currentColor" /></svg>,
  upload: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 9V2M4 5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  download: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  sparkle: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5L12 6l-3.5 1.5L7 11l-1.5-3.5L2 6l3.5-1.5L7 1z" stroke="#6366f1" strokeWidth="1.2" fill="none" /></svg>,
  comment: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  reassign: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" /><path d="M1.5 11c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M9 2l2 1.5L9 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  dot: <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor" /></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};