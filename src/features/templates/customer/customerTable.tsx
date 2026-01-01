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
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { Flex } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { ICustomer } from "@/features/customer/type";
import { useParams } from "next/navigation";
import Link from "next/link";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerTable({ data }: { data: ICustomer[] }) {
  const params = useParams();
  const templateId = params.id;
  const [rowData] = useState<ICustomer[]>(data);
  const [colDefs] = useState<ColDef<ICustomer>[]>([
    { headerName: "Company", field: "customer_company_name", filter: true },
    { headerName: "Full Name", field: "full_name", filter: true },
    { headerName: "Email", field: "user.email", filter: true },
    // { headerName: "Mobile", field: "phone_number" },
    // { headerName: "Tel number", field: "telephone_number" },
    { headerName: "Status", field: "status", filter: true },
    // { headerName: "City", field: "city" },
    // {
    //   headerName: "Created",
    //   field: "created_at",
    //   valueFormatter: (params) =>
    //     params.value ? new Date(params.value).toLocaleDateString() : "",
    // },
    {
      headerName: "Link",
      field: "id",
      cellRenderer: (params: ICellRendererParams<ICustomer>) => {
        const templateId = params.context.templateId; // passed through grid context
        const customerId = params.value;

        return (
          <Link
            className="text-blue-600 underline"
            href={`/customer/${templateId}/${customerId}`}
          >
            Open
          </Link>
        );
      },
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
          paginationPageSize={50}
          paginationPageSizeSelector={[20, 50, 100]}
          context={{ templateId }}
        />
      </div>
    </>
  );
}
