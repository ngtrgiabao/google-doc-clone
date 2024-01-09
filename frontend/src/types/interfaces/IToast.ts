import IAction from "./IAction";

interface IToast {
  id: string;
  color: "primary" | "secondary" | "success" | "warning" | "error";
  title: string | JSX.Element;
  body?: string | JSX.Element;
  actions?: Array<IAction>;
}

export default IToast;
