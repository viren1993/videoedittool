"use client";

import React, { useState, useCallback } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  GridApi,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@radix-ui/themes";
import { SquarePen, Trash2 } from "lucide-react";
import CompanieDelete from "./companie-delete";
import CompanieEdit from "./companie-edit";
// Assuming you have 'type.ts' defined with the Company interface
// import { Company } from "./type";

// Placeholder for the Company type if 'type.ts' is not provided
type Company = {
  company_name: string;
  email: string;
  mobile: string;
  status: string;
  created_at: string;
};

ModuleRegistry.registerModules([AllCommunityModule]);

// --- Action Cell Renderer Component ---
const ActionCellRenderer = (props: ICellRendererParams<Company>) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
      <CompanieEdit data={props?.data} />
      <CompanieDelete data={props?.data} />
    </div>
  );
  //
};

// --- Main CompanyTable Component ---
export default function CompanyTable({ data }: { data: Company[] }) {
  const [rowData] = useState<Company[]>(data);
  const [loading, setLoading] = useState(true);

  const [colDefs] = useState<ColDef<Company>[]>([
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
    {
      headerName: "Actions",
      cellRenderer: ActionCellRenderer,
      sortable: false,
      filter: false,
      maxWidth: 200,
      resizable: false,
    },
  ]);

  const defaultColDef = { flex: 1, minWidth: 150 };
  const [quickFilterText, setQuickFilterText] = useState("");

  const [gridApi, setGridApi] = useState<GridApi<Company> | null>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api as GridApi<Company>);

    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
      params.api.hideOverlay();
    }, 1500);

    params.api.showLoadingOverlay();
  };

  const handleSlowCsvDownload = () => {
    if (!gridApi) return;

    alert("Preparing CSV... This will take 3 seconds.");

    setTimeout(() => {
      gridApi.exportDataAsCsv();
    }, 3000);
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 550, width: "100%" }}>
      {/* Search + CSV */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          onClick={handleSlowCsvDownload}
          style={{
            marginLeft: "15px",
            padding: "8px 12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download CSV (Slow)
        </button>
      </div>

      {/* Grid with Pagination */}
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        quickFilterText={quickFilterText}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={20}
        paginationPageSizeSelector={[20, 50, 100]}
      />
    </div>
  );
}
