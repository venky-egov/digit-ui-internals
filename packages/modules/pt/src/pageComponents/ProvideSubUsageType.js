import { CardLabel, FormStep, RadioButtons } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { cardBodyStyle } from "../utils";

const ProvideSubUsageType = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const [SubUsageType, setSelfOccupied] = useState(formData?.ProvideSubUsageType);

  const data = [
    {
      i18nKey: "Retail",
    },
    {
      i18nKey: "Medical",
    },
    {
      i18nKey: "Stationary",
    },
    {
      i18nKey: "Other",
    },
  ];
  const onSkip = () => onSelect();

  function selectSelfOccupied(value) {
    setSelfOccupied(value);
  }

  function goNext() {
    onSelect(config.key, SubUsageType);
  }
  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!SubUsageType}>
      <CardLabel>{t("Types of Floor Usage")}</CardLabel>
      <div style={cardBodyStyle}>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          isMandatory={config.isMandatory}
          options={data}
          selectedOption={SubUsageType}
          onSelect={selectSelfOccupied}
        />
      </div>
    </FormStep>
  );
};

export default ProvideSubUsageType;
