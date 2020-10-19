import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function PhoneNumber({
  onChange,
  value,
  placeholder = "Enter phone number",
  name,
  disabled
}) {
  const [state, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  return (
    <PhoneInput
      style={{ width: "100%" }}
      defaultCountry="NG"
      placeholder={placeholder}
      defaultValue={state}
      value={state}
      name={name}
      disabled={disabled}
      onChange={(value) => {
     
        setValue(value);
        onChange({ name, value }, true);
      }}
    />
  );
}
