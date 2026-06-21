
// ── Sub-components ────────────────────────────────────────────────────────────
export function SectionCard({ title, children, action, className = "" }: { title: string; children: React.ReactNode; action?: React.ReactNode; className?: string; }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 dark:bg-white/3 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

export function InitialAvatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md"; }) {
  const s = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className={`${s} ${color} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
}

export function QuickActionBtn({
  icon,
  label,
  disabled,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-2.5 px-4 py-3.5 mb-3 rounded-lg text-sm font-medium transition-colors text-left
        ${
          disabled
            ? "text-gray-300 cursor-not-allowed dark:text-gray-500 bg-gray-50 my-2 dark:bg-white/5"
            : danger
              ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-gray-100 border-2 dark:hover:text-red-500 dark:bg-gray-700"
              : "text-gray-700 hover:bg-gray-200 my-2 bg-gray-100 dark:text-gray-300 border-2 dark:hover:bg-white/25 dark:bg-gray-700"
        }`}
    >
      <span className="shrink-0">{icon}</span>
      {label}
    </button>
  );
}
