import React, { useState } from "react";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectSpecialOwnerCategoryType = ({ t, config, onSelect, userType, formData }) => {
  let index = 0;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [ownerType, setOwnerType] = useState(formData.owners && formData.owners[index] && formData.owners[index].ownerType);
  const { data: Menu, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "OwnerType");

  const onSkip = () => onSelect();

  function setTypeOfOwner(value) {
    setOwnerType(value);
  }

  function goNext() {
    let ownerDetails = formData.owners && formData.owners[index];
    ownerDetails["ownerType"] = ownerType;
    onSelect(config.key, ownerDetails);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ownerType}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={Menu || []}
        selectedOption={ownerType}
        onSelect={setTypeOfOwner}
      />
    </FormStep>
  );
};

export default SelectSpecialOwnerCategoryType;
