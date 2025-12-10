"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import type { Company } from "./type";

// AG-Grid Modules
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CompanyTable({ data }: { data: Company[] }) {
  const [rowData] = useState<Company[]>(data);

  const columnDefs = useMemo<ColDef<Company>[]>(
    () => [
      { headerName: "Company", field: "company_name", filter: true },
      { headerName: "Email", field: "email", filter: true },
      { headerName: "Mobile", field: "mobile" },
      { headerName: "Status", field: "status", filter: true },
      {
        headerName: "Created",
        field: "created_at",
        valueFormatter: (params) =>
          params.value ? new Date(params.value).toLocaleDateString() : "",
      },
    ],
    []
  );

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
      />
    </div>
  );
}
