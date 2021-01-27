import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, FormComposer } from "@egovernments/digit-ui-react-components";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../../../constants";
import FSM_UTILS from "../../../utils";

export const NewApplication = ({ parentUrl, heading }) => {
  // const __initPropertyType__ = window.Digit.SessionStorage.get("propertyType");
  // const __initSubType__ = window.Digit.SessionStorage.get("subType");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const [menu, setMenu] = useState([]);
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [propertyType, setPropertyType] = useState({});
  const [subType, setSubType] = useState({});
  const [vehicleMenu, setVehicleMenu] = useState([
    { key: "Tracker (500 ltrs)", name: "Tracker (500 ltrs)" },
    { key: "Tracker (1000 ltrs)", name: "Tracker (1000 ltrs)" },
  ]);
  const [channel, setChannel] = useState(null);
  const [channelMenu, setChannelMenu] = useState([]);
  const [sanitation, setSanitation] = useState([]);
  const [sanitationMenu, setSanitationMenu] = useState([]);
  const [pitDimension, setPitDimension] = useState({});
  const [vehicle, setVehicle] = useState(null);
  const [slumMenu, setSlumMenu] = useState([{ key: "NJagbandhu", name: "NJagbandhu" }]);
  const [slum, setSlum] = useState("NJagbandhu");

  const localitiesObj = useSelector((state) => state.common.localities);

  const cityProperty = Digit.SessionStorage.get("city_property");
  const selectedLocalities = Digit.SessionStorage.get("selected_localities");
  const localityProperty = Digit.SessionStorage.get("locality_property");

  const [localities, setLocalities] = useState(selectedLocalities ? selectedLocalities : null);
  const [pincode, setPincode] = useState("");
  const [pincodeNotValid, setPincodeNotValid] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState(localityProperty ? localityProperty : null);

  const { t } = useTranslation();
  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));
  const cities = Digit.Hooks.fsm.useTenants();
  const getCities = () => cities?.filter((e) => e.code === Digit.ULBService.getCurrentTenantId()) || [];
  const [selectedCity, setSelectedCity] = useState(getCities()[0] ? getCities()[0] : null);
  const history = useHistory();
  const applicationChannelData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "ApplicationChannel");
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "SanitationType");
  const propertyTypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertyType", { select });
  const propertySubtypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertySubtype", { select });
  const [canSubmit, setSubmitValve] = useState(false);

  useEffect(() => {
    if (!applicationChannelData.isLoading) {
      const data = applicationChannelData.data?.map((channel) => ({
        ...channel,
        i18nKey: `ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${channel.code}`,
      }));

      setChannelMenu(data);
    }
  }, [applicationChannelData]);

  useEffect(() => {
    if (!sanitationTypeData.isLoading) {
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `ES_APPLICATION_DETAILS_SANITATION_TYPE_${type.code}` }));

      setSanitationMenu(data);
    }
  }, [sanitationTypeData]);

  useEffect(() => {
    if (propertyType?.code && subType?.code && selectedCity?.code && selectedLocality?.code) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, [propertyType, subType, selectedCity, selectedLocality]);

  useEffect(() => {
    const city = cities.find((obj) => obj.pincode?.find((item) => item == pincode));
    if (city?.code === getCities()[0]?.code) {
      setPincodeNotValid(false);
      setSelectedCity(city);
      setSelectedLocality(null);
      const __localityList = localitiesObj[city.code];
      const __filteredLocalities = __localityList.filter((city) => city["pincode"] == pincode);
      setLocalities(__filteredLocalities);
    } else if (pincode === "" || pincode === null) {
      setPincodeNotValid(false);
      setLocalities(localitiesObj[getCities()[0]?.code]);
    } else {
      setPincodeNotValid(true);
    }
  }, [pincode]);

  function selectedType(value) {
    setPropertyType(value);
    setSubTypeMenu(propertySubtypesData.data.filter((item) => item.propertyType === value?.code));
  }

  function selectSlum(value) {
    setSlum(value);
  }

  function selectChannel(value) {
    setChannel(value);
  }

  function selectSanitation(value) {
    setSanitation(value);
  }

  function selectVehicle(value) {
    setVehicle(value);
  }

  function selectedSubType(value) {
    setSubType(value);
  }

  // city locality logic
  const selectCity = async (city) => {
    setSelectedCity(city);
    let __localityList = localitiesObj[city.code];
    setLocalities(__localityList);
  };

  const handlePitDimension = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      setPitDimension({ ...pitDimension, [name]: value });
    }
  };

  const handlePincode = (event) => {
    const { value } = event.target;
    setPincode(value);
    if (!value) {
      setPincodeNotValid(false);
    }
  };

  const isPincodeValid = () => !pincodeNotValid;

  function selectLocality(locality) {
    setSelectedLocality(locality);
  }

  const onSubmit = (data) => {
    const applicationChannel = channel.code;
    const sanitationtype = sanitation.code;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data.pincode;
    const street = data.streetName;
    const doorNo = data.doorNo;
    const landmark = data.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amount;
    const cityCode = selectedCity.code;
    const city = selectedCity.city.name;
    const district = selectedCity.city.name;
    const region = selectedCity.city.name;
    const state = "Punjab";
    const localityCode = selectedLocality.code;
    const localityName = selectedLocality.name;
    const { name } = subType;
    const propertyType = name;
    const formData = {
      fsm: {
        citizen: {
          name: applicantName,
          mobileNumber,
        },
        tenantId: cityCode,
        sanitationtype: sanitationtype,
        source: applicationChannel,
        additionalDetails: {
          tripAmount: amount,
        },
        propertyUsage: subType.code,
        pitDetail: pitDimension,
        address: {
          tenantId: cityCode,
          landmark,
          doorNo,
          street,
          city,
          state,
          pincode,
          locality: {
            code: localityCode.split("_").pop(),
            name: localityName,
          },
          geoLocation: {
            latitude: selectedLocality.latitude,
            longitude: selectedLocality.longitude,
          },
        },
        noOfTrips,
      },
      workflow: null,
    };
    console.log("%c 🇸🇦: onSubmit -> formData ", "font-size:16px;background-color:#3dd445;color:white;", formData, subType);

    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);

    history.push("/digit-ui/employee/fsm/response", formData);
  };

  const { detailsConfig } = CONSTANTS({
    t,
    channelMenu,
    channel,
    selectChannel,
    sanitationMenu,
    sanitation,
    selectSanitation,
    slumMenu,
    slum,
    selectSlum,
    propertyTypesData,
    propertyType,
    selectedType,
    subTypeMenu,
    subType,
    selectedSubType,
    vehicleMenu,
    vehicle,
    selectVehicle,
    selectedCity,
    selectCity,
    cities,
    selectedLocality,
    localities,
    selectLocality,
    handlePincode,
    isPincodeValid,
    getCities,
    pitDimension,
    handlePitDimension,
  });

  let config = [];

  const defaultConfig = ["applicationDetails", "propertyDetails", "locationDetails", "paymentDetails"];

  const { Customizations } = window.Digit;
  let employeeCustomizations = false;

  if (Customizations?.FSM?.getEmployeeApplicationCustomization) {
    employeeCustomizations = Customizations?.FSM?.getEmployeeApplicationCustomization(defaultConfig, t);
  }

  if (employeeCustomizations?.config?.length > 0) {
    FSM_UTILS.updateConfiguration({
      config,
      defaultConfig,
      detailsConfig,
      customConfiguration: employeeCustomizations?.config,
      isDefaultConfig: employeeCustomizations?.defaultConfig,
    });
  } else {
    defaultConfig.forEach((fieldSectionName) => config.push(detailsConfig[fieldSectionName]));
  }

  return <FormComposer heading={heading} isDisabled={!canSubmit} label={t("ES_COMMON_APPLICATION_SUBMITTED")} config={config} onSubmit={onSubmit} />;
};
