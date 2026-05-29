const teams = [
   {
        name:"Legal Team",
        initials:"LT",
        color:"bg-blue-500"
   },

   {
        name:"Compliance",
        initials:"CO",
        color:"bg-purple-500"
   },

   {
        name:"Senior Investigator",
        initials:"SI",
        color:"bg-green-500"
    }
];

export default function EscalateTo(){
    return(
        <div>
            <h3 className="mb-4 font-medium">
                Escalate To
            </h3>
            <div className="flex flex-wrap gap-4">
                {teams.map((team)=>(
                <button key={team.name} className="flex items-center gap-3 rounded-lg border px-4 py-3 hover:border-primary">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${team.color}`}>
                       {team.initials}
                   </div>
                   <span className="text-sm">
                      {team.name}
                   </span>
              </button>
              ))}
           </div>
      </div>
   )
}