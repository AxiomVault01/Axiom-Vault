import { useState, useEffect } from "react";
import FileUploadPage, { EmployeeRecord } from "./FileUploadPage";
import ValidationResultsPage from "./ValidationResultsPage";
import FinalRecords from "./FinalRecords";

type FlowStep = "upload" | "validation" | "records";

const STORAGE_KEY_RECORDS = "axiomvault_employee_records";
const STORAGE_KEY_STEP = "axiomvault_flow_step";

function loadFromStorage(): { step: FlowStep; records: EmployeeRecord[] } {
  try {
    const step = (localStorage.getItem(STORAGE_KEY_STEP) as FlowStep) || "upload";
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    const records: EmployeeRecord[] = raw ? JSON.parse(raw) : [];
    return { step, records };
  } catch {
    return { step: "upload", records: [] };
  }
}

function saveToStorage(step: FlowStep, records: EmployeeRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY_STEP, step);
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch {
    // storage quota exceeded — fail silently
  }
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY_STEP);
  localStorage.removeItem(STORAGE_KEY_RECORDS);
}

export default function EmployeeRecordsFlow() {
  const saved = loadFromStorage();

  const [step, setStep] = useState<FlowStep>(saved.step);
  const [localRecords, setLocalRecords] = useState<EmployeeRecord[]>(saved.records);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Sync step + records to localStorage whenever they change
  useEffect(() => {
    saveToStorage(step, localRecords);
  }, [step, localRecords]);

  const handleValidationComplete = (data: EmployeeRecord[], file: File) => {
    setLocalRecords(data);
    setUploadedFile(file);
    setStep("validation");
  };

  const handleUploadToRecords = () => {
    const validRecords = localRecords.filter((r) => r.status === "Validated");
    setLocalRecords(validRecords);
    setStep("records");

    // TODO: POST to your API here
    // await fetch("/api/employee-records", { method: "POST", body: JSON.stringify(validRecords) });
  };

  // Full reset — clears storage and goes back to upload
  const handleCancelReupload = () => {
    clearStorage();
    setLocalRecords([]);
    setUploadedFile(null);
    setStep("upload");
  };

  if (step === "upload") {
    return <FileUploadPage onValidationComplete={handleValidationComplete} />;
  }

  if (step === "validation" && uploadedFile) {
    return (
      <ValidationResultsPage
        records={localRecords}
        file={uploadedFile}
        onUploadToRecords={handleUploadToRecords}
        onCancelReupload={handleCancelReupload}
      />
    );
  }

  // "records" step — restored from localStorage if user navigated away and came back
  return (
    <FinalRecords
      records={localRecords}
      onUploadFile={handleCancelReupload}
    />
  );
}