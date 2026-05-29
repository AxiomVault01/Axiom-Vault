import { OctagonAlert } from "lucide-react";
export default function AiSummary(){
   return(
       <div className="rounded-lg border border-stroke bg-white p-4">
           <div className="flex gap-2 items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded p-2 bg-blue-50 flex-shrink-0">
                    <OctagonAlert size={16} className="text-primary"/>
                </div>
                <div>
                    <h3 className=" font-semibold">
                       AI Investigation Summary
                    </h3>
                    <p className="text-xs text-gray-600">
                        Automated analysis and recommendations.
                    </p>
                </div>
            </div>

            <p className="mb-5 text-sm leading-6 text-gray-600">
               Analysis identified duplicate payment
               pattern with 98% confidence.
               
               Both transactions share identical invoice
               numbers, amounts and approval chains.

               Payment processing occurred through
               different batch systems, bypassing duplicate detection controls.
           </p>
           
           <div className="rounded-xl border bg-blue-50 border-blue-200 text-blue-400 p-4">
               <h4 className="mb-3 text-sm font-medium">
                   Recommended Actions
               </h4>
               <ul className="space-y-2 text-sm">
                    <li>
                      • Verify vendor account for fraud processing
                    </li>

                    <li>
                        • Review approval workflow
                    </li>

                    <li>
                      • Audit payment batch controls
                    </li>

                    <li>
                        • Check for similar patterns
                    </li>
              </ul>
          </div>
       </div>
    )
}