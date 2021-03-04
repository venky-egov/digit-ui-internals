import React from "react";
import { LabelFieldPair, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const SelectName = ({ t, config, onSelect, formData = {}, userType }) => {
  const inputs = [
    {
      label: "ES_NEW_APPLICATION_APPLICANT_NAME",
      type: "text",
      name: "applicantName",
      validation: {
        required: true,
        pattern: /[A-Za-z]/,
      },
      error: "CORE_COMMON_APPLICANT_NAME_INVALID",
    },
    {
      label: "ES_NEW_APPLICATION_APPLICANT_MOBILE_NO",
      type: "text",
      name: "mobileNumber",
      validation: {
        required: true,
        pattern: /^[6-9]\d{9}$/,
      },
      error: "CORE_COMMON_APPLICANT_MOBILE_NUMBER_INVALID",
    },
  ];
  return (
    <div>
      {inputs?.map((input) => (
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <div className="field">
            <TextInput key={input.name} onChange={() => {}} {...input.validation} />
          </div>
        </LabelFieldPair>
      ))}
    </div>
  );
};

export default SelectName;
