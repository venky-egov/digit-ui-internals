import React, { useState, useEffect } from "react";
import { FormStep, Dropdown, Loader, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectPitType = ({ t, config, onSelect, value }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const [pitType, setPitType] = useState(() => {
    const { pitType } = value;
    return pitType !== undefined ? pitType : null;
  });
  const { data: sanitationMenu, isLoading } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PitType");

  const selectPitType = (value) => {
    setPitType(value);
  };

  const onSkip = () => {
    onSelect();
  };

  const onSubmit = () => {
    onSelect({ pitType });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormStep config={config} onSelect={onSubmit} isDisabled={!pitType} t={t} onSkip={onSkip}>
      <CardLabel>{`${t("CS_FILE_APPLICATION_PIT_TYPE_LABEL")} *`}</CardLabel>

      {sanitationMenu?.length < 5 ? (
        <RadioButtons selectedOption={pitType} options={sanitationMenu} optionsKey="i18nKey" onSelect={selectPitType} />
      ) : (
        <Dropdown isMandatory option={sanitationMenu} optionKey="i18nKey" select={selectPitType} selected={pitType} t={t} />
      )}
    </FormStep>
  );
};

export default SelectPitType;
