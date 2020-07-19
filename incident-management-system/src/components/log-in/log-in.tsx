import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCheckNumberInString } from "../../hooks";
import { MailInput, PasswordInput } from "../input/auth-input";
import "./styles/log-in.css";
import { checkEmail } from "../helper-functions";

export const LoginPage: React.FC<{}> = (props) => {
  const retrieved = localStorage.getItem("loggedUser");
  const retrievedObject = retrieved && JSON.parse(retrieved);
  const history = useHistory();
  const mail: React.MutableRefObject<string> = useRef(
    retrievedObject && retrievedObject.mail ? retrievedObject.mail : ""
  );
  const password: React.MutableRefObject<string> = useRef(
    retrievedObject && retrievedObject.password ? retrievedObject.password : ""
  );
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");
  const [mailErrorText, setMailErrorText] = useState<string>("");

  const hasPasswordDigit = useCheckNumberInString(password.current);

  const onMailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    mail.current = e.target.value;
  }, []);

  const [hasError, setHasError] = useState<boolean>(false);

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      password.current = e.target.value;
    },
    []
  );

  const onRedirectMainTablePage = useCallback(() => {
    const checkMail = checkEmail(mail.current);
    if (!checkMail) {
      setHasError(true);
      setMailErrorText("ელ.ფოსტა ვალიდური სახის უნდა იყოს");
    }
    if (password.current.length < 8 || password.current.length > 16) {
      setPasswordErrorText(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8, მაქსიმუმ 16 სიმბოლოს"
      );
      setHasError(true);
    }
    if (!hasPasswordDigit) {
      setPasswordErrorText("პაროლი უნდა შეიცავდეს მინიმუმ 1 რიცხვს");
      setHasError(true);
    }
    if (!isNaN(Number(password.current[0]))) {
      setPasswordErrorText("პაროლი არ უნდა იწყებოდეს რიცხვით");
      setHasError(true);
    }
    if (!hasError) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ mail: mail.current, password: password.current })
      ); //add to localstorage
      history.push("/table");
    }
  }, [history, hasPasswordDigit, hasError]);

  return (
    <div className="loginPage">
      <MailInput
        onChange={onMailChange}
        placeholder={"ელ.ფოსტა"}
        errorText={mailErrorText}
        defaultValue={mail.current}
      />
      <PasswordInput
        onChange={onPasswordChange}
        placeholder={"პაროლი"}
        errorText={passwordErrorText}
        defaultValue={password.current}
      />
      <button onClick={onRedirectMainTablePage} className="approveButton">
        დასტური
      </button>
    </div>
  );
};
