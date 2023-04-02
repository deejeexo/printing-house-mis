import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IJobConsumable } from "../components/interfaces/IJobConsumable";
import { IJobEquipment } from "../components/interfaces/IJobEquipment";
import { IOrder } from "../components/interfaces/IOrder";
import { font } from "./font";
import { IJobPrice } from "../components/interfaces/IJobPrice";
import { Equipments } from "../data/Equipments";
import { ConsumableTypes } from "../data/ConsumableTypes";

export const createInvoicePdf = async (jobId: string) => {
  let order: IOrder | undefined;
  let jobEquipment: IJobEquipment[] | undefined;
  let jobConsumable: IJobConsumable[] | undefined;
  let jobPrice: IJobPrice | undefined;
  const doc = new jsPDF();
  doc.addFileToVFS("MyFont.ttf", font);
  doc.addFont("MyFont.ttf", "MyFont", "normal");
  doc.setFont("MyFont");

  await axios
    .get<IOrder>(`https://localhost:7198/job/get-job/${jobId}`, {})
    .then(
      (response) => {
        order = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

  await axios
    .get<IJobConsumable[]>(
      `https://localhost:7198/job/job-consumables/${jobId}`,
      {}
    )
    .then(
      (response) => {
        jobConsumable = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

  await axios
    .get<IJobEquipment[]>(
      `https://localhost:7198/job/job-equipments/${jobId}`,
      {}
    )
    .then(
      (response) => {
        jobEquipment = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

  await axios
    .get<IJobPrice>(`https://localhost:7198/job/job-price/${jobId}`, {})
    .then(
      (response) => {
        jobPrice = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

  doc.setFontSize(18);
  doc.text("Sąskaitos faktūra", 14, 22);

  doc.setFontSize(12);
  doc.text(`Kliento vardas, pavardė: ${order?.customerFullName}`, 14, 36);

  doc.text(`Užsakymo unikalus numeris: ${order?.id}`, 14, 46);
  doc.text(`Užsakymo pavadinimas: ${order?.name}`, 14, 52);

  doc.text("Panaudotų eksploatacinių medžiagų sąrašas", 14, 62);
  autoTable(doc, {
    startY: 68,
    styles: {
      font: "MyFont",
      fontStyle: "normal",
    },
    body: jobConsumable?.map((consumable) => [
      consumable.name,
      ConsumableTypes.find(
        (status) => status.value === parseInt(consumable.consumableType, 10)
      )?.label || "",
      consumable.quantityUsed,
      consumable.unitPrice,
    ]),
    columns: [
      { header: "Eksploatacinė medžiaga", dataKey: 1 },
      { header: "Tipas", dataKey: 2 },
      { header: "Kiekis", dataKey: 3 },
      { header: "Vnt. kaina [€]", dataKey: 4 },
    ],
  });

  const equipmentTableY = (doc as any).autoTable.previous.finalY + 10;
  doc.text("Panaudotos įrangos sąrašas", 14, equipmentTableY);
  autoTable(doc, {
    startY: equipmentTableY + 6,
    styles: {
      font: "MyFont",
      fontStyle: "normal",
    },
    body: jobEquipment?.map((equipment) => [
      equipment.name,
      Equipments.find(
        (status) => status.value === parseInt(equipment.equipmentType, 10)
      )?.label || "",
      equipment.hours,
      equipment.costPerHour,
    ]),
    columns: [
      { header: "Įrangos identifikatorius", dataKey: 1 },
      { header: "Tipas", dataKey: 2 },
      { header: "Valandos", dataKey: 3 },
      { header: "Valandos kaina [€]", dataKey: 4 },
    ],
  });

  const totalPriceY = (doc as any).autoTable.previous.finalY + 10;

  doc.text(`Užsakymo kaina: ${jobPrice?.jobPrice} € `, 14, totalPriceY);

  doc.setTextColor(128, 128, 128);
  doc.setFontSize(10);
  doc.text(
    `* Prie užsakymo kainos yra pridėtas darbuotojų paslaugų mokėstis kuri sudaro 12% nuo galutinės sumos.`,
    14,
    totalPriceY + 10
  );

  doc.save(`sąskaitos_faktūra${order?.id}.pdf`);
};
