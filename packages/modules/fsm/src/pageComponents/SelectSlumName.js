import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, FormStep } from "@egovernments/digit-ui-react-components";

const SelectSlumName = ({ config, onSelect, t, value, userType, setValue, data }) => {
  console.log("find config here", { t, config, onSelect, value, userType, setValue, data });

  const [slum, setSlum] = useState(data.slumName);
  const [slumMenu, setSlumMenu] = useState([
    { key: "PB_AMRITSAR_SUN01_SLUM_NJAGBANDHU", name: "NJagbandhu" },
    { key: "PB_AMRITSAR_SUN01_SLUM_B", name: "Slum B" },
    { key: "PB_AMRITSAR_SUN01_SLUM_C", name: "Slum C" },
  ]);

  useEffect(() => {
    if (data.slumArea.code === false) onSelect({}, true);
  }, [data?.slumArea]);

  function selectSlum(value) {
    setSlum(value);
  }

  function onSkip() {
    onSelect();
  }

  function goNext() {
    onSelect({ slumName: slum });
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
