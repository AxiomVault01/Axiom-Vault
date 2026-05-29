const entities=[
  
    {
        type:"Employee",
        name:"James Mitchell",
        role:"Procurement Officer",
        dept: "Procurement"
    },

    {
        type:"Vendor",
        name:"Acme Supplies",
        role:"VND-8847"
    },

    {
        type:"Approver",
        name:"Lisa Thompson",
        role:"Finance Manager",
        dept:"Finance"
    }
];

export default function RelatedEntities(){

    return(
            <div className="space-y-4">
                {entities.map((entity)=>(
                <div key={entity.name} className="rounded-lg border border-stroke bg-white p-3">
                    <p className="text-xs text-gray-600">
                        {entity.type}
                    </p>
                    <h4 className="font-medium">
                        {entity.name}
                    </h4>
                    <p className="text-sm text-gray-600 pt-1">
                        {entity.role}
                    </p>
                    
                    <p className="text-sm text-gray-600 pt-1">
                        {entity.dept}
                    </p>
               </div>
               ))}
           </div>
    )
}