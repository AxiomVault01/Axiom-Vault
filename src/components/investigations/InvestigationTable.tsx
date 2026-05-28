import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import { useNavigate } from "react-router";

interface Investigation {
   id:string;
   title:string;
   status:string;
   assignedTo:string;
   priority:string;
   created:string;
   updated:string;
   evidence:string;
}

interface Props{
  data:Investigation[]
}

export default function InvestigationTable({
  data
}:Props){
    
const navigate = useNavigate();

return(
    <div className="w-full overflow-hidden rounded-xl border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
     <div className="max-w-full overflow-x-auto">
        <table className="min-w-300 w-full">
           <thead>
              <tr className="bg-gray-100/70 border-b border-gray-100 text-[11px] font-semibold text-slate-700">
                  <th className="p-5 text-left"> Case Id</th>
                  <th className="p-5 text-left"> Investigation Title</th>
                  <th className="p-5 text-center"> Status</th>
                  <th className="p-5 text-left">Assigned To</th>
                  <th className="p-5 text-left">Priority</th>
                  <th className="p-5 text-left">Created</th>
                  <th className="p-5 text-left">Last Updated</th>
                  <th className="p-5 text-left">Evidence</th>
                  <th className="p-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[11px] text-gray-600 dark:text-white">
                {data.map((item)=>(
              <tr key={item.id} className="border-b hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 text-gray-400 font-medium dark:text-white">{item.id}</td>
                  <td className="max-w-62.5 break-words p-5 font-medium text-slate-700 dark:text-white">{item.title}</td>
                  <td className="p-5 text-center"><StatusBadge status={item.status}/></td>
                  <td className="p-5 text-gray-500 dark:text-white">{item.assignedTo}</td>
                  <td className="p-5 text-center"><PriorityBadge priority={item.priority}/></td>
                  <td className="p-5">{item.created}</td>
                  <td className="p-5">{item.updated}</td>
                  <td className="p-5">{item.evidence}</td>
                  <td className="p-5 align-middle">
                      <button onClick={()=>navigate(`/investigations/${item.id}`)}
                          className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-blue-600">
                          <Eye size={16}/>
                          Open
                      </button>
                   </td>
                </tr>))}
         </tbody>
      </table>
     </div>
   </div>
);
}