import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Loader, PitDimension } from "@egovernments/digit-ui-react-components";
import { Switch, Route, useRouteMatch, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FormComposer } from "../../../components/FormComposer";

const ModifyApplication = ({ parentUrl, heading = "Modify Application" }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const userInfo = Digit.UserService.getUser();
  const cities = Digit.Hooks.fsm.useTenants();

  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));

  const applicationChannelData = Digit.Hooks.fsm.useMDMS(state, "FSM", "ApplicationChannel");
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(state, "FSM", "SanitationType");
  const propertyTypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertyType", { select });
  console.log("find propertyTypesData here", propertyTypesData);
  const propertySubtypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertySubtype", { select });

  const { isLoading, isError, data: applicationData, error } = Digit.Hooks.fsm.useSearch(
    tenantId,
    { applicationNumber, uuid: userInfo.uuid },
    { staleTime: Infinity }
  );
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId,
    id: applicationNumber,
    moduleCode: "FSM",
    role: "FSM_EMPLOYEE",
    serviceData: applicationData,
    getStaleData: true,
  });
  const [defaultValues, setDefaultValues] = useState();

  console.log("find application details and workflow data here", applicationData, workflowDetails);

  const [menu, setMenu] = useState([]);
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [propertyType, setPropertyType] = useState({});
  const [subType, setSubType] = useState({});
  const [vehicleMenu, setVehicleMenu] = useState([
    { key: "Tracker (500 ltrs)", name: "Tracker (500 ltrs)" },
    { key: "Tracker (1000 ltrs)", name: "Tracker (1000 ltrs)" },
  ]);

  const [channelMenu, setChannelMenu] = useState([]);

  const [channel, setChannel] = useState();
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

  const [selectedCity, setSelectedCity] = useState(cityProperty ? cityProperty : null);
  const [localities, setLocalities] = useState(selectedLocalities ? selectedLocalities : null);
  const [selectedLocality, setSelectedLocality] = useState(localityProperty ? localityProperty : null);

  console.log("find channel state here", channel);
  useEffect(() => {
    const applicationDetails = applicationData?.fsm[0];
    if (applicationDetails) {
      setDefaultValues({
        applicantName: applicationDetails.citizen?.name,
        mobileNumber: applicationDetails.citizen?.mobileNumber,
        pincode: applicationDetails.address?.pincode,
        streetName: applicationDetails.address?.street,
        doorNo: applicationDetails.address?.plotNo,
        landmark: applicationDetails.address?.landmark,
        noOfTrips: applicationDetails.noOfTrips,
        amount: JSON.parse(JSON.parse(applicationDetails.additionalDetails))?.tripAmount,
      });
    }
  }, [applicationData]);
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
    if (applicationData && applicationData.fsm && channelMenu?.length > 0) {
      const applicationChannel = applicationData.fsm[0].source;
      channelMenu.filter((channel) => channel.code === applicationChannel);
      console.log("find channel here", channelMenu);
      setChannel(channelMenu[0]);
    }
  }, [channelMenu, applicationData]);

  useEffect(() => {
    if (!sanitationTypeData.isLoading) {
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `ES_APPLICATION_DETAILS_SANITATION_TYPE_${type.code}` }));

      setSanitationMenu(data);
    }
  }, [sanitationTypeData]);

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

  const config = [
    {
      head: t("ES_TITLE_APPLICATION_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
          type: "dropdown",
          populators: <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={selectChannel} />,
        },
        // {
        //   label: t("ES_NEW_APPLICATION_SANITATION_TYPE"),
        //   type: "dropdown",
        //   populators: <Dropdown option={sanitationMenu} optionKey="i18nKey" id="sanitation" selected={sanitation} select={selectSanitation} />,
        // },
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
            <Dropdown option={propertyTypesData.data} optionKey="i18nKey" id="propertyType" selected={propertyType} select={selectedType} />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...subTypeMenu },
          populators: <Dropdown option={subTypeMenu} optionKey="i18nKey" id="propertySubType" selected={subType} select={selectedSubType} />,
        },
      ],
    },
    {
      head: t("ES_NEW_APPLICATION_LOCATION_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_LOCATION_PINCODE"),
          type: "text",
          populators: {
            name: "pincode",
            validation: { pattern: /^[1-9][0-9]{5}$/ },
          },
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_CITY"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={cities} id="city" select={selectCity} optionKey="name" />,
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
          label: t("ES_NEW_APPLICATION_STREET_NAME"),
          type: "text",
          populators: {
            name: "streetName",
          },
        },
        {
          label: t("ES_NEW_APPLICATION_DOOR_NO"),
          type: "text",
          populators: {
            name: "doorNo",
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
      head: t("ES_NEW_APPLICATION_PAYMENT_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_PIT_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={sanitationMenu} optionKey="i18nKey" id="sanitation" selected={sanitation} select={selectSanitation} />,
        },
        {
          label: t("ES_NEW_APPLICATION_PIT_DIMENSION"),
          populators: <PitDimension t={t} size={pitDimension} handleChange={handlePitDimension} />,
        },
        {
          label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
          type: "text",
          populators: {
            name: "noOfTrips",
            validation: { pattern: /[0-9]+/ },
          },
        },
        {
          label: t("ES_NEW_APPLICATION_PAYMENT_AMOUNT"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "amount",
            validation: { pattern: /[0-9]+/ },
            componentInFront: (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                ₹
              </span>
            ),
          },
        },
      ],
    },
    {
      head: t(),
      body: [
        {
          label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="vehicle" selected={vehicle} select={selectVehicle} />,
        },
      ],
    },
  ];
  if (defaultValues) {
    return (
      <FormComposer heading={heading} label={t("ES_COMMON_UPDATE")} config={config} onSubmit={onSubmit} defaultValues={defaultValues}></FormComposer>
    );
  } else {
    return <Loader />;
  }
};

export default ModifyApplication;
