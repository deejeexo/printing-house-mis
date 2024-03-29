export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  address: string;
  position?: string;
  userType: number;
}
