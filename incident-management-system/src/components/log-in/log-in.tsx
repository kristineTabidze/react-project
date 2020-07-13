import React, { useRef, useCallback, useState, useEffect } from "react";
import { MailInput, PasswordInput } from "../input/auth-input";
import { useHistory } from "react-router-dom";
import "./styles/log-in.css";

const useCheckNumberInString = (input: string) => {
  const [hasDigit, setHasDigit] = useState<boolean>(false);
  useEffect(() => {
    for (let i = 0; i <= 9; i++) {
      if (input.indexOf(i + "") > -1) {
        setHasDigit(true);
      }
    }
  }, [input]);

  return hasDigit;
};

export const LoginPage: React.FC<{}> = (props) => {
  const history = useHistory();
  const mail: React.MutableRefObject<string> = useRef("");
  const password: React.MutableRefObject<string> = useRef("");
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");
  const [mailErrorText, setMailErrorText] = useState<string>("");

  const hasPasswordDigit = useCheckNumberInString(password.current);

  const onMailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    mail.current = e.target.value;
  }, []);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      password.current = e.target.value;
    },
    []
  );

  const onRedirectMainTablePage = useCallback(() => {
    if (mail.current.indexOf("@") === -1 && mail.current.indexOf(".") === -1) {
      setMailErrorText("ელ.ფოსტა ვალიდური სახის უნდა იყოს");
    }
    if (password.current.length < 8 || password.current.length > 16) {
      setPasswordErrorText(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8, მაქსიმუმ 16 სიმბოლოს"
      );
    } else if (!hasPasswordDigit) {
      setPasswordErrorText("პაროლი უნდა შეიცავდეს მინიმუმ 1 რიცხვს");
    } else if (!isNaN(Number(password.current[0]))) {
      setPasswordErrorText("პაროლი არ უნდა იწყებოდეს რიცხვით");
      console.log("blaaa");
    } else history.push("/main-table-page");
  }, [history, hasPasswordDigit]);

  return (
    <div className="loginPage">
      <MailInput
        onChange={onMailChange}
        placeholder={"ელ.ფოსტა"}
        errorText={mailErrorText}
      />
      <PasswordInput
        onChange={onPasswordChange}
        placeholder={"პაროლი"}
        errorText={passwordErrorText}
      />
      <button onClick={onRedirectMainTablePage} className="approveButton">
        დასტური
      </button>
    </div>
  );
};
