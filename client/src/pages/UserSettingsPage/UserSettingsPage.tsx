import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { MuiTelInput } from "mui-tel-input";
import { useEffect, useState } from "react";
import { IUser } from "../../components/interfaces/IUser";
import { reloadPage } from "../../utils/reloadPage";

function UserSettingsPage() {
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState<IUser>();
  const [key, setKey] = useState(0);

  const handleChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  useEffect(() => {
    axios
      .get<IUser>(
        `https://localhost:7198/user/${sessionStorage.getItem("userID")}`,
        {}
      )
      .then(
        (response) => {
          setUser(response.data);
          setKey((prevKey) => prevKey + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function removeWhitespaces(str: any): string {
    return str.replace(/\s/g, "");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const address = data.get("address");

    data.delete("position");
    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/user/update-user",
        data: {
          id: sessionStorage.getItem("userID"),
          fullName: name,
          email: user?.email,
          phoneNumber: removeWhitespaces(phone),
          address: address,
          position: user?.position,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: "auto",
        overflow: "hidden",
        padding: 2,
      }}
      elevation={0}
    >
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          key={`name-${key}`}
          margin="normal"
          onFocus={() => {
            setFieldError(false);
          }}
          fullWidth
          id="name"
          defaultValue={user?.fullName}
          label="Jūsų vardas, pavardė"
          name="name"
          error={fieldEroor}
        />
        <TextField
          key={`address-${key}`}
          margin="normal"
          onFocus={() => {
            setFieldError(false);
          }}
          fullWidth
          defaultValue={user?.address}
          id="address"
          label="Adresas"
          name="address"
          placeholder="pvz. Gedimino pr. 28, LT-01104, Vilniaus m. sav."
          error={fieldEroor}
        />
        <MuiTelInput
          value={phone || user?.phoneNumber}
          onChange={handleChange}
          fullWidth
          label="Tel. numeris"
          placeholder="Pradėkite įvedimą nuo savo šalies kodo (pvz. +370)"
          sx={{ marginTop: 2 }}
          error={fieldEroor}
          onlyCountries={["LT"]}
          langOfCountryName="LT"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Patvirtinti paskyros redagavimą
        </Button>
      </Box>
    </Paper>
  );
}

export default UserSettingsPage;
