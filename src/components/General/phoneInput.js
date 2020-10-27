import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function PhoneNumber({
  onChange,
  value,
  placeholder = "Enter phone number",
  name,
  disabled,
}) {
  return (
    <PhoneInput
      style={{ width: "100%" }}
      defaultCountry="NG"
      placeholder={placeholder}
      defaultValue={value}
      value={value}
      name={name}
      disabled={disabled}
      onChange={(value) => {
        // setValue(value);
        onChange({ name, value }, true);
      }}
    />
  );
}
