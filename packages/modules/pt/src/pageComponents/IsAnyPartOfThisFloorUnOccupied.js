import React, { useState } from "react";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const IsAnyPartOfThisFloorUnOccupied = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [unOccupiedFloorPart, setSelfOccupied] = useState(formData?.IsAnyPartOfThisFloorUnOccupied);
  const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType");

  const data = [
    {
      i18nKey: "No",
    },
    {
      i18nKey: "Yes",
    },
  ];
  const onSkip = () => onSelect();

  function selectSelfOccupied(value) {
    setSelfOccupied(value);
  }

  function goNext() {
    onSelect(config.key, unOccupiedFloorPart);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!unOccupiedFloorPart}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={data}
        selectedOption={unOccupiedFloorPart}
        onSelect={selectSelfOccupied}
      />
    </FormStep>
  );
};

export default IsAnyPartOfThisFloorUnOccupied;
