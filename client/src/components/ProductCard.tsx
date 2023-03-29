import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { JobStatuses } from "../data/JobStatuses";
import AddCuratorFormDialog from "./forms/AddCuratorFormDialog";
import StatusUpdateFormDialog from "./forms/StatusUpdateFormDialog";
import { IFormDialogProps } from "./interfaces/IFormDialogProps";
import { IOrder } from "./interfaces/IOrder";
import { IUser } from "./interfaces/IUser";

const ProductCard = (props: IOrder) => {
  const initialFormDefaultValues: IUser[] = [];
  const [open, setOpen] = useState(false);
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState<IUser[]>(
    initialFormDefaultValues
  );
  const [formType] = useState<IFormDialogProps<IUser>["formType"]>("NewForm");
  const position = sessionStorage.getItem("position");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleStatusChangeOpen = () => setStatusChangeOpen(true);
  const handleStatusChangeClose = () => setStatusChangeOpen(false);
  const [curator, setCurator] = useState<IUser>({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    salary: 0,
    userType: 0,
  });

  const resetFormValues = () => {
    setFormDefaultValues(initialFormDefaultValues);
  };

  useEffect(() => {
    axios.get<IUser[]>(`https://localhost:7198/user/employees`, {}).then(
      (response) => {
        setFormDefaultValues(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

    axios.get<IUser>(`https://localhost:7198/user/${props.curator}`, {}).then(
      (response) => {
        setCurator(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [props.curator]);

  return (
    <>
      <Card
        sx={{
          maxWidth: "100%",
          aspectRatio: 0,
          margin: 1,
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        <CardMedia
          image={
            "https://easylabeling.com/wp-content/uploads/Inkjet-printing-machine-printing-out-vibrant-lines-of-color.jpg"
          }
          component="img"
          alt="imageSource"
          sx={{ maxWidth: "100%", maxHeight: 250 }}
        />
        <CardContent sx={{ ":last-child": { paddingBottom: 1 } }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="h6">
            Kliento vardas, pavardė: {props.customerFullName}
          </Typography>
          <Typography variant="h6" sx={{ overflowWrap: "break-word" }}>
            Užsakymo aprašymas: {props.description}
          </Typography>
          <Typography variant="h6">Kiekis: {props.quantity} vnt.</Typography>
          <Typography variant="h6">
            Statusas:{" "}
            {
              JobStatuses.find((status) => status.value === props.jobStatus)
                ?.label
            }
          </Typography>
          <Typography variant="h6">
            Planuojama įgyvendinimo data: {props.due.split("T")[0]}
          </Typography>
          <Typography variant="h6">
            {props.curator !== null
              ? `Užsakymo kuratorius: ${curator.fullName}`
              : `Užsakymo kuratorius: Nepriskirtas`}
          </Typography>
          <CardActions
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              p: 0,
            }}
          >
            <Button
              onClick={() => {
                handleStatusChangeOpen();
              }}
              variant="contained"
            >
              Atnaujinti užsakymo informaciją
            </Button>
            <Button
              onClick={() => {
                handleOpen();
              }}
              variant="contained"
              sx={{ display: position === "1" ? "block" : "none" }}
            >
              Priskirti atsakingą darbuotoją
            </Button>
            <Button
              variant="contained"
              href={props.fileUrl}
              sx={{ ml: 1 }}
              target="_blank"
            >
              Atsisiųsti užsakymo failą
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <AddCuratorFormDialog
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        formDefaultValues={formDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
        jobId={props.id || ""}
      />
      <StatusUpdateFormDialog
        handleOpen={handleStatusChangeOpen}
        handleClose={handleStatusChangeClose}
        open={statusChangeOpen}
        formDefaultValues={props}
        resetFormDefaultValues={resetFormValues}
        formType={formType}
      />
    </>
  );
};

export default ProductCard;
