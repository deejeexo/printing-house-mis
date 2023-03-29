export interface IFormDialogProps<T> {
  handleClose: () => void;
  handleOpen: () => void;
  resetFormDefaultValues: () => void;
  formType:
    | "NoPreference"
    | "NewForm"
    | "EditForm"
    | "ViewForm"
    | "DeleteForm"
    | "Manage";
  formDefaultValues: T;
  open: boolean;
  jobId?: string;
}
