import { Button, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import DataGridWindow from "../../components/DataGridWindow";
import ConsumableFormDialog from "../../components/forms/ConsumableFormDialog";
import { IConsumable } from "../../components/interfaces/IConsumable";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { ConsumableTypes } from "../../data/ConsumableTypes";
import { reloadPage } from "../../utils/reloadPage";

function ConsumableManagerPage() {
  const initialFormDefaultValues: IConsumable = {
    id: "",
    name: "",
    consumableType: "",
    unitPrice: "",
    quantity: "",
  };

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<IConsumable[]>([]);
  const [formDefaultValues, setFormDefaultValues] = useState<IConsumable>(
    initialFormDefaultValues
  );
  const [formType, setFormType] =
    useState<IFormDialogProps<IConsumable>["formType"]>("NewForm");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListSelect = (selectedItem: IConsumable) => {
    if (selectedItem !== undefined) {
      setFormDefaultValues({
        id: selectedItem.id,
        name: selectedItem.name,
        consumableType: selectedItem.consumableType,
        unitPrice: selectedItem.unitPrice,
        quantity: selectedItem.quantity,
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
      headerName: "Eksploatacinės medžiagos identifikatorius",
      width: 400,
      editable: false,
    },
    {
      field: "consumableType",
      headerName: "Tipas",
      valueGetter: (params) => {
        const consumableLabel = ConsumableTypes.find(
          (pos) => pos.value === Number(params.row.consumableType)
        )?.label;
        return consumableLabel || params.row.consumableType;
      },
      width: 400,
      editable: false,
    },
    {
      field: "unitPrice",
      headerName: "Kaina (vnt.) €",
      width: 400,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Kiekis",
      width: 400,
      editable: false,
    },
  ];

  useEffect(() => {
    axios.get<IConsumable[]>(`https://localhost:7198/consumable/all`, {}).then(
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
        Pridėti eksploatacinė medžiagą
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        onClick={() => {
          handleOpen();
        }}
        disabled={formType === "EditForm" ? false : true}
      >
        Atnaujinti informaciją
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 1, mb: 1, ml: 1, textTransform: "none" }}
        onClick={async () => {
          try {
            await axios({
              method: "delete",
              url: `https://localhost:7198/consumable/delete-consumable/${formDefaultValues.id}`,
            });
            reloadPage(1000);
          } catch (error) {
            console.error(error);
          }
        }}
        disabled={formType === "EditForm" ? false : true}
      >
        Panaikinti medžiagą
      </Button>
      <DataGridWindow
        columns={columns}
        rows={rows}
        handleListSelect={handleListSelect}
      />
      <ConsumableFormDialog
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      ></ConsumableFormDialog>
    </Paper>
  );
}

export default ConsumableManagerPage;
