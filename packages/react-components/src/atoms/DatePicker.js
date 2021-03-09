import React, { useState, useRef } from "react";
import { CalendarIcon } from "../atoms/svgindex";

const DatePicker = (props) => {
  const [date, setDate] = useState(() => props.initialDate || null);
  const dateInp = useRef();

  const getDatePrint = () => props?.formattingFn?.(date) || date?.toLocaleString("in");
  const selectDate = (e) => {
    const date = e.target.value;
    setDate(date);
    props?.onChange?.(date);
  };

  return (
    <React.Fragment>
      <input type="text" value={getDatePrint()} readOnly className="employee-card-input" style={{ width: "calc(100%-62px)" }} />
      <div style={{ position: "relative" }}>
        <CalendarIcon
          onClick={() => {
            dateInp.current.focus();
            dateInp.current.click();
          }}
          style={{ right: 0, zIndex: "10", bottom: 0, position: "absolute" }}
        />
        <input
          style={{ right: 0, zIndex: "100", bottom: 0, position: "absolute", opacity: 0, borderLeft: "0px" }}
          value={date}
          type="date"
          ref={dateInp}
          onChange={selectDate}
        />
      </div>
    </React.Fragment>
  );
};

export default DatePicker;
