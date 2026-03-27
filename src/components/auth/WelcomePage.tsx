import { Link } from "react-router";
import { Brain, Database, TriangleAlert, ChartColumn, FileSearch, CircleCheckBig } from "lucide-react";
import { GroupIcon } from "../../icons";
import Button from "../ui/button/Button";
import Logo from "../../../public/Logo.jpg";

const lgImage = {
  width: "175px",
  height: "45.4px",
};

export default function WelcomePage() {
  return (
    <div className="w-full bg-white p-0 overflow-x-hidden dark:border-gray-800 dark:bg-white/[0.03]">
      <header>
        <div className="flex items-center space-x-2 p-5">
          <div className="">
            <img src={Logo} style={lgImage} alt="Logo" />
          </div>
        </div>
      </header>
      <section className="p-5 grid grid-cols-1 xl:grid-cols-2 xl:px-20 xl:py-15">
        <div>
          <div className="w-72 h-10 flex items-center justify-center bg-brand-500 rounded-full backdrop-blur-sm">
            <p className="text-white">Government & Financial Institutions </p>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 dark:text-gray-100">
            Detect Payroll Fraud
            <span className="block text-brand-500">with AI Precision</span>
          </h2>
          <p className="md:text-xl lg:text-2xl mt-5 text-gray-800 dark:text-gray-400">
            Advanced artificial intelligence continuously monitors employee
            records and bank accounts to identify suspicious activities,
            duplicate accounts, and financial irregularities.
          </p>
          <div className="mt-5  dark:text-gray-500">
            <div className="flex gap-3 py-2 lg:text-xl">
              <div className="w-7 h-7 rounded-full bg-orange-900 ">
                <CircleCheckBig className=" text-white mx-auto size-5 mt-1"></CircleCheckBig>
              </div>
             <p className="text-gray-700">Real-time fraud detection & alerts</p>
            </div>
            <div className="flex gap-3 py-2 lg:text-xl">
               <div className="w-7 h-7 rounded-full bg-orange-900 ">
                <CircleCheckBig className=" text-white mx-auto size-5 mt-1"></CircleCheckBig>
              </div>
              <p className="text-gray-700">99.2% accuracy in pattern recognition</p>
            </div>
            <div className="flex gap-3 py-2 lg:text-xl">
              <div className="w-7 h-7 rounded-full bg-orange-900 ">
                <CircleCheckBig className=" text-white mx-auto size-5 mt-1"></CircleCheckBig>
              </div>
              <p className="text-gray-700">Designed for non-technical auditors</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/email-required">
              <Button className="w-full px-6 py-2 bg-brand-500 text-white rounded-xl text-lg lg:text-lg ">
                Get Started
              </Button>
            </Link>
            <Link to="/signin">
              <Button className="w-full border text-brand-800 border-gray-400 px-6 py-2 mb-6 rounded-xl text-lg lg:text-lg dark:text-gray-300">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-1">
          <div className="p-5 md:p-10">
            <h3 className="md:text-xl lg:text-4xl text-brand-500 font-bold dark:text-gray-100">
              System Capabilities
            </h3>
            <p className="lg:text-xl text-brand-500 dark:text-gray-300">
              Everything you need for comprehensive fraud detection
            </p>
          </div>
          <div className="w-full">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto p-2 md:p-10">
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border p-5  dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <Brain className="text-white" />
                  </div>
                  AI Detection
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Machine learning identifies suspicious patterns automatically
                </dd>
              </div>
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border p-5  dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <GroupIcon className="text-white"></GroupIcon>
                  </div>
                  Employee Monitoring
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Track and analyze employee payroll records in real-time.
                </dd>
              </div>
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border p-5  dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <Database className="text-white"></Database>
                  </div>
                  Bank Account Validation
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Detect duplicate accounts and unusual banking patterns.
                </dd>
              </div>
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <TriangleAlert className="text-white"></TriangleAlert>
                  </div>
                  Risk Alerts
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Instant notifications for high-risk fraud activities
                </dd>
              </div>
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <ChartColumn className="text-white"></ChartColumn>
                  </div>
                  Analytics Dashboard
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Visual insights and comprehensive reporting tools
                </dd>
              </div>
              <div className="bg-gray-100 border-blue-light-50 rounded-xl border-1 p-8 dark:border-gray-800 dark:bg-white/[0.03]">
                <dt className="font-semibold text-brand-500 lg:text-2xl dark:text-gray-100">
                  <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                    <FileSearch className="text-white"></FileSearch>
                  </div>
                  Audit Trail
                </dt>
                <dd className="mt-2 text-brand-500 lg:text-xl dark:text-gray-400">
                  Complete investigation history and documentation
                </dd>
              </div>
            </dl>
            <div className="border-t-1 border-brand-100 mt-4 md:-mt-5">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 ">
                <div>
                  <p className="font-bold text-brand-500">10k+</p>
                  <span className="text-sm text-brand-500 dark:text-gray-400">
                    Records/Day
                  </span>
                </div>

                <div>
                  <p className="font-bold text-brand-500">2s</p>
                  <span className="text-sm text-brand-500 dark:text-gray-400">
                    Detection Time
                  </span>
                </div>

                <div>
                  <p className="font-bold text-brand-500">24/7</p>
                  <span className="text-sm text-brand-500 dark:text-gray-400">Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white p-5 text-brand-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300">
        <p>
          © 2026 Risk Command Center. Built for Government & Financial
          Institutions.
        </p>
      </footer>
    </div>
  );
}
