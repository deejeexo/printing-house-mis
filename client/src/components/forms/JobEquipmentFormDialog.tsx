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
import axios from "axios";
import { useEffect, useState } from "react";
import { reloadPage } from "../../utils/reloadPage";
import { IEquipment } from "../interfaces/IEquipment";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IJobEquipment } from "../interfaces/IJobEquipment";

function JobEquipmentFormDialog(props: IFormDialogProps<IJobEquipment>) {
  const [equipment, setEquipment] = useState("");
  const [equipmentsList, setEquipmentsList] = useState<IEquipment[]>([]);
  const [fieldEroor, setFieldError] = useState<boolean>(false);

  const handleEquipmentChange = (event: SelectChangeEvent) => {
    setEquipment(event.target.value);
  };

  useEffect(() => {
    axios.get<IEquipment[]>(`https://localhost:7198/equipment/all`, {}).then(
      (response) => {
        setEquipmentsList(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleNewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const equipmentId = data.get("equipment");
    const hours = data.get("hours");

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/add-job-equipment",
        data: {
          jobId: props.jobId,
          equipmentId: equipmentId,
          hours: hours,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }
    setEquipment("");
    props.resetFormDefaultValues();
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleNewSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Pridėti įrangą prie užsakymo</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Įvedus ir išsaugojus informaciją, įranga yra priskiriama prie šio
              užsakymo
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="consumable">Įranga</InputLabel>
              <Select
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleEquipmentChange}
                labelId="equipment"
                id="equipment"
                name="equipment"
                value={equipment}
                label="Įranga"
                fullWidth
                error={fieldEroor}
              >
                {equipmentsList.map((equipment) => (
                  <MenuItem key={equipment.id} value={equipment.id}>
                    {equipment.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              type="number"
              fullWidth
              id="hours"
              label="Sunaudotos valandos"
              name="hours"
              error={fieldEroor}
            />
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

export default JobEquipmentFormDialog;
