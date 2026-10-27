import { FileBox } from "lucide-react";
import PageMeta from "../components/common/PageMeta";
import MemberEmptyState from "./MemberEmptyState";

export default function MemberEvidencePage() {
  return (
    <>
      <PageMeta title="Axiom Vault | Evidence Archive" description="Evidence from your cases." />

      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Evidence Archive</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Documents uploaded to the cases you work on
          </p>
        </div>

        <MemberEmptyState
          icon={FileBox}
          title="No Evidence Yet"
          description="Evidence you upload while investigating a case will be archived here."
        />
      </div>
    </>
  );
}
