import { Check, MailOpen, X } from "lucide-react";
import { ReactNode } from "react";
import {Link} from "react-router";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  count?: string;
  change_mail?: string;
  actionlink?: ReactNode;
};

export default function MessageModal({
  isOpen,
  onClose,
  count,
  change_mail,
  actionlink,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="px-2 md:px-4 py-1 mb-5 w-full mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border rounded-lg relative">
      <div className=" text-left gap-3 fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 flex flex-col  text-left gap-4 p-6 bg-[#fff] dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border-2 rounded-lg shadow-lg ">
          <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200  rounded-full p-1">
            <X size={18} onClick={onClose} />
          </div>
          <span className="mt-3 m-auto text-green-700 bg-green-100 dark:text-white  dark:bg-blue-500/20 rounded-full p-2 w-max">
            <MailOpen className="size-10"></MailOpen>
          </span>
          <span>
            <p className="text-brand-500 font-semibold dark:text-white text-center mb-3 text-[20px]">
              Email Confirmation
            </p>
            <p
              className={`text-gray-700 dark:text-gray-100 text-center font-semibold text-xs`}
            >
              {count}{" "}
              <span className="text-black font-semibold dark:text-white ">
                janedoe@gmail.com,
                <br /> After receiving the email, copy the code provided to{" "}
                <br />
                continue your registration
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-100 text-center font-semibold text-xs mt-5">
              {change_mail} {actionlink}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

// SUCCESS MODAL 
export const SuccessMessageModal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;
  return (
    <div className="px-2 md:px-4 py-1 mb-5 w-full mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border  relative">
      <div className="text-left gap-3 fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 flex flex-col text-left gap-4 p-6 bg-[#fff] dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border-2 rounded-lg shadow-lg ">
          <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200  rounded-full p-1">
            <X size={18} onClick={onClose} />
          </div>
          <span className="mt-3 m-auto text-white bg-brand-500 dark:text-white  dark:bg-blue-500/20 rounded-full p-2 w-max">
            <Check className="size-10"></Check>
          </span>
          <h1 className="text-xl text-center mt-2 mb-2 font-medium text-brand-500 dark:text-white">Verified!</h1>
          <p className="text-xs text-center text-brand-500 dark:text-white">You have successfully verified your mail.<br /> complete your registration to continue. </p>
          <button type="button" onClick={onClose} className="text-sm bg-brand-500 text-white dark:bg-white dark:text-brand-500 m-auto w-fit px-5 py-2 rounded-lg font-medium">Ok</button>
        </div>
      </div>
    </div>
  );
};

// account creation successful modal
export const ErrorMessageModal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;
return (
  <div className="px-2 md:px-4 py-1 mb-5 mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border  relative">
    <div className="text-left gap-3 fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 flex flex-col text-left gap-4 p-6 bg-[#fff] dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border-2 rounded-lg shadow-lg max-w-100 ">
        <div className="absolute top-2 right-2 cursor-pointer text-brand-100  bg-brand-50 dark:text-gray-400 dark:hover:text-gray-200  rounded-full p-1">
          <X size={18} onClick={onClose} />
        </div>
        <span className="mt-3 m-auto text-white bg-brand-500 dark:text-white  dark:bg-blue-500/20 rounded-full p-2 w-max">
          <Check className="size-10" />
        </span>
        <h1 className="text-xl text-center mt-2 mb-2 font-medium text-brand-500 dark:text-white">
          Account Creation Successful!
        </h1>
        <p className="text-xs text-center text-brand-500 dark:text-white">
          Congratulations! your account has been successfully created. You can
          now proceed to the sign-in page.
        </p>
        <Link to="/signin">
          <button
            type="button"
            className="text-xs bg-brand-500 text-white dark:bg-white dark:text-brand-500 m-auto w-full px-5 py-3 rounded-full font-medium"
          >
            OK
          </button>
        </Link>
      </div>
    </div>
  </div>
);
}
