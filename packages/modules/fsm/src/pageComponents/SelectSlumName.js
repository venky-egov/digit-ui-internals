import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, FormStep } from "@egovernments/digit-ui-react-components";

const SelectSlumName = ({ config, onSelect, t, userType, formData }) => {
  console.log("find config here", { t, config, onSelect, userType, formData });
  console.log("find slum here ");

  const [slum, setSlum] = useState(formData?.address?.slum);
  const [slumMenu, setSlumMenu] = useState([
    { key: "PB_AMRITSAR_SUN01_SLUM_NJAGBANDHU", name: "NJagbandhu" },
    { key: "PB_AMRITSAR_SUN01_SLUM_B", name: "Slum B" },
    { key: "PB_AMRITSAR_SUN01_SLUM_C", name: "Slum C" },
  ]);

  useEffect(() => {
    if (userType !== "employee" && formData?.address?.slumArea?.code === false) onSelect(config.key, {}, true);
  }, [formData?.address?.slumArea]);

  function selectSlum(value) {
    setSlum(value);
    onSelect(config.key, { ...formData[config.key], slum: value });
  }

  function onSkip() {
    onSelect();
  }

  function goNext() {
    onSelect(config.key, { ...formData[config.key], slum });
  }

  return userType === "employee" ? (
    <LabelFieldPair>
      <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
        {t("ES_NEW_APPLICATION_SLUM_NAME")}
        {config.isMandatory ? " * " : null}
      </CardLabel>
      <Dropdown option={slumMenu} style={{ width: "50%" }} optionKey="name" id="slum" selected={slum} select={selectSlum} />
    </LabelFieldPair>
  ) : (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />
    </FormStep>
  );
};

export default SelectSlumName;
