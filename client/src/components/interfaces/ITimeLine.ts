export interface ITimeline {
  items: IItem[];
}

export interface IItem {
  id: string;
  dateCreated: string;
  name: string;
  description: string;
}
