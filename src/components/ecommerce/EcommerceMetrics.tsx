import { useState } from "react";
import {
  AlertHexaIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  HorizontaLDots,
  PageIcon,
  PieChartIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

type Props = {
  critical: number;
  duplicate: number;
  patterns: number;
  records: number;
};

export default function EcommerceMetrics() {
  const [alert] = useState<Props>({
    critical: 12,
    duplicate: 0,
    patterns: 0,
    records: 0,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 -mt-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-red-200 rounded-xl dark:bg-gray-800">
            <AlertHexaIcon className="text-red-800 size-6 dark:text-white/90" />
          </div>
          <span className="mb-3">
            <Badge color={alert.critical > 0 ? "error" : "success"}>
              <span
                className={`text-xs font-semibold ${alert.critical > 0 ? "text-red-600" : "text-success-700"}`}
              >
                {alert.critical > 0 ? "HIGH RISK" : "SAFE"}
              </span>
            </Badge>
          </span>
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {alert.critical}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Critical Alerts
            </span>
          </div>
          {alert.critical > 0 ? (
            <span className="flex text-red-500 gap-1 pt-1 text-sm">
              <ArrowUpIcon />+{alert.critical} from last week
            </span>
          ) : (
            <span className="flex text-gray-500 gap-1 pt-1 text-sm">
              <HorizontaLDots />
              No change
            </span>
          )}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div className="flex items-center rounded-xl justify-center w-12 h-12 bg-warning-100 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400">
            <PageIcon className="text-warning-600 size-6 dark:text-white/90" />
          </div>
          <span className="mb-3">
            <Badge color="warning">
              <span className="text-warning-600 text-xs font-semibold">
                MEDIUM
              </span>
            </Badge>
          </span>
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              27
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Duplicate Accounts
            </span>
          </div>
          <span className="flex text-warning-500 gap-1 pt-1 text-sm">
            <ArrowUpIcon />
            +3 dedected today
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div className="flex items-center rounded-xl justify-center w-12 h-12 bg-brand-300 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
            <PieChartIcon className="text-brand-500 size-6 dark:text-white/90" />
          </div>
          <span className="mb-3">
            <Badge color="primary">
              <span className="text-brand-600 text-xs font-semibold">
                MONITORING
              </span>
            </Badge>
          </span>
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              156
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Unusual Patterns
            </span>
          </div>
          <span className="flex text-gray-500 gap-1 pt-1 text-sm">
            <HorizontaLDots />
            No change
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div className="flex items-center rounded-xl justify-center w-12 h-12 bg-success-100 text-success-600 dark:bg-success-500/15 dark:text-success-500">
            <CheckCircleIcon className="text-success-800 size-6 dark:text-white/90" />
          </div>
          <span className="mb-3">
            <Badge color="success">
              <span className="text-success-600 text-xs font-semibold">
                VERIFIED
              </span>
            </Badge>
          </span>
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              8,432
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Clean Records
            </span>
          </div>
          <span className="flex text-success-500 gap-1 pt-1 text-sm">
            <ArrowUpIcon />
            +124 verified today
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
