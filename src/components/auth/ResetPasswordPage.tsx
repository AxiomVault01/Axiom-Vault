import { useState } from "react";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon, ChevronLeftIcon, CheckLineIcon } from "../../icons";
import Logo from "../../../public/Logo.jpg";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div  className="flex flex-col flex-1 w-full mx-auto">
      <header>
        <div className="p-5">
         <img src={Logo} style={lgImage} alt="Logo" />
        </div>
      </header>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto mb-10 p-5">
        <div className="bg-white rounded-lg border-2 border-brand-500">
          <div className="mb-5 sm:mb-4 p-8 rounded-t-lg">
            <h3 className="mb-2 font-medium  text-center text-title-sm sm:text-title-md">
              Reset Password
            </h3>
            <p className="text-sm text-center">
              Your new password must be different from previously used password.
            </p>
          </div>

         <div className="p-5">
            <form action="">
              <div className="space-y-4">
                <div className="relative">
                  <Input placeholder="New Password" type={showPassword ? "text" : "password"}/>
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                   {showPassword ? ( <EyeIcon className="fill-brand-500 dark:fill-brand-500 size-5" /> ) : (
                   <EyeCloseIcon className="fill-brand-500 dark:fill-brand-400 size-5" /> )}
                  </span>
               </div>

               <div className="relative">
                  <Input placeholder="Confirm New Password" type={showPassword ? "text" : "password"}/>
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? (<EyeIcon className="fill-brand-500 dark:fill-brand-500 size-5" />
                    ) : (<EyeCloseIcon className="fill-brand-500 dark:fill-brand-500 size-5" />
                    )}
                  </span>
               </div>
               
               <div>
                 <p>Your password must contain</p>
                 <div className="flex gap-2">
                    <CheckLineIcon className="text-brand-500 dark:text-brand-500 size-4 mt-1"></CheckLineIcon>
                    <p>8 or more characters</p>
                 </div>
                 <div className="flex gap-2">
                    <CheckLineIcon className="text-brand-500 dark:text-brand-500 size-4 mt-1"></CheckLineIcon>
                    <p>Numbers</p>
                 </div>
                 <div className="flex gap-2">
                    <CheckLineIcon className="text-brand-500 dark:text-brand-500 size-4 mt-1"></CheckLineIcon>
                    <p>Upper case and Lower case letters</p>
                  </div>
                  <div className="flex gap-2">
                    <CheckLineIcon className="text-brand-500 dark:text-brand-500 size-4 mt-1"></CheckLineIcon>
                    <p>Special Character</p>
                  </div>
               </div>

               <div>
                  <Link to="/reset-password-successful">
                    <Button
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                      size="sm">
                     Continue
                   </Button>
                 </Link>
               </div>
             </div>
            </form>
          </div>
          <div className="text-center pb-5">
            <Link to="/verify-code" className="inline-flex items-center text-sm ">
              <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" />
              Back
            </Link>
         </div>
       </div>
     </div>
   </div>
  );
}