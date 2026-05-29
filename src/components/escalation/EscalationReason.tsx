export default function EscalationReason(){

    return(
        <div>
            <h3 className="mb-3 font-medium">
                Escalation Reason
           </h3>
           <select className="w-full rounded-lg border border-stroke px-4 py-3 outline-none focus:border-primary">
                <option>Select a reason...</option>
                <option>High Financial Risk</option>
                <option>Fraud Escalation</option>
                <option>Compliance Review</option>
          </select>
       </div>
    )
}