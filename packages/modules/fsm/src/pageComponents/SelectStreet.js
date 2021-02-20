import React from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, userType, formData }) => {
  const onSkip = () => onSelect();
  const onChange = (e) => {
    const value = e?.target?.value;
    const key = e?.target?.id;
    onSelect(config.key, { ...formData[config.key], [key]: value });
  };
  if (userType === "employee") {
    return config?.inputs?.map((input) => {
      return (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <TextInput id={input.name} key={input.name} style={{ width: "50%" }} onChange={onChange} />
        </LabelFieldPair>
      );
    });
  }
  return (
    <FormStep
      config={config}
      _defaultValues={{ street: formData?.street, doorNo: formData?.doorNo }}
      onSelect={(data) => onSelect(config.key, data)}
      onSkip={onSkip}
      t={t}
    />
  );
};

export default SelectStreet;
