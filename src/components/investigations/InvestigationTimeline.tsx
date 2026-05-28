import { Clock4, FileText, CircleCheck, NotepadText, UserRoundCog, OctagonAlert} from "lucide-react";

const timeline=[
    {
        title:"Investigation Timline",
        description:"Complete audit trail of case activities",

        icon: Clock4,

        investigator:"Sarah Chen",
        initials:"SC",
        date:"May 24, 2026 • 10:30 AM"
    },

   {
       title:"Evidence uploaded",
       description:"Payment records spreadsheet added to investigation",

       icon: FileText,

       investigator:"Alex Rodriguez",
       initials:"AR",
       date:"May 24, 2026 • 11:45 AM"
    },

    {
        title:"Vendor contacted",
        description:"Confirmed only one invoice issued - duplicate payment identified",

        icon: CircleCheck,

        investigator:"Sarah Chen",
        initials:"SC",
        date:"May 24, 2026 • 01:15 PM"
    },

    {
        title:"Investigation note added",
        description:"Checking approval bypass controls in payment system",
        
        icon: NotepadText,

        investigator:"Emily Johnson",
        initials:"EJ",
        date:"May 24, 2026 • 03:20 PM"
    },

    {
        title:"Case assigned",
        description:"Investigation assigned to senior investigator",
        icon: UserRoundCog,

        investigator:"System",
        initials:"SC",
        date:"May 24, 2026 • 09:00 AM"
    },

    {
        title:"Case created",
        description:"Investigation case opened from critical alert ALT-2847",
        icon: OctagonAlert,

        investigator:"System",
        initials:"SC",
        date:"May 24, 2026 • 08:00 AM"
    }
];


export default function InvestigationTimeline(){
  
  return(
       <div  className="rounded-lg border border-stroke bg-white p-4">
            <div className="space-y-8">
                {timeline.map((item,index)=>{
                    const Icon=item.icon;
                   return(
                        <div key={index} className="flex gap-4">
                            {/* left side icon */}
                            <div className="flex h-8 w-8 items-center justify-center rounded p-2 bg-blue-50 flex-shrink-0">
                               <Icon size={16} className="text-primary"/>
                            </div>
                            {/* right content */}
                            <div className="flex-1">
                               <h4 className="text-sm font-medium">
                                    {item.title}
                               </h4>
                               <p className="mt-1 text-xs text-gray-600">
                                    {item.description}
                              </p>
                              {/* investigator row */}
                              <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                                            {item.initials}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600">
                                                {item.investigator}
                                           </p>
                                        </div>
                                   </div>
                                   <p className="text-xs text-gray-500">
                                        {item.date}
                                  </p>
                                </div>
                           </div>
                       </div>
                    )
               })}
            </div>
       </div>
    )
}
