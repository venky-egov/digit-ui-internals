import React, { useState, useEffect } from "react";
import { FormStep, TypeSelectCard, RadioButtons } from "@egovernments/digit-ui-react-components";

const PropertyUsageType = ({ t, config, onSelect, userType, formData }) => {
  const [usageCategoryMajor, setPropertyPurpose] = useState(formData?.usageCategoryMajor);
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
    if (userType !== "employee" && formData?.isResidental?.value?.code === true) {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      onSelect(config.key, { i18nKey: "RESIDENTAL" });
    }
  }, [formData?.usageCategoryMajor?.usageCategoryMajor?.code]);

  function selectPropertyPurpose(value) {
    setPropertyPurpose(value);
  }

  function goNext() {
    onSelect(config.key, usageCategoryMajor);
    // onSelect(config.key,ResidentialType, false, index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!usageCategoryMajor}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={usageCategoryMajor}
        onSelect={selectPropertyPurpose}
      />
    </FormStep>
  );
};

export default PropertyUsageType;
