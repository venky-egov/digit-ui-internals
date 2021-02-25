import React, { useState } from "react";
import { FormStep, RadioOrSelect } from "@egovernments/digit-ui-react-components";

const SelectSpecialOwnerCategoryType = ({ t, config, onSelect, userType, formData }) => {
//   const [slumArea, setSlumArea] = useState(formData?.address?.slumArea);
  const [typeOfOwner, setTypeOfOwner] = useState( () => {
      const typeOfOwner = "" //value;
      return typeOfOwner ? typeOfOwner : {};
  });

  const onSkip = () => onSelect();
  function goNext() {
    onSelect(config.key, { typeOfOwner });
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <RadioOrSelect
        isMandatory={config.isMandatory}
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

export default SelectSpecialOwnerCategoryType;
