import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "../../icons";
import Logo from "../../../public/Logo.jpg";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function VerifyCodePage() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Handling OTP input changes
    const handleChange = (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return; 

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
     }
   };

   //    Handling Backspace for OTP inputs
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
     }
    };

    // Validating OTP
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const code = otp.join("");

      if (code.length !== 4) {
        setError("Please enter the complete 4-digit code");
       return;
    }
 
    setError("");

    console.log("OTP Verified:", code);

    navigate("/reset-password");
   };

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
                          Verify Code
                     </h3>
                     <p className="text-sm text-center">
                         Please enter the code we have just sent to your email.
                     </p>
                  </div>

                  <div className="p-5">
                      <form  onSubmit={handleSubmit}>
                           <div className="space-y-4">
                               <div className="flex flex-nowrap gap-3">
                                   {otp.map((digit, index) => (
                                      <Input
                                            key={index}
                                            type="text"
                                            value={digit}
                                            maxLength={1}
                                            inputMode="numeric"
                                            className="w-[66px] h-[66px] rounded-lg text-center text-xl font-semibold"
                                            onChange={(e) => handleChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            ref={(el) => {inputsRef.current[index] = el;}}
                                        />
                                      ))
                                    }
                              </div> 
                              {error && (
                                  <p className="text-red-500 text-sm text-center">{error}</p>
                               )}
                              
                              <div className="text-center">
                                  <p>Didn't recieve OTP ?</p>
                                  <button className="text-brand-500 mt-5 text-sm">Resend OTP</button>
                               </div>
                              <div>
                                   <Button type="submit"
                                       className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs"
                                       size="sm">
                                       Verify
                                  </Button>
                               </div>
                          </div>
                       </form>
                  </div>
                  <div className="text-center pb-5">
                       <Link
                          to="/forgot-password"
                          className="inline-flex items-center text-sm ">
                          <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" />
                            Back
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    );
}