import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const SelectDetails = ({ t, config, onSelect, ...props }) => {
  const goNext = (data) => {
    props.dispatcher({ type: "EDIT", delta: data });
    props.nextStep();
  };
  return <FormStep config={config} onSelect={goNext} t={t}></FormStep>;
};

export default SelectDetails;
