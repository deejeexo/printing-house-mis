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
import { IConsumable } from "../interfaces/IConsumable";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IJobConsumable } from "../interfaces/IJobConsumable";

function JobConsumableFormDialog(props: IFormDialogProps<IJobConsumable>) {
  const [consumable, setConsumable] = useState("");
  const [consumablesList, setConsumablesList] = useState<IConsumable[]>([]);
  const [fieldEroor, setFieldError] = useState<boolean>(false);

  const handleConsumableChange = (event: SelectChangeEvent) => {
    setConsumable(event.target.value);
  };

  useEffect(() => {
    axios.get<IConsumable[]>(`https://localhost:7198/consumable/all`, {}).then(
      (response) => {
        setConsumablesList(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleNewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const consumableId = data.get("consumable");
    const quantityUsed = data.get("quantity");

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/add-job-consumable",
        data: {
          jobId: props.jobId,
          consumableId: consumableId,
          quantityUsed: quantityUsed,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }
    setConsumable("");
    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleNewSubmit} sx={{ mt: 1 }}>
          <DialogTitle>
            Pridėti eksploatacinę medžiagą prie užsakymo
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Įvedus ir išsaugojus informaciją, eksploatacinė medžiaga yra
              priskiriama prie šio užsakymo
            </DialogContentText>
            <FormControl fullWidth>
              <InputLabel id="consumable">Eksploatacinė medžiaga</InputLabel>
              <Select
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleConsumableChange}
                labelId="consumable"
                id="consumable"
                name="consumable"
                value={consumable}
                label="Eksploatacinė medžiaga"
                fullWidth
                error={fieldEroor}
              >
                {consumablesList.map((consumable) => (
                  <MenuItem key={consumable.id} value={consumable.id}>
                    {consumable.name}
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
              id="quantity"
              label="Kiekis"
              name="quantity"
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

export default JobConsumableFormDialog;
