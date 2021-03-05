import React from "react";
import { LabelFieldPair, CardLabel, TextInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";

const SelectName = ({ t, config, onSelect, formData = {}, userType, register, errors }) => {
  const { pathname: url } = useLocation();
  // console.log("find errors here", errors)
  const editScreen = url.includes("/modify-application/");
  const inputs = [
    {
      label: "ES_NEW_APPLICATION_APPLICANT_NAME",
      type: "text",
      name: "applicantName",
      validation: {
        required: true,
        pattern: "/[A-Za-z]/",
      },
      error: "CORE_COMMON_APPLICANT_NAME_INVALID",
    },
    {
      label: "ES_NEW_APPLICATION_APPLICANT_MOBILE_NO",
      type: "text",
      name: "mobileNumber",
      validation: {
        required: true,
        pattern: "/^[6-9]d{9}$/",
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
      {inputs?.map((input, index) => (
        <React.Fragment key={index}>
          {errors[input.name] && <CardLabelError>{t(input.error)}</CardLabelError>}
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
                inputRef={register(input.validation)}
                disable={editScreen}
              />
            </div>
          </LabelFieldPair>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectName;
