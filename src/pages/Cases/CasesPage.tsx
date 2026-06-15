import React from "react";
import { DownloadIcon } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import CasesEmptyState from "../../components/cases/CasesEmptyState";
import GettingStartedCard from "../../components/cases/GettingStartedCard";
import QuickActionCard from "../../components/cases/QuickActionCard";
import { Upload } from "lucide-react";
import CasesTable from "../../components/cases/CasesTable";
import { MOCK_CASES } from "../../pages/Cases/CasesData";

const CasesPage: React.FC = () => {
  const hasData = MOCK_CASES.length > 0;


  return (
    <>
      <PageMeta
        title="Axiom Vault | Cases"
        description="Manage and review investigation cases."
      />

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6 space-y-5 dark:border-gray-600 dark:bg-white/[0.0]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight dark:text-gray-200">
              Case List
            </h1>

            <p className="text-xs text-gray-400 mt-0.5">
              Review and manage risk cases across your organization.
            </p>
          </div>

          <button  className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700 rounded-lg transition-colors shadow-sm">
            Export All
            <DownloadIcon size={14} />
          </button>
        </div>

       {!hasData ? (

        <>
          <CasesEmptyState />
          <GettingStartedCard />

          <div className="grid grid-cols-1 md:grid-cols-7 place-items-center">
              <div className="md:col-start-3 md:col-span-2">
                  <QuickActionCard  icon={Upload}  title="Open Email" description="Start by checking your email for assigned cases." buttonText="Get Started"/>
              </div>
          </div>
       </>
        ) : (


        <CasesTable data={MOCK_CASES} />
       )}

      </main>
    </>
  );
};

export default CasesPage;