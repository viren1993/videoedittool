"use client";

import React, { useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  GridApi,
  ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Company } from "./type";

ModuleRegistry.registerModules([AllCommunityModule]);

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
  ]);

  const defaultColDef = { flex: 1 };
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
        pagination={true}               // ✅ enable pagination
        paginationPageSize={20}         // ✅ 20 rows per page
        paginationPageSizeSelector={[20, 50, 100]} // optional: dropdown
      />
    </div>
  );
}
