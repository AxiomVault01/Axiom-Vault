const stats=[
    {
        label:"Created",
        value:"2026-05-11"
    },

    {
       label:"Last Updated",
       value:"2026-05-11"
   },

   {
       label:"Assigned To",
       value:"Sarah Chen"
   },

   {
       label:"Evidence Items",
       value:"3"
   }
];

export default function InvestigationStats(){
    return(
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item)=>(
            <div key={item.label} className="rounded border p-2 bg-white">
                <p className="text-sm text-gray-600">
                    {item.label}
                </p>
                <h4 className="font-light text-sm">
                    {item.value}
                </h4>
           </div>
          ))}
       </div>
    )
}