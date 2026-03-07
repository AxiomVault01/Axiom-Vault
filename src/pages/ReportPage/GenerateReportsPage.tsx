import PageMeta from "../../components/common/PageMeta";
import ReportBuilder from "../../components/report/ReportBuilder";
import ReportMetrics from "../../components/report/ReportMetrics";
import Reports from "../../components/report/Reports";
import ReportTemplates from "../../components/report/ReportTemplates";
import { useState, useEffect } from "react";
import {CalenderIcon, CheckCircleIcon, DownloadIcon, FileIcon} from "../../icons";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import { Link } from "react-router";
import RecentReports from "../../components/report/RecentReports";




export default function GenerateReports() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  } }, [isOpen]);

  return (
    <>
      <PageMeta
        title="Axiom Vault | Generate Reports"
        description="Axiom Vault is an AI enabled fraud detection and prevention platform that helps businesses identify and mitigate fraudulent activities in real-time, ensuring the security of their operations and customers."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-12 xl:col-span-12">
         <Reports />
        </div>

        <div className="col-span-12 space-y-12 xl:col-span-12">
          <ReportMetrics />
       </div>

       <div className="col-span-12">
          <ReportTemplates />
       </div>

       <div className="col-span-12">
          <ReportBuilder />
        </div>

        <div className="col-span-12">
          <RecentReports />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100000] p-4">
          <div className="bg-white shadow-xl rounded-lg flex-1 w-full max-w-xl max-h-[90vh] overflow-y-auto p-8">
            <div className="bg-blue-light-25 mb-5 sm:mb-3 p-4 rounded-lg flex gap-3 border border-blue-light-50">
              <div className="flex">
                <div className="flex items-center rounded-lg justify-center w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-orange-400">
                  <FileIcon className="text-blue-600 size-5 dark:text-white/90" />
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <div>
                  <h4 className="font-semibold text-sm dark:text-gray-400">Generate Audit Report</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Configure your report settings</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-2">
              <Label className="text-brand-800 dark:text-white/90">
                Report Type
              </Label>

              <div className="flex justify-between flex-col gap-3 md:flex-row">
                <div>
                  <Button size="sm" className="w-full text-sm px-8 text-blue-600 border-2 rounded-lg bg-blue-50 border-blue-500">Comprehensive</Button>
                </div>
                <div>
                  <Button size="sm" className="w-full text-sm px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Summary</Button>
                </div>
                <div>
                  <Button size="sm" className="w-full text-sm px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Detailed</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-2">
              <div className="relative w-full max-w-md">
                <CalenderIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                <Label className="pl-7">Date Range</Label>
              </div>
            </div>

            <div className="space-y-4 p-2 -mt-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label className="text-gray-400 pl-1 text-xs dark:text-white/90">
                   from
                  </Label>
                  <div className="relative w-full max-w-md">
                    <Input type="date"/>
                    <CalenderIcon className="absolute w-5 h-5 top-1/2 right-4 -translate-y-1/2 text-gray-400 pointer-events-none"/> 
                  </div>
                </div> 

                <div className="sm:col-span-1">
                  <Label className="text-gray-400 pl-1 text-xs dark:text-white/90">
                    To
                  </Label>

                  <div className="relative w-full max-w-md">
                    <Input type="date"/>
                    <CalenderIcon className="absolute w-5 h-5 top-1/2 right-4 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                  </div>
                </div>     
              </div> 
            </div>

            <div className="space-y-4 p-2">
              <div className="relative w-full max-w-md">
                <CalenderIcon className="absolute w-5 h-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                <Label className="pl-7">Filter By Risk Level</Label>
              </div>
           </div>

           <div className="space-y-4 p-2 -mt-3">
              <select className="w-full px-2 py-3 border dark:text-white/90  border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:outline-none focus:dark:bg-gray-900 focus:dark:text-white" name="riskLevel" id="riskLevel">
                <option value="">High and Above</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="space-y-4 p-2">
              <Label className="text-brand-800 dark:text-white/90">
                Include Sections
              </Label>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-blue-600">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 bg-blue-600 text-blue-600 dark:bg-blue-500/15 dark:text-orange-400">
                    <CheckCircleIcon className="stroke-white size-3 dark:text-white/90" />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Executive Summary</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Overview of key findings and risk scores</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-blue-600">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 bg-blue-600 text-blue-600 dark:bg-blue-500/15 dark:text-orange-400">
                    <CheckCircleIcon className="stroke-white size-3 dark:text-white/90" />
                  </div>
               </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Flagged Cases</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Detailed list of all high-risk accounts</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-blue-600">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 bg-blue-600 text-blue-600 dark:bg-blue-500/15 dark:text-orange-400">
                    <CheckCircleIcon className="stroke-white size-3 dark:text-white/90" />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Analytics & Charts</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Visual representation of trends and patterns</span>
                  </div>
                </div>
              </div>

              <div className=" mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-200 bg-white">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 border-2 border-gray-200 dark:bg-blue-500/15 dark:text-orange-400"></div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Employee Records</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Complete employee database with risk indicators</span>
                  </div>
                 </div>
              </div>

              <div className="bg-blue-light-25 mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-blue-600">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 bg-blue-600 text-blue-600 dark:bg-blue-500/15 dark:text-orange-400">
                    <CheckCircleIcon className="stroke-white size-3 dark:text-white/90" />
                  </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">AI Recommendations</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Suggested actions and next steps</span>
                  </div>
                </div>
              </div>

              <div className="bg-white mb-5 sm:mb-3 p-2 rounded-lg flex gap-2 border-2 border-gray-200">
                <div className="flex">
                  <div className="flex items-center rounded-sm justify-center w-5 h-5 border-2 border-gray-200  dark:bg-blue-500/15 dark:text-orange-400"> </div>
                </div>

                <div className="flex flex-col gap-y-3">
                  <div>
                    <h4 className="font-medium text-sm dark:text-gray-400">Activity Timeline</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Chronological log of detection and resolution</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-2">
                <Label className="text-brand-800 dark:text-white/90">
                  Export Format
                </Label>

                <div className="flex justify-between flex-col gap-3 md:flex-row">
                  <div>
                    <Button size="sm" className="w-full text-xs px-8 text-blue-600 border-2 rounded-lg bg-blue-50 border-blue-500">PDF Document</Button>
                  </div>

                  <div>
                   <Button size="sm" className="w-full text-xs px-10 text-gray-800 border-2 rounded-lg  border-gray-200">Excel File</Button>
                  </div>

                  <div>
                   <Button size="sm" className="w-full text-xs px-10 text-gray-800 border-2 rounded-lg  border-gray-200">CSV Data</Button>
                  </div>
                </div>
              </div>

              <div  className="space-y-4 flex gap-3 justify-end">
                <div>
                  <Button onClick={() => setIsOpen(false)} size="sm" className="border-gray-200 border text-sm bg-white text-gray-800">Cancel</Button>
                </div>
                <div>
                  <Link  to="/generate-reports">
                    <Button size="sm" className="border-gray-200 border text-sm bg-blue-600 text-white">
                      <DownloadIcon className="size-5"/>
                        Generate Report
                    </Button>
                  </Link>
                </div>

              </div>
            </div>


            {/* <Link  to="/signin" className="text-sm ">
             <button 
               onClick={() => setIsOpen(false)}
               className="flex items-center justify-center bg-brand-500 w-full text-white px-4 py-3 rounded-lg" >
                Okay
             </button>
           </Link> */}
         </div>
        </div>
      )}
    </> 
  );
}
