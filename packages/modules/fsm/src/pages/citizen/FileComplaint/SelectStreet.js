import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const SelectStreet = ({ t, config, onSelect, value }) => {
  const onSkip = () => onSelect();

  return <FormStep config={config} onSelect={(data) => onSelect(data)} onSkip={onSkip} t={t}></FormStep>;
};

export default SelectStreet;
