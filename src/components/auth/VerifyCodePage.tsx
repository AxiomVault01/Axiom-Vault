import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "../../icons";
import logo from "../../../public/Logo.jpg";
import logob from "../../../public/AXIOM _VAULT_B.png";
import MessageModal from "../shared/MessageModal";
import api from "../../services/Axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function VerifyCodePage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false)
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

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 6) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResend = async () => {
    setTimeLeft(60);
    // TODO: Call API to resend OTP
    console.log("Resend OTP requested");
    const email = sessionStorage.getItem("email");
    try {
      const payload = {
        email,
      };
      const res = await api.put(`/auth/resend-otp/`, payload);
      console.log(res, "email verification response");
      console.log(payload);
      toast.success("otp sent to your email");
      setIsOpen(true);
    } catch (err: any) {
      console.error(err.message, "error re-sending otp code");
      toast.error(err.message, err.data?.message);
    } finally {
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
const email = sessionStorage.getItem("email");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    const payload = {
      email, 
      code
    }
    try {
      setLoading(true)
      const res = await api.post(`/auth/verify-reset-code/`, payload);
      console.log(res, "network response");
      sessionStorage.setItem("reset_token", res.data.reset_token)
      setError("");
      console.log("OTP Verified:", code);
      toast.success("OTP confirmed successfully");
      navigate("/reset-password");
    } catch (err: any) {
      toast.error(err.message);
    }finally{
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
        <div className="bg-white dark:bg-black/80 rounded-lg border-2 border-brand-500 dark:border-white">
          <div className=" sm:mb-4 p-3 mt-4 rounded-t-lg">
            <h3 className="mb-2 font-medium  text-center text-title-sm sm:text-title-md dark:text-white">
              Verify Code
            </h3>
            <p className="text-sm text-center dark:text-white">
              Please enter the code we have just sent to your email.
            </p>
          </div>

          <div className="" >
           <MessageModal isOpen={isOpen} onClose={() => setIsOpen(false)} count="We sent a 4-digit verification code to" />
          </div>

          <div className="p-5">
            <form onSubmit={handleSubmit}>
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
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="text-center dark:text-white">
                  <p>Didn't recieve OTP ?</p>
                  <p className="text-brand-500 mt-5 text-sm dark:text-white">
                    {timeLeft > 0 ? (
                  `Resend in ${timeLeft} seconds`
                ) : (
                  <button type="button"
                    onClick={handleResend}
                    className="text-brand-500 font-semibold cursor-pointer dark:text-white"
                  >
                    Resend OTP
                  </button>
                )}
                  </p>
                </div>
                <div>
                  <Button
                    disabled={loading}
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs"
                    size="sm"
                  >
                    {loading && (
                      <Loader size={18} className="animate-spin"/>
                    )}
                    {loading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center pb-5 dark:text-white">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-sm "
            >
              <ChevronLeftIcon className="size-5 border border-brand-500 mr-2" />
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
