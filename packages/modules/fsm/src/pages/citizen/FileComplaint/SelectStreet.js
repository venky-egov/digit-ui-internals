import React from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, value, userType, setValue }) => {
  const onSkip = () => onSelect();

  if(userType === 'employee') {
    return config?.inputs?.map(input =>{
      return <React.Fragment>
        <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {input.label}
            {config.isMandatory ? " * " : null}
        </CardLabel>
        <TextInput
      key={input.name}
      onChange={setValue}
    />
      </React.Fragment>
    })
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
