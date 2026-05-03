import React, { useState } from "react";
import FileUploadPage, { EmployeeRecord } from "./FileUploadPage";
import ValidationResultsPage from "./ValidationResultsPage";
import FinalRecords from "./FinalRecords";

type FlowStep = "upload" | "validation" | "records";

export default function EmployeeRecords() {
  const [step, setStep] = useState<FlowStep>("upload");
  const [records, setRecords] = useState<EmployeeRecord[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleValidationComplete = (data: EmployeeRecord[], file: File) => {
    setRecords(data);
    setUploadedFile(file);
    setStep("validation");
  };

  const handleUploadToRecords = () => {
    // Filter only validated records before sending to backend
    const validRecords = records.filter((r) => r.status === "Validated");
    console.log("Uploading to records:", validRecords);

    // TODO: POST validRecords to your API endpoint, e.g.:
    // await fetch("/api/employee-records", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(validRecords),
    // });

    setStep("records");
  };

  const handleCancelReupload = () => {
    setRecords([]);
    setUploadedFile(null);
    setStep("upload");
  };

  if (step === "upload") {
    return <FileUploadPage onValidationComplete={handleValidationComplete} />;
  }

  if (step === "validation" && uploadedFile) {
    return (
      <ValidationResultsPage
        records={records}
        file={uploadedFile}
        onUploadToRecords={handleUploadToRecords}
        onCancelReupload={handleCancelReupload}
      />
    );
  }

  return (
    <FinalRecords
      records={records}
      onUploadFile={handleCancelReupload}
    />
  );
}