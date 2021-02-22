import React, { useState } from "react";
import { CitizenInfoLabel, Loader, Dropdown, FormStep, CardLabel, RadioOrSelect } from "@egovernments/digit-ui-react-components";

const SelectPropertyType = ({ config, onSelect, t, userType, formData }) => {
  console.log("find config property here ", config);
  const [propertyType, setPropertyType] = useState(() => {
    const { propertyType } = formData || {};
    return propertyType !== undefined ? propertyType : null;
  });
  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const propertyTypesData = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertyType", { select });
  const goNext = () => {
    console.log("find config key here", config.key);
    onSelect(config.key, propertyType);
  };
  function selectedValue(value) {
    setPropertyType(value);
  }
  function selectedType(value) {
    onSelect(config.key, value.code);
  }

  console.log("find me here");

  if (propertyTypesData.isLoading) {
    return <Loader />;
  }
  if (userType === "employee") {
    return <Dropdown option={propertyTypesData.data} optionKey="i18nKey" id="propertyType" selected={propertyType} select={selectedType} t={t} />;
  } else {
    return (
      <FormStep config={config} onSelect={goNext} isDisabled={!propertyType} t={t}>
        <CardLabel>{`${t("CS_FILE_APPLICATION_PROPERTY_LABEL")} *`}</CardLabel>
        <RadioOrSelect options={propertyTypesData.data} selectedOption={propertyType} optionKey="i18nKey" onSelect={selectedValue} t={t} />
        <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("CS_FILE_APPLICATION_INFO_TEXT")} />
      </FormStep>
    );
  }
};

export default SelectPropertyType;
