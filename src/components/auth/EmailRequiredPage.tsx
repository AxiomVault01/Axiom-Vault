import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ChevronLeftIcon, MailIcon, PaperPlaneIcon } from "../../icons";
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


export default function EmailRequiredPage() {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
     email: "",
    });
    
    // Error State
    const [errors, setErrors] = useState({
      email: "",
    });
    
    // Handling Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
    // Validating Function
      const validateForm = () => {
      const newErrors = {
        email: "",
    };

    // Email validation
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(formData.email)) {
       newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
      return !newErrors.email;
    };

    //  Submitting Handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       if (validateForm()) {
       console.log("Form submitted", formData);
      navigate("/email-verification"); 
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

                  <div className="p-5 pt-0 ">
                       <div className="px-2 md:px-4 py-1 mb-5 w-full mt-2 text-sm text-white bg-brand-50 dark:bg-blue-500/20 border-brand-700 dark:border-blue-400 border rounded-lg">
                          <div className="flex text-left gap-3">
                               <span className="mt-1 text-brand-500">
                                 <MailIcon className="w-5 h-5"></MailIcon>
                               </span>
                               <span>
                                  <p className="text-black font-semibold dark:text-white"> Email Verification Required</p>
                                  <p className="text-gray-700 dark:text-gray-100 font-light">
                                     We'll send a verification code to your email address to ensure security and authenticity.
                                  </p>
                              </span>
                          </div>
                      </div>

                       <form onSubmit={handleSubmit}>
                           <div className="space-y-4">
                                <Label className="text-brand-800 dark:text-white/90">
                                    Work Email Address
                                </Label>
                                <div className="relative w-full max-w-md">
                                    <MailIcon className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></MailIcon>
                                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="auditor@agency.gov" required className="w-full pl-10 pr-4 py-2" />
                              </div>
                                {errors.email && (
                                 <p className="text-red-500 text-sm">{errors.email}</p>
                               )}
                          </div>
                          <div>
                                <Button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                                    size="sm">
                                    <PaperPlaneIcon></PaperPlaneIcon>
                                    Send Verification Code
                                    {/* <Link to="/email-verification"></Link> */}
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
                              <Button className="flex items-center border border-gray-400 justify-center w-full px-4 py-3 text-sm font-medium transition rounded-lg shadow-theme-xs  dark:text-gray-200 dark:hover:text-gray-300">
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