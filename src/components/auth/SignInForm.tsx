import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon, LockIcon, MailIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
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
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div style={bgImage}>
      <div className="flex flex-col flex-1 w-full mx-auto">
        <div className="w-full max-w-md pt-10 mx-auto">
          <Link
            to="/welcome"
            className="inline-flex items-center text-sm text-white transition-colors hover:text-brand-200 dark:text-gray-200 dark:hover:text-gray-300"
          >
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
                Welcome Back
              </h1>
              <p className="text-sm text-brand-200 text-center dark:text-gray-200">
                Sign in to access Axiom Vault
              </p>
            </div>
            <div className="p-5">
              <form>
                <div className="space-y-4">
                  <div>
                    <Label className="text-brand-800 dark:text-white/90">
                      Email Address
                    </Label>
                    <div className="relative w-full max-w-md">
                      <MailIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></MailIcon>
                      <Input type="text"id="fname" name="fname" placeholder="auditor@agency.gov" className="w-full pl-10 pr-4 py-2" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-brand-800 dark:text-white/90">
                      Password
                    </Label>
                    <div className="relative">
                      <div className="relative w-full max-w-md">
                        <LockIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" ></LockIcon>
                        <Input className="w-full pl-10 pr-4 py-2" placeholder="Minimum of 8 characters"
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
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-brand-800 text-theme-sm dark:text-white/90">
                        Remember Me
                      </span>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Link to="/dashboard">
                      <Button
                        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                        size="sm"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>

              <div className="mt-6 flex justify-center">
                <p className="text-sm font-normal text-brand-100 dark:text-gray-400 sm:text-start">
                  New to Axiom Vault ?
                </p>
              </div>
              {/* <!-- Button --> */}
              <div className="mt-6">
                <Link to="/signup">
                  <button className="flex items-center border border-gray-400 justify-center w-full px-4 py-3 text-sm font-medium transition rounded-lg shadow-theme-xs hover:bg-gray-200 dark:text-gray-200 dark:hover:text-gray-900">
                    Create Account
                  </button>
                </Link>
              </div>
              <div className="mt-10 border-t-2 border-gray-100">
                <p className="text-sm text-center mt-5 text-brand-100 dark:text-gray-400">
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
