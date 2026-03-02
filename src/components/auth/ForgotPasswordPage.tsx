import { Link } from "react-router";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { InfoIcon, ChevronLeftIcon } from "../../icons";
import Logo from "../../../public/Logo.jpg";


const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function ForgotPasswordPage() {
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
                         Please enter the email address associated with your account.
                     </p>
                  </div>

                  <div className="p-5">
                       <form action="">
                          <div className="space-y-4">
                              <div>
                                  <Input placeholder="Email" />
                              </div>

                               <div>
                                  <Link to="/verify-code">
                                      <Button
                                          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition border rounded-lg bg-brand-500 shadow-theme-xs mt-6"
                                          size="sm"
                                          >
                                          Continue
                                      </Button>
                                  </Link>
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