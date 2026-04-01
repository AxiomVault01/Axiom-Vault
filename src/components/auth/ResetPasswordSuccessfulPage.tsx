import { useState, useEffect } from "react";
import { Link } from "react-router";
import { CheckLineIcon } from "../../icons";
import logo from "../../../public/Logo.jpg";
import logob from "../../../public/AXIOM _VAULT_B.png";
import Button from "../ui/button/Button";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function ResetPasswordSuccessfulPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);
  return (
    <div  className="flex flex-col flex-1 w-full mx-auto overflow-hidden h-screen">
      <header>
        <div className="p-5">
          <img src={logo} style={lgImage} alt="Logo" className="dark:hidden" />
            <img src={logob} style={lgImage} alt="Logo" className="hidden dark:block" />
        </div>
     </header>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-8 px-50 rounded-lg shadow-xl">
            <div className="w-18 h-18 bg-white rounded-full flex mx-auto items-center justify-center shadow-xl -mt-20">
              <CheckLineIcon className="size-10 bg-brand-500 p-2 text-white rounded-full"></CheckLineIcon>

            </div>
            <h2 className="text-2xl font-bold mt-5 mb-4 text-center">Done!</h2>
            <p className="mb-6">Your password has been reset successfully!</p>
            <Link  to="/signin" className="text-sm ">
             <Button 
               onClick={() => setIsOpen(false)}
               className="flex items-center justify-center bg-brand-500 w-full text-white px-4 py-3 rounded-lg" >
                Okay
             </Button>
           </Link>
         </div>
        </div>
      )}
    </div>
 );
}