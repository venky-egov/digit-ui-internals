import React from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel } from "@egovernments/digit-ui-react-components";

const RentalDetails = ({ t, config, onSelect, userType, formData }) => {
  const onSkip = () => onSelect();
  const onChange = (e) => {
    const value = e?.target?.value;
    const key = e?.target?.id;
    onSelect(config.key, { ...formData[config.key], [key]: value });
  };
  const inputs = [
    {
      label: "Rented Area (Square feet)",
      type: "text",
      name: "street",
      validation: {
        pattern: "^[\\w\\s]{1,256}$",
      },
      error: "CORE_COMMON_STREET_INVALID",
    },
    {
      label: "Annual Rent (₹)*",
      type: "text",
      name: "doorNo",
      validation: {
        pattern: "^[\\w]([\\w\\/,\\s])*$",
      },
      error: "CORE_COMMON_DOOR_INVALID",
    },
  ];

  return <FormStep config={{ ...config, inputs }} onSelect={(data) => onSelect(config.key, data)} onSkip={onSkip} t={t} />;
};

export default RentalDetails;
