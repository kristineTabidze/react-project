import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkEmail, CheckPassword } from "../helper-functions";
import { MailInput, PasswordInput } from "../input/auth-input";
import "./styles/log-in.css";

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
    const checkMail = checkEmail(mail.current);
    const checkPassword = CheckPassword(password.current);

    if (checkMail) setMailErrorText("");
    if (checkPassword) setPasswordErrorText("");

    if (!checkMail) {
      setMailErrorText("ელ.ფოსტა ვალიდური სახის უნდა იყოს");
    } else if (!checkPassword) {
      setPasswordErrorText(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8, მაქსიმუმ 16 სიმბოლოს და მინიმუმ 1 რიცხვს"
      );
    } else if (!isNaN(Number(password.current[0]))) {
      setPasswordErrorText("პაროლი არ უნდა იწყებოდეს რიცხვით");
    } else {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ mail: mail.current, password: password.current })
      ); //add to localstorage
      window.open("/table", "_self");
    }
  }, []);

  const onEnterClick = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        onRedirectMainTablePage();
      }
    },
    [onRedirectMainTablePage]
  );

  return (
    <div
      className="loginPageContainer"
      onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => onEnterClick(e)}
    >
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
          შესვლა
        </button>
      </div>
    </div>
  );
};
