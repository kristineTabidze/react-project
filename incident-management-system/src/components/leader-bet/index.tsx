import React, { useCallback, useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import Select, { StylesConfig } from "react-select";
import { NameInput } from "./inputs";
import "react-telephone-input/css/default.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { PhoneNumberSelector } from "./international-telephone-input";
import { CountrySelector } from "./country-select";

interface ISelectItem {
  value: string;
  label: string;
}

const days: ISelectItem[] = [{ value: "0", label: "რიცხვი" }];
const months: ISelectItem[] = [{ value: "0", label: "თვე" }];
const years: ISelectItem[] = [{ value: "0", label: "წელი" }];

for (let i = 1; i <= 31; i++) {
  if (i < 10) days.push({ value: `${i}`, label: `0${i}` });
  else days.push({ value: `${i}`, label: `${i}` });
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) months.push({ value: `${i}`, label: `0${i}` });
  else months.push({ value: `${i}`, label: `${i}` });
}

for (let i = 2002; i >= 1940; i--) {
  years.push({ value: `${i}`, label: `${i}` });
}

const customMonthStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    width: 80,
    background: "#616161",
    fontSize: 13,
    color: "white",
    outline: "none",
    fontFamily: "Roboto Geo Caps",
    zIndex: 100000,
    overflow: "auto",
    padding: "2px 5px",
    textAlign: "left",
    "&:hover": {
      background: "#2684FF",
    },
  }),

  control: (provided, state) => ({
    ...provided,
    width: 80,
    background: "#616161",
    fontSize: 13,
    height: 34,
    borderRadius: 0,
    color: "white",
    outline: "none",
    fontFamily: "Roboto Geo Caps",
    border: "1px solid transparent",
    boxShadow: "none !important",
    "&:hover": {
      borderColor: "transparent",
    },
  }),

  menu: (provided, state) => ({
    ...provided,
  }),

  menuList: (provided, state) => ({
    ...provided,
    maxHeight: 283,
    paddingBottom: 0,
    paddingTop: 0,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";
    const zIndex = 100;

    return { ...provided, opacity, transition, color, zIndex };
  },
  indicatorSeparator: (provided, state) => {
    return { display: "none" };
  },

  indicatorsContainer: (provided, state) => {
    return {
      ...provided,
      color: "white",
      "&:hover": {
        color: "white",
      },
    };
  },
};

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    width: "100%",
    background: "#616161",
    fontSize: 13,
    color: "white",
    outline: "none",
    fontFamily: "Roboto Geo Caps",
    zIndex: 100000,
    overflow: "auto",
    padding: "2px 5px",
    textAlign: "left",
    "&:hover": {
      background: "#2684FF",
    },
  }),

  control: (provided, state) => ({
    ...provided,
    width: 97,
    background: "#616161",
    fontSize: 13,
    height: 34,
    borderRadius: 0,
    color: "white",
    outline: "none",
    fontFamily: "Roboto Geo Caps",
    border: "1px solid transparent",
    boxShadow: "none !important",
    "&:hover": {
      borderColor: "transparent",
    },
  }),

  menu: (provided, state) => ({
    ...provided,
  }),

  menuList: (provided, state) => ({
    ...provided,
    maxHeight: 434,
    paddingBottom: 0,
    paddingTop: 0,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";
    const zIndex = 100;

    return { ...provided, opacity, transition, color, zIndex };
  },
  indicatorSeparator: (provided, state) => {
    return { display: "none" };
  },

  indicatorsContainer: (provided, state) => {
    return {
      ...provided,
      color: "white",
      "&:hover": {
        color: "white",
      },
    };
  },
};

