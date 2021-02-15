import React from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";

const SelectGeolocation = ({ onSelect, onSkip, value, t }) => {
  let pincode = "";
  return (
    <LocationSearchCard
      header={`CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER`}
      cardText={`CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT`}
      nextText={"CS_COMMON_NEXT"}
      skipAndContinueText={"CS_COMMON_SKIP"}
      skip={() => onSkip()}
      onSave={() => onSelect({ pincode })}
      onChange={(code) => (pincode = code)}
    />
  );
};

export default SelectGeolocation;
