import React, { ChangeEvent, useState } from "react";
import "./styles/auth-input.css";
import { useInput, useTextArea } from "../../hooks";
import classNames from "classnames";
import { ReactComponent as EyeIcon } from "./styles/imgs/eye.svg";
import { ReactComponent as CrossedEyeIcon } from "./styles/imgs/hide.svg";
import { ReactComponent as MailIcon } from "./styles/imgs/email.svg";

interface IInputProps {
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number";
  inputRef?: React.RefObject<HTMLInputElement | null>;
  errorText?: string;
  icon?: JSX.Element;
  onIconClick?: () => void;
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
        {props.icon && (
          <div className={"icon"} onClick={props.onIconClick}>
            {props.icon}
          </div>
        )}
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
  return (
    <GeneralInput
      type={"text"}
      {...props}
      icon={<MailIcon style={{ width: 16 }} />}
    />
  );
};

export const PasswordInput: React.FC<IInputProps> = (props) => {
  const [isIconClicked, setIsIconClicked] = useState<boolean>(false);

  return (
    <GeneralInput
      type={isIconClicked ? "text" : "password"}
      {...props}
      icon={isIconClicked ? <CrossedEyeIcon /> : <EyeIcon />}
      onIconClick={() => setIsIconClicked((x) => !x)}
    />
  );
};

export const Textarea: React.FC<{
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  mainContainerWrapperClassname?: string;
  errorText?: string;
  className?: string;
  placeHolder?: string;
}> = React.memo((props) => {
  const inp = useTextArea(props.defaultValue, props.onChange);

  return (
    <div
      className={
        props.mainContainerWrapperClassname
          ? props.mainContainerWrapperClassname
          : "containerWrapper"
      }
    >
      <div
        style={{ width: "100%" }}
        className={classNames(
          "inputContainer",
          props.errorText !== undefined && props.errorText !== null
        )}
      >
        <textarea
          className={props.className ? props.className : "textAreaInput"}
          placeholder={props.placeHolder}
          {...inp}
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
});
