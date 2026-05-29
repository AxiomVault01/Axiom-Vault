export default function EscalationNotes(){

    return(
        <div>
           <h3 className="mb-3 font-medium">
                Escalation Notes
           </h3>
           <textarea rows={6} placeholder="Provide detailed context about why this case requires escalation..."
           className="w-full rounded-lg border border-stroke p-4 outline-none focus:border-primary"/>
        </div>
    )
}