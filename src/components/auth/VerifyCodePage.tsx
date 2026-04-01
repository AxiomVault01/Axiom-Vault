import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "../../icons";
import Logo from "../../../public/Logo.jpg";
import { KeyRound } from "lucide-react";

const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function VerifyCodePage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

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

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    // TODO: Call API to resend OTP
    console.log("Resend OTP requested");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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
    <div className="flex flex-col flex-1 w-full mx-auto">
      <header>
        <div className="p-5">
          <img src={Logo} style={lgImage} alt="Logo" />
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

          <div className="flex text-left gap-3  bg-blue-200/40 w-[350px] m-auto rounded-lg p-3 border-2 border-brand-200" >
            <span className="mt-1 text-brand-500 dark:text-white">
              <KeyRound className="size-5"></KeyRound>
            </span>
            <span>
              <p className="text-black font-semibold dark:text-white text-sm mb-1">
                Check Your Email
              </p>
              <p className="text-gray-700 dark:text-gray-100 text-xs">
                We sent a 6-digit verification code to your mail. Didn't receive
                it?{" "}
               
              </p>
            </span>
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
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs"
                    size="sm"
                  >
                    Verify
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
