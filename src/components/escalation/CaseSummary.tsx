export default function CaseSummary(){

   return(
       <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-medium">
                Case Summary
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <p className="text-sm text-gray-600">
                        Case ID
                    </p>
                   <h4 className="text-sm font-medium">
                        CASE-2847
                   </h4>
               </div>
               <div>
                    <p className="text-sm text-gray-600">
                        Employee Name
                    </p>
                    <h4 className="text-sm font-medium">
                        Sarah Martinez
                   </h4>
               </div>
               <div>
                    <p className="text-sm text-gray-600">
                        Department
                   </p>
                   <h4 className="text-sm font-medium">
                       Finance
                  </h4>
               </div>
               <div>
                    <p className="text-sm text-gray-600">
                        Risk Level
                    </p>
                    <span className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-600">
                        Critical
                   </span>
               </div>
               <div>
                    <p className="text-sm text-gray-600">
                        Assigned Investigator
                   </p>
                   <h4 className="text-sm font-medium">
                       Sarah Chen
                  </h4>
               </div>
               <div>
                    <p className="text-sm text-gray-600">
                        Status
                    </p>
                    <span className="rounded-md bg-purple-100 px-2 py-1 text-xs text-purple-600">
                        Under Review
                   </span>
               </div>
            </div>
       </div>
    )
}