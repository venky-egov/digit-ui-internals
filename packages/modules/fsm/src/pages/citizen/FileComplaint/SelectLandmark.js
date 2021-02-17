import React, { useState } from "react";
import { FormStep, TextArea, LabelFieldPair, CardLabel  } from "@egovernments/digit-ui-react-components";

const SelectLandmark = ({ t, config, onSelect, value, userType, setValue  }) => {
  const [landmark, setLandmark] = useState(() => {
    const { landmark } = value || {};
    return landmark ? landmark : "";
  });

  const [error, setError] = useState("");

  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setLandmark(e.target.value);
    }
  }

  if(userType === 'employee') {
    return config?.inputs?.map(input =>{
      return <LabelFieldPair>
        <TextArea
        style={{width: "50%"}}
        key={input.name}
        onChange={setValue}
      />
      </LabelFieldPair>
    })
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
