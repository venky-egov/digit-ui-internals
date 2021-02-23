import React from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, userType, formData }) => {
  const onSkip = () => onSelect();
  const onChange = (e) => {
    const value = e?.target?.value;
    const key = e?.target?.id;
    onSelect(config.key, { ...formData[config.key], [key]: value });
  };
  const inputs = [
    {
      label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL",
      type: "text",
      name: "street",
      validation: {
        pattern: "^[\\w\\s]{1,256}$",
      },
      error: "CORE_COMMON_STREET_INVALID",
    },
    {
      label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL",
      type: "text",
      name: "doorNo",
      validation: {
        pattern: "^[\\w]([\\w\\/,\\s])*$",
      },
      error: "CORE_COMMON_DOOR_INVALID",
    },
  ];
  if (userType === "employee") {
    return inputs?.map((input) => {
      return (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <TextInput
            id={input.name}
            key={input.name}
            value={formData && formData.address ? formData.address[input.name] : null}
            style={{ width: "50%" }}
            onChange={onChange}
            {...input.validation}
          />
        </LabelFieldPair>
      );
    });
  }
  return (
    <FormStep
      config={{ ...config, inputs }}
      _defaultValues={{ street: formData?.address.street, doorNo: formData?.address.doorNo }}
      onSelect={(data) => onSelect(config.key, data)}
      onSkip={onSkip}
      t={t}
    />
  );
};

export default SelectStreet;
