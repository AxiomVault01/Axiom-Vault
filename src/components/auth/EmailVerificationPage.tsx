import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ChevronLeftIcon, CheckLineIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import MainImg from "../../../public/Vault.jpg";
import Bicon from "../../../public/Brand Icon.jpg";


const bgImage = {
  backgroundImage: `url(${MainImg})`,
  minheight: "100vh",
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const BiImage = {
  width: "30.53px",
  height: "40px",
};


export default function EmailVerificationPage() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Validation for only numbers
      if (/^\d*$/.test(value)) {
      setCode(value);
      }
    };

    const validateCode = () => {
      const codePattern = /^\d{6}$/;

     if (!codePattern.test(code)) {
      setError("Verification code must be exactly 6 digits");
      return false;
      }

      setError("");
       return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCode()) {
      console.log("Code verified:", code);
      navigate("/signup");
    }
  };

  return (
    <div style={bgImage}>
        <div className="flex flex-col flex-1 w-full mx-auto">
           <div className="w-full max-w-md pt-10 mx-auto">
              <Link to="/welcome" className="inline-flex items-center text-sm text-white transition-colors hover:text-brand-200 dark:text-gray-200 dark:hover:text-gray-300">
                  <ChevronLeftIcon className="size-5" />
                  Back to Home
              </Link>
          </div>
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto mb-10">
               <div className="bg-white rounded-t-lg border dark:border-gray-300 dark:bg-gray-900 rounded-lg">
                   <div className="mb-5 sm:mb-4 p-8 bg-brand-500 rounded-t-lg">
                       <div className="w-12 h-12 mb-3 bg-white dark:bg-gray-900 p-1 rounded-lg mx-auto">
                           <img src={Bicon} style={BiImage} className="mx-auto" alt="Brand Icon" />
                       </div>
                       <h1 className="mb-2 font-semibold text-center text-white text-title-sm dark:text-white/90 sm:text-title-md">
                          Get Started
                       </h1>
                       <p className="text-sm text-brand-200 text-center dark:text-gray-200">
                         Verify your email address to begin registration.
                      </p>
                  </div>
                  <div className="p-5 pt-0">
                      <div className="px-2 md:px-4 py-1 mb-5 w-full mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border rounded-lg">
                          <div className="flex text-left gap-3">
                               <span className="mt-1 text-brand-500">

                               </span>
                               <span>
                                  <p className="text-black font-semibold dark:text-white">Check Your Email</p>
                                  <p className="text-gray-700 dark:text-gray-100">
                                     We sent a 6-digit verification code to <span className="text-black Pfont-semibold">janedoe@gmail.com</span> Didn't receive it? Check your spam folder or <Link to="" className="text-brand-500 font-semibold">try another email</Link>
                                  </p>
                              </span>
                          </div>
                      </div>
                       <form onSubmit={handleSubmit}>
                           <div className="space-y-4">
                               <div>
                                  <Label className="text-brand-800 dark:text-white/90">
                                      Email Verification Code
                                  </Label>
                                  <div className="relative w-full max-w-md">
                                      {/* <MailIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></MailIcon> */}
                                      <Input type="text" value={code} onChange={handleChange} maxLength={6} required placeholder="Enter the 6-digit code sent" className="w-full pl-10 pr-4 py-2 tracking-[0.5em]" />
                                    </div>
                                   {error && (
                                        <p className="text-red-500 text-sm">{error}</p>
                                    )}
                              </div>  
                          </div>
                          <div>
                               <Button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                                   size="sm">
                                   <CheckLineIcon></CheckLineIcon>
                                    Verify Code
                               </Button>
                          </div>
                       </form>
                       <div className="mt-6 flex justify-center">
                           <p className="text-sm font-normal text-brand-100 dark:text-gray-400 sm:text-start">
                              Already have an account ?
                          </p>
                      </div>
                      {/* <!-- Button --> */}
                      <div className="mt-6">
                           <Link to="/signin">
                              <Button className="flex items-center border border-gray-400 justify-center w-full px-4 py-3 text-sm font-medium transition rounded-lg shadow-theme-xs hover:bg-gray-200 dark:text-gray-200 dark:hover:text-gray-900">
                                  Sign In
                              </Button>
                          </Link>
                      </div>
                  </div>
              </div>
           </div>
      </div>
   </div>
  );
}