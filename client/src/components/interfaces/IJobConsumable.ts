export interface IJobConsumable {
  id: string;
  jobId: string;
  consumableId: string;
  quantityUsed: number;
  name: string;
  consumableType: string;
  unitPrice: string;
}
