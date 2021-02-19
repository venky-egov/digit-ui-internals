import React, { useState, useEffect } from "react";
import { Loader, TypeSelectCard, Dropdown, FormStep, CardLabel, RadioOrSelect } from "@egovernments/digit-ui-react-components";

const SelectPropertySubtype = ({ config, onSelect, t, value, userType, setValue, data }) => {
  console.log({ config, onSelect, t, value, userType, setValue, data });
  const [subtype, setSubtype] = useState(() => {
    const { subtype } = value || {};
    return subtype !== undefined ? subtype : null;
  });
  const { propertyType } = value || data;

  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const propertySubtypesData = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertySubtype", { select });

  const selectedValue = (value) => {
    setSubtype(value);
  };

  const goNext = () => {
    onSelect({ subtype: subtype });
  };

  function selectedSubType(value) {
    setValue(config.key, value.code);
  }

  if (propertySubtypesData.isLoading) {
    return <Loader />;
  }

  const menu = propertySubtypesData.data.filter((item) => item.propertyType === (propertyType?.code || propertyType));
  if (userType === "employee") {
    return <Dropdown option={menu} optionKey="i18nKey" id="propertySubType" selected={subtype} select={selectedSubType} t={t} />;
  } else {
    return (
      <FormStep config={config} onSelect={goNext} isDisabled={!propertyType} t={t}>
        <CardLabel>{`${t("CS_FILE_APPLICATION_PROPERTY_LABEL")} *`}</CardLabel>
        <RadioOrSelect options={menu} selectedOption={subtype} optionKey="i18nKey" onSelect={selectedValue} t={t} />
      </FormStep>
    );
  }
};

export default SelectPropertySubtype;
