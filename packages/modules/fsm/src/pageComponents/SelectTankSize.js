import React, { useEffect, useState } from "react";
import { FormStep, PitDimension } from "@egovernments/digit-ui-react-components";

const isConventionalSpecticTank = (tankDimension) => tankDimension === "lbd";

const SelectTankSize = ({ config, onSelect, t, formData = {}, userType }) => {
  const tankDimension = formData?.pitType?.dimension;
  const [disable, setDisable] = useState(true);

  const [size, setSize] = useState();

  useEffect(() => {
    if (!formData?.pitType && userType !== "employee") {
      onSelect(config.key, {}, true);
    }
  }, []);

  useEffect(() => {
    setSize(formData?.pitDetail);
  }, [formData?.pitDetails]);

  useEffect(() => {
    const pitDetailValues = size ? Object.values(size).filter((value) => value > 0) : null;
    if (isConventionalSpecticTank(tankDimension) && pitDetailValues?.length >= 3) {
      setDisable(false);
    } else if (!isConventionalSpecticTank(tankDimension) && pitDetailValues?.length >= 2) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [size]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      setSize((prev) => ({ ...prev, [name]: value }));
      if (userType === "employee") {
        setTimeout(onSelect(config.key, { ...size, [name]: value }));
      }
    }
  };

  const handleSubmit = () => {
    onSelect(config.key, size);
  };

  const onSkip = () => onSelect();
  if (userType === "employee") {
    return <PitDimension sanitationType={formData.pitType} size={size} handleChange={handleChange} t={t} />;
  }

  return (
    <FormStep config={config} onSkip={onSkip} onSelect={handleSubmit} isDisabled={disable} t={t}>
      <PitDimension sanitationType={formData.pitType} size={size} handleChange={handleChange} t={t} />
    </FormStep>
  );
};

export default SelectTankSize;
