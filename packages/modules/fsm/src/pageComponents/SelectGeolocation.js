import React, { useState } from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";

const SelectGeolocation = ({ onSelect, value, t }) => {
  const [pincode, setPincode] = useState("");

  const onSkip = () => onSelect();

  return (
    <LocationSearchCard
      header={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER")}
      cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
      nextText={t("CS_COMMON_NEXT")}
      skipAndContinueText={t("CORE_COMMON_SKIP_CONTINUE")}
      skip={onSkip}
      onSave={() => onSelect({ pincode })}
      onChange={(code) => setPincode(code)}
      disabled={pincode === ""}
    />
  );
};

export default SelectGeolocation;
