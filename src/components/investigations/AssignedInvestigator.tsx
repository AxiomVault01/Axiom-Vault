export default function AssignedInvestigator() {
  return (
       <div className="rounded-lg border border-stroke bg-white p-6">
            <h3 className="-mt-2 text-sm font-semibold">Assigned Investigator</h3>
            <div className="bg-gray-50 p-2 rounded-lg mt-4 border">
                <div className="flex gap-3 items-center">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                      sc
                  </div>
                  <div>
                      <h4 className="text-xs">
                          Sarah Chen
                      </h4>
                      <p className="text-xs text-gray-600">
                          Senior Investigator
                      </p>
                  </div>
                </div>
                <button className="mt-8 w-full rounded-lg border py-1 text-xs hover:bg-gray-50">
                    Reassign Case
                </button>
            </div>
      </div>
   );
}