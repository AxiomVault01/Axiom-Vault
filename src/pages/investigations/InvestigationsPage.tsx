import React, { useState } from "react";
import {  DownloadIcon } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import InvestigationEmptyState from "../../components/investigations/InvestigationEmptyState";  
import GettingStartedCard from "../../components/investigations/GettingStartedCard";
import QuickActionCard from "../../components/investigations/QuickActionCard";
import { AlertCircle, Upload } from "lucide-react";
import InvestigationTable from "../../components/investigations/InvestigationTable";
import { investigations } from "../../data/investigations";

const InvestigationsPage: React.FC = () => {
 const [_builderOpen, setBuilderOpen] = useState(true);
 const hasData = investigations.length > 0;
  
  return (
    <>
      <PageMeta
        title="Axiom Vault | Investigations"
        description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
      />
      <main className=" flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6 space-y-5 dark:border-gray-600 dark:bg-white/[0.0]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight dark:text-gray-200">Investigations</h1>
            <p className="text-xs text-gray-400 mt-0.5">Active investigation cases and workflows</p>
         </div>
         <button onClick={() => setBuilderOpen(v => !v)} className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700 rounded-lg transition-colors shadow-sm dark:border-gray-600 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:border-gray-500">
           Export Report
           <DownloadIcon size={14} />
         </button>
       </div>
        
        {!hasData ? (

        <>
          <InvestigationEmptyState />
          <GettingStartedCard />

          <div className="grid gap-6 md:grid-cols-2">
            <QuickActionCard icon={Upload} title="Upload Employee Data" description="Start by uploading your payroll data." buttonText="Get Started"/>
            <QuickActionCard icon={AlertCircle} iconColor="text-red-500" title="View Alerts" description="Check existing alerts ready for investigation." buttonText="View Alerts"/>
         </div>
       </>

        ) : (
        <InvestigationTable data={investigations} />
       )}
      </main>
    </>
  );
};

export default InvestigationsPage;



