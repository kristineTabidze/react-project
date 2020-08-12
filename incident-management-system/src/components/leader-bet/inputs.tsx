import React, { useState, useCallback } from "react";
import "./styles/registration.css";
import { checkName } from "./validations";
import { ReactComponent as CheckMark } from "./styles/imgs/check.svg";
import { ReactComponent as Cross } from "./styles/imgs/cross.svg";

export const useInput = <
  T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(
  defaultValue: string | number = "",
  cb?: (e: React.ChangeEvent<T>, value: string) => void
) => {
  const [value, setInputName] = useState(defaultValue + "");
  const onChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      if (cb) {
        cb(e, e.target.value);
      }
      setInputName(e.target.value);
    },
    [cb]
  );
  return { value, onChange };
};

interface IInputProps {
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number";
  errorText: string;
  icon?: JSX.Element;
  onIconClick?: () => void;
  errorTextVissibility?: "visible" | "hidden";
}

export const GeneralInput: React.FC<IInputProps> = (props) => {
  const input = useInput(props.defaultValue, props.onChange);

  return (
    <>
      <div className={"inputContainer"}>
        <input
          className={"input"}
          placeholder={props.placeholder}
          type={props.type || "text"}
          {...input}
        />
        {props.icon && (
          <div className={"icon"} onClick={props.onIconClick}>
            {props.icon}
          </div>
        )}
      </div>
      <div>
        <div className={"errorTextContainer"}>
          <div
            className={"triangle"}
            style={
              props.errorTextVissibility === "visible"
                ? {
                    visibility: "visible",
                    transitionDelay: "0.95s",
                  }
                : { visibility: "hidden" }
            }
          />
          <div
            className={"errorText"}
            style={{
              transform:
                props.errorTextVissibility === "hidden"
                  ? "scale(0)"
                  : "scale(1)",
            }}
          >
            {props.errorText}
          </div>
        </div>
      </div>
    </>
  );
};

export const MailInput: React.FC<IInputProps> = (props) => {
  return <GeneralInput type={"text"} {...props} />;
};

export interface ITextInputProps {
  inputRef: React.MutableRefObject<string>;
  errorText?: string;
  minLenght?: number;
  maxLength?: number;
  nameValidation?: boolean;
  label: string;
  type?: "text" | "password" | "number";
  isnotMandatory?: boolean;
}

export const NameInput: React.FC<ITextInputProps> = (props) => {
  const [errorText, setErrorText] = useState<string>("");
  const [hasError, setError] = useState<boolean | undefined>();
  const [icon, setIcon] = useState<JSX.Element>();
  const [visibility, setVisibility] = useState<"visible" | "hidden">("hidden");

  const onTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.inputRef.current = e.target.value;
      if (
        props.errorText &&
        ((props.minLenght && e.target.value.length < props.minLenght) ||
          (props.maxLength && e.target.value.length > props.maxLength) ||
          (props.nameValidation && !checkName(e.target.value)))
      ) {
        setError(true);
        setIcon(
          <div className="cross">
            <Cross style={{ width: 15 }} />
          </div>
        );
        setVisibility("visible");
        setErrorText(props.errorText);
      } else {
        setVisibility("hidden");
        setError(false);
        setIcon(
          <div className="checkmark">
            <CheckMark style={{ width: 18 }} />
          </div>
        );
        setErrorText("");
      }
    },
    [
      props.inputRef,
      props.errorText,
      props.minLenght,
      props.maxLength,
      props.nameValidation,
    ]
  );

  return (
    <div className="inputWrapper">
      <div className="inputLabel">
        {props.label}
        {!props.isnotMandatory && <span className="star">*</span>}
      </div>
      <GeneralInput
        type={props.type || "text"}
        onChange={onTextChange}
        errorText={errorText}
        icon={icon}
        errorTextVissibility={visibility}
      />
    </div>
  );
};
