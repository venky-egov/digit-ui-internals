import React, { useState, useEffect } from "react";
import { FormStep, Dropdown, Loader, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectPitType = ({ t, config, onSelect, value }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [sanitationMenu, setSanitationMenu] = useState([]);
  const [pitType, setPitType] = useState(() => {
    const { pitType } = value;
    return pitType !== undefined ? pitType : null;
  });
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "PitType");

  useEffect(() => {
    if (!sanitationTypeData.isLoading) {
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `PITTYPE_MASTERS_${type.code}` }));

      setSanitationMenu(data);
    }
  }, [sanitationTypeData]);

  const selectPitType = (value) => {
    setPitType(value);
  };

  const onSkip = () => {
    onSelect();
  };

  const onSubmit = () => {
    onSelect({ pitType });
  };

  if (sanitationTypeData.isLoading) {
    return <Loader />;
  }

  return (
    <FormStep config={config} onSelect={onSubmit} onSkip={onSkip} t={t}>
      <CardLabel>{t("CS_FILE_COMPLAINT_PIT_TYPE_LABEL")}</CardLabel>
      <Dropdown isMandatory option={sanitationMenu} optionKey="i18nKey" select={selectPitType} selected={pitType} />
    </FormStep>
  );
};

export default SelectPitType;
