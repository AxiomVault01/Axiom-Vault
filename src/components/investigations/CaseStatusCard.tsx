
export default function CaseStatusCard(){
   return(
        <div className="rounded-lg border border-stroke bg-white p-4">
            <h3 className="-mt-2 font-semibold">
                Case Status
            </h3>
          <div className="space-y-4">
              <div className="pt-4">
                   <p className="text-xs mt-1 text-gray-600">
                       Current Status
                   </p>
                   <h4 className="text-sm">Investigation Ongoing</h4>
              </div>
               <div className="bg-gray-100 py-0 px-2 rounded">
                   <p className="text-xs text-gray-600">
                       Priority Level
                    </p>
                    <h4 className="text-sm">Critical</h4>
               </div>
               <div className="bg-gray-100 py-0 px-2 rounded">
                   <p className="text-xs text-gray-600">
                       Days Open
                    </p>
                    <h4 className="text-sm">0 Days</h4>
               </div>
           </div>
   </div>
   )
}