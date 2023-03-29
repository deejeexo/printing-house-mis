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
import React, { useState } from "react";
import { ConsumableTypes } from "../../data/ConsumableTypes";
import { reloadPage } from "../../utils/reloadPage";
import { IConsumable } from "../interfaces/IConsumable";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";

function ConsumableFormDialog(props: IFormDialogProps<IConsumable>) {
  const [consumableType, setConsumableType] = useState("");
  const [fieldEroor, setFieldError] = useState<boolean>(false);

  const handleTypeChange = (event: SelectChangeEvent) => {
    setConsumableType(event.target.value);
  };

  const handleNewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const consumableType = data.get("consumableType");
    const unitPrice = data.get("unitPrice");
    const quantity = data.get("quantity");
    const consumableTypeValue = consumableType
      ? parseInt(consumableType as string)
      : 0;

    data.delete("consumableType");
    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/consumable/create-consumable",
        data: {
          name: name,
          consumableType: consumableTypeValue,
          unitPrice: unitPrice,
          quantity: quantity,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }
    setConsumableType("");
    props.resetFormDefaultValues();
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const consumableType = data.get("consumableType");
    const unitPrice = data.get("unitPrice");
    const quantity = data.get("quantity");
    const consumableTypeValue = consumableType
      ? parseInt(consumableType as string)
      : 0;

    data.delete("consumableType");
    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/consumable/edit-consumable",
        data: {
          id: props.formDefaultValues.id,
          name: name,
          consumableType: consumableTypeValue,
          unitPrice: unitPrice,
          quantity: quantity,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }
    setConsumableType("");
    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box
          component="form"
          onSubmit={
            props.formType === "NewForm" ? handleNewSubmit : handleEditSubmit
          }
          sx={{ mt: 1 }}
        >
          {props.formType === "NewForm" ? (
            <DialogTitle>
              Naujos eksploatacinės medžiagos pridėjimas
            </DialogTitle>
          ) : (
            <DialogTitle>
              Eksploatacinės medžiagos informacijos atnaujinimas
            </DialogTitle>
          )}
          <DialogContent>
            {props.formType === "NewForm" ? (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, naujoji eksploatacinė medžiaga
                yra įtraukiama į sąrašą ir tampa oficialia organizacijos dalimi.
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, eksploatacinės medžiagos
                informacija yra atnaujinama.
              </DialogContentText>
            )}
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="name"
              label="Eksploatacinės medžiagos identifikatorius"
              name="name"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.name}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              type="number"
              fullWidth
              id="unitPrice"
              label="Kaina (vnt.) [€]"
              name="unitPrice"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.unitPrice}
            />
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
              defaultValue={props.formDefaultValues.quantity}
            />
            <FormControl fullWidth>
              <InputLabel id="consumableType">Tipas</InputLabel>
              <Select
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleTypeChange}
                labelId="consumableType"
                id="consumableType"
                name="consumableType"
                label="Tipas"
                value={consumableType || props.formDefaultValues.consumableType}
                fullWidth
                error={fieldEroor}
              >
                {ConsumableTypes.map((consumableType) => (
                  <MenuItem
                    key={consumableType.value}
                    value={consumableType.value}
                  >
                    {consumableType.label}
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

export default ConsumableFormDialog;
