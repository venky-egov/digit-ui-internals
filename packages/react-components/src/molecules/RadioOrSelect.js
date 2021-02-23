import React from "react";
import RadioButtons from "../atoms/RadioButtons";
import Dropdown from "../atoms/Dropdown";

const RadioOrSelect = ({ options, onSelect, optionKey, selectedOption, isMandatory, t }) => {
  console.log("muahahaha", { options, onSelect, optionKey, selectedOption, isMandatory, t });
  return (
    <React.Fragment>
      {options?.length < 5 ? (
        <RadioButtons selectedOption={selectedOption} options={options} optionsKey={optionKey} onSelect={onSelect} t={t} />
      ) : (
        <Dropdown isMandatory={isMandatory} selected={selectedOption} optionKey={optionKey} option={options} select={onSelect} t={t} />
      )}
    </React.Fragment>
  );
};

export default RadioOrSelect;