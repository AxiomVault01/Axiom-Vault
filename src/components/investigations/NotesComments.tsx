import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function NotesComments(){
    const [comment,setComment]=useState("");

    return(
        <div className="rounded-lg border border-stroke bg-white p-6">
            <div className="flex gap-2 items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded p-2 bg-blue-50 flex-shrink-0">
                    <MessageSquare size={16} className="text-primary"/>
                </div>
                <div>
                    <h3 className=" font-semibold">
                       Investigation Notes & Comments
                    </h3>
                    <p className="text-xs text-gray-600">
                        Internal Collaborations and findings
                    </p>
                </div>
            </div>
            <div className="space-y-4">
                <div  className="rounded-lg bg-gray-50 p-2">
                    <div className="flex gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 bg-gray-200 flex-shrink-0">
                            SC
                        </div>
                        <h4 className="mt-1 text-sm font-medium">
                           Sarah Chen
                        </h4>
                   </div>
                    <p className="mt-2 text-xs">
                        Both payments approved by same officer.
                        Checking approval bypass controls.
                    </p>
               </div>
               <div className="rounded-lg bg-gray-50 p-2">
                   <div className="flex gap-2">
                       <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 bg-gray-200 flex-shrink-0">
                            AR
                       </div>
                       <h4 className="mt-1 text-sm font-medium">
                          Alex Rodriguez
                       </h4>
                    </div>
                    <p className="mt-2 text-xs">
                        Vendor confirmed only one invoice
                        was issued. Investigating payment processing.
                    </p>
               </div>
               <textarea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Add investigation comment..."
                    className="w-full rounded-lg border p-3 outline-none focus:border-primary"
                />
               <button className="flex ml-auto rounded-lg bg-brand-500 px-4 py-1 text-white">
                    Add Comment
               </button>
           </div>
        </div>
   )
}