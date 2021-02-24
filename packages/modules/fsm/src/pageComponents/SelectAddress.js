import React, { useEffect, useState } from "react";
import { FormStep, CardLabel, Dropdown, RadioButtons, LabelFieldPair, RadioOrSelect } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";

const SelectAddress = ({ t, config, onSelect, userType, formData }) => {
  const allCities = Digit.Hooks.fsm.useTenants();
  let tenantId = Digit.ULBService.getCurrentTenantId();

  // const cityWiseLocalities = useSelector((state) => state.common.localities);

  // const localities = cityWiseLocalities[city]

  const { pincode } = formData?.address || "";
  const cities =
    userType === "employee"
      ? allCities.filter((city) => city.code === tenantId)
      : pincode
      ? allCities.filter((city) => city?.pincode?.some((pin) => pin == pincode))
      : allCities;
  const localitiesObj = useSelector((state) => state.common.localities);
  const [selectedCity, setSelectedCity] = useState(() => formData?.address?.city || null);
  const [localities, setLocalities] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState();

  useEffect(() => {
    if (userType === "employee" && cities) {
      if (cities.length === 1) {
        setSelectedCity(cities[0]);
      }
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCity) {
      let __localityList = localitiesObj[selectedCity.code];
      let filteredLocalityList = [];

      if (formData?.address?.locality) {
        setSelectedLocality(formData.address.locality);
      }

      if (formData?.address?.pincode) {
        filteredLocalityList = __localityList.filter((obj) => obj.pincode?.find((item) => item == formData.address.pincode));
      }
      setLocalities(() => (filteredLocalityList.length > 0 ? filteredLocalityList : __localityList));
      if (filteredLocalityList.length === 1) {
        setSelectedLocality(filteredLocalityList[0]);
      }
    }
  }, [selectedCity, formData?.address?.pincode]);

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], city: city });
    }
  }

  function selectLocality(locality) {
    setSelectedLocality(locality);
    if (userType === "employee") {
      onSelect(config.key, { ...formData[config.key], locality: locality });
    }
  }

  function onSubmit() {
    onSelect(config.key, { city: selectedCity, locality: selectedLocality });
  }

  if (userType === "employee") {
    return (
      <div>
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t("MYCITY_CODE_LABEL")}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <Dropdown
            className="field"
            style={{ width: "50%" }}
            isMandatory
            selected={cities?.length === 1 ? cities[0] : selectedCity}
            disable={cities?.length === 1}
            option={cities}
            select={selectCity}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>{t("CS_CREATECOMPLAINT_MOHALLA")}</CardLabel>
          <Dropdown
            className="field"
            style={{ width: "50%" }}
            isMandatory
            selected={selectedLocality}
            option={localities}
            select={selectLocality}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
      </div>
    );
  }
  return (
    <FormStep config={config} onSelect={onSubmit} t={t} isDisabled={selectedLocality ? false : true}>
      <CardLabel>{t("MYCITY_CODE_LABEL")}</CardLabel>
      <RadioOrSelect options={cities} selectedOption={selectedCity} optionKey="code" onSelect={selectCity} t={t} />
      {selectedCity && localities && <CardLabel>{t("CS_CREATECOMPLAINT_MOHALLA")}</CardLabel>}
      {selectedCity && localities && (
        <RadioOrSelect
          isMandatory={config.isMandatory}
          options={localities}
          selectedOption={selectedLocality}
          optionKey="code"
          onSelect={selectLocality}
          t={t}
        />
      )}
    </FormStep>
  );
};

export default SelectAddress;
