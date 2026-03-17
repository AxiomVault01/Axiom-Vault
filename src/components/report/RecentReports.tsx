import {ChevronDownIcon, FileIcon, DownloadIcon } from "../../icons";
import Button from "../ui/button/Button";


export default function RecentReports() {
  return (
    <div className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 rounded-xl" >
        <div className="flex justify-between">
            <div>
                <h3 className="font-bold dark:text-white">Recent Reports</h3>
            </div>

            <div className="flex gap-2">
               <span className="text-sm text-brand-500">View All</span>
               <ChevronDownIcon className="size-5 mt-0.5 text-brand-500"/>
           </div>
        </div>
         
        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-500">
                     <FileIcon className="text-brand-500 size-5 dark:text-brand-500" />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm dark:text-gray-400">Monthly Fraud Detection - January 2026</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">PDF . 2.4MB . Feb 1, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-brand-500 text-white">
                  <DownloadIcon className="size-5"/>
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-500">
                     <FileIcon className="text-brand-500 size-5 dark:text-brand-500" />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm dark:text-gray-400">QA 2025 Risk Analysis</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Excel . 5.8MB . Jan 1, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-brand-500 text-white">
                  <DownloadIcon className="size-5"/>
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-500">
                     <FileIcon className="text-brand-500 size-5 dark:text-brand-500" />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm dark:text-gray-400">High-Risk Accounts Investigation</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">PDF . 1.2MB . Jan 10, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-brand-500 text-white">
                  <DownloadIcon className="size-5"/>
                    Download
               </Button>
           </div>
       </div>

        <div className="mb-5 sm:mb-3 p-4 rounded-lg mt-2 flex justify-between gap-2 border border-gray-200 dark:border-gray-800 dark:bg-white/[0.03]">
           <div>
              <div className="flex gap-2">
                   <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-500">
                     <FileIcon className="text-brand-500 size-5 dark:text-brand-500" />
                   </div>
               
                   <div className="flex flex-col gap-y-3">
                      <div>
                          <h4 className="font-medium text-sm dark:text-gray-400">Employee Payroll Audit - Decemember</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Excel . 4.1MB . Jan 5, 2026</span>
                      </div>
                   </div>
               </div>
            </div>

           <div>
               <Button size="sm" className="bg-brand-500 text-white">
                  <DownloadIcon className="size-5"/>
                    Download
               </Button>
           </div>
       </div>
  </div>
 );
}
