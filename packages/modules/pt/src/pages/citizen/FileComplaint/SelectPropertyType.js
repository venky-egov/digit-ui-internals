import React, { Fragment, useState } from "react";
import { CitizenInfoLabel, Loader, TypeSelectCard } from "@egovernments/digit-ui-react-components";

const SelectPropertyType = ({ config, onSelect, t, value }) => {
  const [propertyType, setPropertyType] = useState(() => {
    const { propertyType } = value;
    return propertyType !== undefined ? propertyType : null;
  });
  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const propertyTypesData = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertyType", { select });

  const goNext = () => {
    onSelect({ propertyType: propertyType });
  };
  function selectedValue(value) {
    setPropertyType(value);
  }

  if (propertyTypesData.isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <TypeSelectCard
        {...config.texts}
        disabled={propertyType ? false : true}
        menu={propertyTypesData.data}
        optionsKey="i18nKey"
        selected={selectedValue}
        selectedOption={propertyType}
        onSave={goNext}
        t={t}
      />
      <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("CS_FILE_APPLICATION_INFO_TEXT")} />
    </Fragment>
  );
};

export default SelectPropertyType;
