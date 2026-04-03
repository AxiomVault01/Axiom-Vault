import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ChevronLeftIcon, CheckLineIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import MainImg from "../../../public/Vault.jpg";
import Bicon from "../../../public/Brand Icon.jpg";
import Biconw from "../../../public/AXIOM_VAULT_c.png";
import MessageModal from "../shared/MessageModal";


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
    const [code, setCode] = useState<string[]>(['','','','','','']);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
   

     const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
}, []);

    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
      if (/^\d$/.test(value) || value === '') {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handleResend = () => {
      setTimeLeft(60);
      // TODO: Call API to resend OTP
      console.log("Resend OTP requested");
    };

    const validateCode = () => {
      if (code.some(d => d === '')) {
        setError("Please enter all 6 digits");
        return false;
      }
      setError("");
      return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCode()) {
      console.log("Code verified:", code.join(''));
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
                           <img src={Bicon} style={BiImage} className="mx-auto dark:hidden" alt="Brand Icon" />
                           <img src={Biconw} style={BiImage} className="mx-auto hidden dark:block" alt="Brand Icon" />
                       </div>
                       <h1 className="mb-2 font-semibold text-center text-white text-title-sm dark:text-white/90 sm:text-title-md">
                          Get Started
                       </h1>
                       <p className="text-sm text-brand-200 text-center dark:text-gray-200">
                         Verify your email address to begin registration.
                      </p>
                  </div>
                  <div className="p-5 pt-0">
                      <div className="">
                         <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} count="We sent a 6-digit verification code to" />
                      </div>
                       <form onSubmit={handleSubmit}>
                           <div className="space-y-4">
                               <div>
                                  <Label className="text-brand-800 dark:text-white/90">
                                      Email Verification Code
                                  </Label>
                                  <div className="flex gap-2 justify-center">
                                    {code.map((digit, index) => (
                                      <Input
                                        key={index}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleInputChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        maxLength={1}
                                        required
                                        className="w-12 text-center"
                                        ref={(el) => { if (el) inputRefs.current[index] = el; }}
                                      />
                                    ))}
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
                          <div className="text-center mt-3">
                             <p className="dark:text-white text-brand-500">
                              {timeLeft > 0 ? `Resend in ${timeLeft} seconds` : <button onClick={handleResend} className="text-brand-500 font-semibold cursor-pointer dark:text-white">Resend Code</button>}
                             </p>
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