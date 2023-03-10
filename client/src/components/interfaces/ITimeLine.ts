export interface ITimeline {
  items: IItem[];
}

export interface IItem {
  orderNo: number;
  date: string;
  title: string;
  content: string;
}
