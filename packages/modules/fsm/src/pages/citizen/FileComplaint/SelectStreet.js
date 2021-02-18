import React from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, value, userType, setValue, data }) => {
  const onSkip = () => onSelect();
  const onChange = (e) => {
    const value = e?.target?.value;
    const key = e?.target?.id;
    setValue(config.key, { ...data[config.key], [key]: value });
  };
  if (userType === "employee") {
    return config?.inputs?.map((input) => {
      return (
        <React.Fragment>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <TextInput id={input.name} key={input.name} onChange={onChange} />
        </React.Fragment>
      );
    });
  }
  return (
    <FormStep
      config={config}
      _defaultValues={{ street: value?.street, doorNo: value?.doorNo }}
      onSelect={(data) => onSelect(data)}
      onSkip={onSkip}
      t={t}
    />
  );
};

export default SelectStreet;
