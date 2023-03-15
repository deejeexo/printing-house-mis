import {
  Alert,
  Box,
  Button,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useRef, useState } from "react";
import { IFileUploadReponse } from "../../components/interfaces/IFileUploadResponse";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";

function NewOrderPage() {
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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

  const reloadPage = async (time: number) => {
    await delay(time);
    window.location.reload();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      reloadPage(5000);
      return;
    }

    const customerId = "ed520aeb-1aad-4149-9678-e09402ac359d";
    const name = filledFormData.get("name");
    const description = filledFormData.get("description");
    const fileUrl = fileUploadResponse.link;
    const quantity = filledFormData.get("quantity");
    const jobStatus = 16;
    const due = "2023-03-15T15:44:15.193Z";

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
        },
      });
      setLoading(false);
      setLoaded(true);
      reloadPage(3000);
    } catch (error) {
      console.error(error);
      setError(true);
      reloadPage(5000);
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
          onSubmit={handleSubmit}
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
