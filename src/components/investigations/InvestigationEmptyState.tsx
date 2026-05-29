import { SearchIcon } from "lucide-react";

export default function InvestigationEmptyState() {
  return (
    <div className="my-10 text-center">
      <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
        <SearchIcon size={40}/>
      </div>

      <h2 className="mb-2 text-xl font-semibold">
        No Investigations Yet
      </h2>

      <p className="mx-auto max-w-lg text-sm text-gray-500">
        Investigations help you dig deeper into potential fraud or
        anomalies. Once you upload data and review alerts, you can
        create investigation cases to track your findings.
      </p>

    </div>
  );
}