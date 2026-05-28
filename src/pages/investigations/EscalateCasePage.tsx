import CaseSummary from "../../components/escalation/CaseSummary";
import EscalationReason from "../../components/escalation/EscalationReason";
import EscalateTo from "../../components/escalation/EscalateTo";
import PrioritySelector from "../../components/escalation/PrioritySelector";
import EscalationNotes from "../../components/escalation/EscalationNotes";
import SupportingDocuments from "../../components/escalation/SupportingDocuments";
import EscalationActions from "../../components/escalation/EscalationActions";
import { useState } from "react";
import EscalationSuccessModal from "../../components/escalation/EscalationSuccessModal";
import { useNavigate } from "react-router";

export default function EscalateCasePage(){
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

   return( 
        <div className="space-y-6">
            {/* HEADER */}
            <div>
               <h1 className="text-xl font-medium">
                    Escalate Case
               </h1>
               <p className="text-gray-600">
                    Transfer this investigation to a higher authority
                    or specialized department.
               </p>
           </div>
           {/* MAIN CARD */}
            <div className="space-y-8">
                <CaseSummary/>
            </div>
            <div className="space-y-8 rounded-xl border border-stroke bg-white p-6 shadow-sm">
               <EscalationReason/>

               <EscalateTo/>

               <PrioritySelector/>

               <EscalationNotes/>

               <SupportingDocuments/>
            </div>
            <EscalationActions onEscalate = {() => setShowSuccessModal(true)}/>

            <EscalationSuccessModal isOpen={showSuccessModal} onClose={() => { document.body.style.overflow = "";
                setShowSuccessModal(false);
                navigate("/investigations");}}
            />
        </div>
   )
}