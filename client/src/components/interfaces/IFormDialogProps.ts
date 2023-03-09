import { IUser } from "./IUser";

export interface IFormDialogProps {
  handleClose: () => void;
  handleOpen: () => void;
  resetFormDefaultValues: () => void;
  formType: "NoPreference" | "NewForm" | "EditForm";
  formDefaultValues: IUser;
  open: boolean;
}
