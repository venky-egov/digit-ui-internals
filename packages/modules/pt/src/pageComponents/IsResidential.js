import React, { useEffect, useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect } from "@egovernments/digit-ui-react-components";

0;
const IsResidential = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const [ResidentialType, setResidentialType] = useState(formData?.address?.slumArea);

  const onSkip = () => onSelect();
  function goNext() {
    onSelect(config.key, { ResidentialType });
    onSelect(config.key, ResidentialType, false, index);
  }

  debugger;

  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!ResidentialType}>
      <RadioOrSelect
        isMandatory={config.isMandatory}
        options={[
          { code: true, i18nKey: "PT_COMMON_YES" },
          { code: false, i18nKey: "PT_COMMON_NO" },
        ]}
        selectedOption={ResidentialType}
        optionKey="i18nKey"
        onSelect={setResidentialType}
      />
    </FormStep>
  );
};

export default IsResidential;
