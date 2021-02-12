import React, { useState } from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const SelectLandmark = ({ t, config, onSelect, value }) => {
  const [landmark, setLandmark] = useState(() => {
    const { landmark } = value;
    return landmark ? landmark : "";
  });

  const [error, setError] = useState("");

  function onChange(e) {
    setLandmark(e.target.value);
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
    }
  }

  const onSkip = () => onSelect();

  return (
    <FormStep
      config={config}
      value={landmark}
      onChange={onChange}
      onSelect={(data) => onSelect(data)}
      onSkip={onSkip}
      t={t}
      forcedError={t(error)}
    ></FormStep>
  );
};

export default SelectLandmark;
