import React, { useEffect, useState } from "react";
import { FormStep, PitDimension } from "@egovernments/digit-ui-react-components";

const isConventionalSpecticTank = (tankDimension) => tankDimension === "lbd";

const SelectTankSize = ({ config, onSelect, t, formData = {}, userType }) => {
  const tankDimension = formData?.pitType?.dimension;
  const [disable, setDisable] = useState(true);

  const [size, setSize] = useState(() => {
    let data;
    const { pitDetail } = formData;
    if (pitDetail) {
      data = getPitDetail(pitDetail, tankDimension);
    } else {
      data = getPitDetail({}, tankDimension);
    }
    return data;
  });

  useEffect(() => {
    if (!formData?.pitType && userType !== "employee") {
      onSelect({}, true);
    }
  }, []);

  useEffect(() => {
    const pitDetailValues = Object.values(size).filter((value) => value > 0);
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

function getPitDetail(pitDetail = {}, tankDimension) {
  let detail = { ...pitDetail };
  if (pitDetail) {
    if (tankDimension === "lbd") {
      detail = { length: pitDetail?.length || "", width: pitDetail?.width || "", height: pitDetail?.height || "" };
    } else {
      detail = { diameter: pitDetail?.diameter || "", height: pitDetail?.height || "" };
    }
  } else {
    if (tankDimension === "lbd") {
      detail = { length: "", width: "", height: "" };
    } else {
      detail = { diameter: "", height: "" };
    }
  }
  return detail;
}

export default SelectTankSize;
