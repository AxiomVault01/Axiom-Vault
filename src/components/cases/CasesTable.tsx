import React, { useMemo, useState } from "react";
import {Eye, Search, Filter, ChevronDown, ChevronUp} from "lucide-react";
import { useNavigate } from "react-router";
import { Case, CaseStatus, Severity } from "../../pages/Cases/CaseTypes";
import { STATUS_STYLES, SEVERITY_STYLES} from "../../pages/Cases/CaseStyles";

interface Props {
  data: Case[];
}
const STAT_FILTERS: StatusFilter[] = ["All", "New", "Investigating", "Under Review", "Closed"];
type StatusFilter = "All" | CaseStatus;



export default function CasesTable({ data }: Props) {
    const navigate = useNavigate();

    // Search state
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

    const counts = useMemo(() => ({
      All: data.length,
      New: data.filter((a) => a.status === "New").length,
      Investigating: data.filter((a) => a.status === "Investigating").length,
      "Under Review": data.filter((a) => a.status === "Under Review").length,
      Closed: data.filter((a) => a.status === "Closed").length,
   }), [data]);

    const filtered = useMemo(() => {
    return data.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.linkedAlert.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q);
        // a.status.toLowerCase().includes(q);
      const matchSev = statusFilter === "All" || a.status === statusFilter;
      return matchSearch && matchSev;
    });
  }, [data, search, statusFilter]);


  const handleExport = () => {
    const headers = ["Case ID", "Linked Alert", "Department", "Status", "Assigned To", "Severity", "Created", "Last Updated", "Evidence Count"];
    const rows = filtered.map((a) =>
      [a.id, a.linkedAlert, a.department, a.status, a.assignedTo, a.severity, a.created, a.lastUpdated, a.evidenceCount].join(",")
    );
}

   // Floating filter visibility
   const [showFilters, setShowFilters] = useState(false);

   // Accordion sections
   const [statusOpen, setStatusOpen] = useState(true);
   const [riskOpen, setRiskOpen] = useState(true);
   const [investigatorOpen, setInvestigatorOpen] =
    useState(true);

    // Selected filters
   const [selectedStatuses, setSelectedStatuses] =
    useState<CaseStatus[]>([]);

   const [selectedRisks, setSelectedRisks] =
    useState<Severity[]>([]);

   const [selectedInvestigators, setSelectedInvestigators] =
    useState<string[]>([]);

   // Helper function for checkboxes
    const toggleSelection = <T,>(
    value: T,
    selected: T[],
    setSelected: React.Dispatch<
      React.SetStateAction<T[]>
    >
  ) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Filter logic
  const filteredCases = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.linkedAlert
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.department
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(item.status);

      const matchesRisk =
        selectedRisks.length === 0 ||
        selectedRisks.includes(item.severity);

      const matchesInvestigator =
        selectedInvestigators.length === 0 ||
        selectedInvestigators.includes(
          item.assignedTo
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRisk &&
        matchesInvestigator
      );
    });
  }, [ data, search, selectedStatuses, selectedRisks, selectedInvestigators,]);

  return (
    <div className="space-y-4">
        {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-5 mb-4">
            {STAT_FILTERS.map((f) => {
              const active = statusFilter === f;
              const pill: Record<StatusFilter, string> = {
                All: active ? "bg-[#1a2e4a] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                New: active ? "bg-blue-500 text-white"   : "bg-blue-200 text-blue-700 hover:bg-blue-100",
                Investigating: active ? "bg-orange-500 text-white": "bg-orange-100 text-orange-700 hover:bg-orange-50",
                "Under Review": active ? "bg-purple-500 text-white": "bg-purple-200 text-purple-700 hover:bg-purple-100",
                Closed: active ? "bg-gray-500 text-white"  : "bg-gray-400 text-gray-700 hover:bg-gray-200",
              };
              return (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${pill[f]}`}
                >
                  {f === "All" ? `All Alerts (${counts.All})` : `${f} (${counts[f]})`}
                </button>
              );
            })}
          </div>

        {/* Search + Filter */}
      <div className="flex items-center justify-between gap-3 relative">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
               <Search
                 size={18}  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input type="text" placeholder="Search cases..." value={search}
                    onChange={(e) =>
                    setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-boxdark dark:text-white"
               />
           </div>

            {/* Filter Button */}
            <button onClick={() => setShowFilters((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-boxdark dark:text-white">
                <Filter size={16} />
                Filter
           </button>

           {/* Floating Dropdown */}
           {showFilters && (
          <div className="absolute right-0 top-14 z-20 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-boxdark">
                <h3 className="mb-4 text-sm font-semibold">
                   Filters
                </h3>

                {/* Investigation Status */}
                <div className="border-b pb-4">
                   <button onClick={() =>  setStatusOpen((prev) => !prev) }
                       className="flex w-full items-center justify-between">
                       <span className="text-sm font-medium">
                            Investigation Status
                      </span>
                      {statusOpen ? ( <ChevronUp size={16} />
                       ) : (
                      <ChevronDown size={16} />)}
                   </button>

                  {statusOpen && (
                  <div className="mt-3 space-y-2">
                       {( [ "New", "Investigating", "Under Review", "Closed",] as CaseStatus[]
                       ).map((status) => (
                       <label key={status} className="flex items-center gap-2 text-sm" >
                            <input type="checkbox" checked={selectedStatuses.includes( status)}
                             onChange={() => toggleSelection(status, selectedStatuses, setSelectedStatuses)}
                            />
                          {status}
                      </label>
                       ))}
                  </div>
                 )}
              </div>

             {/* Risk Level */}
               <div className="border-b py-4">
                   <button onClick={() =>
                        setRiskOpen((prev) => !prev)} className="flex w-full items-center justify-between" >
                        <span className="text-sm font-medium">
                           Risk Level
                       </span>

                        {riskOpen ? ( <ChevronUp size={16} />
                        ) : (
                        <ChevronDown size={16} />
                       )}
                  </button>

                 {riskOpen && (
                    <div className="mt-3 space-y-2">
                       {( [ "Low", "Medium","High", "Critical", ] as Severity[]
                       ).map((risk) => (
                       <label key={risk} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={selectedRisks.includes(risk )}
                              onChange={() => toggleSelection(risk, selectedRisks,setSelectedRisks)}
                           />
                          {risk}
                       </label>
                      ))}
                   </div>
                   )}
               </div>

               {/* Assigned Investigator */}
               <div className="pt-4">
                    <button onClick={() => setInvestigatorOpen( (prev) => !prev)}
                        className="flex w-full items-center justify-between">
                        <span className="text-sm font-medium">
                           Assigned Investigator
                       </span>

                       {investigatorOpen ? (
                        <ChevronUp size={16} />
                        ) : (
                       <ChevronDown size={16} />
                      )}
                   </button>

                   {investigatorOpen && (
                    <div className="mt-3 space-y-3">
                       {["Sarah Chen", "Alex Rodriguez","Mike Thompson","Frank Mba", ].map((investigator) => (
                       <label key={investigator} className="flex items-center gap-3 text-sm">
                           <input type="checkbox" checked={selectedInvestigators.includes(investigator)}
                              onChange={() => toggleSelection(investigator, selectedInvestigators,
                              setSelectedInvestigators)}
                           />
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold">
                              {investigator .split(" ") .map((name) => name[0].toUpperCase()
                              ) .join("")}
                          </span>
                          {investigator}
                      </label>
                      ))}
                  </div>
                  )}
               </div>
            </div>
            )}
        </div>
            
        {/* Table */}
        <div className="w-full overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
           <div className="max-w-full overflow-x-auto">
                <table className="min-w-[1400px] w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-100/70 text-[11px] font-semibold text-slate-700">
                           <th className="p-5 text-left">Case ID</th>
                           <th className="p-5 text-left">Linked Alert</th>
                           <th className="p-5 text-left">Department</th>
                           <th className="p-5 text-center">Status</th>
                           <th className="p-5 text-left">Assigned To</th>
                           <th className="p-5 text-center">Severity</th>
                           <th className="p-5 text-left">Created</th>
                           <th className="p-5 text-left">Last Updated</th>
                           <th className="p-5 text-center">Evidence</th>
                           <th className="p-5 text-center">Action</th>
                       </tr>
                    </thead>

                   <tbody className="divide-y divide-gray-100 text-[11px] text-gray-600 dark:text-white">
                        {filteredCases.length > 0 ? (
                        filteredCases.map((item) => (

                       <tr key={item.id} className="border-b hover:bg-gray-50/50 transition-colors" >
                           <td className="p-5 font-medium text-gray-400 dark:text-white">
                              {item.id}
                          </td>

                          <td className="p-5 font-medium text-slate-700 dark:text-white">
                              {item.linkedAlert}
                          </td>

                          <td className="p-5 text-gray-500 dark:text-white">
                              {item.department}
                          </td>

                          <td className="p-5 text-center">
                              <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${
                                  STATUS_STYLES[item.status] }`} >
                                  {item.status}
                              </span>
                          </td>

                         <td className="p-5 text-gray-500 dark:text-white">
                              {item.assignedTo}
                         </td>

                         <td className="p-5 text-center">
                              <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${
                                  SEVERITY_STYLES[item.severity] }`}>
                                  {item.severity}
                              </span>
                          </td>

                          <td className="p-5">
                              {item.created}
                          </td>

                          <td className="p-5">
                              {item.lastUpdated}
                          </td>

                           <td className="p-5 text-center">
                                <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 font-medium dark:bg-gray-700">
                                    {item.evidenceCount}
                                </span>
                           </td>

                           <td className="p-5 align-middle text-center">
                               <button onClick={() => navigate(`/cases/${item.id}`)}
                                    className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 transition-colors">
                                    <Eye size={16} />
                                    Open
                               </button>
                           </td>
                        </tr>
                        ))
                       ) : (
                       <tr>
                           <td colSpan={10} className="p-10 text-center text-sm text-gray-500">
                              No matching cases found.
                           </td>
                      </tr>
                      )}
                   </tbody>
               </table>
            </div>
        </div>
     </div>
  );
}
    
