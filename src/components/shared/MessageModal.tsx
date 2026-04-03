import { KeyRound, X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  count?: string;
};

export default function MessageModal({isOpen, onClose, count} :ModalProps) {
    if(!isOpen) return null;
  return (
     <div className="px-2 md:px-4 py-1 mb-5 w-full mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border rounded-lg relative">
    <div className=" text-left gap-3 fixed inset-0 z-50 flex items-center justify-center">
         <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex flex-col  text-left gap-4 p-6 bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border-2 rounded-lg shadow-lg ">
          <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-brand-500/20 rounded-full p-1">
            <X size={18} onClick={onClose}/>
          </div>
          <span className="mt-1 text-brand-500 dark:text-white bg-brand-100 dark:bg-blue-500/20 rounded-full p-2 w-max">
            <KeyRound className="size-5"></KeyRound>
          </span>
          <span>
            <p className="text-black font-semibold dark:text-white text-center mb-3">
              Check Your Email
            </p>
            <p className={`text-gray-700 dark:text-gray-100 `}>
              {count} {" "}
              <span className="text-black font-semibold dark:text-white">
                janedoe@gmail.com
              </span>
            </p>
          </span>
      </div>
    </div>
   </div>
                         
                      
  );
}
