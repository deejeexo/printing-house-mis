export interface IFormDialogProps<T> {
  handleClose: () => void;
  handleOpen: () => void;
  resetFormDefaultValues: () => void;
  formType: "NoPreference" | "NewForm" | "EditForm" | "ViewForm";
  formDefaultValues: T;
  open: boolean;
}
