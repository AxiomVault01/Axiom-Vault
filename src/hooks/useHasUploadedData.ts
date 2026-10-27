import { useState } from "react";

// Shared with the employee-records upload flow (pages/employeeinfo/EmployeeRecords.tsx)
export const STORAGE_KEY_RECORDS = "axiomvault_employee_records";
export const STORAGE_KEY_STEP = "axiomvault_flow_step";

// True once the user has completed an upload ("Upload to Records") with at least one record.
// Until then, dashboard / alerts / cases render their empty states.
export function hasUploadedData(): boolean {
  try {
    if (localStorage.getItem(STORAGE_KEY_STEP) !== "records") return false;
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    const records = raw ? JSON.parse(raw) : [];
    return Array.isArray(records) && records.length > 0;
  } catch {
    return false;
  }
}

export function useHasUploadedData(): boolean {
  const [hasData] = useState(hasUploadedData);
  return hasData;
}
