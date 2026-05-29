const priorities=[    
    "Low",
    "Medium",
    "High",
    "Critical"
];

export default function PrioritySelector(){

    return(
        <div>
            <h3 className="mb-4 font-medium">
                Priority Level
            </h3>
            <div className="flex gap-3">
                {priorities.map((priority)=>(
                <button key={priority}className="rounded-lg border px-4 py-2 text-sm hover:border-primary">
                    {priority}
                </button>
            ))}
       </div>
   </div>
)
}