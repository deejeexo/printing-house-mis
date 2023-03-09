import Box from "@mui/material/Box";
import { DataGrid, GridRowId, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { DataGridLocale } from "../locale/DataGridLocale";
import { IDataGridWindowProps } from "./interfaces/IDataGridWindowProps";

export default function DataGridWindow(props: IDataGridWindowProps) {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<any>(props.columns);

  const handleColumnVisibilityChange = (column: any) => {
    setVisibleColumns((prevColumns: any) =>
      prevColumns.map((c: any) =>
        c.field === column.field ? { ...c, hide: !c.hide } : c
      )
    );
  };

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
          components={{ Toolbar: GridToolbar }}
          rows={props.rows}
          columns={visibleColumns}
          onColumnVisibilityChange={handleColumnVisibilityChange}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          localeText={DataGridLocale}
          selectionModel={selectionModel}
          onSelectionModelChange={(ids) => {
            if (ids.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = ids.filter((s) => !selectionSet.has(s));
              setSelectionModel(result);
            } else {
              setSelectionModel(ids);
            }
            const selectedIDs = new Set(ids);
            const selectedRows = props.rows.filter((row: any) =>
              selectedIDs.has(row.id)
            );

            props.handleListSelect(selectedRows[0]);
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
}
