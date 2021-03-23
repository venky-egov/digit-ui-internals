import React, { useState, useEffect } from "react";
import { FormStep, TypeSelectCard, RadioButtons } from "@egovernments/digit-ui-react-components";

const PropertyUsageType = ({ t, config, onSelect, userType, formData }) => {
  const [PropertyPurpose, setPropertyPurpose] = useState(formData?.PropertyUsageType);
  //   const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OccupancyType");

  const menu = [
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_INSTITUTIONAL",
    },
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_INDUSTRIAL",
    },
    {
      i18nKey: "PROPERTYTAX_BILLING_SLAB_COMMERCIAL",
    },
  ];

  const onSkip = () => onSelect();

  useEffect(() => {
    if (userType !== "employee" && formData?.IsResidential?.ResidentialType?.code === false) onSelect(config.key, {}, true);
  }, [formData?.IsResidential?.ResidentialType]);

  function selectPropertyPurpose(value) {
    setPropertyPurpose(value);
  }
  
  function goNext() {
    onSelect(config.key, PropertyPurpose);
    // onSelect(config.key,ResidentialType, false, index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!PropertyPurpose}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={PropertyPurpose}
        onSelect={selectPropertyPurpose}
      />
    </FormStep>
  );
};

export default PropertyUsageType;
