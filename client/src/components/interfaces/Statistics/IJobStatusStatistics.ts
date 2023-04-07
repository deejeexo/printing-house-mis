export interface IJobStatusStatistics {
  delayed: number;
  completed: number;
  cancelled: number;
  pendingApproval: number;
  approved: number;
  readyForPrinting: number;
  printing: number;
  qualityControl: number;
  finishing: number;
  packaging: number;
  shipping: number;
  delivered: number;
  billing: number;
  paymentReceived: number;
  archived: number;
  new: number;
}
