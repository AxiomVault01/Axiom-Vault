import { Share2, Download} from "lucide-react";
import { useNavigate } from "react-router";

export default function InvestigationHeader(){
    const navigate = useNavigate();

    return(
        <div>
            <div className="flex flex-wrap justify-between gap-4">
                <div>
                    <div className="flex gap-2">
                        <span className="rounded-md bg-orange-100 px-2 py-1 text-xs text-orange-600">
                           Investigating
                        </span>
                        <span className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-600">
                          Critical
                       </span>
                   </div>
               </div>
               <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md
                        border border-stroke bg-white px-2 py-1 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark">
                        <Share2 size={14}/>
                        Share
                   </button>
                   <button className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md
                        border border-stroke bg-white px-2 py-1 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark">
                       <Download size={16}/>
                       Export Report
                   </button>
                   <button onClick={() =>navigate("/investigations/escalate") } className="rounded-md border border-stroke bg-brand-500 text-white px-2 py-1 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark">
                        Escalate Case
                   </button>
                   <button className="rounded-md border border-orange-500 text-orange-500 bg-white px-2 py-1 text-sm font-medium flex-shrink-0
                        dark:border-strokedark dark:bg-boxdark">
                       Close Case
                   </button>
               </div>
           </div>
           <div>
               <h1 className="mt-4 text-lg font-medium">
                  CASE-2847
              </h1>
              <p className="text-gray-500 text-sm">
                  Duplicate Payment Investigation-Acme supplies
              </p> 
            </div>
       </div> 
    )
}