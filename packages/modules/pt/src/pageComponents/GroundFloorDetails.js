import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const GroundFloorDetails = ({ t, config, onSelect, value, userType, formData }) => {
  const onSkip = () => onSelect();

  const inputs = [
    {
      label: "Plot Size(sq.yd)*",
      type: "text",
      name: "PlotSize",
      validation: {
        pattern: "/^[ws]{1,256}$/",
      },
      error: "CORE_COMMON_PLOTSIZE_INVALID",
    },
    {
      label: "Built Up Area(sq.yd)*",
      type: "text",
      name: "BuiltUpArea",
      validation: {
        pattern: "/^[w]([w/,s])*$/",
      },
      error: "CORE_COMMON_AREA_INVALID",
    },
  ];

  return (
    <FormStep
      config={{ ...config, inputs }}
      _defaultValues={{ PlotSize: value?.PlotSize, BuiltUpArea: value?.BuiltUpArea }}
      onSelect={(data) => onSelect(data)}
      onSkip={onSkip}
      t={t}
    />
  );
};

export default GroundFloorDetails;
