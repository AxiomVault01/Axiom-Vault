import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
// import { InfoIcon, ChevronLeftIcon, MailIcon } from "../../icons";
import Bicon from "../../../public/Brand Icon.jpg";
import Biconw from "../../../public/AXIOM_VAULT_c.png";
import logo from "../../../public/Logo.jpg";
import logob from "../../../public/AXIOM _VAULT_B.png";
import { Loader, Mail } from "lucide-react";
import { ForgotPassword } from "../../services/Axios";
import toast from "react-hot-toast";


const lgImage = {
  width: "175px",
  height: "45.4px",
};
const BiImage = {
  width: "30.53px",
  height: "40px",
};

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    // forgot password logic to send otp
    try {
      const res = await ForgotPassword();
      console.log(res, "forgot password")
      toast.success("OTP sent successfully");
      if (validateForm()) {
        console.log("Form submitted", formData);
        navigate("/verify-code");
      }
    } catch (err: any) {
      toast.error("Error sending OTP", err.message)
      const errormessage =
        err.response?.data?.message || err.message || "Failed for send OTP code";
      setErrors(errormessage);
    } finally {
      setLoading(false)
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
        <div className="bg-white rounded-lg border-2 border-brand-500 dark:bg-gray-900 dark:border-slate-300">
          <div className="mb-5 sm:mb-4 p-8 rounded-t-lg">
            <div className="w-12 h-12 mb-3 bg-white dark:bg-gray-900 p-1 rounded-lg mx-auto">
              <img src={Bicon} style={BiImage} className="mx-auto dark:hidden" alt="Brand Icon" />
              <img src={Biconw} style={BiImage} className="mx-auto hidden dark:block" alt="Brand Icon" />
            </div>
            <h3 className="mb-2 font-medium  text-center text-title-sm sm:text-title-md dark:text-white">
              Forgot Password
            </h3>
            <p className="text-sm text-center dark:text-white">
              Please enter the work email address associated with your account.
            </p>
          </div>

          <div className="p-5">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative w-full max-w-md">
                  <Mail className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 pointer-events-none z-50" />
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Work Email Address" required className="w-full pl-10 pr-4 py-2" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <div>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                    size="sm">
                    {
                      loading && (
                        <Loader size={18} />
                      )}
                    {loading ? 'Verifying & sendong OTP' : 'Continue'}

                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center pb-5">
            <Link
              to="/signin"
              className="text-brand-500 font-medium inline-flex items-center text-[10px] dark:text-white ">
              {/* <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" /> */}
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}