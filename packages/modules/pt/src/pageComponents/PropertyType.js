import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const PropertyType = ({ t, config, onSelect, userType, formData }) => {
  const [BuildingType, setBuildingType] = useState(formData?.PropertyType);

  const menu = [
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_INDEPENDENTPROPERTY",
    },
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_SHAREDPROPERTY",
    },
    {
      i18nKey: "COMMON_PROPTYPE_VACANT",
    },
  ];

  const onSkip = () => onSelect();

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectBuildingType(value) {
    setBuildingType(value);
  }

  function goNext() {
    onSelect(config.key, BuildingType);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BuildingType}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={BuildingType}
        onSelect={selectBuildingType}
      />
    </FormStep>
  );
};
export default PropertyType;
