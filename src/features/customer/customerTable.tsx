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
import { ICustomer } from "./type";
import { Input } from "@/components/ui/input";
import { Download, SquarePen } from "lucide-react";
import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";

ModuleRegistry.registerModules([AllCommunityModule]);

interface ActionCellRendererProps extends ICellRendererParams<ICustomer> {
  setRefreshApi: React.Dispatch<React.SetStateAction<boolean>>;
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
        <EditCustomer
          data={props?.data}
          open={open}
          setOpen={setOpen}
          setRefreshApi={props.setRefreshApi}
        />
      </Dialog.Root>
      <DeleteCustomer data={props?.data} />
    </div>
  );
};

export default function CustomerTable({ data }: { data: ICustomer[] }) {
  const [rowData] = useState<ICustomer[]>(data);
  const [colDefs] = useState<ColDef<ICustomer>[]>([
    { headerName: "Company", field: "customer_company_name", filter: true },
    { headerName: "Full Name", field: "full_name", filter: true },
    { headerName: "Email", field: "user.email", filter: true },
    { headerName: "Mobile", field: "phone_number" },
    { headerName: "Tel number", field: "telephone_number" },
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
  const [gridApi, setGridApi] = useState<GridApi<ICustomer> | null>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api as GridApi<ICustomer>);

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
      <Flex className="mb-4 mt-4 gap-4">
        <Input
          type="text"
          placeholder="Search..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />
        <Button
          className="py-2 px-6 h-[36px]"
          variant="secondary"
          onClick={handleSlowCsvDownload}
        >
          <Download />
          Download CSV
        </Button>
      </Flex>
      <div className="ag-theme-quartz" style={{ height: 440, width: "100%" }}>
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
