import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataGridWindow from "../../components/DataGridWindow";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IOrder } from "../../components/interfaces/IOrder";
import { JobStatuses } from "../../data/JobStatuses";
import { DeliveryMethods } from "../../data/DeliveryMethods";

function OrdersManagerPage() {
  const navigate = useNavigate();
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
    curator: "",
    jobPrice: 0,
    deliveryMethod: 0,
  };

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
        customerFullName: selectedItem.customerFullName,
        name: selectedItem.name,
        description: selectedItem.description,
        fileUrl: selectedItem.fileUrl,
        quantity: selectedItem.quantity,
        jobStatus: selectedItem.jobStatus,
        due: selectedItem.due,
        rating: selectedItem.rating,
        feedback: selectedItem.feedback,
        curator: selectedItem.curator,
        jobPrice: selectedItem.jobPrice,
        deliveryMethod: selectedItem.deliveryMethod,
      });
      setFormType("Manage");
    } else {
      setFormType("NoPreference");
    }
  };

  useEffect(() => {
    const position = sessionStorage.getItem("position");
    const userID = sessionStorage.getItem("userID");
    const url =
      position === "1"
        ? "https://localhost:7198/job/all"
        : `https://localhost:7198/job/curator-jobs/${userID}`;
    axios.get<IOrder[]>(url, {}).then(
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
      renderCell: (params) => {
        const url = params.row.fileUrl;
        return url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue" }}
          >
            {url}
          </a>
        ) : null;
      },
      valueGetter: (params) => {
        const url = params.row.fileUrl;
        if (url === "") {
          return "Užsakymo failas nepateiktas";
        }
        return url;
      },
    },
    {
      field: "quantity",
      headerName: "Kiekis",
      width: 400,
      editable: false,
    },
    {
      field: "deliveryMethod",
      headerName: "Pristatymo būdas",
      valueGetter: (params) => {
        const deliveryMethodLabel = DeliveryMethods.find(
          (pos) => pos.value === Number(params.row.deliveryMethod)
        )?.label;
        return deliveryMethodLabel || params.row.deliveryMethod;
      },
      width: 400,
      editable: false,
    },
    {
      field: "jobPrice",
      headerName: "Užsakymo kaina [€]",
      width: 400,
      editable: false,
      valueGetter: (params) => {
        const jobPrice = params.row.jobPrice;
        if (jobPrice === 0) {
          return "Laukiamas kuratoriaus patvirtinimas";
        }
        return jobPrice;
      },
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
        onClick={() => {
          navigate(`/ordersmanager/${formDefaultValues.id}`, {
            state: formDefaultValues,
          });
        }}
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
