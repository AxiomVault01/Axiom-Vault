import { UploadCloud } from "lucide-react";
import { useRef } from "react";

export default function SupportingDocuments(){
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleBrowseClick = () => {
       fileInputRef.current?.click();
    };

    const handleFileChange = (
       e: React.ChangeEvent<HTMLInputElement>
       ) => {

        const files = e.target.files;

        if (files && files.length > 0) {
           console.log(files);
       }
   };

    return(
        <div>
            <h3 className="mb-4 font-medium">
                Upload Supporting Documents
            </h3>

            <input type="file" multiple accept=".csv,.xls,.xlsx" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
            
            <div onClick={handleBrowseClick} className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-10 text-center transition
               hover:border-brand-500">
                <UploadCloud size={40} className="text-brand-500"/>
                <p className="mt-4 text-sm">
                    Drag and drop Excel or CSV file
               </p>
               <p className="mt-1 text-sm text-gray-500">
                   or click to browse from your computer
              </p>
              <button type="button" onClick={handleBrowseClick} className="mt-5 rounded-lg bg-gray-100 px-4 py-2">
                   CSV, XLS, XLSX (Max 10MB)
              </button>
           </div>
        </div>
   );
}