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
  TextField,
} from "@mui/material";
import { JobStatuses } from "../../data/JobStatuses";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IOrder } from "../interfaces/IOrder";
import { createInvoicePdf } from "../../utils/createInvoicePdf";

function OrderViewFormDialog(props: IFormDialogProps<IOrder>) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" sx={{ mt: 1 }}>
          <DialogTitle>Užsakymo peržiūra</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              Jūsų užsakymo peržiūra
            </DialogContentText>
            <TextField
              sx={{ marginBottom: 3 }}
              fullWidth
              id="name"
              label="Užsakymo pavadinimas"
              name="name"
              defaultValue={props.formDefaultValues.name}
              style={{ pointerEvents: "none", opacity: 1 }}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              multiline
              maxRows={5}
              fullWidth
              id="description"
              label="Užsakymo apibūdinimas"
              name="description"
              defaultValue={props.formDefaultValues.description}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              fullWidth
              id="quantity"
              label="Kiekis"
              name="quantity"
              defaultValue={props.formDefaultValues.quantity}
              style={{ pointerEvents: "none", opacity: 1 }}
            />
            <TextField
              sx={{ marginBottom: 3 }}
              fullWidth
              id="due"
              label="Planuojama įgyvendinimo data"
              name="due"
              defaultValue={props.formDefaultValues.due.split("T")[0]}
              style={{ pointerEvents: "none", opacity: 1 }}
            />
            <FormControl fullWidth>
              <InputLabel id="jobStatus">Statusas</InputLabel>
              <Select
                labelId="jobStatus"
                id="jobStatus"
                name="jobStatus"
                label="Statusas"
                value={props.formDefaultValues.jobStatus}
                fullWidth
                style={{ pointerEvents: "none", opacity: 1 }}
              >
                {JobStatuses.map((jobStatus) => (
                  <MenuItem key={jobStatus.value} value={jobStatus.value}>
                    {jobStatus.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              href={props.formDefaultValues.fileUrl}
              sx={{ mt: 3 }}
              target="_blank"
            >
              Atsisiųsti užsakymo failą
            </Button>
            <Button
              onClick={() => {
                createInvoicePdf(props.formDefaultValues.id);
              }}
              variant="contained"
              sx={{
                display: [13, 14, 15].includes(
                  props.formDefaultValues.jobStatus
                )
                  ? "block"
                  : "none",
                mt: 2,
              }}
            >
              Atsisiųsti sąskaitos faktūrą
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.handleClose();
              }}
            >
              Uždaryti
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default OrderViewFormDialog;
