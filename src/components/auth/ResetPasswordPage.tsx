import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon, ChevronLeftIcon } from "../../icons";
import logo from "../../../public/Logo.jpg";
import logob from "../../../public/AXIOM _VAULT_B.png";
import { ResetPassword } from "../../services/Axios";
import toast from "react-hot-toast";
import { Check, Loader, Lock } from "lucide-react";
import Bicon from "../../../public/Brand Icon.jpg";
import Biconw from "../../../public/AXIOM_VAULT_c.png";


const lgImage = {
  width: "175px",
  height: "45.4px",
};
const BiImage = {
  width: "30.53px",
  height: "40px",
};

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //  reset password logic
    try {
      const resetPassword = await ResetPassword();
      console.log(resetPassword, "API response");
      toast.success("Password reset successful you will be redirected to the login page");
      setTimeout(() => {
        if (validateForm()) {
          console.log("Form submitted", formData);
          navigate("/signin");
        }
      }, 4000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex flex-col flex-1 w-full mx-auto">
      <header>
        <div className="p-5">

          <img src={logo} style={lgImage} alt="Logo" className="dark:hidden" />
          <img src={logob} style={lgImage} alt="Logo" className="hidden dark:block" />
        </div>
      </header>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto mb-10 p-5">
        <div className="bg-white rounded-lg border-2 border-brand-500 dark:bg-gray-900 dark:border-white">
          <div className="w-12 h-12 mb-3 bg-white mt-5 dark:bg-gray-900 p-1 rounded-lg mx-auto">
            <img src={Bicon} style={BiImage} className="mx-auto dark:hidden" alt="Brand Icon" />
            <img src={Biconw} style={BiImage} className="mx-auto hidden dark:block" alt="Brand Icon" />
          </div>
          <div className=" p-5 rounded-t-lg">
            <h3 className="mb-2 font-medium  text-center text-title-sm sm:text-title-sm dark:text-white">
              Reset Password
            </h3>
            <p className="text-[10px] text-center dark:text-white">
              Your new password must be different from previously used password.
            </p>
          </div>

          <div className="p-5">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="relative w-full max-w-md">
                    <Lock className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none dark:text-gray-400 z-50" size={14} />
                    <Input className="w-full pl-10 pr-4 py-2" placeholder="Enter Your New Password" name="password" value={formData.password} onChange={handleChange} required type={showPassword ? "text" : "password"} />
                  </div>

                  <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showPassword ? (<EyeIcon className="fill-brand-500 dark:fill-brand-400 size-5" />) : (
                      <EyeCloseIcon className="fill-brand-500 dark:fill-brand-400 size-5" />)}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                <div className="relative">
                  <div className="relative w-full max-w-md">
                    <Lock className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none dark:text-gray-400 z-50" size={14} />
                    <Input className="w-full pl-10 pr-4 py-2" placeholder="Confirm Your New Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required type={showConfirmPassword ? "text" : "password"} />
                  </div>

                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                    {showConfirmPassword ? (<EyeIcon className="fill-brand-500 dark:fill-brand-400 z-50 size-5" />
                    ) : (<EyeCloseIcon className="fill-brand-500 dark:fill-brand-400 size-5" />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}

                <div className="text[10px] dark:text-white">
                  <p className="text-[13px] font-medium mb-2">Your password must contain</p>
                  <div className="flex gap-2">
                    <Check className="text-brand-500 dark:text-white" size={14} />
                    <p className="text-[12px] font-medium">8 or more characters</p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="text-brand-500 dark:text-white" size={14} />
                    <p className="text-[12px] font-medium">Numbers</p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="text-brand-500 dark:text-white" size={14} />
                    <p className="text-[12px] font-medium">Upper case and Lower case letters</p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="text-brand-500 dark:text-white" size={14} />
                    <p className="text-[12px] font-medium">Special Character</p>
                  </div>
                </div>

                <div>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-3"
                    size="sm">
                    {loading && (
                      <Loader size={18}  className="animate-spin"/>
                    )}
                    {loading ? "Resetting Password..." : "Continue"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center pb-5">
            <Link to="/verify-code" className="inline-flex items-center text-sm dark:text-white ">
              <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" />
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}