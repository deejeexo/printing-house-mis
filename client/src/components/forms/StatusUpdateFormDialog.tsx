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
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import lt from "dayjs/locale/lt";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobStatuses } from "../../data/JobStatuses";
import { IFormDialogProps } from "../interfaces/IFormDialogProps";
import { IOrder } from "../interfaces/IOrder";

function StatusUpdateFormDialog(props: IFormDialogProps<IOrder>) {
  const [jobStatus, setJobStatus] = useState("");
  const [fieldEroor, setFieldError] = useState<boolean>(false);
  const [valueFrom, setValueFrom] = React.useState<Dayjs | null>(
    dayjs(dayjs(props.formDefaultValues.due))
  );
  const navigate = useNavigate();

  const handleChangeDateFrom = (newValue: Dayjs | null) => {
    setValueFrom(newValue);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setJobStatus(event.target.value);
  };

  const handleNewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jobStatus = data.get("jobStatus");
    const jobStatusValue = jobStatus ? parseInt(jobStatus as string) : 0;

    try {
      await axios({
        method: "post",
        url: "https://localhost:7198/job/update-job-status",
        data: {
          jobId: props.formDefaultValues.id,
          jobStatus: jobStatusValue,
          due: dayjs(valueFrom).format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      });
      navigate("/ordersmanager");
    } catch (error) {
      console.error(error);
    }
    setJobStatus("");
    props.resetFormDefaultValues();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box component="form" onSubmit={handleNewSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Atnaujinti vykdomo užsakymo informaciją</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Įvedus ir išsaugojus informaciją, ji yra išsaugojama ir matoma
              klientui.
            </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lt}>
              <DesktopDatePicker
                label="Planuojama užbaigimo data"
                value={valueFrom}
                format={"YYYY-MM-DD"}
                onChange={handleChangeDateFrom}
                sx={{ mb: 3, width: "100%" }}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="jobStatus">Statusas</InputLabel>
              <Select
                onFocus={() => {
                  setFieldError(false);
                }}
                onChange={handleStatusChange}
                labelId="jobStatus"
                id="jobStatus"
                name="jobStatus"
                label="Pareigos"
                value={
                  jobStatus || props.formDefaultValues.jobStatus.toString()
                }
                fullWidth
                error={fieldEroor}
              >
                {JobStatuses.map((jobStatus) => (
                  <MenuItem key={jobStatus.value} value={jobStatus.value}>
                    {jobStatus.label}
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

export default StatusUpdateFormDialog;
