import React, { useState } from "react";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";

const SelectGeolocation = ({ onSelect, t, config }) => {
  const [pincode, setPincode] = useState("");
  const [geoLocation, setGeoLocation] = useState({});
  const tenants = Digit.Hooks.fsm.useTenants();
  const [pincodeServicability, setPincodeServicability] = useState(null);

  const onSkip = () => onSelect();
  const onChange = (code, location) => {
    setPincodeServicability(null);
    const foundValue = tenants?.find((obj) => obj.pincode?.find((item) => item == code));
    if (!foundValue) {
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
      setPincode("");
      setGeoLocation({});
    } else {
      setPincode(code);
      setGeoLocation(location);
    }
  };

  return (
    <LocationSearchCard
      header={t("PT_GEOLOCATON_HEADER")}
      cardText={t("PT_GEOLOCATION_TEXT")}
      nextText={t("PT_COMMON_NEXT")}
      skipAndContinueText={t("CORE_COMMON_SKIP_CONTINUE")}
      skip={onSkip}
      t={t}
      onSave={() => onSelect(config.key, { geoLocation, pincode })}
      onChange={(code, location) => onChange(code, location)}
      disabled={pincode === ""}
      forcedError={t(pincodeServicability)}
    />
  );
};

export default SelectGeolocation;
