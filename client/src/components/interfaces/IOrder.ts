export interface IOrder {
  id: string;
  customerId: string;
  name: string;
  description: string;
  fileUrl: string;
  quantity: number;
  jobStatus: number;
  due: string;
  rating: number | null;
  feedback: string | null;
}