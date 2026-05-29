import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
interface EscalationSuccessModalProps {

  isOpen: boolean;

  onClose: () => void;

}

export default function EscalationSuccessModal({

  isOpen,

  onClose,

}: EscalationSuccessModalProps) {
   if (!isOpen) return null;
   useEffect(() => {
       if (isOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
       };
    }, [isOpen]);

    return ( 
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 px-4">
            {/* MODAL CARD */}
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
                {/* SUCCESS ICON */}
                <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                       <CheckCircle2 size={25} className="text-white"/>
                   </div>
               </div>
                {/* TEXT */}
                <div className="mt-6 text-center">
                  <h2 className=" text-2xl font-medium">Success!</h2>
                    <p className="mt-3 text-sm text-gray-600 ">
                        Case successfully escalated.
                   </p>
               </div>
               {/* BUTTON */}
               <button onClick={onClose} className="mt-8 w-full rounded-lg text-sm bg-brand-500 py-1 font-medium text-white transition hover:opacity-90">
                  Close
               </button>
            </div>
       </div>
    ); 
}