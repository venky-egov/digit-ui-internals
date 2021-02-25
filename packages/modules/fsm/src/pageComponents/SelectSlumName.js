import React, { useEffect, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown, FormStep, Loader } from "@egovernments/digit-ui-react-components";

const SelectSlumName = ({ config, onSelect, t, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const locality = formData?.address?.locality?.code.split("_")[3];
  const [slum, setSlum] = useState();
  const { data: slumData, isLoading: slumDataLoading } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "Slum");
  // console.log("find slum data here", locality,slumData && slumData[locality]), formData?.address?.locality;

  const [slumMenu, setSlumMenu] = useState();

  useEffect(() => {
    if (userType !== "employee" && formData?.address?.slumArea?.code === false) onSelect(config.key, {}, true);
  }, [formData?.address?.slumArea]);

  useEffect(() => {
    if (slumMenu && formData?.address) {
      const preSelectedSlum = slumMenu.filter((slum) => slum.code === formData?.address?.slum)[0];
      setSlum(preSelectedSlum);
    }
  }, [formData?.address?.slum, slumMenu]);

  useEffect(() => {
    if (userType === "employee" && !slumDataLoading && slumData) {
      const optionalSlumData = [
        {
          code: null,
          active: true,
          name: "Not residing in slum area",
          i18nKey: "ES_APPLICATION_NOT_SLUM_AREA",
        },
        ...slumData[locality],
      ];
      // console.log("find slum dta here", optionalSlumData)
      setSlumMenu(optionalSlumData);
    }
    if (userType !== "employee" && !slumDataLoading && slumData) {
      // console.log("find citizen slum menu here", slumData, slumData[locality], formData)
      setSlumMenu(slumData[locality]);
    }
  }, [slumDataLoading]);
  function selectSlum(value) {
    setSlum(value);
    onSelect(config.key, { ...formData[config.key], slum: value.code });
  }

  function onSkip() {
    onSelect();
  }

  function goNext() {
    onSelect(config.key, { ...formData[config.key], slum: slum.code });
  }

  if (slumDataLoading) return <Loader />;

  return userType === "employee" ? (
    <LabelFieldPair>
      <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
        {t("ES_NEW_APPLICATION_SLUM_NAME")}
        {config.isMandatory ? " * " : null}
      </CardLabel>
      <Dropdown option={slumMenu} style={{ width: "50%" }} optionKey="i18nKey" id="slum" selected={slum} select={selectSlum} />
    </LabelFieldPair>
  ) : (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
      <Dropdown option={slumMenu} optionKey="name" id="i18nKey" selected={slum} select={selectSlum} />
    </FormStep>
  );
};

export default SelectSlumName;
