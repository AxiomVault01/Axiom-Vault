import { Clock4} from "lucide-react";

const activities = [
   {
      title: "Evidence uploaded: Payment_Records.xlsx",
      time :"2 mins ago"
   },
 
   {
      title: "Comment added by Alex Rodriguez",
      time: "5 mins ago"
   },

   { 
      title: "Investigation note added", 
      time: "10 mins ago"
   },

   { 
      title: "Case assigned to sarah Chen", 
      time: "15 mins ago"
   },

   { 
      title: "Case created from alert ALT-2847",
      time: "20 mins ago"
   }
];

export default function ActivityLog(){

  return(
    <div className="rounded-lg border border-stroke bg-white py-5 px-2">
        <div className="flex gap-2 items-center -mt-2">
            <Clock4 size={14}/>
            <h3 className="text-sm font-semibold">Activity Log</h3>
       </div>
       
       <div className="space-y-4 mt-2">
            {activities.map((activity,index)=>(
            <div key={index} className="flex gap-3">
                <div key={index} className="flex gap-3">
                    {/* LEFT SIDE */}
                    <div className="relative flex flex-col items-center">
                       {/* BULLET */}
                      <div className="z-10 mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 "></div>
                           {/* VERTICAL LINE */}
                           {index !== activities.length - 1 && (
                           <div className="absolute top-3 h-25 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                      </div>
                      {/* RIGHT SIDE */}
                      <div >
                           <p className="text-xs leading-5">
                              {activity.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                               {activity.time}
                          </p>
                      </div>
                   </div>
               </div>
             ))}
           </div>
        </div>
   )
}



