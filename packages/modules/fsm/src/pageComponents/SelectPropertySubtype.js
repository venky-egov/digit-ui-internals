import React, { useState, useEffect, useMemo } from "react";
import { Loader, TypeSelectCard, Dropdown, FormStep, CardLabel, RadioOrSelect } from "@egovernments/digit-ui-react-components";

const SelectPropertySubtype = ({ config, onSelect, t, value, userType, setValue, data }) => {
  console.log("asdsdfsd", { config, onSelect, t, value, userType, setValue, data });
  const [subtype, setSubtype] = useState(() => {
    const { subtype } = value || data || {};
    return subtype !== undefined ? subtype : null;
  });
  const [subtypeOptions, setSubtypeOptions] = useState([]);
  const { propertyType } = value || data;

  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const { isLoading: propertySubtypesDataLoading, data: propertySubtypesData } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertySubtype", {
    select,
  });

  useEffect(() => {
    console.log("proptype chagned", propertyType, propertySubtypesDataLoading, propertySubtypesData);
    setSubtypeOptions([]);
    setSubtype(null);
    if (!propertySubtypesDataLoading && propertyType) {
      const subTypes = propertySubtypesData.filter((item) => item.propertyType === (propertyType?.code || propertyType));
      setSubtypeOptions(subTypes);
    }
  }, [propertyType, propertySubtypesDataLoading, propertySubtypesData]);

  const selectedValue = (value) => {
    setSubtype(value);
  };

  const goNext = () => {
    onSelect({ subtype: subtype });
  };

  function selectedSubType(value) {
    setValue(config.key, value.code);
  }

  if (propertySubtypesDataLoading) {
    return <Loader />;
  }

  // const subtypeOptions = useMemo(() => {
  //   return propertySubtypesData.filter((item) => item.propertyType === (propertyType?.code || propertyType));
  // }, [propertyType])

  if (userType === "employee") {
    return <Dropdown option={subtypeOptions} optionKey="i18nKey" id="propertySubType" selected={subtype} select={selectedSubType} t={t} />;
  } else {
    return (
      <FormStep config={config} onSelect={goNext} isDisabled={!propertyType} t={t}>
        <CardLabel>{`${t("CS_FILE_APPLICATION_PROPERTY_LABEL")} *`}</CardLabel>
        <RadioOrSelect options={subtypeOptions} selectedOption={subtype} optionKey="i18nKey" onSelect={selectedValue} t={t} />
      </FormStep>
    );
  }
};

export default SelectPropertySubtype;
