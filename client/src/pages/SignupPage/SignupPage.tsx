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
          <LogoComponent></LogoComponent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5, width: 600 }}
          >
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              error={fieldEroor}
              autoFocus
            />
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              id="name"
              label="Full name"
              name="name"
              autoComplete="name"
              error={fieldEroor}
            />
            <TextField
              onFocus={() => {
                setFieldError(false);
              }}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={fieldEroor}
              autoComplete="current-password"
            />
            <MuiTelInput
              value={phone}
              onChange={handleChange}
              fullWidth
              label="Phone number"
              placeholder="Start entering with your country code (ex. +370)"
              sx={{ marginTop: 2 }}
              error={fieldEroor}
            />
            <TextField
              margin="normal"
              onFocus={() => {
                setFieldError(false);
              }}
              fullWidth
              sx={{ marginTop: 3 }}
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
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
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}
