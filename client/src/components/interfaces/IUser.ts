export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  address: string;
  position?: string;
  salary: number;
  userType: number;
}
