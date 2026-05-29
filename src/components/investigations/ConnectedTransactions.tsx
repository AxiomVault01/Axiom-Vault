const transactions=[
    {
        id:"TXN-88471",
        amount:"$42,350",
        status:"Completed",
        date:"2026-05-11 08:42"
    },

   {
        id:"TXN-88472",
        amount:"$42,350",
        status:"Completed",
        date:"2026-05-11 09:15"
    }
];

export default function ConnectedTransactions(){
    return(
        <div className="space-y-4">
            {transactions.map((transaction)=>(
            <div key={transaction.id} className="rounded-lg border border-stroke bg-white p-4">
                {/* TOP ROW */}
                <div className="flex items-start justify-between">
                    <h4 className="font-normal text-sm">
                        {transaction.id}
                    </h4>
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                        {transaction.status}
                   </span>
                </div>
                {/* AMOUNT */}
                <h3 className="mt-3 text-sm font-medium">
                    {transaction.amount}
                </h3>
                {/* DATE */}
                <p className="mt-2 text-xs text-gray-600">
                    {transaction.date}
                </p>
           </div>
          ))}
        </div>
   )
}