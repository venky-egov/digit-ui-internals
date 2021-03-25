import React, { useEffect, useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect } from "@egovernments/digit-ui-react-components";

0;
const IsResidential = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const [value, setusageCategoryMajor] = useState(formData?.IsResidential);

  const onSkip = () => onSelect();
  function goNext() {
    onSelect(config.key, { value });
    //onSelect(config.key, ResidentialType, false, index);
  }

  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!value}>
      <RadioOrSelect
        isMandatory={config.isMandatory}
        options={[
          { code: true, i18nKey: "PT_COMMON_YES" },
          { code: false, i18nKey: "PT_COMMON_NO" },
        ]}
        selectedOption={value}
        optionKey="i18nKey"
        onSelect={setusageCategoryMajor}
      />
    </FormStep>
  );
};

export default IsResidential;
