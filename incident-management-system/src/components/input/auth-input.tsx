import React from "react";
import "./styles/auth-input.css";
import { useInput } from "../../hooks/input-hooks";

interface IInputProps {
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number";
  inputRef?: React.RefObject<HTMLInputElement | null>;
  errorText?: string;
}

export const GeneralInput: React.FC<IInputProps> = (props) => {
  const input = useInput(props.defaultValue, props.onChange);

  return (
    <div className={"inputContainerWrapper"}>
      <div className={"inputContainer"}>
        <input
          className={"input"}
          placeholder={props.placeholder}
          type={props.type || "text"}
          ref={props.inputRef as React.RefObject<HTMLInputElement>}
          {...input}
        />
      </div>
      <div>
        {props.errorText && (
          <div className={"errorTextContainer"}>
            <div className={"triangle"}> </div>
            <div className={"errorText"}>{props.errorText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const MailInput: React.FC<IInputProps> = (props) => {
  return <GeneralInput type={"text"} {...props} />;
};

export const PasswordInput: React.FC<IInputProps> = (props) => {
  return <GeneralInput type={"password"} {...props} />;
};
