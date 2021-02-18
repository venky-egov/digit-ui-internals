import React, { useEffect, useState } from "react";
import { FormStep, PitDimension } from "@egovernments/digit-ui-react-components";

const SelectTankSize = ({ config, onSelect, t, value = {}, userType, setValue, data }) => {
  const tankType = value?.pitType?.code;
  const isConventionalSpecticTank = tankType === "CONVENTIONAL_SPECTIC_TANK";
  const isSepticTankWithSoakPit = tankType === "SEPTIC_TANK_WITH_SOAK_PIT";
  const [size, setSize] = useState(() => {
    let data;
    const { pitDetail } = value;
    if (pitDetail) {
      data = getPitDetail(pitDetail, isConventionalSpecticTank, isSepticTankWithSoakPit);
    } else {
      data = getPitDetail({}, isConventionalSpecticTank, isSepticTankWithSoakPit);
    }
    return data;
  });
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const pitDetailValues = Object.values(size).filter((value) => value > 0);
    if (isConventionalSpecticTank && pitDetailValues?.length >= 3) {
      setDisable(false);
    } else if (isSepticTankWithSoakPit && pitDetailValues?.length >= 2) {
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
    <FormStep config={config} onSkip={onSkip} onSelect={handleSubmit} isDisabled={disable} t={t}>
      <PitDimension sanitationType={value.pitType} size={size} handleChange={handleChange} t={t} />
    </FormStep>
  );
};

function getPitDetail(pitDetail = {}, isConventionalSpecticTank, isSepticTankWithSoakPit) {
  let detail = { ...pitDetail };
  if (pitDetail) {
    if (isConventionalSpecticTank) {
      detail = { length: pitDetail?.length || "", width: pitDetail?.width || "", height: pitDetail?.height || "" };
    } else if (isSepticTankWithSoakPit) {
      detail = { diameter: pitDetail?.diameter || "", height: pitDetail?.height || "" };
    }
  } else {
    if (isConventionalSpecticTank) {
      detail = { length: "", width: "", height: "" };
    } else if (isSepticTankWithSoakPit) {
      detail = { diameter: "", height: "" };
    }
  }
  return detail;
}

export default SelectTankSize;
