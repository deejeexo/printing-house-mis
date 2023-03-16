import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import NewReviewFormDialog from "../../components/forms/NewReviewFormDialog";
import OrderViewFormDialog from "../../components/forms/OrderViewFormDialog";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IOrder } from "../../components/interfaces/IOrder";
import { JobStatuses } from "../../data/JobStatuses";

function OrdersPage() {
  const initialFormDefaultValues: IOrder = {
    customerId: "",
    name: "",
    description: "",
    fileUrl: "",
    quantity: 0,
    jobStatus: 0,
    due: "",
    rating: null,
    feedback: null,
    id: "",
  };

  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formDefaultValues, setFormDefaultValues] = useState<IOrder>(
    initialFormDefaultValues
  );
  const [formType, setFormType] =
    useState<IFormDialogProps<IOrder>["formType"]>("NewForm");
  const [rows, setRows] = useState<IOrder[]>([]);

  const handleListSelect = (selectedItem: IOrder) => {
    if (selectedItem !== undefined) {
      setFormDefaultValues({
        id: selectedItem.id,
        customerId: selectedItem.customerId,
        name: selectedItem.name,
        description: selectedItem.description,
        fileUrl: selectedItem.fileUrl,
        quantity: selectedItem.quantity,
        jobStatus: selectedItem.jobStatus,
        due: selectedItem.due,
        rating: selectedItem.rating,
        feedback: selectedItem.feedback,
      });
      setFormType("ViewForm");
    } else {
      setFormType("NoPreference");
      setFormDefaultValues(initialFormDefaultValues);
    }
  };

  const resetFormValues = () => {
    setFormDefaultValues(initialFormDefaultValues);
    setFormType("NoPreference");
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
        disabled={formType === "ViewForm" ? false : true}
        onClick={() => {
          handleOpen();
        }}
      >
        Peržiūrėti užsakymo informaciją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        disabled={formDefaultValues.jobStatus === 15 ? false : true}
        onClick={() => {
          handleOpenReview();
        }}
      >
        Pateikti atsiliepimą
      </Button>
      <DataGridWindow
        columns={columns}
        rows={rows}
        handleListSelect={handleListSelect}
      />
      <OrderViewFormDialog
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      ></OrderViewFormDialog>
      <NewReviewFormDialog
        handleOpen={handleOpenReview}
        handleClose={handleCloseReview}
        open={openReview}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      ></NewReviewFormDialog>
    </Paper>
  );
}

export default OrdersPage;
