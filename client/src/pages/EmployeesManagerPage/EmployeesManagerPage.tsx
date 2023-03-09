import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import EmployeeFormDialog from "../../components/forms/EmployeeFormDialog";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IUser } from "../../components/interfaces/IUser";
import { Positions } from "../../data/Positions";

function EmployeesManagerPage() {
  const initialFormDefaultValues: IUser = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    position: "",
    salary: 0,
  };

  const [open, setOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState<IUser>(
    initialFormDefaultValues
  );
  const [formType, setFormType] =
    useState<IFormDialogProps["formType"]>("NewForm");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListSelect = (selectedItem: IUser) => {
    if (selectedItem !== undefined) {
      setFormDefaultValues({
        id: selectedItem.id,
        name: selectedItem.name,
        email: selectedItem.email,
        phoneNumber: selectedItem.phoneNumber,
        address: selectedItem.address,
        position: selectedItem.position,
        salary: selectedItem.salary,
      });
      setFormType("EditForm");
    } else {
      setFormType("NewForm");
      setFormDefaultValues(initialFormDefaultValues);
    }
  };

  const resetFormValues = () => {
    setFormDefaultValues(initialFormDefaultValues);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "name",
      headerName: "Vardas, pavardė",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "El. paštas",
      width: 245,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Tel. numeris",
      width: 200,
      editable: false,
    },
    {
      field: "address",
      headerName: "Adresas",
      width: 400,
      editable: false,
    },
    {
      field: "position",
      headerName: "Pareigos",
      valueGetter: (params) => {
        const positionLabel = Positions.find(
          (pos) => pos.value === Number(params.row.position)
        )?.label;
        return positionLabel || params.row.position;
      },
      width: 300,
      editable: false,
    },
    {
      field: "salary",
      headerName: "Atlyginimas (€)",
      width: 120,
      editable: false,
    },
  ];

  const rows: IUser[] = [
    {
      id: "8a5ede07-11f4-4651-8ef3-44a5167cc542",
      name: "Laurynas Maybachas",
      email: "laurynas.maybachas@printhaus.com",
      phoneNumber: "+37065476567",
      address: "Kepyklos g. 17, LT-62117, Alytaus m. sav.",
      position: "5",
      salary: 500,
    },
    {
      id: "8a5ede07-11f4-4651-8ef3-44a5167cg742",
      name: "Elvinas Skukauskas",
      email: "elvinas.skukauskas@printhaus.com",
      phoneNumber: "+37065477267",
      address: "Gintarės g. 17, LT-62117, Alytaus m. sav.",
      position: "8",
      salary: 480,
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
        disabled={formType === "NewForm" ? false : true}
        onClick={() => {
          handleOpen();
        }}
      >
        Pridėti darbuotoją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        onClick={() => {
          handleOpen();
        }}
        disabled={formType === "EditForm" ? false : true}
      >
        Atnaujinti darbuotojo informaciją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        disabled={formType === "EditForm" ? false : true}
      >
        Išjungti paskyrą
      </Button>
      <DataGridWindow
        columns={columns}
        rows={rows}
        handleListSelect={handleListSelect}
      />
      <EmployeeFormDialog
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      ></EmployeeFormDialog>
    </Paper>
  );
}

export default EmployeesManagerPage;
