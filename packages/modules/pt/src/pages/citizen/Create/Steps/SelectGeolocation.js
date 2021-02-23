import React, { useState } from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";

const SelectGeolocation = ({ onSelect, value, t }) => {
  const [pincode, setPincode] = useState("");

  const onSkip = () => onSelect();

  return (
    <LocationSearchCard
      header={t("Pin Propery Location")}
      cardText={t(
        "Click and hold to drop the pin to complaint location. If you are not able to pin the location you can skip the continue for next step."
      )}
      nextText={t("Next")}
      skipAndContinueText={t("Skip and Continue")}
      skip={onSkip}
      onSave={() => onSelect({ pincode })}
      onChange={(code) => setPincode(code)}
      disabled={pincode === ""}
    />
  );
};

export default SelectGeolocation;
