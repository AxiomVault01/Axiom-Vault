const alerts = [
    {
        id:"ALT-2847",
        title:"Duplicate Payment",
        priority:"Critical",
        date:"2026-05-11 08:42"
   },

   {
        id:"ALT-2801",
        title:"Approval Pattern",
        priority:"Medium",
        date:"2026-05-10 14:22"
    }
];

export default function LinkedAlerts(){
    return(
       <div className="space-y-4">
            {alerts.map((alert)=>(
            <div key={alert.id} className="rounded-lg border border-stroke bg-white p-4">
                {/* TOP ROW */}
               <div className="flex items-start justify-between gap-2">
                    <div>
                        <h4 className="text-sm font-medium">
                            {alert.id}
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">
                           {alert.title}
                        </p>
                    </div>
                    {/* BADGE */}
                    <span className={`rounded px-4   text-xs ${alert.priority === "Critical" ? "bg-red-100 text-red-600 border border-red-500" : "bg-yellow-100 text-yellow-700 border border-yellow-600"}`}>
                        {alert.priority}
                    </span>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                    {alert.date}
                </p>
            </div>
        ))}
    </div>
   )
}