import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

const CONSTANTS = ({
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
}) => {
  const detailsConfig = {
    applicationDetails: {
      head: t("ES_TITLE_APPLICATION_DETAILS"),
      body: [
        {
          name: "applicationChannel",
          label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
          type: "dropdown",
          populators: <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={selectChannel} />,
        },
        {
          name: "sanitationType",
          label: t("ES_NEW_APPLICATION_SANITATION_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={sanitationMenu} optionKey="i18nKey" id="sanitation" selected={sanitation} select={selectSanitation} />,
        },
        {
          name: "applicantName",
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
          name: "applicantMobileNo",
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
        {
          name: "slumName",
          label: t("ES_NEW_APPLICATION_SLUM_NAME"),
          type: "radio",
          isMandatory: true,
          populators: <Dropdown option={slumMenu} optionKey="name" id="slum" selected={slum} select={selectSlum} />,
        },
      ],
    },
    propertyDetails: {
      head: t("ES_NEW_APPLICATION_PROPERTY_DETAILS"),
      body: [
        {
          name: "propertyType",
          label: t("ES_NEW_APPLICATION_PROPERTY_TYPE"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown option={propertyTypesData?.data} optionKey="i18nKey" id="propertyType" selected={propertyType} select={selectedType} />
          ),
        },
        {
          name: "propertySubType",
          label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
          isMandatory: true,
          type: "dropdown",
          menu: { ...subTypeMenu },
          populators: <Dropdown option={subTypeMenu} optionKey="i18nKey" id="propertySubType" selected={subType} select={selectedSubType} />,
        },
      ],
    },
    locationDetails: {
      head: t("ES_NEW_APPLICATION_LOCATION_DETAILS"),
      body: [
        {
          name: "pincode",
          label: t("ES_NEW_APPLICATION_LOCATION_PINCODE"),
          type: "text",
          populators: {
            name: "pincode",
            validation: { pattern: /^[1-9][0-9]{5}$/ },
          },
        },
        {
          name: "city",
          label: t("ES_NEW_APPLICATION_LOCATION_CITY"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={cities} id="city" select={selectCity} optionKey="name" />,
        },
        {
          name: "mohalla",
          label: t("ES_NEW_APPLICATION_LOCATION_MOHALLA"),
          isMandatory: true,
          type: "dropdown",
          populators: (
            <Dropdown isMandatory selected={selectedLocality} optionKey="code" id="locality" option={localities} select={selectLocality} t={t} />
          ),
        },
        {
          name: "landmark",
          label: t("ES_NEW_APPLICATION_LOCATION_LANDMARK"),
          type: "textarea",
          populators: {
            name: "landmark",
          },
        },
      ],
    },
    paymentDetails: {
      head: t("ES_NEW_APPLICATION_PAYMENT_DETAILS"),
      body: [
        {
          name: "noOfTrips",
          label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
          type: "text",
          populators: {
            name: "noOfTrips",
            validation: { pattern: /[0-9]+/ },
          },
        },
        {
          name: "paymentAmount",
          label: t("ES_NEW_APPLICATION_PAYMENT_AMOUNT"),
          isMandatory: true,
          type: "text",
          populators: {
            name: "amount",
            validation: { pattern: /[0-9]+/ },
            componentInFront: "₹",
          },
        },
      ],
    },
    vehicleRequested: {
      head: t(),
      body: [
        {
          name: "vehicleRequested",
          label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
          isMandatory: true,
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="vehicle" selected={vehicle} select={selectVehicle} />,
        },
      ],
    },
  };

  return { detailsConfig };
};

export default CONSTANTS;
