import React, { useState } from "react";
import { FormStep, CardLabel, TextInput } from "@egovernments/digit-ui-react-components";

const RentalDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const onSkip = () => onSelect();
  const [RentArea, setRentArea] = useState(formData.units && formData.units[index] && formData.units[index].RentArea);
  const [AnnualRent, setAnnualRent] = useState(formData.units && formData.units[index] && formData.units[index].AnnualRent);

  function setPropertyRentArea(e) {
    setRentArea(e.target.value);
  }
  function setPropertyAnnualRent(e) {
    setAnnualRent(e.target.value);
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
    //units["RentalArea"] = RentArea;
    //units["AnnualRent"] = AnnualRent;
    let floordet = { ...unit, RentArea, AnnualRent };
    onSelect(config.key, floordet, false, index);
  };
  //const onSkip = () => onSelect();

  return (
    <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!RentArea || !AnnualRent}>
      <CardLabel>{`${t("PT_FLOOR_DETAILS_RENTED_AREA_LABEL")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="RentArea" value={RentArea} onChange={setPropertyRentArea} />
      <CardLabel>{`${t("PT_FLOOR_DETAILS_BUILT_UP_AREA_LABEL")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="AnnualRent" value={AnnualRent} onChange={setPropertyAnnualRent} />
    </FormStep>
  );
};

export default RentalDetails;
