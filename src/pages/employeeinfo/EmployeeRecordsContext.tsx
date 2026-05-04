import { createContext, useContext, useState, ReactNode } from "react";
import { EmployeeRecord } from "./FileUploadPage";

interface EmployeeRecordsContextValue {
  records: EmployeeRecord[];
  setRecords: (records: EmployeeRecord[]) => void;
}

const EmployeeRecordsContext = createContext<EmployeeRecordsContextValue>({
  records: [],
  setRecords: () => {},
});

export function EmployeeRecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<EmployeeRecord[]>([]);
  return (
    <EmployeeRecordsContext.Provider value={{ records, setRecords }}>
      {children}
    </EmployeeRecordsContext.Provider>
  );
}

export function useEmployeeRecords() {
  return useContext(EmployeeRecordsContext);
}