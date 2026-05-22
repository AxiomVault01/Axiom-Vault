// import { useState } from "react";
// import {
//   AlertHexaIcon,
//   ArrowUpIcon,
//   CheckCircleIcon,
//   HorizontaLDots,
//   PageIcon,
//   PieChartIcon,
// } from "../../icons";
// import Badge from "../ui/badge/Badge";
import { AlertTriangle, Briefcase, IconNode, Search, Shield } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  id: number;
  icon?: ReactNode;
  label: string;
  amount: number;
  description: string;
  statuscolor: string;
  bgcolor?: string;
};

 export default function EcommerceMetrics() {


  const metrics:Props[] = [
    {
      id: 1,
      icon: <AlertTriangle size={16}/> ,
      statuscolor: "text-red-500",
      bgcolor: "bg-red-100",
      label: "Critical Alerts",
      amount: 5,
      description: "Needs immediate attention"
    },
    {
      id: 2,
      icon: <Search size={16}/> ,
      statuscolor: "text-blue-800",
      bgcolor: "bg-blue-100",
      label: "Open Investigations",
      amount: 7,
      description: "Active cases in progress"
    },
    {
      id: 3,
      icon: <Briefcase size={16} /> , 
      statuscolor: "text-purple-800",
      bgcolor: "bg-purple-100",
      label: "Active Cases",
      amount: 8,
      description: "Total ongoing workflows"
    },
    {
      id: 4,
      icon: <Shield size={16}/> , 
      statuscolor: "text-amber-500",
      bgcolor: "bg-amber-100",
      label: "Risk Esposure Score",
      amount: 72,
      description: "Out of 100 - High risk level"
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 -mt-6">
      {/* <!-- Metric Item Start --> */}
      {metrics.map((metric) => (
      <div key={metric.id} className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3 md:p-5">
        <div className="flex flex-col gap-y-3 mt-3">
            <div>
              
            <div className={`text-sm  p-2 dark:text-gray-400 w-fit rounded-lg mb-2 ${metric.bgcolor} ${metric.statuscolor}`}>
              {metric.icon}
            </div>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
             {metric.label}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
             {metric.amount}
            </h4>
          </div>
            <span className="flex items-center text-gray-500 gap-1 pt-1 text-xs">
              {metric.description}
            </span>
          
        </div>
        </div>
         ))}
    </div>
  );
}
