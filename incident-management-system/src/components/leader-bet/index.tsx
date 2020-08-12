import React, { useCallback, useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import Select, { StylesConfig } from "react-select";
import { NameInput } from "./inputs";

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
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";

    return { ...provided, opacity, transition, color };
  },
  indicatorSeparator: (provided, state) => {
    return { display: "none" };
  },

  indicatorsContainer: (provided, state) => {
    return { ...provided, color: "white" };
  },
};

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    width: 97,
    background: "#616161",
    fontSize: 13,
    color: "white",
    outline: "none",
    fontFamily: "Roboto Geo Caps",
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
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";

    return { ...provided, opacity, transition, color };
  },
  indicatorSeparator: (provided, state) => {
    return { display: "none" };
  },

  indicatorsContainer: (provided, state) => {
    return { ...provided, color: "white" };
  },
};

export const SignUpInputs: React.FC<{}> = (props) => {
  const name: React.MutableRefObject<string> = useRef("");
  const surname: React.MutableRefObject<string> = useRef("");
  const personalId: React.MutableRefObject<string> = useRef("");
  const mail: React.MutableRefObject<string> = useRef("");
  const userName: React.MutableRefObject<string> = useRef("");
  const password: React.MutableRefObject<string> = useRef("");
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
    <div>
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
      <div className="inputWrapper">
        <div className="inputLabel">
          ქვეყანა
          <span className="star">*</span>
        </div>
        <ReactFlagsSelect
          countries={["GE", "TR", "RU", "AZ", "AM", "UK", "KZ", "BY"]}
          customLabels={{
            GE: "Georgia (საქართველო)",
            TR: "Turkey (Türkiye)",
            RU: "Russia (Россия)",
            AZ: "Azerbaijan (Azərbaycan)",
            AM: "Armenia (Հայաստան)",
            UK: "Ukraine (Україна)",
            KZ: "Kazakhstan (Казахстан)",
            BY: "Belarus (Беларусь)",
          }}
          searchable={false}
          placeholder=""
          defaultCountry={"GE"}
          className="menuFlags"
          alignOptions="center"
        />
      </div>
      <NameInput
        inputRef={personalId}
        minLenght={8}
        maxLength={15}
        errorText={"პირადი ნომერი უნდა შეიცავდეს 8 დან 15 სიმბოლომდე"}
        label="პირადი ნომერი"
        type={"number"}
      />

      <div className="inputWrapper">
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
      <div className="inputWrapper">
        <div className="inputLabel">
          ტელეფონი
          <span className="star">*</span>
        </div>
        <ReactFlagsSelect
          countries={["GE", "TR", "RU", "AZ", "AM", "UK", "KZ", "BY"]}
          customLabels={{
            GE: "Georgia (საქართველო) +995",
            TR: "Turkey (Türkiye) +90",
            RU: "Russia (Россия) +7",
            AZ: "Azerbaijan (Azərbaycan) +994",
            AM: "Armenia (Հայաստան) +374",
            UK: "Ukraine (Україна) +380",
            KZ: "Kazakhstan (Казахстан) +7",
            BY: "Belarus (Беларусь) +375",
          }}
          searchable={false}
          placeholder=""
          defaultCountry={"GE"}
          className="menuFlags"
          alignOptions="center"
          showSelectedLabel={false}
        />
      </div>
      <NameInput inputRef={mail} label="ელ-ფოსტა" isnotMandatory={true} />
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
    </div>
  );
};
