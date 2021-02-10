import React from "react";

const CardLabelDesc = ({ children, style }) => {
  return (
    <h2 className="card-label-desc" style={style}>
      {children}
    </h2>
  );
};

export default CardLabelDesc;
