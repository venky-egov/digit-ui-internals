import React from "react";
import { LabelFieldPair, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const SelectName = ({ t, config, onSelect, formData = {}, userType }) => {
  const { pathname: url } = useLocation();
  const editScreen = url.includes("/modify-application/");
  const inputs = [
    {
      label: "ES_NEW_APPLICATION_APPLICANT_NAME",
      type: "text",
      name: "applicantName",
      validation: {
        required: true,
      },
      error: "CORE_COMMON_APPLICANT_NAME_INVALID",
    },
    {
      label: "ES_NEW_APPLICATION_APPLICANT_MOBILE_NO",
      type: "text",
      name: "mobileNumber",
      validation: {
        required: true,
      },
      error: "CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID",
    },
  ];

  function setValue(value, input) {
    onSelect(config.key, { ...formData[config.key], [input]: value });
    console.log("find value here", value, input, formData);
  }

  return (
    <div>
      {inputs?.map((input) => (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <div className="field">
            <TextInput
              key={input.name}
              value={formData && formData[config.key] ? formData[config.key][input.name] : null}
              onChange={(e) => setValue(e.target.value, input.name)}
              {...input.validation}
              disable={editScreen}
            />
          </div>
        </LabelFieldPair>
      ))}
    </div>
  );
};

export default SelectName;
