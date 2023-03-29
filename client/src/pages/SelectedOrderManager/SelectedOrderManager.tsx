import { Button, Paper, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DataGridWindow from "../../components/DataGridWindow";
import JobConsumableFormDialog from "../../components/forms/JobConsumableFormDialog";
import JobEquipmentFormDialog from "../../components/forms/JobEquipmentFormDialog";
import { IFormDialogProps } from "../../components/interfaces/IFormDialogProps";
import { IJobConsumable } from "../../components/interfaces/IJobConsumable";
import { IJobEquipment } from "../../components/interfaces/IJobEquipment";
import { IOrder } from "../../components/interfaces/IOrder";
import ProductCard from "../../components/ProductCard";
import { ConsumableTypes } from "../../data/ConsumableTypes";
import { Equipments } from "../../data/Equipments";
import { reloadPage } from "../../utils/reloadPage";

function SelectedOrderManager() {
  const initialJobEquipmentFormDefaultValues: IJobEquipment[] = [
    {
      id: "",
      jobId: "",
      equipmentId: "",
      hours: 0,
      name: "",
      equipmentType: "",
      costPerHour: "",
    },
  ];

  const initialJobConsumableFormDefaultValues: IJobConsumable[] = [
    {
      id: "",
      jobId: "",
      consumableId: "",
      quantityUsed: 0,
      name: "",
      consumableType: "",
      unitPrice: "",
    },
  ];

  const [consumablesFormOpen, setConsumablesFormOpen] = useState(false);
  const [equipmentFormOpen, setEquipmentFormOpen] = useState(false);
  const formDefaultValues: IOrder = useLocation().state;
  const [jobEquipmentRows, setJobEquipmentRows] = useState<IJobEquipment[]>(
    initialJobEquipmentFormDefaultValues
  );
  const [jobConsumableRows, setJobConsumableRows] = useState<IJobConsumable[]>(
    initialJobConsumableFormDefaultValues
  );
  const handleConsumablesOpen = () => setConsumablesFormOpen(true);
  const handleConsumablesClose = () => setConsumablesFormOpen(false);
  const handleEquipmentOpen = () => setEquipmentFormOpen(true);
  const handleEquipmentClose = () => setEquipmentFormOpen(false);
  const [consumablesFormType, setConsumablesFormType] =
    useState<IFormDialogProps<IJobConsumable>["formType"]>("NewForm");
  const [equipmentsFormType, setEquipmentsFormType] =
    useState<IFormDialogProps<IJobEquipment>["formType"]>("NewForm");

  const [consumablesFormDefaultValues, setConsumablesFormDefaultValues] =
    useState<IJobConsumable>(initialJobConsumableFormDefaultValues[0]);
  const [equipmentsFormDefaultValues, setEquipmentsFormDefaultValues] =
    useState<IJobEquipment>(initialJobEquipmentFormDefaultValues[0]);

  const handleJobEquipmentListSelect = (selectedItem: IJobEquipment) => {
    if (selectedItem !== undefined) {
      setEquipmentsFormDefaultValues({
        id: selectedItem.id,
        jobId: selectedItem.jobId,
        equipmentId: selectedItem.equipmentId,
        hours: selectedItem.hours,
        name: selectedItem.name,
        equipmentType: selectedItem.equipmentType,
        costPerHour: selectedItem.costPerHour,
      });
      setEquipmentsFormType("EditForm");
    } else {
      setEquipmentsFormType("NewForm");
      setEquipmentsFormDefaultValues(initialJobEquipmentFormDefaultValues[0]);
    }
  };

  const handleJobConsumablesListSelect = (selectedItem: IJobConsumable) => {
    if (selectedItem !== undefined) {
      setConsumablesFormDefaultValues({
        id: selectedItem.id,
        jobId: selectedItem.jobId,
        consumableId: selectedItem.consumableId,
        quantityUsed: selectedItem.quantityUsed,
        name: selectedItem.name,
        consumableType: selectedItem.consumableType,
        unitPrice: selectedItem.unitPrice,
      });
      setConsumablesFormType("EditForm");
    } else {
      setConsumablesFormType("NewForm");
      setConsumablesFormDefaultValues(initialJobConsumableFormDefaultValues[0]);
    }
  };

  const resetFormValues = () => {
    setConsumablesFormDefaultValues(initialJobConsumableFormDefaultValues[0]);
    setEquipmentsFormDefaultValues(initialJobEquipmentFormDefaultValues[0]);
  };

  const jobEquipmentColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "jobId", headerName: "Užsakymo ID", width: 90, hide: true },
    { field: "equipmentId", headerName: "Įrangos ID", width: 90, hide: true },
    {
      field: "name",
      headerName: "Įrangos identifikatorius",
      width: 300,
      hide: false,
    },
    {
      field: "equipmentType",
      headerName: "Įrangos tipas",
      valueGetter: (params) => {
        const typeLabel = Equipments.find(
          (pos) => pos.value === Number(params.row.equipmentType)
        )?.label;
        return typeLabel || params.row.equipmentType;
      },
      width: 400,
      editable: false,
    },
    {
      field: "hours",
      headerName: "Sunaudota valandų",
      width: 150,
      hide: false,
    },
    {
      field: "costPerHour",
      headerName: "Valandos kaina [€]",
      width: 400,
      editable: false,
    },
  ];

  const jobConsumableColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "jobId", headerName: "Užsakymo ID", width: 90, hide: true },
    {
      field: "consumableId",
      headerName: "Eksploatacinės medžiagos ID",
      width: 90,
      hide: true,
    },
    {
      field: "name",
      headerName: "Eksploatacinės medžiagos pavadinimas",
      width: 300,
      hide: false,
    },
    {
      field: "consumableType",
      headerName: "Eksploatacinės medžiagos tipas",
      valueGetter: (params) => {
        const typeLabel = ConsumableTypes.find(
          (pos) => pos.value === Number(params.row.consumableType)
        )?.label;
        return typeLabel || params.row.consumableType;
      },
      width: 400,
      editable: false,
    },
    {
      field: "quantityUsed",
      headerName: "Sunaudotas kiekis",
      width: 150,
      hide: false,
    },
    {
      field: "unitPrice",
      headerName: "Vnt. kaina [€]",
      width: 400,
      editable: false,
    },
  ];

  useEffect(() => {
    axios
      .get<IJobConsumable[]>(
        `https://localhost:7198/job/job-consumables/${formDefaultValues.id}`,
        {}
      )
      .then(
        (response) => {
          setJobConsumableRows(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    axios
      .get<IJobEquipment[]>(
        `https://localhost:7198/job/job-equipments/${formDefaultValues.id}`,
        {}
      )
      .then(
        (response) => {
          setJobEquipmentRows(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [formDefaultValues.id]);

  return (
    <Paper
      sx={{
        maxWidth: 1500,
        margin: "auto",
        overflow: "hidden",
        backgroundColor: "#e0e8eb",
      }}
      elevation={0}
    >
      <ProductCard {...formDefaultValues} />
      <Typography
        sx={{ ml: 2, mt: 5 }}
        gutterBottom
        variant="h5"
        component="div"
      >
        Užsakyme naudojamos įrangos valdymas{" "}
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          mb: 1,
          ml: 1,
          textTransform: "none",
          display: [5, 6, 7, 8, 9, 3, 2, 10, 11, 12, 13, 14, 15].includes(
            formDefaultValues.jobStatus
          )
            ? "none"
            : "inline",
        }}
        disabled={equipmentsFormType === "NewForm" ? false : true}
        onClick={() => {
          handleEquipmentOpen();
        }}
      >
        Pridėti naudojama įrangą
      </Button>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          mb: 1,
          ml: 1,
          textTransform: "none",
          display: [5, 6, 7, 8, 9, 3, 2, 10, 11, 12, 13, 14, 15].includes(
            formDefaultValues.jobStatus
          )
            ? "none"
            : "inline",
        }}
        disabled={equipmentsFormType === "EditForm" ? false : true}
        onClick={async () => {
          try {
            await axios({
              method: "delete",
              url: `https://localhost:7198/job/delete-job-equipment/${equipmentsFormDefaultValues.id}`,
            });
            reloadPage(1000);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Panaikinti naudojamą įrangą
      </Button>
      <DataGridWindow
        columns={jobEquipmentColumns}
        rows={jobEquipmentRows}
        handleListSelect={handleJobEquipmentListSelect}
      />
      <Typography
        sx={{ ml: 2, mt: 5 }}
        gutterBottom
        variant="h5"
        component="div"
      >
        Užsakyme naudojamų eksploatacinių medžiagų valdymas{" "}
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          mb: 1,
          ml: 1,
          textTransform: "none",
          display: [5, 6, 7, 8, 9, 3, 2, 10, 11, 12, 13, 14, 15].includes(
            formDefaultValues.jobStatus
          )
            ? "none"
            : "inline",
        }}
        disabled={consumablesFormType === "NewForm" ? false : true}
        onClick={() => {
          handleConsumablesOpen();
        }}
      >
        Pridėti naudojamas eksploatacinės medžiagas
      </Button>
      <Button
        variant="contained"
        sx={{
          mt: 1,
          mb: 1,
          ml: 1,
          textTransform: "none",
          display: [5, 6, 7, 8, 9, 3, 2, 10, 11, 12, 13, 14, 15].includes(
            formDefaultValues.jobStatus
          )
            ? "none"
            : "inline",
        }}
        disabled={consumablesFormType === "EditForm" ? false : true}
        onClick={async () => {
          try {
            await axios({
              method: "delete",
              url: `https://localhost:7198/job/delete-job-consumable/${consumablesFormDefaultValues.id}`,
            });
            reloadPage(1000);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Panaikinti naudojamas eksploatacinės medžiagas
      </Button>
      <DataGridWindow
        columns={jobConsumableColumns}
        rows={jobConsumableRows}
        handleListSelect={handleJobConsumablesListSelect}
      />
      <JobConsumableFormDialog
        handleOpen={handleConsumablesOpen}
        handleClose={handleConsumablesClose}
        open={consumablesFormOpen}
        formDefaultValues={consumablesFormDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={consumablesFormType}
        jobId={formDefaultValues.id}
      ></JobConsumableFormDialog>
      <JobEquipmentFormDialog
        handleOpen={handleEquipmentOpen}
        handleClose={handleEquipmentClose}
        open={equipmentFormOpen}
        formDefaultValues={equipmentsFormDefaultValues}
        resetFormDefaultValues={resetFormValues}
        formType={equipmentsFormType}
        jobId={formDefaultValues.id}
      ></JobEquipmentFormDialog>
    </Paper>
  );
}

export default SelectedOrderManager;
