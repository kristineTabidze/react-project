import classnames from "classnames";
import React, { useCallback, useState } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import "./styles/registration.css";

export var allCountries = [
  ["Georgia (საქართველო)", "ge", "995"],
  ["Turkey (Türkiye)", "tr", "90"],
  ["Russia (Россия)", "ru", "7", 0],
  ["Azerbaijan (Azərbaycan)", "az", "994"],
  ["Armenia (Հայաստան)", "am", "374"],
  ["Ukraine (Україна)", "ua", "380"],
  ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
  ["Belarus (Беларусь)", "by", "375"],
];

export const CountrySelector = ({ setCountry }) => {
  const [defaultCountry, setDefaultCountry] = useState("ge");

  const [value, setValue] = useState({
    name: "Georgia (საქართველო)",
    iso2: "ge",
    dialCode: "995",
    priority: 0,
    areaCodes: null,
  });

  const onPhoneNumberChange = useCallback((country) => {
    allCountries.map((c) => {
      if (c[0].indexOf(country) > -1) {
        const nc = {
          name: c[0],
          iso2: c[1],
          dialCode: c[2],
          priority: 0,
          areaCodes: null,
        };
        setValue(nc);
        setCountry(nc);
        setDefaultCountry(c[1]);
      }
    });
  }, []);

  return (
    <div className={"countriesWrapper"}>
      <IntlTelInput
        preferredCountries={["ge"]}
        defaultCountry={defaultCountry}
        autoPlaceholder={false}
        containerClassName={classnames("countrySelect", "intl-tel-input")}
        inputClassName="menuPhone"
        value={value.name}
        onSelectFlag={(num, country) => {
          setValue(country);
          setCountry(country);
        }}
        onPhoneNumberChange={(status, value, countryData, number, id) => {
          onPhoneNumberChange(value);
          setValue({ name: value });
          setCountry({ name: value });
        }}
        countriesData={allCountries}
      />
    </div>
  );
};
