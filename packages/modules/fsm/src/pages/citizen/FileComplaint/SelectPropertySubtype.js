import React, { useState, useLayoutEffect } from "react";
import { Loader, RadioButtons, Dropdown, FormStep } from "@egovernments/digit-ui-react-components";

const SelectPropertySubtype = ({ config, onSelect, t, value }) => {
  const [subtype, setSubtype] = useState(() => {
    const { subtype } = value;
    return subtype !== undefined ? subtype : null;
  });
  const { propertyType } = value;
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

  if (propertySubtypesData.isLoading) {
    return <Loader />;
  }

  const menu = propertySubtypesData.data.filter((item) => item.propertyType === propertyType?.code);

  return (
    <FormStep config={config} onSelect={goNext} t={t} isDisabled={!subtype}>
      {menu?.length < 5 ? (
        <RadioButtons selectedOption={subtype} options={menu} optionsKey="i18nKey" onSelect={selectedValue} />
      ) : (
        <Dropdown isMandatory selected={subtype} optionKey="i18nKey" option={menu} select={selectedValue} t={t} />
      )}
    </FormStep>
  );
};

export default SelectPropertySubtype;
