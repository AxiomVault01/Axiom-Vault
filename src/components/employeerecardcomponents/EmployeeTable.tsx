import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Eye } from "lucide-react";
import Badge from "./Badge";
import { employees } from "../../pages/UiElements/Constants";

type Employee = (typeof employees)[0];

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // ✅ Filter Logic (unchanged but optimized)
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        emp.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // ✅ Columns Definition (TanStack v8)
  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        header: "Employee",
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-xs sm:text-sm">
              {row.original.name}
            </p>
            <p className="text-xs text-gray-500">
              {row.original.id}
            </p>
          </div>
        ),
      },
      {
        header: "Department",
        cell: ({ row }) => (
          <div>
            <p className="text-xs sm:text-sm">
              {row.original.department}
            </p>
            <p className="text-xs text-gray-500">
              {row.original.role}
            </p>
          </div>
        ),
      },
      {
        header: "Bank Account",
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="text-xs sm:text-sm">
              {row.original.bank}
            </span>
            {row.original.info && (
              <Badge text={row.original.info} variant="red1" />
            )}
          </div>
        ),
      },
      {
        header: "Risk Type",
        cell: ({ row }) => (
          <Badge text={row.original.risk} variant="red" />
        ),
      },
      {
        header: "Severity",
        cell: ({ row }) => (
          <Badge
            text={row.original.severity}
            variant={
              row.original.severity === "Critical"
                ? "red"
                : row.original.severity === "Medium"
                ? "yellow"
                : "orange"
            }
          />
        ),
      },
      {
        header: "Status",
        cell: ({ row }) => (
          <Badge
            text={row.original.status}
            icon={row.original.icon}
            variant={
              row.original.status === "Verified"
                ? "green"
                : "red"
            }
          />
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="text-center">
            <Link
              to={`/employee/${row.original.id}`}
              className="hidden md:block text-xs sm:text-sm hover:underline"
            >
              View Details
            </Link>
            <Link
              to={`/employee/${row.original.id}`}
              className="md:hidden"
            >
              <Eye />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  //  Table Instance
  const table = useReactTable({
    data: filteredEmployees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden dark:bg-white/[0.03] dark:border-gray-700 dark:text-white">
      {/* Filters */}
      <div className="p-3 sm:p-4 border-b flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Search by name, employee ID, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 sm:gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm"
          >
            <option>All Status</option>
            <option>Flagged</option>
            <option>Verified</option>
            <option>Pending</option>
          </select>

          <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs dark:bg-white/[0.03] dark:text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 sm:px-6 py-3 sm:py-4 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No employees found matching your criteria
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 sm:px-6 py-3 sm:py-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;