import React, { useState } from "react";
import { FormStep, CardText, TextInput, PitDimension } from "@egovernments/digit-ui-react-components";

const SelectTankSize = ({ config, onSelect, t, value = {}, userType, setValue, data }) => {
  const [size, setSize] = useState(() => {
    const { pitDetail } = value;
    return pitDetail || {};
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(isNaN(value), "is not a number");
    if (!isNaN(value)) {
      setSize({ ...size, [name]: value });
      if (userType === "employee") {
        setTimeout(setValue(config.key, { ...size, [name]: value }));
      }
    }
  };

  const handleSubmit = () => {
    onSelect({ pitDetail: size });
  };

  const onSkip = () => onSelect();
  if (userType === "employee") {
    return <PitDimension sanitationType={data.pitType} size={size} handleChange={handleChange} t={t} />;
  }

  return (
    <FormStep config={config} onSkip={onSkip} onSelect={handleSubmit} isDisabled={Object.values(size)?.length === 0} t={t}>
      <PitDimension sanitationType={value.pitType} size={size} handleChange={handleChange} t={t} />
    </FormStep>
  );
};

export default SelectTankSize;
