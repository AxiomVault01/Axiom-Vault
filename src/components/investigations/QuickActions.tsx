import {Upload, Download, Share2} from "lucide-react";

export default function QuickActions(){

    return(
        <div className="rounded-lg border border-stroke bg-white p-6">
            <h3 className="-mt-2 text-sm font-semibold">Quick Actions</h3>
            <div className="space-y-3 mt-5">
                <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md
                        border border-stroke bg-gray-100 py-1 px-2 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark w-full">
                    <Upload size={16}/>
                    Upload Evidence
                </button>
                <button className="inline-flex items-center py-1 px-2 gap-2 whitespace-nowrap rounded-md
                        border border-stroke bg-gray-100  text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark w-full">
                    <Download size={16}/>
                    Export Report
                </button>
                <button className="inline-flex items-center py-1 px-2 gap-2 whitespace-nowrap rounded-md
                        border border-stroke bg-gray-100 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark w-full">
                    <Share2 size={16}/>
                    Share Report
              </button>
           </div>
        </div>
      
   )
}