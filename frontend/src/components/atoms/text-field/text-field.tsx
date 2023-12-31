/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import InputMask from "inputmask";
import IInputProps from "../../../types/interfaces/IInput";
import { Errors } from "../errors";

type OnInputFunction = (e: string) => void;

interface TextFieldProps extends IInputProps {
  value?: string | number;
  onInput?: OnInputFunction;
  type?: "text" | "password" | "textarea";
  mask?: string;
  icon?: JSX.Element;
  color?: "primary" | "secondary";
}

const TEXT_FIELD_CLASSES = {
  primary: "bg-white dark:bg-slate-800",
  secondary: "bg-slate-50 dark:bg-slate-700",
};

const TextField = ({
  value,
  onInput = () => alert("onInput not registerd"),
  type = "text",
  label,
  placeholder,
  errors = [],
  mask,
  icon,
  color = "primary",
}: TextFieldProps) => {
  const textFieldRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (textFieldRef && textFieldRef.current && mask) {
      const inputMask = new InputMask(mask);
      inputMask.mask(textFieldRef.current);
    }
  }, [mask]);

  return (
    <div className="w-full text-sm relative space-y-1">
      {label && <label htmlFor="">{label}</label>}
      <div
        className={`${
          errors.length
            ? "ring-1 ring-red-500"
            : isFocused
              ? "ring-1 ring-blue-600"
              : ""
        } ${
          TEXT_FIELD_CLASSES[color]
        } w-full border shadow-sm rounded flex justify-center items-center border-primary`}
      >
        <div className="pl-2 text-slate-400">{icon}</div>
        {type !== "textarea" ? (
          <div className="w-full flex justify-between items-center">
            <input
              ref={textFieldRef}
              type={type !== "password" ? type : showPassword ? "type" : type}
              onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              className={`${TEXT_FIELD_CLASSES[color]} w-full p-2 rounded`}
              placeholder={placeholder && placeholder}
            />

            {type === "password" && (
              <button
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="h-full flex justify-center items-center p-2 text-slate-400"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        ) : (
          <textarea
            ref={textFieldRef}
            onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            className="w-full p-2 bg-white dark:bg-slate-800 rounded"
            placeholder={placeholder && placeholder}
          />
        )}

        {errors.length ? (
          <div className="pr-2 text-red-500">
            <ExclamationCircleIcon className="w-4 h-4" />
          </div>
        ) : null}
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default TextField;
