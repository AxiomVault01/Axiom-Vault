import { Search } from "lucide-react";
import PageMeta from "../components/common/PageMeta";
import CasesTable from "../components/cases/CasesTable";
import { useCases } from "../hooks/useCases";
import { toCaseView } from "../services/CasesAPI";
import MemberEmptyState from "./MemberEmptyState";

export default function MemberCasesPage() {
  // The cases API only returns cases the signed-in member can see
  const casesQuery = useCases();
  const cases = casesQuery.data?.results.map(toCaseView) ?? [];

  return (
    <>
      <PageMeta title="Axiom Vault | My Cases" description="Cases assigned to you." />

      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">My Cases</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Cases assigned to you for investigation or review
          </p>
        </div>

        {casesQuery.isLoading ? (
          <p className="py-12 text-center text-sm text-gray-500">Loading cases...</p>
        ) : casesQuery.isError ? (
          <div className="py-12 text-center">
            <p role="alert" className="text-sm text-red-500">Could not load cases.</p>
            <button
              type="button"
              onClick={() => casesQuery.refetch()}
              className="mt-2 text-sm font-semibold text-brand-600 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : cases.length === 0 ? (
          <MemberEmptyState
            icon={Search}
            title="No Case Assigned"
            description="You don't have any cases assigned to you at the moment. Assigned cases will appear here for investigation."
          />
        ) : (
          <CasesTable data={cases} basePath="/member/cases" />
        )}
      </div>
    </>
  );
}
