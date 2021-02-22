import React, { useState } from "react";
import { FormStep, RadioOrSelect } from "@egovernments/digit-ui-react-components";

const CheckSlum = ({ t, config, onSelect, userType, formData }) => {
  console.log("find config here", { t, config, onSelect, userType, formData });
  console.log("find check slum here");
  const [slumArea, setSlumArea] = useState(formData?.address?.slumArea);
  const onSkip = () => onSelect();
  function goNext() {
    onSelect(config.key, { slumArea });
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <RadioOrSelect
        isMandatory={config.isMandatory}
        options={[
          { code: true, i18nKey: "CS_COMMON_YES" },
          { code: false, i18nKey: "CS_COMMON_NO" },
        ]}
        selectedOption={slumArea}
        optionKey="i18nKey"
        onSelect={setSlumArea}
      />
    </FormStep>
  );
};

export default CheckSlum;
