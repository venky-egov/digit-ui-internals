import { FormStep } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const SelectPincode = ({ t, config, onSelect, value }) => {
  const tenants = Digit.Hooks.fsm.useTenants();
  const [pincode, setPincode] = useState(() => {
    const { pincode } = ""; //value;
    return pincode;
  });
  const [pincodeServicability, setPincodeServicability] = useState(null);

  function onChange(e) {
    setPincode(e.target.value);
    setPincodeServicability(null);
  }

  const goNext = async (data) => {
    const foundValue = tenants?.find((obj) => obj.pincode?.find((item) => item == data?.pincode));
    if (foundValue) {
      let response = await Digit.LocationService.getLocalities({ tenantId: foundValue.code });
      let __localityList = Digit.LocalityService.get(response.TenantBoundary[0]);
      const filteredLocalities = __localityList.filter((obj) => obj.pincode?.find((item) => item == data.pincode));
      // Digit.SessionStorage.set("selected_localities", filteredLocalities?.length > 0 ? filteredLocalities : __localityList);
      onSelect({ ...data, city_complaint: foundValue });
    } else {
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
    }
  };

  const onSkip = () => onSelect();
  return (
    <FormStep
      t={t}
      config={config}
      onSelect={goNext}
      _defaultValues={{ pincode }}
      onChange={onChange}
      onSkip={onSkip}
      forcedError={t(pincodeServicability)}
      isDisabled={!pincode}
    ></FormStep>
  );
};

export default SelectPincode;
