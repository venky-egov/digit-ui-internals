import React, { useState } from "react";
import { FormStep, TextArea, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const SelectLandmark = ({ t, config, onSelect, formData, userType }) => {
  const [landmark, setLandmark] = useState(() => {
    const { landmark } = formData?.address || {};
    return landmark ? landmark : "";
  });

  const [error, setError] = useState("");

  const inputs = [
    {
      label: "ES_NEW_APPLICATION_LOCATION_LANDMARK",
      type: "textarea",
      name: "landmark",
      validation: {
        maxLength: 1024,
      },
    },
  ];

  function onChange(e) {
    if (e.target.value.length > 1024) {
      setError("CS_COMMON_LANDMARK_MAX_LENGTH");
    } else {
      setError(null);
      setLandmark(e.target.value);
      if (userType === "employee") {
        const value = e?.target?.value;
        const key = e?.target?.id;
        console.log({ key, value });
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
          <TextArea style={{ width: "50%" }} id={input.name} onChange={onChange} />
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
      onSelect={(data) => onSelect(config.key, { landmark: data })}
      onSkip={onSkip}
      t={t}
      forcedError={t(error)}
    ></FormStep>
  );
};

export default SelectLandmark;
