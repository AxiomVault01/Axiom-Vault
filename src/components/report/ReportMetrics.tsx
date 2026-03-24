import { useState } from "react";
import {
  AlertHexaIcon,
  DownloadIcon,
  FileIcon,
} from "../../icons";

export default function ReportMetrics() {
  const [alert, setAlert] = useState({
    critical: 24,
    duplicate: 0,
    patterns: 0,
    records: 0,
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 mt-2">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div>
             <span className="text-sm text-gray-500 dark:text-gray-400">Reports This Month</span>
          </div>
          <span>
            <FileIcon className="text-blue-500 size-6 dark:text-blue-500" />
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {alert.critical}
            </h4>
            
          </div>
          {alert.critical > 0 ? 
          <span className="flex text-green-500 gap-1 pt-1 text-sm">
            +{alert.critical} from last month
          </span> :
          <span className="flex text-gray-500 gap-1 pt-1 text-sm">
            No change
          </span> }
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div>
             <span className="text-sm text-gray-500 dark:text-gray-400">Cases Documented</span>
          </div>
          <span>
              <AlertHexaIcon className="text-red-800 size-5 dark:text-red-800" />
         </span>
      </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              156
            </h4>
          </div>
          <span className="flex text-green-500 gap-1 pt-1 text-sm">
            +12 from last month
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Downloads</span>
          </div>
          <span>
            <DownloadIcon className="text-green-500 size-6 dark:text-green-500" /> 
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              89
            </h4>
          </div>
          <span className="flex text-gray-500 dark:text-gray-400 gap-1 pt-1 text-sm">
            last 30 days
          </span>
          
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
        <div className="flex items-end justify-between">
          <div>
             <span className="text-sm text-gray-500 dark:text-gray-400">Avg. Report Size</span>
          </div>
          <span>
            <FileIcon className="text-purple-800 size-6 dark:text-purple-800" />
          </span>
          
        </div>

        <div className="flex flex-col gap-y-3 mt-3">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3.2MB
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Across all formats
            </span>
          </div>
          
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

    </div>
  );
}

