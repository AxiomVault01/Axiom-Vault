import { useState } from "react";
import { AlertHexaIcon } from "../../../icons";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";


export default function RiskAlert() {
  const [riskMsg] = useState(
    "8 Critical anomalies detected across payroll and vendor payments",
  );

  return (
    <div className="w-full flex items-center justify-between px-2 md:px-6 py-1 mt-2 font-medium text-sm text-white text-center bg-red-100 dark:bg-error-500/20 border-red-300 dark:border-red-400 border rounded-lg">
      <div className="flex text-left gap-3 py-2">
        <span className="mt-1">
          {" "}
          <AlertHexaIcon />{" "}
        </span>

        <span>
          <p className="text-red-700"> High Risk Alert Detected</p>
          <p className="text-gray-700 dark:text-gray-300 font-light hidden md:block lg:block">
            {riskMsg}
          </p>
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <Link to={"/alerts"}>
          <button
            type="button"
            className="flex items-center justify-between gap-2 px-4 py-2 font-medium text-xs text-red-700 bg-white rounded-xl border border-red-700 "
          >
            Review
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}
