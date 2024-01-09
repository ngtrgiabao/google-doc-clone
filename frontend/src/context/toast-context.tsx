import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

import IAction from "../types/interfaces/IAction";
import IToast from "../types/interfaces/IToast";
import ToastManager from "../components/organisms/toast-manager/toast-manager";

const TOAST_TIMEOUT = 5000;

interface IToastContext {
  toasts: Array<IToast>;
  addToast: (
    {
      id,
      color,
      title,
      body,
      actions,
    }: {
      id?: string;
      color?: IToast["color"];
      title?: string;
      body?: string;
      actions?: Array<IAction>;
    },
    duration?: number,
  ) => void;
  removeToast: (id: string) => void;
  success: (title: string) => void;
  error: (title: string) => void;
}

const defaultValues = {
  toasts: new Array<IToast>(),
  addToast: () => {},
  removeToast: () => {},
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
};

export const ToastContext = createContext<IToastContext>(defaultValues);

interface IToastProviderProps {
  children: JSX.Element;
}

export const ToastProvider = ({ children }: IToastProviderProps) => {
  const [toasts, setToasts] = useState<Array<IToast>>(defaultValues.toasts);
  const addToast = (
    {
      id = uuid(),
      color = "primary",
      title,
      body,
      actions,
    }: {
      id?: string;
      color?: IToast["color"];
      title?: string;
      body?: string;
      actions?: Array<IAction>;
    },
    duration = TOAST_TIMEOUT,
  ) => {
    setToasts((toasts) => [
      ...toasts,
      { id, color, title, body, actions } as IToast,
    ]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const error = (title: string) => {
    addToast({ color: "error", title });
  };

  const success = (title: string) => {
    addToast({ color: "success", title });
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, error, success }}
    >
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
