import React, { Fragment } from "react";
import TimePicker from "react-time-picker";
import { TextInput } from "@egovernments/digit-ui-react-components";

const CustomTimePicker = ({ name, value, onChange }) => {
  const timeFormat = new Date().toLocaleTimeString();
  const onTimeKeyDown = (e) => {
    if ((e.keyCode == 48 || e.keyCode == 96) && e.target.value) {
      e.preventDefault();
    } else if (((e.keyCode > 48 && e.keyCode <= 57) || (e.keyCode > 96 && e.keyCode <= 105)) && e.target.value === "0") {
      e.preventDefault();
    }
  };
  if (timeFormat.includes("AM") || timeFormat.includes("PM")) {
    return (
      <TextInput
        name={name}
        type="time"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: "100%", maxWidth: "200px" }}
      />
    );
  }

  return (
    <TimePicker
      name={name}
      onChange={onChange}
      value={value}
      locale="en-US"
      disableClock={false}
      clearIcon={null}
      maxLength={2}
      onKeyDown={onTimeKeyDown}
    />
  );
};

export default CustomTimePicker;
