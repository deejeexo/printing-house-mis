import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IOrder } from "../../components/interfaces/IOrder";
import { JobStatuses } from "../../data/JobStatuses";

function OrdersManagerPage() {
  const [formType, setFormType] =
    useState<IFormDialogProps<IOrder>["formType"]>("NewForm");
  const [rows, setRows] = useState<IOrder[]>([]);

  const handleListSelect = (selectedItem: IOrder) => {
    if (selectedItem !== undefined) {
      setFormType("Manage");
    } else {
      setFormType("NoPreference");
    }
  };

  useEffect(() => {
    axios.get<IOrder[]>(`https://localhost:7198/job/all`, {}).then(
      (response) => {
        setRows(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "customerId", headerName: "Customer ID", width: 90, hide: true },
    {
      field: "name",
      headerName: "Užsakymo pavadinimas",
      width: 400,
      editable: false,
    },
    {
      field: "customerFullName",
      headerName: "Kliento vardas, pavardė",
      width: 400,
      editable: false,
    },
    {
      field: "description",
      headerName: "Užsakymo apibūdinimas",
      width: 400,
      editable: false,
    },
    {
      field: "fileUrl",
      headerName: "Užsakymo failas",
      width: 400,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Kiekis",
      width: 400,
      editable: false,
    },
    {
      field: "jobStatus",
      headerName: "Statusas",
      valueGetter: (params) => {
        const jobStatusLabel = JobStatuses.find(
          (pos) => pos.value === Number(params.row.jobStatus)
        )?.label;
        return jobStatusLabel || params.row.jobStatus;
      },
      width: 400,
      editable: false,
    },
    {
      field: "due",
      headerName: "Planuojama įgyvendinimo data",
      width: 400,
      editable: false,
      valueGetter: (params) => {
        const dateTimeStr = params.row.due;
        const dateStr = dateTimeStr.split("T")[0];
        return dateStr;
      },
    },
  ];

  return (
    <Paper
      sx={{
        maxWidth: 1500,
        margin: "auto",
        overflow: "hidden",
        backgroundColor: "#e0e8eb",
      }}
      elevation={0}
    >
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        disabled={formType === "Manage" ? false : true}
        onClick={() => {}}
      >
        Valdyti užsakymą
      </Button>
      <DataGridWindow
        columns={columns}
        rows={rows}
        handleListSelect={handleListSelect}
      />
    </Paper>
  );
}

export default OrdersManagerPage;
