import React, { useState, useEffect } from "react";
import { FormStep, TextArea, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const UnOccupiedArea = ({ t, config, onSelect, formData, userType }) => {
  const [landmark, setLandmark] = useState();

  const [error, setError] = useState("");

  const inputs = [
    {
      label: "Un occupied Area (Square Feet)",
      type: "text",
      name: "landmark",
      validation: {
        maxLength: 1024,
      },
    },
  ];

  useEffect(() => {
    setLandmark(formData?.address?.landmark);
  }, [formData?.address?.landmark]);

  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setLandmark(e.target.value);
      if (userType === "employee") {
        const value = e?.target?.value;
        const key = e?.target?.id;
        onSelect(key, value);
      }
    }
  }

  if (userType === "employee") {
    return inputs?.map((input) => {
      return (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <TextArea style={{ width: "50%" }} id={input.name} value={landmark} onChange={onChange} {...input.validation} />
        </LabelFieldPair>
      );
    });
  }
  const onSkip = () => onSelect();

  return (
    <FormStep
      config={{ ...config, inputs }}
      value={landmark}
      onChange={onChange}
      onSelect={(data) => onSelect(config.key, { ...data })}
      onSkip={onSkip}
      t={t}
      forcedError={t(error)}
    ></FormStep>
  );
};

export default UnOccupiedArea;
