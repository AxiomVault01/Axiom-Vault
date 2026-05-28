import {Paperclip, FileText, Upload} from "lucide-react";

const files = [
    {
       name:"Invoice_INV-2024-8847.pdf",
       size:"342 KB",
       date:"System • 2026-05-11 08:42"
    },

    {
       name:"Payment_Records.xlsx",
       size:"342 KB",
       date:"Sarah Chen • 2026-05-11 10:15"
    },

    {
       name:"Approval_Chain.pdf",
       size:"15 KB",
       date:"Sarah • 2026-05-11 08:42"
    }
];

export default function EvidenceDocuments(){
    return(
        <div className="rounded-lg border border-stroke bg-white p-4">
            <div className="flex gap-2 items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded p-2 bg-blue-50 flex-shrink-0">
                    <Paperclip size={16} className="text-primary"/>
                </div>
                <div>
                   <h3 className=" font-semibold">
                       Evidence & Documents
                   </h3>
                   <p className="text-xs text-gray-600">
                        3 files attached
                   </p>
                </div>
                <div className="ml-auto">
                   <button className="flex items-center gap-2 rounded-md bg-brand-500 px-2 py-1 text-white">
                      <Upload size={16}/>
                      Upload File
                   </button>
               </div>
            </div>
            <div className="space-y-3">
                {files.map((file)=>(
                <div key={file.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <FileText size={30} className="text-red-500"/>
                        <div>
                            <h4 className="text-sm font-medium">
                               {file.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                                {file.size}
                            </p>
                            <p className="text-xs text-gray-600">
                                {file.date}
                            </p>
                       </div>
                   </div>
               </div>
              ))}
            </div>
        </div>
    )
}