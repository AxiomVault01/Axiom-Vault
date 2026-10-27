import { LayoutDashboard, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import EcommerceMetrics from "./EcommerceMetrics";

export default function DashboardEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
        Overview
      </h2>

      <div className="pt-6">
        <EcommerceMetrics empty />
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <LayoutDashboard size={32} strokeWidth={1.6} />
        </div>

        <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-200">
          Your dashboard is ready when you are.
        </h3>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Upload your first data file to start detecting anomalies, monitoring
          risks, uncovering insights across your organization.
        </p>

        <button
          type="button"
          onClick={() => navigate("/employee-records")}
          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#0B1F44] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#152438] dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Upload size={16} />
          Upload File
        </button>
      </div>
    </div>
  );
}
