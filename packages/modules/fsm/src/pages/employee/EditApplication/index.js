import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Loader, PitDimension, FormComposer } from "@egovernments/digit-ui-react-components";
import { Switch, Route, useRouteMatch, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ModifyApplication = ({ parentUrl, heading = "Modify Application" }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const userInfo = Digit.UserService.getUser();
  const cities = Digit.Hooks.fsm.useTenants();
  console.log("find cities here", cities);

  const FSM_CREATOR_EMP = Digit.UserService.hasAccess("FSM_CREATOR_EMP");

  const select = (items) => items.map((item) => ({ ...item, i18nKey: t(item.i18nKey) }));

  const applicationChannelData = Digit.Hooks.fsm.useMDMS(state, "FSM", "ApplicationChannel");
  // console.log("find application channel data", applicationChannelData);
  const sanitationTypeData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PitType");
  const propertyTypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertyType", { select });
  // console.log("find propertyTypesData sanitationTypeData here", propertyTypesData, sanitationTypeData);
  const propertySubtypesData = Digit.Hooks.fsm.useMDMS(state, "FSM", "PropertySubtype", { select });
  // console.log("find property sub type here", propertySubtypesData)
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  // const { data: customizationConfig } = Digit.Hooks.fsm.useConfig(state, { staleTime: Infinity });
  const customizationConfig = {};
  // console.log(
  //   "find customization config here",
  //   customizationConfig
  // );

  const { isLoading, isError, data: applicationData, error } = Digit.Hooks.fsm.useSearch(
    tenantId,
    { applicationNos: applicationNumber, uuid: userInfo.uuid },
    { staleTime: Infinity }
  );
  const workflowDetails = Digit.Hooks.fsm.useWorkflowData(tenantId, applicationNumber);
  const [defaultValues, setDefaultValues] = useState();

  // console.log("find application details and workflow data here", applicationData, workflowDetails);

  const [menu, setMenu] = useState([]);
  const [subTypeMenu, setSubTypeMenu] = useState([]);
  const [propertyType, setPropertyType] = useState({});
  const [subType, setSubType] = useState({});

  const [channelMenu, setChannelMenu] = useState([]);

  const [channel, setChannel] = useState();
  const [sanitation, setSanitation] = useState([]);
  const [sanitationMenu, setSanitationMenu] = useState([]);
  const [pitDimension, setPitDimension] = useState({});
  const [vehicle, setVehicle] = useState(null);
  const [slumMenu, setSlumMenu] = useState([
    { key: "PB_AMRITSAR_SUN01_SLUM_NJAGBANDHU", name: "NJagbandhu" },
    { key: "PB_AMRITSAR_SUN01_SLUM_B", name: "Slum B" },
    { key: "PB_AMRITSAR_SUN01_SLUM_C", name: "Slum C" },
  ]);
  const [slum, setSlum] = useState({ key: "PB_AMRITSAR_SUN01_SLUM_NJAGBANDHU", name: "NJagbandhu" });
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [noOfTrips, setNoOfTrips] = useState(1);
  const [amountPerTrip, setAmountPerTrip] = useState();

  const localitiesObj = useSelector((state) => state.common.localities);

  const cityProperty = Digit.SessionStorage.get("city_property");
  const selectedLocalities = Digit.SessionStorage.get("selected_localities");
  const localityProperty = Digit.SessionStorage.get("locality_property");

  const [selectedCity, setSelectedCity] = useState(() => cities.filter((city) => city.code === tenantId)[0]);
  const [localities, setLocalities] = useState(() => localitiesObj[tenantId]);
  const [selectedLocality, setSelectedLocality] = useState();
  const [canSubmit, setSubmitValve] = useState(false);

  useEffect(() => {
    if (amountPerTrip) {
      setPaymentAmount(noOfTrips * amountPerTrip);
    } else {
      if (vehicle?.amount) {
        setPaymentAmount(noOfTrips * vehicle?.amount);
      }
    }
  }, [vehicle, noOfTrips, amountPerTrip]);

  // console.log("find channel state here", channel);
  useEffect(() => {
    const applicationDetails = applicationData;
    if (applicationDetails) {
      const vehicle = vehicleMenu?.find((vehicle) => vehicle.code === applicationDetails.vehicleType);
      setVehicle(vehicle);
      setDefaultValues({
        applicantName: applicationDetails.citizen?.name,
        mobileNumber: applicationDetails.citizen?.mobileNumber,
        pincode: applicationDetails.address?.pincode,
        streetName: applicationDetails.address?.street,
        doorNo: applicationDetails.address?.doorNo,
        landmark: applicationDetails.address?.landmark,
        noOfTrips: applicationDetails.noOfTrips || 1,
        distanceFromRoad: applicationDetails?.pitDetail?.distanceFromRoad,
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
    setSubTypeMenu(propertySubtypesData?.data?.filter((item) => item.propertyType === propertyType?.code?.toUpperCase()));
  }, [propertyType]);

  useEffect(() => {
    if (applicationData && channelMenu?.length > 0) {
      const applicationChannel = applicationData.source;
      const prePopulatedChannel = channelMenu.filter((channel) => channel.code === applicationChannel)[0];
      // console.log("find channel here", applicationChannel,prePopulatedChannel);
      setChannel(prePopulatedChannel);
    }
    if (applicationData && !selectedLocality && localities) {
      const prePopulatedLocality = applicationData.address?.locality;
      const adminPreCode = tenantId.toUpperCase().split(".").join("_") + "_ADMIN_";
      const __selectedLocality = localities.filter((locality) => locality.code === `${adminPreCode + prePopulatedLocality.code}`)[0];
      // console.log("find localities here", localities, __selectedLocality);
      setSelectedLocality(__selectedLocality);
    }
    if (applicationData && propertyTypesData.data && propertySubtypesData.data) {
      const prePropertyUsage = applicationData.propertyUsage;
      const prePropertyType = prePropertyUsage.split(".")[0];
      // console.log("find propertySubtypesData here", propertySubtypesData.data, prePropertyUsage, propertySubtypesData.data.filter((subtype) => subtype.code === prePropertyUsage))
      setPropertyType(propertyTypesData.data.filter((type) => type.code === prePropertyType)[0]);
      setSubType(propertySubtypesData.data.filter((subtype) => subtype.code === prePropertyUsage)[0]);
    }

    if (applicationData && sanitationMenu) {
      const prePitType = applicationData.sanitationtype;
      // console.log("find prePitType and sanitationType data here",prePitType, sanitationMenu, sanitationMenu.filter( pitType => pitType.code === prePitType)[0])
      setSanitation(sanitationMenu.filter((pitType) => pitType.code === prePitType)[0]);
    }
    if (applicationData && Object.keys(pitDimension).length === 0) {
      const __height = applicationData.pitDetail?.height;
      const __length = applicationData.pitDetail?.length;
      const __width = applicationData.pitDetail?.width;
      const __diameter = applicationData.pitDetail?.diameter;
      setPitDimension({
        height: __height,
        length: __length,
        width: __width,
        diameter: __diameter,
      });
    }
  }, [channelMenu, selectedLocality, localities, applicationData, propertyTypesData.data, propertySubtypesData.data, sanitationMenu, pitDimension]);

  useEffect(() => {
    if (!sanitationTypeData.isLoading) {
      const data = sanitationTypeData.data?.map((type) => ({ ...type, i18nKey: `PITTYPE_MASTERS_${type.code}` }));

      setSanitationMenu(data);
    }
  }, [sanitationTypeData]);

  useEffect(() => {
    if (sanitation && propertyType && subType && vehicle) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  }, [sanitation, propertyType, subType, vehicle]);

  function selectedType(value) {
    setPropertyType(value);
    setSubTypeMenu(propertySubtypesData.data.filter((item) => item.propertyType === value?.code?.toUpperCase()));
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
    // console.log("test pitDeminsion working here",{ ...pitDimension, [name]: value })
  };

  function selectLocality(locality) {
    setSelectedLocality(locality);
  }

  const onFormValueChange = (formData) => {
    setNoOfTrips(formData?.noOfTrips || 1);
    setAmountPerTrip(formData?.amountPerTrip);
  };

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
    const localityCode = selectedLocality.code.split("_").pop();
    const localityName = selectedLocality.name;
    const { name } = subType;
    const propertyType = name;
    const { height, length, width } = pitDimension;
    // const additionalTrip  = data.additionalTrip
    // const additionalCharges  = data.additionalCharges
    // const reasonForAdditionalCharges  = data.reasonForAdditionalCharges
    // const additionalAmount  = data.additionalAmount

    (applicationData.citizen = {
      name: applicantName,
      mobileNumber,
    }),
      (applicationData.tenantId = cityCode),
      (applicationData.sanitationtype = sanitationtype),
      (applicationData.source = applicationChannel),
      (applicationData.additionalDetails = {
        tripAmount: amount,
      }),
      (applicationData.propertyUsage = subType.code),
      (applicationData.vehicleType = vehicle.code),
      (applicationData.noOfTrips = noOfTrips),
      (applicationData.pitDetail = {
        distanceFromRoad: data.distanceFromRoad,
        height,
        length,
        width,
      }),
      (applicationData.address = {
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
      }),
      // TODO: To be added after approval
      // (applicationData.additionalTrip = additionalTrip ),
      // (applicationData.additionalCharges = additionalCharges ),
      // (applicationData.reasonForAdditionalCharges = reasonForAdditionalCharges ),
      // (applicationData.additionalAmount = additionalAmount )
      // (applicationData.workflow = {
      //   action: "SUBMIT",
      // }),
      delete applicationData["responseInfo"];
    // console.log(
    //   "%c: onSubmit -> formData ",
    //   "font-size:16px;background-color:#3dd445;color:white;",
    //   { fsm: applicationData, workflow: applicationData.workflow },
    //   subType
    // );

    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);

    history.push("/digit-ui/employee/fsm/response", {
      applicationData,
      key: "update",
      action: "SUBMIT",
    });
  };

  function isDisabled(prop) {
    if (Object.keys(customizationConfig).length === 0) return null;
    return customizationConfig ? !customizationConfig["ALLOW_MODIFY"]?.override?.includes(prop) : true;
  }

  const config = [
    {
      head: t("ES_TITLE_APPLICATION_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
          type: "dropdown",
          populators: (
            <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={selectChannel} t={t} disable={true} />
          ),
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
          disable: true,
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
          disable: true,
        },
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
            <Dropdown
              option={propertyTypesData.data}
              optionKey="i18nKey"
              id="propertyType"
              selected={propertyType}
              select={selectedType}
              t={t}
              disable={isDisabled("propertyUsage") ? isDisabled("propertyUsage") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...subTypeMenu },
          populators: (
            <Dropdown
              option={subTypeMenu}
              optionKey="i18nKey"
              id="propertySubType"
              selected={subType}
              select={selectedSubType}
              t={t}
              disable={isDisabled("propertyUsage") ? isDisabled("propertyUsage") : false}
            />
          ),
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
            validation: { pattern: /^[1-9][0-9]{5}$/ },
          },
          disable: isDisabled("address.pincode") ? isDisabled("address.pincode") : false,
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_CITY"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown
              isMandatory
              selected={selectedCity}
              option={cities}
              id="city"
              select={selectCity}
              optionKey="name"
              disable={isDisabled("address.city") ? isDisabled("address.city") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_MOHALLA"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown
              isMandatory
              selected={selectedLocality}
              optionKey="code"
              id="locality"
              option={localities}
              select={selectLocality}
              t={t}
              disable={isDisabled("address.locality") ? isDisabled("address.locality") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_SLUM_NAME"),
          type: "dropdown",
          isMandatory: true,
          populators: <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />,
        },
        {
          label: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"),
          type: "text",
          populators: {
            name: "streetName",
            error: t("CORE_COMMON_STREET_INVALID"),
            validation: { pattern: /^[\w\s]{1,256}$/ },
          },
          disable: isDisabled("address.street") ? isDisabled("address.street") : false,
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
          disable: isDisabled("address.doorNo") ? isDisabled("address.doorNo") : false,
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_LANDMARK"),
          type: "textarea",
          populators: {
            name: "landmark",
          },
          disable: isDisabled("address.landmark") ? isDisabled("address.landmark") : false,
        },
      ],
    },
    {
      head: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
      body: [
        {
          label: t("ES_NEW_APPLICATION_PIT_TYPE"),
          type: "dropdown",
          populators: (
            <Dropdown
              option={sanitationMenu}
              optionKey="i18nKey"
              id="sanitation"
              selected={sanitation}
              select={selectSanitation}
              t={t}
              disable={isDisabled("pitDetail") ? isDisabled("pitDetail") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_PIT_DIMENSION"),
          populators: (
            <PitDimension
              sanitationType={sanitation}
              t={t}
              size={pitDimension}
              handleChange={handlePitDimension}
              disable={isDisabled("pitDetail") ? isDisabled("pitDetail") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_PIT_DISTANCE_FROM_ROAD"),
          type: "text",
          populators: {
            name: "distanceFromRoad",
            error: t("ES_NEW_APPLICATION_DISTANCE_INVALID"),
            validation: { pattern: /^[0-9]\d?(\.\d{1,2})?$/ },
          },
          disable: isDisabled("pitDetail") ? isDisabled("pitDetail") : false,
        },
        {
          label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown
              option={vehicleMenu}
              optionKey="i18nKey"
              id="vehicle"
              selected={vehicle}
              select={selectVehicle}
              t={t}
              disable={isDisabled("vehicleType") ? isDisabled("vehicleType") : false}
            />
          ),
        },
        {
          label: t("ES_NEW_APPLICATION_AMOUNT_PER_TRIP"),
          type: "text",
          populators: {
            name: "amountPerTrip",
            validation: { required: true },
            defaultValue: vehicle?.amount,
          },
          disable: customizationConfig ? !customizationConfig["additionalDetails.tripAmount"] : true,
        },
        {
          label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
          type: "text",
          populators: {
            name: "noOfTrips",
            error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
            defaultValue: 1,
          },
          disable: customizationConfig ? !customizationConfig["noOfTrips"] : true,
        },
        {
          label: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "amount",
            error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
            validation: {
              required: true,
              pattern: /^[1-9]\d*$/,
            },
            defaultValue: paymentAmount,
          },
          disable: true,
        },
        // {
        //   label: t("ES_EDIT_APPLICATION_ADDITIONAL_TRIP"),
        //   type: "text",
        //   populators: {
        //     name: "additionalTrip",
        //   },
        // },
        // {
        //   label: t("ES_EDIT_APPLICATION_ADDITIONAL_CHARGES"),
        //   type: "text",
        //   populators: {
        //     name: "additionalCharges",
        //   },
        // },
        // {
        //   label: t("ES_EDIT_APPLICATION_REASON_FOR_ADDITIONAL_CHARGES"),
        //   type: "text",
        //   populators: {
        //     name: "reasonForAdditionalCharges",
        //   },
        // },
        // {
        //   label: t("ES_EDIT_APPLICATION_AMOUNT_TO_BE_PAID"),
        //   type: "text",
        //   populators: {
        //     name: "additionalAmount",
        //   },
        // },
      ],
    },
  ];

  if (defaultValues) {
    return (
      <FormComposer
        heading={heading}
        isDisabled={!canSubmit}
        label={t("ES_COMMON_UPDATE")}
        config={config}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        onFormValueChange={onFormValueChange}
      ></FormComposer>
    );
  } else {
    return <Loader />;
  }
};

export default ModifyApplication;
