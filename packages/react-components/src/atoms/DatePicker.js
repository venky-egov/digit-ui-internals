import React, { useState, useRef } from "react";
import { CalendarIcon } from "../atoms/svgindex";

const DatePicker = (props) => {
  // const [date, setDate] = useState(() => props.initialDate || null);
  const dateInp = useRef();

  const getDatePrint = () => props?.formattingFn?.(props.date) || props.date?.toLocaleString("in");
  const selectDate = (e) => {
    const date = e.target.value;
    // setDate(date);
    props?.onChange?.(date);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <React.Fragment>
        <input type="text" value={getDatePrint()} readOnly className="employee-card-input" style={{ width: "calc(100%-62px)" }} />
        <CalendarIcon style={{ right: "6px", zIndex: "10", top: 6, position: "absolute" }} />
        <input
          style={{ right: "6px", zIndex: "100", top: 6, position: "absolute", opacity: 0, width: "100%" }}
          value={props.date}
          type="date"
          ref={dateInp}
          onChange={selectDate}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
        />
      </React.Fragment>
    </div>
  );
};

export default DatePicker;
