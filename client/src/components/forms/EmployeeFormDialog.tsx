import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import { Positions } from "../../data/Positions";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";

export default function EmployeeFormDialog(props: IFormDialogProps) {
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [fieldEroor, setFieldError] = useState<boolean>(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value);
  };

  const handleChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  const handleNewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const name = data.get("name");
    const phoneNumber = data.get("phone");
    const password = data.get("password");
    const address = data.get("address");
    const position = data.get("position");
    const salary = data.get("salary");
    console.log(
      email,
      name,
      password,
      removeWhitespaces(phoneNumber),
      address,
      position,
      salary
    );
    setPhone("");
    setPosition("");
    props.resetFormDefaultValues();
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const name = data.get("name");
    const phoneNumber = data.get("phone");
    const address = data.get("address");
    const position = data.get("position");
    const salary = data.get("salary");
    console.log(
      email,
      name,
      removeWhitespaces(phoneNumber),
      address,
      position,
      salary
    );
    setPhone("");
    setPosition("");
    props.resetFormDefaultValues();
  };

  function removeWhitespaces(str: any): string {
    return str.replace(/\s/g, "");
  }

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
            <DialogTitle>Naujo darbuotojo pridėjimas</DialogTitle>
          ) : (
            <DialogTitle>Darbuotojo informacijos atnaujinimas</DialogTitle>
          )}
          <DialogContent>
            {props.formType === "NewForm" ? (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, naujojo darbuotojo profilis
                įtraukiamas į įmonės darbuotojų sąrašą ir tampa oficialia
                organizacijos dalimi.
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ mb: 2 }}>
                Įvedus ir išsaugojus informaciją, darbuotojo profilis yra
                atnaujinimas.
              </DialogContentText>
            )}
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              autoComplete="email"
              placeholder="Darbuotojo el. pašto galūnė turi baigtis '@printhaus.com'"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.email}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="name"
              label="Darbuotojo vardas, pavardė"
              name="name"
              autoComplete="name"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.name}
            />
            {props.formType === "NewForm" && (
              <TextField
                sx={{ marginBottom: 3 }}
                onFocus={() => {
                  setFieldError(false);
                }}
                fullWidth
                name="password"
                label="Slaptažodis"
                type="password"
                id="password"
                error={fieldEroor}
                autoComplete="current-password"
              />
            )}
            <MuiTelInput
              sx={{ marginBottom: 3 }}
              value={phone || props.formDefaultValues.phoneNumber}
              onChange={handleChange}
              fullWidth
              name="phone"
              label="Tel. numeris"
              placeholder="Pradėkite įvedimą nuo savo šalies kodo (pvz. +370)"
              // sx={{ marginTop: 2 }}
              error={fieldEroor}
              onlyCountries={["LT"]}
              langOfCountryName="LT"
            />
            <TextField
              sx={{ marginBottom: 3 }}
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              // sx={{ marginTop: 3, marginBottom: 3 }}
              id="address"
              label="Adresas"
              name="address"
              placeholder="pvz. Gedimino pr. 28, LT-01104, Vilniaus m. sav."
              autoComplete="address"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.address}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              type="number"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="salary"
              label="Alyginimas"
              name="salary"
              autoComplete="salary"
              error={fieldEroor}
              defaultValue={props.formDefaultValues.salary}
            />
            <FormControl fullWidth>
              <InputLabel id="position">Pareigos</InputLabel>
              <Select
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleSelectChange}
                labelId="position"
                id="position"
                name="position"
                label="Pareigos"
                value={position || props.formDefaultValues.position}
                fullWidth
                error={fieldEroor}
              >
                {Positions.map((position) => (
                  <MenuItem key={position.value} value={position.value}>
                    {position.label}
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