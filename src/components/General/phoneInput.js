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
      style={{ width: "100%", overflow:"hidden",
      borderRadius:"6px", marginLeft: "0px", 
      marginBottom: "15px",
      background: "white", paddingRight: "4px", paddingLeft: "8px",
       borderStyle: "solid", borderColor: '#7FC7AF', borderWidth: "2px",
       }}
      defaultCountry="NG"
      placeholder={placeholder}
      defaultValue={value}
      value={value}
      name={name}
      disabled={disabled}
      className=" pb-0"
      onChange={(value) => {
        // setValue(value);
        onChange({ name, value }, true);
      }}
    />
  );
}
