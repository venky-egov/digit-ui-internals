import React, { useState, useEffect } from "react";
import { FormStep, TypeSelectCard, RadioButtons } from "@egovernments/digit-ui-react-components";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { cardBodyStyle } from "../utils";

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
    if (userType !== "employee" && formData?.isResdential?.i18nKey === "PT_COMMON_YES" && formData?.usageCategoryMajor?.i18nKey !== "RESIDENTIAL") {
      //selectPropertyPurpose({i18nKey : "RESIDENTAL"})
      onSelect(config.key, { i18nKey: "PROPERTYTAX_BILLING_SLAB_RESIDENTIAL" }, true);
    }
  }, [formData?.usageCategoryMajor?.i18nKey]);

  function selectPropertyPurpose(value) {
    setPropertyPurpose(value);
  }

  function goNext() {
    onSelect(config.key, usageCategoryMajor);
    // onSelect(config.key,ResidentialType, false, index);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!usageCategoryMajor}>
      <div style={cardBodyStyle}> 
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={usageCategoryMajor}
        onSelect={selectPropertyPurpose}
      />
      </div>
    </FormStep>
  );
};

export default PropertyUsageType;
