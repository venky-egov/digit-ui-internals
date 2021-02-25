import React, { useState } from "react";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectOwnerShipDetails = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
//   const [slumArea, setSlumArea] = useState(formData?.address?.slumArea);
  const [typeOfOwner, setTypeOfOwner] = useState( () => {
      const typeOfOwner = "" //value;
      return typeOfOwner ? typeOfOwner : {};
  });
  // const ownerShipMenu = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "SubOwnerShipCategory");

  const onSkip = () => onSelect();
  function goNext() {
    onSelect(config.key, { typeOfOwner });
  }
  // console.log(ownerShipMenu.data, "yqrwywqoeywqeoiywoiyqqwewq")
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <RadioButtons
        isMandatory={config.isMandatory}
        // options={ownerShipMenu.data || []}
        options={[
          { code: true, i18nKey: "CS_COMMON_YES" },
          { code: false, i18nKey: "CS_COMMON_NO" },
        ]}
        selectedOption={typeOfOwner}
        optionKey="i18nKey"
        onSelect={setTypeOfOwner}
      />
    </FormStep>
  );
};

export default SelectOwnerShipDetails;
