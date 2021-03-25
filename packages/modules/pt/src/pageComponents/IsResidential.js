import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const IsResidential = ({ t, config, onSelect, userType, formData }) => {
  const [isResdential, setisResdential] = useState(formData?.isResdential);
  console.log(formData);
  const menu = [{ i18nKey: "PT_COMMON_YES" }, { i18nKey: "PT_COMMON_NO" }];

  const onSkip = () => onSelect();

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectisResdential(value) {
    setisResdential(value);
  }

  function goNext() {
    onSelect(config.key, isResdential);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!isResdential}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={isResdential}
        onSelect={selectisResdential}
      />
    </FormStep>
  );
};
export default IsResidential;
