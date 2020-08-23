import React, { useState, useCallback } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "./styles/registration.css";
import { allCountries } from ".//country-select";
import { ReactComponent as CheckMark } from "./styles/imgs/check.svg";
import { ReactComponent as Cross } from "./styles/imgs/cross.svg";

export const PhoneNumberSelector = ({ setPhone }) => {
  const [hasError, setError] = useState();
  const [icon, setIcon] = useState();
  const [visibility, setVisibility] = useState("hidden");

  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");

  const onClear = useCallback(() => {
    setValue("");
    setIsClicked(true);
  }, []);

  const onTextChange = useCallback(
    (status, value, countryData, number, id) => {
      setPhone({ mobile: value, countryData: countryData });
      setValue(value);
      setIsClicked(false);

      if (value.length === 12) {
        setVisibility("hidden");
        setError(false);
        setIcon(
          <div className="checkmarkForTelSelector">
            <CheckMark style={{ width: 18 }} />
          </div>
        );
      } else {
        setError(true);
        setIcon(
          <div className="cross">
            <Cross style={{ width: 15 }} />
          </div>
        );

        setVisibility("visible");
      }
    },
    [setPhone]
  );

  const donothing = () => {
    ///
  };

  return (
    <>
      <div className={"inputContainerForL"}>
        <IntlTelInput
          preferredCountries={["ge"]}
          onPhoneNumberChange={(status, value, countryData, number, id) => {
            onTextChange(status, value, countryData, number, id);
          }}
          separateDialCode={true}
          initialCountry={"ge"}
          inputClassName="menuPhone"
          inputStyle={{ width: "280px !important" }}
          autoPlaceholder={false}
          format={true}
          allowDropdown={true}
          containerClassName="intl-tel-input"
          formatOnDisplay={false}
          countriesData={allCountries}
          value={value}
        />
        {!isClicked && (
          <div className={"iconForL"} onClick={!hasError ? donothing : onClear}>
            {icon || ""}
          </div>
        )}
      </div>
    </>
  );
};
