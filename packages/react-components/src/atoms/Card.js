import React from "react";

const Card = ({ className, onClick, style, children, ...props }) => {
  const isEmployee = window.location.pathname.split("/").includes("employee");
  const userType = Digit.SessionStorage.get("userType");
  return (
    // <div className={className ? className : userType === "employee" ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
    <div className={className ? className : isEmployee ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
