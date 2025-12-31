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
import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import ForgotPasswordCompanie from "./forgotPasswordCompanie";

type Company = {
  company_name: string;
  email: string;
  mobile: string;
  status: string;
  created_at: string;
};

ModuleRegistry.registerModules([AllCommunityModule]);

interface ActionCellRendererProps extends ICellRendererParams<Company> {
  setRefreshApi: () => void;
}

const ActionCellRenderer = (props: ActionCellRendererProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "3px" }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <IconButton color="violet" variant="soft">
            <SquarePen width="18" height="18" />
          </IconButton>
        </Dialog.Trigger>
        <EditCompanie
          data={props?.data}
          open={open}
          setOpen={setOpen}
          setRefreshApi={props.setRefreshApi}
        />
      </Dialog.Root>
      <DeleteCompanie data={props?.data} setRefreshApi={props.setRefreshApi} />
      <ForgotPasswordCompanie
        data={props?.data}
        setRefreshApi={props.setRefreshApi}
      />
    </div>
  );
};

interface CompanyTableProps {
  data: Company[];
  setRefreshApi: () => void;
}

export default function CompanyTable({
  data,
  setRefreshApi,
}: CompanyTableProps) {
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
      cellRenderer: (params: any) => (
        <ActionCellRenderer {...params} setRefreshApi={setRefreshApi} />
      ),
      sortable: false,
      filter: false,
      maxWidth: 200,
      resizable: false,
    },
  ]);
  const defaultColDef = { flex: 1, minWidth: 150 };
  const [quickFilterText, setQuickFilterText] = useState("");
  const [gridApi, setGridApi] = useState<GridApi<Company> | null>(null);
  const theme = localStorage.getItem("theme");

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
        className={
          theme === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"
        }
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
