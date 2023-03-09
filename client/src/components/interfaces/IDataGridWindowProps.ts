import { GridColDef } from "@mui/x-data-grid";

export interface IDataGridWindowProps {
  columns: GridColDef[];
  rows: any[];
  handleListSelect: (selectedItem: any) => void;
}
