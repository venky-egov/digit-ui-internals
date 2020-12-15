import React, { useState } from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const SelectLandmark = ({ t, config, onSelect, ...props }) => {
  const __initLandmark = Digit.SessionStorage.get("PGR_CREATE_LANDMARK");
  const [landmark, setLandmark] = useState(__initLandmark ? __initLandmark : "");

  function onChange(e) {
    setLandmark(e.target.value);
    props.dispatcher({ type: "EDIT", delta: { landmark } });
    Digit.SessionStorage.set("PGR_CREATE_LANDMARK", e.target.value);
  }

  const onSkip = () => {
    props.nextStep();
  };

  return (
    <FormStep
      config={config}
      value={landmark}
      onChange={onChange}
      onSelect={(d) => {
        props.dispatcher({ type: "EDIT", delta: { landMark: d } });
        props.nextStep();
      }}
      onSkip={onSkip}
      t={t}
    ></FormStep>
  );
};

export default SelectLandmark;
