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
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IUser } from "../interfaces/IUser";

function AddCuratorFormDialog(props: IFormDialogProps<IUser[]>) {
  const [employee, setEmployee] = useState("");
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setEmployee(event.target.value);
  };

  const handleNewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const employeeGuid = data.get("employee");

    console.log(employeeGuid);

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/add-curator",
        data: {
          jobId: props.jobId,
          curator: employeeGuid,
        },
      });
      navigate("/ordersmanager");
    } catch (error) {
      console.error(error);
    }
    setEmployee("");
    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleNewSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Priskirti užsakymo kuratorių</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Įvedus ir išsaugojus informaciją, kuratorius yra priskiriamas prie
              šio užsakymo ir galės ji valdyti
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="consumableType">
                Atsakingas darbuotojas
              </InputLabel>
              <Select
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleTypeChange}
                labelId="employee"
                id="employee"
                name="employee"
                value={employee}
                label="Atsakingas darbuotojas"
                fullWidth
                error={fieldEroor}
              >
                {props.formDefaultValues.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.fullName}
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

export default AddCuratorFormDialog;
