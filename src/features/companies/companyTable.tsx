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
import DeleteCompanie from "./deleteCompanie";
import EditCompanie from "./editCompanie";
import { Dialog, Flex, Grid, IconButton } from "@radix-ui/themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <IconButton color="violet" variant="soft">
            <SquarePen width="18" height="18" />
          </IconButton>
        </Dialog.Trigger>
        <EditCompanie data={props?.data} open={open} setOpen={setOpen} />
      </Dialog.Root>
      <DeleteCompanie data={props?.data} />
    </div>
  );
  //
};

// --- Main CompanyTable Component ---
export default function CompanyTable({ data }: { data: Company[] }) {
  const [rowData] = useState<Company[]>(data);

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
    <>
      <Flex className="gap-4 justify-between mt-4 mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />
        <Button variant="secondary" onClick={handleSlowCsvDownload}>
          Download CSV
        </Button>
      </Flex>
      <div
        className="ag-theme-alpine"
        style={{ height: "440px", width: "100%" }}
      >
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
    </>
  );
}
