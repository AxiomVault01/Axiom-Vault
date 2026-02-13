// import { useState } from "react";
import { Link } from "react-router";
import { CheckCircleIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";


export default function WelcomePage() {
  return (
   <div className="w-full bg-blue-light-25 p-0 overflow-x-hidden">
    <header>
      <div className="flex items-center space-x-2 p-5 ">
        <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center"></div>
        <div className="flex flex-col">
          <span className="text-xl md:2xl font-bold">Axiom Vault</span>
          <p className="text-sm text-gray-800">AI-Powered Internal Audit System</p>
        </div>
     </div>
    </header>
    <section className="grid md:grid-cols-2 md:px-30 md:py-15 px-0 py-0">
      <div>
        <div className="inline-block w-72 h-10 bg-brand-500 rounded-full backdrop-blur-sm"></div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">Detect Payroll Fraud
          <span className="block text-brand-500">with AI Precision</span>
        </h2>
        <p className="md:text-xl lg:text-2xl mt-5">
          Advanced artificial intelligence continuously monitors employee records and bank accounts to identify suspicious activities, duplicate accounts, and financial irregularities.
        </p>
        <div className="mt-5">
         <div className="flex gap-3 py-2 lg:text-xl">
           <CheckCircleIcon className="size-5 mt-1"></CheckCircleIcon>
           <p>Real-time fraud detection & alerts</p>
         </div>
         <div className="flex gap-3 py-2 lg:text-xl">
          <CheckCircleIcon className="size-5 mt-1"></CheckCircleIcon>
          <p>99.2% accuracy in pattern recognition</p>
         </div>
         <div className="flex gap-3 py-2 lg:text-xl">
          <CheckCircleIcon className="size-5 mt-1"></CheckCircleIcon>
          <p>Designed for non-technical auditors</p>
         </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-4 py-2 bg-brand-500 text-white rounded-xl text-lg lg:text-xl">
            <Link to="/signup">Get Started</Link>
          </button>
         <button className="border text-brand-800 border-gray-400 px-4 py-2 rounded-xl text-lg lg:text-xl">
          <Link to="/signin">Sign In</Link>
         </button>
        </div>
      </div>
      <div className="bg-white rounded-lg">
        <div className="p-10">
          <h3 className="md:text-xl lg:text-4xl font-bold">System Capabilities</h3>
          <p className="lg:text-xl">Everything you need for comprehensive fraud detection</p>
        </div>
        <div className="w-full">
        <dl className="grid  md:grid-cols-2 gap-6  mx-auto p-10">
          <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border p-5">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              AI Detection
            </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Machine learning identifies suspicious patterns automatically</dd>
          </div>
          <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border p-5">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              Employee Monitoring
           </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Track and analyze employee payroll records in real-time.</dd>
         </div> 
         <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border p-5">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              Bank Account Validation
           </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Detect duplicate accounts and unusual banking patterns.</dd>
         </div>
         <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border p-5">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              Risk Alerts
           </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Instant notifications for high-risk fraud activities</dd>
         </div>
         <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border p-5">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              Analytics Dashboard
           </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Visual insights and comprehensive reporting tools</dd>
         </div>
         <div className="bg-blue-light-25 border-blue-light-50 rounded-xl border-1 p-8">
            <dt className="font-semibold text-gray-900 lg:text-2xl">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center"></div>
              Audit Trail
           </dt>
            <dd className="mt-2 text-gray-800 lg:text-xl">Complete investigation history and documentation</dd>
         </div>
        </dl>
        <div className="border-t-1 border-brand-100 -mt-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <div>
              <p className="font-bold text-brand-500">10k+</p>
              <span className="text-sm">Records/Day</span>
            </div>
            
            <div>
              <p className="font-bold text-brand-500">2s</p>
              <span className="text-sm">Detection Time</span>
            </div>

            <div>
              <p className="font-bold text-brand-500">24/7</p>
              <span className="text-sm">Monitoring</span>
            </div>
          </div>
        </div>
        </div>
      </div>
   </section>
   <footer className="bg-white p-5">
    <p className="text-center">© 2026 Risk Command Center. Built for Government & Financial Institutions.</p>
   </footer>
  </div> 

  );
}
