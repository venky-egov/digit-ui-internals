import React, { useState } from "react";
import { Loader, TypeSelectCard } from "@egovernments/digit-ui-react-components";

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
    <TypeSelectCard
      {...config.texts}
      disabled={subtype ? false : true}
      menu={menu}
      optionsKey="i18nKey"
      selected={selectedValue}
      selectedOption={subtype}
      onSave={goNext}
      t={t}
    />
  );
};

export default SelectPropertySubtype;
