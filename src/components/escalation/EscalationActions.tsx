interface EscalationActionsProps {

  onEscalate: () => void;

}
export default function EscalationActions({
    onEscalate,

}: EscalationActionsProps) {

  return (
       <div className="flex justify-end gap-4">
            <button onClick={onEscalate} className="rounded-lg bg-brand-500 px-4 py-1 text-white">
               Escalate Case
            </button>
            <button className="rounded-lg border text-orange-500 border-orange-500 px-4 py-1">
                Cancel
           </button>
       </div>
   );
}