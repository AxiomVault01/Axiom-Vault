interface Props{
  priority:string;
}

export default function PriorityBadge({
  priority
}:Props){

const priorityStyles={
  Critical:"bg-red-100 text-red-600",

   High:"bg-orange-100 text-orange-600"
};

return(
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${priorityStyles[priority as keyof typeof priorityStyles]}`}>
       {priority}
   </span>
)

}