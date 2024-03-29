import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import {
  Alert,
  Box,
  Button,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useRef, useState } from "react";
import { IFileUploadReponse } from "../../components/interfaces/IFileUploadResponse";
import { DeliveryMethods } from "../../data/DeliveryMethods";
import { reloadPage } from "../../utils/reloadPage";

function NewOrderPage() {
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const currentDate: Date = new Date();
  const [deliveryMethod, setDeliveryMethod] = useState("1");

  const handleStatusChange = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value);
  };

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setLoaded(false);
  };

  const handleSubmitWithFile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    const filledFormData = new FormData(event.currentTarget);
    formData.append("file", selectedFile as File);
    let fileUploadResponse: IFileUploadReponse;
    try {
      const response = await axios<IFileUploadReponse>({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        url: "https://file.io/",
        data: formData,
      });
      fileUploadResponse = response.data;
    } catch (error) {
      setError(true);
      reloadPage(2000);
      return;
    }

    const customerId = sessionStorage.getItem("userID");
    const name = filledFormData.get("name");
    const description = filledFormData.get("description");
    const fileUrl = fileUploadResponse.link;
    const quantity = filledFormData.get("quantity");
    const jobStatus = 16;
    const deliveryMethod = filledFormData.get("deliveryMethod");
    const deliveryMethodValue = filledFormData
      ? parseInt(deliveryMethod as string)
      : 0;
    const due: Date = new Date(currentDate.setDate(currentDate.getDate() + 14));

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/create-job",
        data: {
          customerId: customerId,
          name: name,
          description: description,
          fileUrl: fileUrl,
          quantity: quantity,
          jobStatus: jobStatus,
          due: due,
          deliveryMethod: deliveryMethodValue,
        },
      });
      setLoading(false);
      setLoaded(true);
      reloadPage(2000);
    } catch (error) {
      console.error(error);
      setError(true);
      reloadPage(2000);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const filledFormData = new FormData(event.currentTarget);

    const customerId = sessionStorage.getItem("userID");
    const name = filledFormData.get("name");
    const description = filledFormData.get("description");
    const fileUrl = "";
    const quantity = filledFormData.get("quantity");
    const jobStatus = 16;
    const deliveryMethod = filledFormData.get("deliveryMethod");
    const deliveryMethodValue = filledFormData
      ? parseInt(deliveryMethod as string)
      : 0;
    const due: Date = new Date(currentDate.setDate(currentDate.getDate() + 14));

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/create-job",
        data: {
          customerId: customerId,
          name: name,
          description: description,
          fileUrl: fileUrl,
          quantity: quantity,
          jobStatus: jobStatus,
          due: due,
          deliveryMethod: deliveryMethodValue,
        },
      });
      setLoading(false);
      setLoaded(true);
      reloadPage(2000);
    } catch (error) {
      console.error(error);
      setError(true);
      reloadPage(2000);
    }
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleDownload = () => {
    if (selectedFile) {
      const downloadUrl = URL.createObjectURL(selectedFile);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = selectedFile.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <>
      <Paper
        sx={{
          maxWidth: 800,
          margin: "auto",
          overflow: "hidden",
          backgroundColor: "#e0e8eb",
          border: 0,
          borderRadius: 1,
        }}
        elevation={0}
      >
        <DialogTitle>Naujo užsakymo forma</DialogTitle>
        <DialogContentText
          sx={{ marginLeft: 3, marginBottom: -1, marginRight: 3 }}
        >
          Įvedus ir išsaugojus informaciją, užsakymas yra pateikiamas
          darbuotojams, jo būseną galite stebėti „Mano užsakymai“ skiltyje.
        </DialogContentText>
        <Box
          component="form"
          noValidate
          onSubmit={selectedFile ? handleSubmitWithFile : handleSubmit}
          sx={{ padding: 2 }}
        >
          <TextField
            margin="normal"
            onFocus={() => {
              setFieldError(false);
            }}
            fullWidth
            id="name"
            label="Užsakymo pavadinimas"
            name="name"
            error={fieldEroor}
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Užsakymo apibūdinimas"
            id="description"
            error={fieldEroor}
            multiline={true}
            maxRows={5}
          />
          <TextField
            type={"number"}
            margin="normal"
            fullWidth
            name="quantity"
            label="Kiekis"
            id="quantity"
            error={fieldEroor}
          />
          <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel id="jobStatus">Pristatymo būdas</InputLabel>
            <Select
              onFocus={() => {
                setFieldError(false);
              }}
              onChange={handleStatusChange}
              labelId="deliveryMethod"
              id="deliveryMethod"
              name="deliveryMethod"
              label="Pristatymo būdas"
              fullWidth
              error={fieldEroor}
              value={deliveryMethod}
            >
              {DeliveryMethods.map((deliveryMethod) => (
                <MenuItem
                  key={deliveryMethod.value}
                  value={deliveryMethod.value}
                >
                  {deliveryMethod.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleClick}
            variant={"contained"}
            sx={{ marginTop: 3 }}
          >
            Pasirinkite failą
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          {selectedFile && (
            <div style={{ marginTop: "15px" }}>
              <span style={{ textDecoration: "none" }}>
                Jūsų pasirinkto failo pavadinimas:{" "}
              </span>
              <span
                onClick={handleDownload}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                {selectedFile.name}
              </span>
            </div>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Išsaugoti
          </Button>
        </Box>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Paper>
      {loaded && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green", color: "white" }}
            iconMapping={{
              success: <CheckCircleRoundedIcon sx={{ color: "white" }} />,
            }}
          >
            Užsakymas sėkmingai apdorotas!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            sx={{ width: "100%", backgroundColor: "red", color: "white" }}
            iconMapping={{
              success: <CheckCircleRoundedIcon sx={{ color: "white" }} />,
              error: <ErrorRoundedIcon sx={{ color: "white" }} />,
            }}
          >
            Įvyko klaida, pabandykite dar kartą.
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default NewOrderPage;
