"use client";

import React, { useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  GridApi,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import DeleteCustomer from "./deleteCustomer";
import EditCustomer from "./editCustomer";
import { CustomerPorps } from "./type";

ModuleRegistry.registerModules([AllCommunityModule]);

const ActionCellRenderer = (props: ICellRendererParams<CustomerPorps>) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
      {/* <EditCustomer data={props?.data} /> */}
      <DeleteCustomer data={props?.data} />
    </div>
  );
  //
};

export default function CustomerTable({ data }: { data: CustomerPorps[] }) {
  const [rowData] = useState<CustomerPorps[]>(data);
  const [colDefs] = useState<ColDef<CustomerPorps>[]>([
    { headerName: "Company", field: "customer_company_name", filter: true },
    { headerName: "Full Name", field: "full_name", filter: true },
    { headerName: "Email", field: "user.email", filter: true },
    { headerName: "Mobile", field: "phone_number" },
    { headerName: "Status", field: "status", filter: true },
    { headerName: "City", field: "city" },
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

  const [gridApi, setGridApi] = useState<GridApi<CustomerPorps> | null>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api as GridApi<CustomerPorps>);

    // Simulate loading time
    setTimeout(() => {
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
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />

        <button
          onClick={handleSlowCsvDownload}
        >
          Download CSV (Slow)
        </button>
      </div>

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
