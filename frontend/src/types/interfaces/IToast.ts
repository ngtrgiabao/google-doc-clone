import IAction from "./IAction";

interface IToast {
  id: string;
  color: "primary" | "secondary" | "success" | "warning" | "error" | "danger";
  title: string | JSX.Element;
  body?: string | JSX.Element;
  actions?: Array<IAction>;
}

export default IToast;
