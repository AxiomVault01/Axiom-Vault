import {FileIcon} from "../../icons";


export default function Reports() {
  return (
    <div className="border flex justify-between border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5 rounded-xl" >
        <div>
            <h3 className="font-bold dark:text-white">Reports</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Generate and download comprehensive audit reports</p>
        </div>

        <div className="border flex justify-center items-center gap-1 border-gray-300 bg-white dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03] p-2 rounded-xl">
            <div>
                <FileIcon />
            </div>
            <span className="text-sm dark:text-gray-400">Create Custom Report</span>

        </div>
    </div>    
   
 );
}
