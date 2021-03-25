import React, { useState } from "react";
import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const GroundFloorDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const onSkip = () => onSelect();
  const [plotSize, setplotSize] = useState(formData.units && formData.units[index] && formData.units[index].plotSize);
  const [builtUpArea, setbuiltUpArea] = useState(formData.units && formData.units[index] && formData.units[index].builtUpArea);

  function setPropertyplotSize(e) {
    setplotSize(e.target.value);
  }
  function setPropertybuiltUpArea(e) {
    setbuiltUpArea(e.target.value);
  }
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
  const goNext = () => {
    let unit = formData.units && formData.units[index];
    let floordet = { ...unit, plotSize, builtUpArea };
    onSelect(config.key, floordet, false, index);
  };
  //const onSkip = () => onSelect();

  return (
    <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!plotSize || !builtUpArea}>
      <CardLabel>{`${t("PT_FLOOR_DETAILS_PLOT_SIZE_LABEL")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="PlotSize" value={plotSize} onChange={setPropertyplotSize} />
      <CardLabel>{`${t("PT_FLOOR_DETAILS_BUILT_UP_AREA_LABEL")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="BuiltUpArea" value={builtUpArea} onChange={setPropertybuiltUpArea} />
    </FormStep>
  );
};

export default GroundFloorDetails;
