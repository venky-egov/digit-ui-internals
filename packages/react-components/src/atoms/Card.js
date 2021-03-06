import React from "react";
import { useLocation } from "react-router-dom";

const Card = ({ className, onClick, style, children, ...props }) => {
  const { pathname } = useLocation();
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const isEmployee = classname === "employee"
  const userType = Digit.SessionStorage.get("userType");
  return (
    // <div className={className ? className : userType === "employee" ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
    <div className={className ? className : isEmployee ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