export const SignUpInputs: React.FC<{}> = (props) => {
  const name: React.MutableRefObject<string> = useRef("");
  const surname: React.MutableRefObject<string> = useRef("");
  const personalId: React.MutableRefObject<string> = useRef("");
  const mail: React.MutableRefObject<string> = useRef("");
  const userName: React.MutableRefObject<string> = useRef("");
  const password: React.MutableRefObject<string> = useRef("");
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState({
    name: "Georgia (საქართველო)",
    iso2: "ge",
    dialCode: "995",
    priority: 0,
    areaCodes: null,
  });
  const [day, setDay] = useState<ISelectItem>({ value: "0", label: "რიცხვი" });
  const [month, setMonth] = useState<ISelectItem>({
    value: "0",
    label: "თვე",
  });
  const [year, setYear] = useState<ISelectItem>({ value: "0", label: "წელი" });

  const onDayChange = useCallback((selectedOption: any) => {
    setDay(selectedOption);
  }, []);

  const onMonthChange = useCallback((selectedOption: any) => {
    setMonth(selectedOption);
  }, []);

  const onYearChange = useCallback((selectedOption: any) => {
    setYear(selectedOption);
  }, []);

  return (
    <div className="registrationContainer">
      <div className={"App"}>
        <div className="upperTextContainer">
          <h1 className="title">რეგისტრაცია</h1>
          <p className="warning">
            სავალდებულოა ყველა ველი შეივსოს კორექტულად მხოლოდ ლათინური ასოებით
            და ციფრებით.
          </p>
          <p className={"secWarn"}>
            <b>ყურადღება: </b>
            რეგისტრაციისას მითითებული პირადი მონაცემების უზუსტობის შემთხვევაში,
            კომპანია იტოვებს უფლებას შეგიზღუდოთ საიტით სარგებლობა!
          </p>
        </div>

        <NameInput
          inputRef={name}
          errorText={"სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს"}
          minLenght={2}
          label={"სახელი"}
          nameValidation={true}
        />
        <NameInput
          inputRef={surname}
          errorText={"გვარი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს"}
          minLenght={4}
          label={"გვარი"}
          nameValidation={true}
        />
        <div className="inputWrapperForL">
          <div className="inputLabel">
            ქვეყანა
            <span className="star">*</span>
          </div>
          <CountrySelector setCountry={setCountry} />
        </div>
        <NameInput
          inputRef={personalId}
          minLenght={8}
          maxLength={15}
          errorText={"პირადი ნომერი უნდა შეიცავდეს 8 დან 15 სიმბოლომდე"}
          label="პირადი ნომერი"
          type={"text"}
        />

        <div className="inputWrapperForL">
          <div className="inputLabel">
            დაბადების თარიღი
            <span className="star">*</span>
          </div>
          <div className="dateSelectorsContainer">
            <Select
              value={day}
              onChange={onDayChange}
              options={days}
              styles={customStyles}
            />
            <Select
              value={month}
              onChange={onMonthChange}
              options={months}
              styles={customMonthStyles}
            />
            <Select
              value={year}
              onChange={onYearChange}
              options={years}
              styles={customStyles}
            />
          </div>
        </div>
        <div className="inputWrapperForL">
          <div className="inputLabel">
            ტელეფონი
            <span className="star">*</span>
          </div>
          <PhoneNumberSelector setPhone={setPhone} />
        </div>

        <NameInput inputRef={mail} label="ელ-ფოსტა" isnotMandatory={true} />
        <div className="dLine" />
        <NameInput
          inputRef={userName}
          label="მომხმარებელი"
          errorText={"მომხმარებლის სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს"}
          minLenght={4}
        />
        <NameInput
          inputRef={password}
          label="პაროლი"
          errorText={"პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს"}
          minLenght={6}
          type="password"
        />
        <button className="regButton">რეგისტრაცია</button>
        <div className={"apprRul"}>
          რეგისტრაციის ღილაკზე დაჭერით
          <br />
          ვადასტურებ, რომ ვარ 18 წლის და ვეთანხმები საიტის
          <a
            href={
              "javascript:window.location = '/web/'+current_lang+'/rules-new?_t=8#39'"
            }
          >
            წესებს და პირობებს
          </a>
        </div>
      </div>
    </div>
  );
};
