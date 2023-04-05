import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import EmployeeFormDialog from "../../components/forms/EmployeeFormDialog";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IUser } from "../../components/interfaces/IUser";
import { Positions } from "../../data/Positions";
import { UserTypes } from "../../data/UserTypes";
import { reloadPage } from "../../utils/reloadPage";

function EmployeesManagerPage() {
  const initialFormDefaultValues: IUser = {
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    position: "",
    userType: 0,
  };

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<IUser[]>([]);
  const [formDefaultValues, setFormDefaultValues] = useState<IUser>(
    initialFormDefaultValues
  );
  const [formType, setFormType] =
    useState<IFormDialogProps<IUser>["formType"]>("NewForm");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListSelect = (selectedItem: IUser) => {
    if (selectedItem !== undefined) {
      setFormDefaultValues({
        id: selectedItem.id,
        fullName: selectedItem.fullName,
        email: selectedItem.email,
        phoneNumber: selectedItem.phoneNumber,
        address: selectedItem.address,
        position: selectedItem.position,
        userType: selectedItem.userType,
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

  useEffect(() => {
    axios.get<IUser[]>(`https://localhost:7198/user/employees`, {}).then(
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
    {
      field: "fullName",
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
      field: "userType",
      headerName: "Paskyros būsena",
      valueGetter: (params) => {
        const userType = UserTypes.find(
          (pos) => pos.value === Number(params.row.userType)
        )?.label;
        return userType || params.row.userType;
      },
      width: 300,
      editable: false,
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
        Pridėti naudotoją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        onClick={() => {
          handleOpen();
        }}
        disabled={formType === "EditForm" ? false : true}
      >
        Atnaujinti naudotojo informaciją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        disabled={formType === "EditForm" ? false : true}
        onClick={async () => {
          try {
            await axios({
              method: "post",
              url: "https://localhost:7198/user/turn-off-employee-account",
              data: {
                id: formDefaultValues.id,
              },
            });
            reloadPage(1000);
          } catch (error) {
            console.error(error);
          }
        }}
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
