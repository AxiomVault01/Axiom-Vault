import {
  AlertHexaIcon,
  GroupIcon,
  DollarLineIcon,
  BoltIcon,
} from "../../icons";
import Button from "../ui/button/Button";


export default function ReportTemplates() {
  return (
    <div className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 rounded-xl" >
        <div>
            <h3 className="font-bold dark:text-white">Report Templates</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-6 mt-4">
           {/* <!-- Template Item Start --> */}
            <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-error-100 text-error-600 dark:bg-error-400/20 dark:text-error-400">
                      <AlertHexaIcon className="text-error-600 size-5 dark:text-error-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold dark:text-gray-300">Fraud Detection Summary</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Comprehensive overview of all detected fraud cases</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last: Yesterday, 3:42 PM</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 text-white">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}

           {/* <!-- Template Item Start --> */}

            <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400">
                      <BoltIcon className="text-warning-600 size-5 dark:text-warning-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold dark:text-gray-300">Risk Analysis Report</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Detailed overview of all risk assessment and trends </span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last: February 1, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 text-white">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}


           {/* <!-- Template Item Start --> */}
             
             <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                      <GroupIcon className="text-brand-600 size-5 dark:text-brand-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold dark:text-gray-300">Employee Audit Report</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Complete detailed employee records and flag analysis</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last: January 30, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 text-white">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}

               
           {/* <!-- Template Item Start --> */}

             <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5">
               <div className="flex">
                    <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-400">
                      <DollarLineIcon className="text-success-600 size-5 dark:text-success-600" />
                    </div>
                </div>

               <div className="flex flex-col gap-y-3">
                    <div>
                        <h4 className="font-semibold dark:text-gray-300">Financial Impact Report</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">All of the estimated financial losses and recoveries</span>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last: January 28, 2026</p>
                        </div>
                        <div>
                            <Button size="sm" className="bg-brand-500 -mt-2 text-white">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
           {/* <!-- Template Item End --> */}
        </div>
   </div>
    );
}
