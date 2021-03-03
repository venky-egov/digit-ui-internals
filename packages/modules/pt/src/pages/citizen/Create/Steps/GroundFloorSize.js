import React from "react";
import { FormStep } from "@egovernments/digit-ui-react-components";

const GroundFloorSize = ({ t, config, onSelect, value }) => {
  const onSkip = () => onSelect();

  return (
    <FormStep
      config={config}
      _defaultValues={{ PlotSize: value?.PlotSize, BuiltUpArea: value?.BuiltUpArea }}
      onSelect={(data) => onSelect(data)}
      onSkip={onSkip}
      t={t}
    />
  );
};

export default GroundFloorSize;
