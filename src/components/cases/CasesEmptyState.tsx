import { SearchIcon } from "lucide-react";

export default function CasesEmptyState() {
  return (
    <div className="mt-6 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
        <SearchIcon size={30} strokeWidth={1.8} />
      </div>

      <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-200">
        No Case Assigned
      </h2>

      <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        You don't have any cases assigned to you at the moment. Assigned cases
        will appear here for investigation.
      </p>
    </div>
  );
}
