import { useState } from "react";
import Alert from "../../components/ui/alert/Alert";

const RiskAlertFilters = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Your alerts data with severity levels
  const alerts = [
    {
      id: 1,
      severity: "critical",
      title: "Multiple Employees Using Same Bank Account",
    },
    {
      id: 2,
      severity: "high",
      title: "Salary Exceeds Position Threshold",
    },
    {
      id: 3,
      severity: "critical",
      title: "Duplicate Bank Account Detected",
    },
    {
      id: 4,
      severity: "high",
      title: "Unusual Hiring Pattern Detected",
    },
  ];

  // Count alerts by severity
  const counts = {
    all: alerts.length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  };

  // Filter configuration with colors matching your design
  const filters = [
    { 
      id: "all", 
      label: "All Alerts", 
      count: counts.all,
      activeClass: "bg-gray-900 text-white border dark:bg-black",
      inactiveClass: "bg-gray-200 text-gray-700 hover:bg-gray-200"
    },
    { 
      id: "critical", 
      label: "Critical", 
      count: counts.critical,
      activeClass: "bg-red-600 text-white",
      inactiveClass: "bg-red-100 text-red-600 hover:bg-red-100"
    },
    { 
      id: "high", 
      label: "High", 
      count: counts.high,
      activeClass: "bg-orange-600 text-white",
      inactiveClass: "bg-orange-100 text-orange-600 hover:bg-orange-100"
    },
    { 
      id: "medium", 
      label: "Medium", 
      count: counts.medium,
      activeClass: "bg-yellow-600 text-white",
      inactiveClass: "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
    },
    { 
      id: "low", 
      label: "Low", 
      count: counts.low,
      activeClass: "bg-blue-600 text-white",
      inactiveClass: "bg-blue-100 text-blue-600 hover:bg-blue-100"
    },
  ];

  // Get filtered alerts
  const filteredAlerts =
    activeFilter === "all"
      ? alerts
      : alerts.filter((alert) => alert.severity === activeFilter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`
              md:px-4 px-2 py-2 rounded-lg font-medium md:text-sm text-xs transition-colors
              ${
                activeFilter === filter.id
                  ? filter.activeClass
                  : filter.inactiveClass
              }
            `}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Alert
            key={alert.id}
            variant="error"
            title={alert.title}
            message="5 employees from the same department are receiving salaries to the same bank account number"
            // showLink={true}
            // linkHref="/"
            // linkText="Learn more"
            // employeeNumber={5}
            // dateDetected="20/2/2026"
            // reqAction="Investigation Required"
          />
        ))}
      </div>
    </div>
  );
};

export default RiskAlertFilters;