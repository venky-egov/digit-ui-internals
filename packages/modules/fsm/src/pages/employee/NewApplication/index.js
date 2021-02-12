import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, PitDimension, FormComposer } from "@egovernments/digit-ui-react-components";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const NewApplication = ({ parentUrl, heading }) => {
  // const __initPropertyType__ = window.Digit.SessionStorage.get("propertyType");
  // const __initSubType__ = window.Digit.SessionStorage.get("subType");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const [menu, setMenu] = useState([]);
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [propertyType, setPropertyType] = useState({});
  const [subType, setSubType] = useState({});
  const [channel, setChannel] = useState(null);
  const [channelMenu, setChannelMenu] = useState([]);
  const [sanitation, setSanitation] = useState([]);
  const [sanitationMenu, setSanitationMenu] = useState([]);
  const [pitDimension, setPitDimension] = useState({});
  const [vehicle, setVehicle] = useState(null);
  const [slumMenu, setSlumMenu] = useState([{ key: "NJagbandhu", name: "NJagbandhu" }]);
  const [slum, setSlum] = useState("NJagbandhu");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [noOfTrips, setNoOfTrips] = useState(1);
  const [amountPerTrip, setAmountPerTrip] = useState();

  const localitiesObj = useSelector((state) => state.common.localities);

  const [localities, setLocalities] = useState(null);
  const [pincode, setPincode] = useState("");
  const [pincodeNotValid, setPincodeNotValid] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState(null);

  const { t } = useTranslation();
  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));
  const cities = Digit.Hooks.fsm.useTenants();
  const getCities = () => cities?.filter((e) => e.code === Digit.ULBService.getCurrentTenantId()) || [];
  const [selectedCity, setSelectedCity] = useState(getCities()[0] ? getCities()[0] : null);
  const history = useHistory();
  const applicationChannelData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PitType");
  const propertyTypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertyType", { select });
  const propertySubtypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertySubtype", { select });
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  // console.log("find vehicle menu", vehicleMenu);
  const [canSubmit, setSubmitValve] = useState(false);

  const FSM_CUSTOMIZATION = {
    AmountPerTrip: false,
  };

  const onFormValueChange = (formData) => {
    setNoOfTrips(formData?.noOfTrips || 1);
  };

  useEffect(() => {
    if (amountPerTrip) {
      setPaymentAmount(noOfTrips * amountPerTrip);
    } else {
      if (vehicle?.amount) {
        setPaymentAmount(noOfTrips * vehicle?.amount);
      }
    }
  }, [vehicle, noOfTrips, amountPerTrip]);

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
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `PITTYPE_MASTERS_${type.code}` }));

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
    setPaymentAmount(noOfTrips * value.amount);
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
    const applicationChannel = channel?.code;
    const sanitationtype = sanitation.code;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data.pincode;
    const street = data.streetName;
    const doorNo = data.doorNo;
    const landmark = data.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amountPerTrip;
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
        vehicleType: vehicle.code,
        pitDetail: {
          ...pitDimension,
          distanceFromRoad: data.distanceFromRoad,
        },
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

    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);
    // console.log("find form data here", formData);
    history.push("/digit-ui/employee/fsm/response", formData);
  };

  const config = [
    {
      head: t("ES_TITLE_APPLICATION_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
          type: "dropdown",
          populators: <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={selectChannel} t={t} />,
        },
        {
          label: t("ES_NEW_APPLICATION_APPLICANT_NAME"),
          type: "text",
          isMandatory: true,
          populators: {
            name: "applicantName",
            validation: {
              required: true,
              pattern: /[A-Za-z]/,
            },
          },
        },
        {
          label: t("ES_NEW_APPLICATION_APPLICANT_MOBILE_NO"),
          type: "text",
          isMandatory: true,
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        // {
        //   label: t("ES_NEW_APPLICATION_SLUM_NAME"),
        //   type: "radio",
        //   isMandatory: true,
        //   populators: <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />,
        // },
      ],
    },
    {
      head: t("ES_NEW_APPLICATION_PROPERTY_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_PROPERTY_TYPE"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown option={propertyTypesData.data} optionKey="i18nKey" id="propertyType" selected={propertyType} select={selectedType} t={t} />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...subTypeMenu },
          populators: <Dropdown option={subTypeMenu} optionKey="i18nKey" id="propertySubType" selected={subType} select={selectedSubType} t={t} />,
        },
      ],
    },
    {
      head: t("ES_NEW_APPLICATION_LOCATION_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_PINCODE"),
          type: "text",
          populators: {
            name: "pincode",
            error: t("CORE_COMMON_PINCODE_INVALID"),
            onChange: handlePincode,
            validation: { pattern: /^[1-9][0-9]{5}$/, validate: isPincodeValid },
          },
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_CITY"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown isMandatory freeze={true} selected={selectedCity} option={getCities()} id="city" select={selectCity} optionKey="name" />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_MOHALLA"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown isMandatory selected={selectedLocality} optionKey="code" id="locality" option={localities} select={selectLocality} t={t} />
          ),
        },
        {
          label: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"),
          type: "text",
          populators: {
            name: "streetName",
            error: t("CORE_COMMON_STREET_INVALID"),
            validation: { pattern: /^[\w\s]{1,256}$/ },
          },
        },
        {
          label: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"),
          type: "text",
          populators: {
            name: "doorNo",
            error: t("CORE_COMMON_DOOR_INVALID"),
            validation: {
              pattern: /^[\w\\\s]*$/,
            },
          },
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_LANDMARK"),
          type: "textarea",
          populators: {
            name: "landmark",
          },
        },
      ],
    },
    {
      head: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_PIT_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={sanitationMenu} optionKey="i18nKey" id="sanitation" selected={sanitation} select={selectSanitation} t={t} />,
        },
        {
          label: t("ES_NEW_APPLICATION_PIT_DIMENSION"),
          populators: <PitDimension sanitationType={sanitation} t={t} size={pitDimension} handleChange={handlePitDimension} />,
        },
        {
          label: t("ES_NEW_APPLICATION_DISTANCE_FROM_ROAD"),
          type: "text",
          populators: {
            name: "distanceFromRoad",
          },
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="i18nKey" id="vehicle" selected={vehicle} select={selectVehicle} t={t} />,
        },
        {
          label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
          type: "text",
          populators: {
            name: "noOfTrips",
            error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
            validation: { pattern: /^[1-9]{1}$/ },
            defaultValue: noOfTrips,
          },
        },
        {
          label: t("ES_NEW_APPLICATION_AMOUNT_PER_TRIP"),
          type: "text",
          populators: {
            name: "amountPerTrip",
            error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
            validation: { required: true, pattern: /^[1-9]\d+$/ },
            defaultValue: vehicle?.amount,
          },
        },
        {
          label: t("ES_NEW_APPLICATION_PAYMENT_AMOUNT"),
          type: "text",
          populators: {
            name: "amount",
            validation: { required: true },
            defaultValue: paymentAmount,
          },
        },
      ],
    },
    // {
    //   head: t(),
    //   body: [
    //     {
    //       label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
    //       isMandatory: true,
    //       type: "dropdown",
    //       populators: <Dropdown option={vehicleMenu} optionKey="i18nKey" id="vehicle" selected={vehicle} select={selectVehicle} t={t} />,
    //     },
    //   ],
    // },
  ];

  return (
    <FormComposer
      heading={t("ES_TITLE_NEW_DESULDGING_APPLICATION")}
      isDisabled={!canSubmit}
      label={t("ES_COMMON_APPLICATION_SUBMIT")}
      config={config}
      onSubmit={onSubmit}
      onFormValueChange={onFormValueChange}
    />
  );
};
