import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { InfoIcon, ChevronLeftIcon, MailIcon } from "../../icons";
import Logo from "../../../public/Logo.jpg";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function ForgotPasswordPage() {
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
          navigate("/verify-code"); 
          }
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
                      <div className="w-10 h-10 mb-3 mx-auto">
                          <InfoIcon className="size-10 text-brand-500"></InfoIcon>
                      </div>
                      <h3 className="mb-2 font-medium  text-center text-title-sm sm:text-title-md">
                          Forgot Password
                     </h3>
                     <p className="text-sm text-center">
                         Please enter the work email address associated with your account.
                     </p>
                  </div>

                  <div className="p-5">
                       <form onSubmit={handleSubmit}>
                          <div className="space-y-4">
                              <div className="relative w-full max-w-md">
                                  <MailIcon className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></MailIcon>
                                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Work Email Address" required className="w-full pl-10 pr-4 py-2" />
                              </div>
                              {errors.email && (
                                 <p className="text-red-500 text-sm">{errors.email}</p>
                               )}

                               <div>
                                    <Button type="submit" 
                                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                                      size="sm">
                                        {/* <Link to="/verify-code"> */}
                                          Continue
                                        {/* </Link> */}
                                    </Button>
                              </div>
                          </div>
                      </form>
                  </div>
                  <div className="text-center pb-5">
                       <Link
                          to="/signin"
                          className="inline-flex items-center text-sm ">
                          <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" />
                            Back to Sign In
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    );
}