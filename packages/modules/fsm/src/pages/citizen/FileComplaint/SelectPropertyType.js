import React, { Fragment, useState } from "react";
import { CitizenInfoLabel, Loader, RadioButtons, Dropdown, FormStep } from "@egovernments/digit-ui-react-components";

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
    <FormStep config={config} onSelect={goNext} t={t} isDisabled={propertyType ? false : true}>
      {propertyTypesData?.data?.length < 5 ? (
        <RadioButtons selectedOption={propertyType} options={propertyTypesData.data} optionsKey="i18nKey" onSelect={selectedValue} />
      ) : (
        <Dropdown isMandatory selected={propertyType} optionKey="i18nKey" option={propertyTypesData.data} select={selectedValue} t={t} />
      )}
      <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("CS_FILE_APPLICATION_INFO_TEXT")} />
    </FormStep>
  );
};

export default SelectPropertyType;
