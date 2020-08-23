import React, { useState, useCallback, useEffect, useRef } from "react";
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number";
  errorText: string;
  icon?: JSX.Element;
  onIconClick: () => void;
  errorTextVissibility?: "visible" | "hidden";
  isClearIcon?: boolean;
  value: React.MutableRefObject<string> | React.MutableRefObject<number>;
}

export const GeneralInput: React.FC<IInputProps> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(props.value.current);

  const onClear = useCallback(() => {
    setValue("");
    setIsClicked(true);
  }, []);

  return (
    <>
      <div className={"inputContainerForL"}>
        <input
          className={"inputForL"}
          placeholder={props.placeholder}
          type={props.type || "text"}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(e);
            setValue(e.target.value);
            setIsClicked(false);
          }}
        />
        {!isClicked && (
          <div
            className={"iconForL"}
            onClick={!props.isClearIcon ? props.onIconClick : onClear}
          >
            {props.icon || ""}
          </div>
        )}
      </div>
      <div>
        <div className={"errorTextContainerForL"}>
          <div
            className={"triangleForL"}
            style={
              props.errorTextVissibility === "hidden" || isClicked
                ? {
                    visibility: "hidden",
                  }
                : { visibility: "visible", transitionDelay: "0.95s" }
            }
          />

          <div
            className={"errorTextForL"}
            style={{
              transform:
                props.errorTextVissibility === "hidden" || isClicked
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
      props.errorText,
      props.inputRef,
      props.maxLength,
      props.nameValidation,
      props.minLenght,
    ]
  );

  return (
    <div className="inputWrapperForL">
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
        onIconClick={() => {}}
        value={props.inputRef}
        isClearIcon={hasError}
      />
    </div>
  );
};
