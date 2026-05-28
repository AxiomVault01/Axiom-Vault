interface Props {
    status:string;
}

export default function StatusBadge({status}:Props){

const statusStyles= {
    Investigating:"bg-orange-100 text-orange-600",
    Escalated:"bg-red-100 text-red-600",
    "Under Review":"bg-purple-100 text-purple-600",
    New:"bg-blue-100 text-blue-600"
};

return(
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
      {status}
   </span>
)
}