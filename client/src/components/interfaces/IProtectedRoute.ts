import { ReactElement, ReactNode } from "react";

export interface IProtectedRoute {
  children: ReactNode | ReactElement;
  disabled: boolean;
}
