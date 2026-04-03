import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon, UserIcon, LockIcon} from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Checkbox from "../form/input/Checkbox";
import MainImg from "../../../public/Vault.jpg";
import Bicon from "../../../public/Brand Icon.jpg";
import Biconw from "../../../public/AXIOM_VAULT_c.png";
import { SuccessMessageModal, ErrorMessageModal } from "../shared/MessageModal";


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

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // const navigate = useNavigate();

   const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      setIsOpen(true);
  }, []);
  
  const [formData, setFormData] = useState({
  fullName: "",
  password: "",
  confirmPassword: "",
  });

  const [errors, setErrors] = useState({
  fullName: "",
  password: "",
  confirmPassword: "",
  checkbox: "",

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  };

  const validateForm = () => {
  const newErrors = {
    fullName: "",
    password: "",
    confirmPassword: "",
    checkbox: "",
  };

  const fullNamePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  } else if (!fullNamePattern.test(formData.fullName.trim())) {
    newErrors.fullName = "Please enter your first, middle and last name, letters only";
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordPattern.test(formData.password)) {
    newErrors.password =
    "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
  }

  if (formData.password !== formData.confirmPassword) {
  newErrors.confirmPassword = "Passwords do not match";
  }

  if (!isChecked) {
    newErrors.checkbox =
    "You must agree to the Terms & Conditions and Privacy Policy, and confirm government or institutional official use before creating an account.";
  }

  setErrors(newErrors);

  return Object.values(newErrors).every((error) => error === "");

 };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    console.log("Form submitted", formData);
      setIsOpen(true);
   }
  };

  return (
    <div style={bgImage}>
      <div className="flex flex-col flex-1 w-full mx-auto overflow-y-auto lg:w-1/2 no-scrollbar">
        <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-white transition-colors hover:text-brand-200 dark:text-gray-200 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon className="size-5" />
            Back to Home
          </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto mb-10">
          <div className="bg-white rounded-t-lg dark:border-gray-800 dark:bg-gray-900 rounded-lg">
            <div className="mb-5 sm:mb-3 p-8 bg-brand-500 rounded-t-lg">
              <div className="w-12 h-12 mb-3 bg-white dark:bg-gray-900 rounded-lg mx-auto p-1">
               <img src={Bicon} style={BiImage} className="mx-auto dark:hidden" alt="Brand Icon" />
              <img src={Biconw} style={BiImage} className="mx-auto hidden dark:block" alt="Brand Icon" />
              </div>

              <h1 className="mb-2 font-semibold text-center text-white text-title-sm dark:text-white/90 sm:text-title-md">
                Create Your Account
              </h1>
              <p className="text-sm text-brand-200 text-center dark:text-gray-200">
                Start Protecting your organization from fraud today
              </p>
            </div>
            <div className="p-5">
              {/* email verified modal */}
              <div className="">
                <SuccessMessageModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
             </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="sm:col-span-1">
                    <Label className="text-brand-800 dark:text-white/90">
                      Full Name
                    </Label>
                    <div className="relative w-full max-w-md">
                      <UserIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></UserIcon>
                      <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}  placeholder="First & Last Name" required className="w-full pl-10 pr-4 py-2" />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Label className="text-brand-800 dark:text-white/90">
                        Organization
                      </Label>
                      <Input
                        type="text"
                        id="org"
                        name="org"
                        placeholder="Agency Name"
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <Label className="text-brand-800 dark:text-white/90">
                        Department
                      </Label>
                      <select
                        name="dept"
                        id="dept"
                        required
                        className="w-full px-2 py-3 border border-gray-300 dark:border-gray-600 dark:text-gray-200 text-sm rounded-lg focus:outline-none focus:dark:bg-gray-900 focus:dark:text-white"
                      >
                        <option value="">Select</option>
                        <option value="internal audit">Internal Audit</option>
                        <option value="finance">Finance</option>
                        <option value="compliance">Compliance</option>
                        <option value="risk management">Risk Management</option>
                        <option value="human resources">Human Resources</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-brand-800">Password</Label>
                    <div className="relative">
                      <div className="relative w-full max-w-md">
                        <LockIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" ></LockIcon>
                        <Input className="w-full pl-10 pr-4 py-2" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"} />
                     </div>
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-brand-800">
                      Re-enter your password
                    </Label>
                    <div className="relative">
                      <div className="relative w-full max-w-md">
                        <LockIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" ></LockIcon>
                        <Input className="w-full pl-10 pr-4 py-2" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm Your Password"
                        type={showPassword ? "text" : "password"} />
                     </div>
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 p-2 bg-brand-50 border-1 border-brand-700 rounded-lg dark:border-gray-800 dark:bg-white/[0.1]">
                    <Checkbox
                      className="w-5 h-5"
                      checked={isChecked}
                      onChange={setIsChecked}
                    />
                    <p className="inline-block font-normal text-sm text-brand-800 dark:text-gray-400">
                      I agree to the{" "}
                      <span className="text-error-500 dark:text-error-500">
                        <Link to="/">Terms and Conditions,</Link>
                      </span>{" "}
                      and{" "}
                      <span className="text-error-500 dark:text-error-500">
                        <Link to="/">Privacy Policy </Link>
                      </span>{" "}
                      and confirm that this account is for official government
                      or institutional use.
                    </p>
                  </div>
                  {errors.checkbox && (
                    <p className="text-red-500 text-sm ml-8">{errors.checkbox}</p>
                  )}
                  <div>
                   <Button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6">
                     Create Account
                   </Button>
                    
                    {isOpen && <ErrorMessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
                  </div>
                </div>
              </form>

              <div className="mt-4 flex justify-center">
                <p className="text-sm font-normal text-brand-100 dark:text-gray-400 sm:text-start">
                  Already have an account? {""}
                </p>
              </div>
              <div className="mt-4">
                
                  <Link to="/signin">
                    <Button  className="flex items-center border border-gray-400 justify-center w-full px-4 py-3 text-sm font-medium transition rounded-lg shadow-theme-xs hover:bg-gray-200 hover:border-gray-400 dark:hover:text-gray-900 dark:text-gray-100">
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
