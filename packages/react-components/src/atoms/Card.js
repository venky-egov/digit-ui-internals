import React from "react";
import { useLocation } from "react-router-dom";

const Card = ({ className, onClick, style, children, ...props }) => {
  const { pathname } = useLocation();
  const classname = Digit.Hooks.fsm.useRouteSubscription(pathname);
  const info = Digit.UserService.getUser()?.info;
  const userType = info?.type;
  const isCitizen = classname === "citizen" || userType === "CITIZEN";
  return (
    // <div className={className ? className : userType === "employee" ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
    <div className={!isCitizen ? "employeeCard" : "card"} onClick={onClick} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
