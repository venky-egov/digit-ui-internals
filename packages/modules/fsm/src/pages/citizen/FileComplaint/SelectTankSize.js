import React, { useState } from "react";
import { FormStep, CardText, TextInput, PitDimension } from "@egovernments/digit-ui-react-components";

const SelectTankSize = ({ config, onSelect, t, value }) => {
  const [size, setSize] = useState(() => {
    const { pitDetail } = value;
    return pitDetail || {};
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(isNaN(value), "is not a number");
    if (!isNaN(value)) {
      setSize({ ...size, [name]: value });
    }
  };

  const handleSubmit = () => {
    onSelect({ pitDetail: size });
  };

  const onSkip = () => onSelect();

  return (
    <FormStep config={config} onSelect={handleSubmit} t={t} onSkip={onSkip}>
      <PitDimension sanitationType={value.pitType} size={size} handleChange={handleChange} t={t} />
    </FormStep>
  );
};

export default SelectTankSize;
