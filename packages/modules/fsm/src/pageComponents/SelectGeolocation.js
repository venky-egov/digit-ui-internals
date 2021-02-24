import React, { useState } from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";

const SelectGeolocation = ({ onSelect, t, config }) => {
  const [pincode, setPincode] = useState("");
   const tenants = Digit.Hooks.fsm.useTenants();
   const [pincodeServicability, setPincodeServicability] = useState(null);

  const onSkip = () => onSelect();
  const onChange = (code )=> {
    setPincodeServicability(null);
    const foundValue = tenants?.find((obj) => obj.pincode?.find((item) => item == code));
    if(!foundValue){
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
      setPincode("");
    }else {
      setPincode(code);
    }
  }

  return (
    <LocationSearchCard
      header={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_HEADER")}
      cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
      nextText={t("CS_COMMON_NEXT")}
      skipAndContinueText={t("CORE_COMMON_SKIP_CONTINUE")}
      skip={onSkip}
      t={t}
      onSave={() => onSelect(config.key, { geolocation: {}, pincode })}
      onChange={(code) => onChange(code)}
      disabled={pincode === ""}
      forcedError={t(pincodeServicability)}
    />
  );
};

export default SelectGeolocation;
