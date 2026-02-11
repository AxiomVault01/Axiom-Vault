import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { AlertHexaIcon} from "../../../icons";
import { Link } from "react-router";

interface Order {
  id: number;
  employee: {
    // image: string;
    name: string;
    code: string;
  };
  department: {
    name: string;
    sub: string;
  };
  bank: {
    number: string;
    risk: string;
  };
  risktype: string;
  severity: string;
  status: string;
  action: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    employee: {
      // image: string;
      name: "Maria Amos",
      code: "EMP-2026-001",
    },
    department: {
      name: "Finance Department",
      sub: "Accountant",
    },
    bank: {
      number: "**** **** **** 4892",
      risk: "Shared with 4 others",
    },
    risktype: "Duplicate Account",
    severity: "High",
    status: "Flagged",
    action: "View Details",
  },
  {
    id: 2,
    employee: {
      // image: string;
      name: "Harry Jane",
      code: "EMP-2024-031",
    },
    department: {
      name: "Finance Department",
      sub: "Finance Officer",
    },
    bank: {
      number: "**** **** **** 4892",
      risk: "Shared with 4 others",
    },
    risktype: "Duplicate Account",
    severity: "Medium",
    status: "Flagged",
    action: "View Details",
  },
  {
    id: 3,
    employee: {
      // image: string;
      name: "Harry Amos",
      code: "EMP-2024-011",
    },
    department: {
      name: "Logistics Department",
      sub: "Driver",
    },
    bank: {
      number: "**** **** **** 4892",
      risk: "High Salary",
    },
    risktype: "Salary Anomaly",
    severity: "Critical",
    status: "Flagged",
    action: "View Details",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]"> 
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-300 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                EMPLOYEE
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                DEPARTMENT
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                BANK ACCOUNT
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                RISK TYPE
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                SEVERITY
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                STATUS
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {employee.employee.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {employee.employee.code}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {employee.department.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {employee.department.sub}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {employee.bank.number}
                      </span>
                      <span className="block text-error-500 text-theme-xs dark:text-error-400">
                        {employee.bank.risk}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      employee.severity === "High"
                        ? "error"
                        : employee.severity === "Medium"
                          ? "warning"
                          : "error"
                    }
                  >
                    {employee.risktype}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={employee.severity === "Medium" ? "warning" : "error"}
                  >
                    {employee.severity}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color={"error"}>
                    <span className="pe-1">
                      <AlertHexaIcon />
                    </span>
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-brand-500 text-theme-sm dark:text-brand-400">
                  <Link to={"/alerts"}>{employee.action}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
