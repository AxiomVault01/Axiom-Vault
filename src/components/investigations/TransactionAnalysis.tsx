import { DollarSign } from "lucide-react";
export default function TransactionAnalysis(){
    return(
        <div className="rounded-lg border border-stroke bg-white p-4">
            <div className="flex gap-2 items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded p-2 bg-blue-50 flex-shrink-0">
                    <DollarSign size={16} className="text-primary"/>
                </div>
                <div>
                    <h3 className=" font-semibold">
                       Transaction Analysis
                    </h3>
                    <p className="text-xs text-gray-600">
                        Financial Impact Patterns
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border p-3 bg-gray-100">
                    <p className="text-xs text-gray-600">
                        Total Exposure
                    </p>
                    <h4 className="text-sm mt-2 font-medium">
                        $84,700
                    </h4>
                    <p className="text-xs mt-2 text-gray-600">
                        2 transactions
                    </p>
               </div>
               <div className="rounded-lg border p-3 bg-red-100">
                    <p className="text-xs text-red-400">
                        Duplicate Amount
                    </p>
                    <h4 className="text-sm mt-2 font-medium text-red-500">
                        $42,350
                    </h4>
                    <p className="text-xs mt-2 text-red-400">
                        Requires recovery
                    </p>
               </div>
               <div className="rounded-lg border p-3 bg-orange-100">
                    <p className="text-xs text-orange-500  ">
                        Risk Score
                    </p>
                    <h4 className="text-sm mt-2 font-medium text-orange-500">98%</h4>
                    <p className="text-xs mt-2 text-orange-500">
                        High Confidence
                    </p>
               </div>
           </div>
           <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 text-blue-400 p-4">
                <h4 className="mb-2 font-medium">
                    Pattern Detection
                </h4>
                <ul className="space-y-2 text-sm">
                    <li>
                       • Identical invoice numbers across both transactions.
                    </li>

                    <li>
                        • Same payment amount ($42,350.00).
                    </li>
                    <li>
                        • Processed through different payment batches.
                    </li>

                    <li>
                        • Approved by same procurement officer.
                    </li>
               </ul>
            </div>
        </div>
    )
}