import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { MuiTelInput } from "mui-tel-input";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoComponent from "../../assets/LogoComponent";

export default function SignupPage() {
  const navigate = useNavigate();
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const [phone, setPhone] = React.useState("");

  const handleChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  function removeWhitespaces(str: string): string {
    return str.replace(/\s/g, "");
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("https://localhost:7244/user/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then(
        (response) => {
          sessionStorage.setItem("userID", response.data.id);
          sessionStorage.setItem("roleID", response.data.role);
          navigate("/home");
        },
        (error) => {
          setFieldError(true);
          console.log(error);
        }
      );
  };

  return (
    <div className="flex justify-center items-center h-screen animate-ping-short">
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={0}
        border={1}
        borderColor={"silver"}
        borderRadius={10}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoComponent color="black"></LogoComponent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="email"
              label="El. paštas"
              name="email"
              error={fieldEroor}
            />
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="name"
              label="Jūsų vardas, pavardė"
              name="name"
              error={fieldEroor}
            />
            <TextField
              onFocus={() => {
                setFieldError(false);
              }}
              margin="normal"
              fullWidth
              name="password"
              label="Slaptažodis"
              type="password"
              id="password"
              error={fieldEroor}
            />
            <MuiTelInput
              value={phone}
              onChange={handleChange}
              fullWidth
              label="Tel. numeris"
              placeholder="Pradėkite įvedimą nuo savo šalies kodo (pvz. +370)"
              sx={{ marginTop: 2 }}
              error={fieldEroor}
              onlyCountries={["LT"]}
              langOfCountryName="LT"
            />
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              sx={{ marginTop: 3 }}
              id="address"
              label="Adresas"
              name="address"
              placeholder="pvz. Gedimino pr. 28, LT-01104, Vilniaus m. sav."
              error={fieldEroor}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => {
                console.log(removeWhitespaces(phone));
              }}
            >
              Registruotis
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
