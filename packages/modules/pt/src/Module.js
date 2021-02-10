import React from "react";
import CitizenApp from "./pages/citizen";

export const PTModule = ({ userType }) => {
  const moduleCode = "PT";
  console.log(moduleCode, "module integrated");

  if (userType === "citizen") {
    return <CitizenApp />;
  } else {
    return null;
  }
};

export const PTLinks = () => {
  return <React.Fragment></React.Fragment>;
};
