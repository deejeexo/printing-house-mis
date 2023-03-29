import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import EquipmentFormDialog from "../../components/forms/EquipmentFormDialog";
import { IEquipment } from "../../components/interfaces/IEquipment";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { Equipments } from "../../data/Equipments";
import { EquipmentStatuses } from "../../data/EquipmentStatuses";

function EquipmentManagerPage() {
  const initialFormDefaultValues: IEquipment = {
    id: "",
    name: "",
    type: "",
    status: "",
    costPerHour: 0,
  };

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<IEquipment[]>([]);
  const [formDefaultValues, setFormDefaultValues] = useState<IEquipment>(
    initialFormDefaultValues
  );
  const [formType, setFormType] =
    useState<IFormDialogProps<IEquipment>["formType"]>("NewForm");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListSelect = (selectedItem: IEquipment) => {
    if (selectedItem !== undefined) {
      setFormDefaultValues({
        id: selectedItem.id,
        name: selectedItem.name,
        type: selectedItem.type,
        status: selectedItem.status,
        costPerHour: selectedItem.costPerHour,
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
      headerName: "Įrenginio identifikatorius",
      width: 400,
      editable: false,
    },
    {
      field: "type",
      headerName: "Tipas",
      valueGetter: (params) => {
        const equipmentLabel = Equipments.find(
          (pos) => pos.value === Number(params.row.type)
        )?.label;
        return equipmentLabel || params.row.type;
      },
      width: 400,
      editable: false,
    },
    {
      field: "status",
      headerName: "Statusas",
      valueGetter: (params) => {
        const equipmentStatusLabel = EquipmentStatuses.find(
          (pos) => pos.value === Number(params.row.status)
        )?.label;
        return equipmentStatusLabel || params.row.status;
      },
      width: 400,
      editable: false,
    },
    {
      field: "costPerHour",
      headerName: "Valandos kaina",
      width: 400,
      editable: false,
    },
  ];

  useEffect(() => {
    axios.get<IEquipment[]>(`https://localhost:7198/equipment/all`, {}).then(
      (response) => {
        setRows(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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
        Pridėti įrangą
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        onClick={() => {
          handleOpen();
        }}
        disabled={formType === "EditForm" ? false : true}
      >
        Atnaujinti įrangos informaciją
      </Button>
      <DataGridWindow
        columns={columns}
        rows={rows}
        handleListSelect={handleListSelect}
      />
      <EquipmentFormDialog
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      ></EquipmentFormDialog>
    </Paper>
  );
}

export default EquipmentManagerPage;
