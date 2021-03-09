import React from "react";

const CardLabelError = (props) => {
  return (
    <h2 className="card-label-error" style={props.style}>
      {props.children}
    </h2>
  );
};

export default CardLabelError;
