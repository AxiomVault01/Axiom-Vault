import { useState } from "react";
import { Link } from "react-router";
import FormTab from "../common/FormTab";
import Label from "../form/Label";
import RadioSm from "../form/input/RadioSm";
import {CalenderIcon, DownloadIcon} from "../../icons";
import Button from "../ui/button/Button";

import Input from "../form/input/InputField";

export default function ReportBuilder() {
  const [selected, setSelected] = useState("");
  return (
    <div className="border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 rounded-xl" >
        <div>
            <h3 className="font-bold dark:text-white">Custom Report Builder</h3>
        </div>

        <div className="space-y-4">
           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                    <Label className="text-brand-800 dark:text-gray-500">
                        Report Type
                    </Label>
                    <select name="Rbdr" id="rept-bdr" className="w-full px-2 py-3 border text-brand-800 dark:text-white/90  border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] text-sm rounded-lg focus:outline-none focus:dark:bg-gray-900 focus:dark:text-white">
                        <option value="fraud detection summary" className="dark:border-gray-800 dark:bg-white/[0.03]">Fraud Detection Summary</option>
                        <option value="internal audit" className="dark:border-gray-800 dark:bg-white/[0.03]">Risk Analysis Report</option>
                        <option value="finance" className="dark:border-gray-800 dark:bg-white/[0.03]">Employee Audit Report</option>
                        <option value="compliance" className="dark:border-gray-800 dark:bg-white/[0.03]">Financial Impact Report</option>
                        <option value="others" className="dark:border-gray-800 dark:bg-white/[0.03]">Others</option>
                    </select>
                </div> 

                <div className="sm:col-span-1">
                    <Label className="text-brand-800 dark:text-gray-500">
                        Time Period
                    </Label>
                    <FormTab />
                </div>                  
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="sm:col-span-1">
                    <Label className="text-brand-800 dark:text-gray-500">
                        Start Date
                    </Label>

                    <div className="relative w-full max-w-md">
                        <CalenderIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <Input type="date" className="w-full pl-10 pr-4 py-2 dark:border-gray-800 dark:bg-white/[0.03]" />
                    </div>
                </div> 

                <div className="sm:col-span-1">
                    <Label className="text-brand-800 dark:text-gray-500">
                        End Date
                    </Label>

                    <div className="relative w-full max-w-md">
                        <CalenderIcon  className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <Input type="date" className="w-full pl-10 pr-4 py-2 dark:border-gray-800 dark:bg-white/[0.03]" />
                    </div>

                </div>                  
            </div>

            <div>
              <h3 className="text-brand-800 text-sm dark:text-gray-500">Export Format</h3>
              <div className="flex gap-3 dark:text-gray-800">
                  <RadioSm id="pdf" name="export-format" value="pdf" label="PDF" checked={selected === "pdf"} onChange ={setSelected} />
                  <RadioSm id="excel" name="export-format" value="excel" label="Excel" checked={selected === "excel"} onChange ={setSelected} />
                  <RadioSm id="csv" name="export-format" value="csv" label="CSV" checked={selected === "csv"} onChange ={setSelected} />
              </div>
           </div>

           <div className="flex gap-4">
               <div>
                   <Link to="/generate-reports">
                       <Button size="sm" className="bg-brand-500 text-white">
                           <DownloadIcon className="size-5" />
                           Generate Report
                       </Button>
                   </Link>
               </div>
               <div className="border flex justify-center items-center border-gray-300 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-2 rounded-lg">
                  <span className="text-brand-800 text-sm dark:text-white/90">Save Template</span>
               </div>
           </div>
       </div>
    </div>     
   );
}
