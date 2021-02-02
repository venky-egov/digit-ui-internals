import React from "react";

const Card = ({ className, onClick, style, children, ...props }) => {
  const userType = Digit.SessionStorage.get("userType");
  return (
    <div className={className ? className : userType === "employee" ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
