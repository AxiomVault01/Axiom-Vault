import React from "react";
import PageMeta from "../../components/common/PageMeta";
import CasesEmptyState from "../../components/cases/CasesEmptyState";
import GettingStartedCard from "../../components/cases/GettingStartedCard";
import QuickActionCard from "../../components/cases/QuickActionCard";
import { DownloadIcon, Upload } from "lucide-react";
import CasesTable, { exportCasesCsv } from "../../components/cases/CasesTable";
import { MOCK_CASES } from "../../pages/Cases/CasesData";
import { useHasUploadedData } from "../../hooks/useHasUploadedData";

const CasesPage: React.FC = () => {
  const hasUploadedData = useHasUploadedData();
  const cases = hasUploadedData ? MOCK_CASES : [];
  const hasData = cases.length > 0;

  return (
    <>
      <PageMeta
        title="Axiom Vault | Cases"
        description="Manage and review investigation cases."
      />

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6 space-y-5 dark:border-gray-600 dark:bg-white/0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight dark:text-gray-200">
              Case List
            </h1>

            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Review and manage risk cases across your organization
            </p>
          </div>

          <button
            onClick={() => exportCasesCsv(cases)}
            disabled={!hasData}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-gray-700 hover:bg-gray-50 text-sm font-medium text-gray-900 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/3 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white/5"
          >
            Export Report
            <DownloadIcon size={14} />
          </button>
        </div>

        {!hasData ? (
          <div className="mx-auto max-w-2xl space-y-8 pb-6">
            <CasesEmptyState />
            <GettingStartedCard />

            <div className="mx-auto w-full max-w-xs">
              <QuickActionCard
                icon={Upload}
                title="Open Email"
                description="Start by checking your email for assigned cases."
                buttonText="Get Started"
                href="mailto:"
              />
            </div>
          </div>
        ) : (
          <CasesTable data={cases} />
        )}
      </main>
    </>
  );
};

export default CasesPage;
