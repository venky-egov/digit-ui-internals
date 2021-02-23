import { FormStep, TextInput, CardLabel, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";

const SelectPincode = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenants = Digit.Hooks.fsm.useTenants();
  const [pincode, setPincode] = useState(() => {
    const { pincode } = formData?.address || "";
    return pincode;
  });
  const inputs = [
    {
      label: "CORE_COMMON_PINCODE",
      type: "text",
      name: "pincode",
      validation: {
        // pattern: /^([1-9])(\d{5})$/,
        minLength: 6,
        maxLength: 7,
      },
      error: "CORE_COMMON_PINCODE_INVALID",
    },
  ];
  const [pincodeServicability, setPincodeServicability] = useState(null);

  useEffect(() => {
    // console.log("find pincode datahere", formData?.address?.pincode)
    if (formData?.address?.pincode) {
      setPincode(formData.address.pincode);
    }
  }, [formData?.address?.pincode]);

  function onChange(e) {
    setPincode(e.target.value);
    setPincodeServicability(null);
    if (userType === "employee") {
      onSelect(config.key, { pincode: e.target.value });
    }
  }

  const goNext = async (data) => {
    const foundValue = tenants?.find((obj) => obj.pincode?.find((item) => item == data?.pincode));
    if (foundValue) {
      onSelect(config.key, { pincode });
    } else {
      setPincodeServicability("CS_COMMON_PINCODE_NOT_SERVICABLE");
    }
  };

  if (userType === "employee") {
    return inputs?.map((input) => {
      return (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <TextInput style={{ width: "50%" }} key={input.name} value={pincode} onChange={onChange} {...input.validation} />
        </LabelFieldPair>
      );
    });
  }
  const onSkip = () => onSelect();
  return (
    <FormStep
      t={t}
      config={{ ...config, inputs }}
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