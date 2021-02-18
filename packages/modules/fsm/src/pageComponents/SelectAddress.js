import React, { useEffect, useState } from "react";
import { FormStep, CardLabel, Dropdown, RadioButtons, LabelFieldPair } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";

const SelectAddress = ({ t, config, onSelect, value, userType, setValue, data }) => {
  const allCities = Digit.Hooks.fsm.useTenants();
  const pincode = value?.pincode || data?.pincode
  const cities = pincode ? allCities.filter((city) => city?.pincode?.some((pin) => pin == pincode)) : allCities;
  const localitiesObj = useSelector((state) => state.common.localities);
  const [selectedCity, setSelectedCity] = useState(() => {
    const { city_complaint } = value || {};
    return city_complaint ? city_complaint : null;
  });
  const [localities, setLocalities] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(() => {
    const { locality_complaint } = value || {};
    return locality_complaint ? locality_complaint : null;
  });

  useEffect(() => {
    if (selectedCity) {
      let __localityList = localitiesObj[selectedCity.code];
      let filteredLocalityList = [];
      if (value?.pincode) {
        filteredLocalityList = __localityList.filter((obj) => obj.pincode?.find((item) => item == value.pincode));
      }
      setLocalities(() => (filteredLocalityList.length > 0 ? filteredLocalityList : __localityList));
      if (filteredLocalityList.length === 1) {
        setSelectedLocality(filteredLocalityList[0]);
      }
    }
  }, [selectedCity, value?.pincode]);

  function selectCity(city) {
    setSelectedLocality(null);
    setLocalities(null);
    setSelectedCity(city);
    if (userType === "employee") {
      setValue(config.key, { ...data[config.key], city_complaint: city });
    }
  }

  function selectLocality(locality) {
    setSelectedLocality(locality);
    if (userType === "employee") {
      setValue(config.key, { ...data[config.key], locality_complaint: locality });
    }
  }

  function onSubmit() {
    onSelect({ city_complaint: selectedCity, locality_complaint: selectedLocality });
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
      {cities?.length < 5 ? (
        <RadioButtons selectedOption={selectedCity} options={cities} optionsKey="name" onSelect={selectCity} />
      ) : (
        <Dropdown isMandatory selected={selectedCity} option={cities} select={selectCity} optionKey="code" t={t} disable={value?.pincode} />
      )}
      {selectedCity && localities && <CardLabel>{t("CS_CREATECOMPLAINT_MOHALLA")}</CardLabel>}
      {selectedCity && localities && (
        <React.Fragment>
          {localities?.length < 5 ? (
            <RadioButtons selectedOption={selectedLocality} options={localities} optionsKey="name" onSelect={selectLocality} />
          ) : (
            <Dropdown isMandatory selected={selectedLocality} optionKey="code" option={localities} select={selectLocality} t={t} />
          )}
        </React.Fragment>
      )}
    </FormStep>
  );
};

export default SelectAddress;
