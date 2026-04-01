import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon, ChevronLeftIcon, CheckLineIcon, LockIcon } from "../../icons";
import logo from "../../../public/Logo.jpg";
import logob from "../../../public/AXIOM _VAULT_B.png";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  password: "",
  confirmPassword: "",
  });

  const [errors, setErrors] = useState({
  password: "",
  confirmPassword: "",

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  };

  const validateForm = () => {
  const newErrors = {
    password: "",
    confirmPassword: "",
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordPattern.test(formData.password)) {
    newErrors.password =
    "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
  }

  if (formData.password !== formData.confirmPassword) {
  newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);

  return !newErrors.password && !newErrors.confirmPassword;
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validateForm()) {
    console.log("Form submitted", formData);
    navigate("/reset-password-successful"); 
  }
 };

  return (
    <div  className="flex flex-col flex-1 w-full mx-auto">
      <header>
        <div className="p-5">
  
            <img src={logo} style={lgImage} alt="Logo" className="dark:hidden" />
            <img src={logob} style={lgImage} alt="Logo" className="hidden dark:block" />
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
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative w-full max-w-md">
                    <LockIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" ></LockIcon>
                    <Input className="w-full pl-10 pr-4 py-2" placeholder="Enter Your New Password" name="password" value={formData.password} onChange={handleChange}  required type={showPassword ? "text" : "password"}/>
                  </div>

                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                   {showPassword ? ( <EyeIcon className="fill-brand-500 dark:fill-brand-500 size-5" /> ) : (
                   <EyeCloseIcon className="fill-brand-500 dark:fill-brand-400 size-5" /> )}
                  </span>
               </div>
               {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

               <div className="relative">
                  <div className="relative w-full max-w-md">
                    <LockIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" ></LockIcon>
                    <Input className="w-full pl-10 pr-4 py-2" placeholder="Confirm Your New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required type={showPassword ? "text" : "password"}/>
                  </div>
                  
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? (<EyeIcon className="fill-brand-500 dark:fill-brand-500 size-5" />
                    ) : (<EyeCloseIcon className="fill-brand-500 dark:fill-brand-500 size-5" />
                    )}
                  </span>
               </div>
               {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
               
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
                  <Button type="submit"
                   className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                   size="sm">
                    Continue
                  </Button>
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