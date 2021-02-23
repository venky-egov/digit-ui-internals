import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, value }) => {
  const onSkip = () => onSelect();

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
