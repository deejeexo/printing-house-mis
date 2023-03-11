import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Equipments } from "../../data/Equipments";
import { EquipmentStatuses } from "../../data/EquipmentStatuses";
import { IEquipment } from "../interfaces/IEquipment";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";

function EquipmentFormDialog(props: IFormDialogProps<IEquipment>) {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [fieldEroor, setFieldError] = useState<boolean>(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const type = data.get("type");
    const status = data.get("status");
    console.log(name, type, status);
    setStatus("");
    setType("");
    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {props.formType === "NewForm" ? (
            <DialogTitle>Naujos įrangos pridėjimas</DialogTitle>
          ) : (
            <DialogTitle>Įrangos redagavimas</DialogTitle>
          )}
          <DialogContent>
            {props.formType === "NewForm" ? (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, naujoji įranga yra įtraukiama
                į įrangos sąrašą ir tampa oficialia organizacijos dalimi.
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, įrangos informacija yra
                atnaujinama.
              </DialogContentText>
            )}
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="name"
              label="Įrangos identifikatorius"
              name="name"
              autoComplete="name"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.name}
            />
            <FormControl fullWidth>
              <InputLabel id="type">Tipas</InputLabel>
              <Select
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleTypeChange}
                labelId="type"
                id="type"
                name="type"
                label="Tipas"
                value={type || props.formDefaultValues.type}
                fullWidth
                error={fieldEroor}
              >
                {Equipments.map((equipment) => (
                  <MenuItem key={equipment.value} value={equipment.value}>
                    {equipment.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="status">Statusas</InputLabel>
              <Select
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleStatusChange}
                labelId="status"
                id="status"
                name="status"
                label="Statusas"
                value={status || props.formDefaultValues.status}
                fullWidth
                error={fieldEroor}
              >
                {EquipmentStatuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.handleClose();
                props.resetFormDefaultValues();
              }}
            >
              Atšaukti
            </Button>
            <Button type="submit" onClick={props.handleClose}>
              Išsaugoti
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default EquipmentFormDialog;
