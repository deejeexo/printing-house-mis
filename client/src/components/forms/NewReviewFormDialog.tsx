import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { reloadPage } from "../../utils/reloadPage";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IOrder } from "../interfaces/IOrder";

function NewReviewFormDialog(props: IFormDialogProps<IOrder>) {
  const [value, setValue] = React.useState<number | null>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rating = data.get("rating");
    const feedback = data.get("feedback");

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/add-review",
        data: {
          id: props.formDefaultValues.id,
          rating: rating,
          feedback: feedback,
        },
      });
      reloadPage(1000);
    } catch (error) {
      console.error(error);
    }

    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {props.formDefaultValues.feedback === null ? (
            <DialogTitle>Pateikite atsiliepimą</DialogTitle>
          ) : (
            <DialogTitle>Jūsų pateiktas atsiliepimas</DialogTitle>
          )}
          <DialogContent>
            {props.formDefaultValues.feedback === null ? (
              <DialogContentText sx={{ mb: 2 }}>
                Šiame lange galite pateikti atsiliepimą apie jūsų įvykdytą
                užsakymą. Ačiū, kad leidžiate mums tobulėti!
              </DialogContentText>
            ) : (
              <DialogContentText sx={{ mb: 2 }}>
                Šiame lange jus matote anksčiau jūsų pateiktą atsiliepimą
                atliktam užsakymui.
              </DialogContentText>
            )}
            <Typography component="legend">Produkto įvertinimas:</Typography>
            <Rating
              disabled={
                props.formDefaultValues.feedback === null ? false : true
              }
              name="rating"
              value={props.formDefaultValues.rating || value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              disabled={
                props.formDefaultValues.feedback === null ? false : true
              }
              sx={{ marginTop: 2 }}
              multiline
              maxRows={5}
              fullWidth
              id="feedback"
              label="Komentaras"
              name="feedback"
              defaultValue={props.formDefaultValues.feedback}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.handleClose();
              }}
            >
              Atšaukti
            </Button>
            {props.formDefaultValues.feedback === null && (
              <Button type="submit" onClick={props.handleClose}>
                Pateikti
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default NewReviewFormDialog;
