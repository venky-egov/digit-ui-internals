import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, PitDimension, FormComposer, CheckBox, CardSubHeader, Card } from "@egovernments/digit-ui-react-components";
import SelectPropertySubtype from "../../pageComponents/SelectPropertySubtype";
import SelectPropertyType from "../../pageComponents/SelectPropertyType";
import SelectAddress from "../../pageComponents/SelectAddress";
import SelectStreet from "../../pageComponents/SelectStreet";
import SelectLandmark from "../../pageComponents/SelectLandmark";
import SelectPincode from "../../pageComponents/SelectPincode";
import SelectTankSize from "../../pageComponents/SelectTankSize";
import SelectPitType from "../../pageComponents/SelectPitType";
import SelectGeolocation from "../../pageComponents/SelectGeolocation";
import SelectSlumName from "../../pageComponents/SelectSlumName"
import { NewApplication } from "../../pages/employee/NewApplication/index";
import { useTranslation } from "react-i18next";
const t = (str) => str;

export const newConfig = [
  // {
  //   head: t("ES_TITLE_APPLICATION_DETAILS"),
  //   body: [
  //     {
  //       label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
  //       type: "dropdown",
  //       populators: <Dropdown option={channelMenu} optionKey="i18nKey" id="channel"  t={t} />,
  //       hideInCitizen: true
  //     },
  //     {
  //       label: t("ES_NEW_APPLICATION_APPLICANT_NAME"),
  //       type: "text",
  //       isMandatory: true,
  //       hideInCitizen: true,
  //       populators: {
  //         name: "applicantName",
  //         validation: {
  //           required: true,
  //           pattern: /[A-Za-z]/,
  //         },
  //       },
  //     },
  //     {
  //       label: t("ES_NEW_APPLICATION_APPLICANT_MOBILE_NO"),
  //       type: "text",
  //       isMandatory: true,
  //       hideInCitizen: true,
  //       populators: {
  //         name: "mobileNumber",
  //         validation: {
  //           required: true,
  //           pattern: /^[6-9]\d{9}$/,
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    head: t("ES_NEW_APPLICATION_PROPERTY_DETAILS"),
    body: [
      {
        label: t("ES_NEW_APPLICATION_PROPERTY_TYPE"),
        isMandatory: true,
        type: "component",
        route: "property-type",
        key: "propertyType",
        component: SelectPropertyType,
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PROPERTY_LABEL",
          cardText: "CS_FILE_APPLICATION_PROPERTY_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        nextStep: "property-subtype",
      },
      {
        label: t("ES_NEW_APPLICATION_PROPERTY_SUB-TYPE"),
        isMandatory: true,
        type: "component",
        route: "property-subtype",
        key: "subtype",
        component: SelectPropertySubtype,
        groupKey: "ES_TITLE_APPLICATION_DETAILS",
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_LABEL",
          cardText: "CS_FILE_APPLICATION_PROPERTY_SUBTYPE_TEXT",
          submitBarLabel: "CS_COMMON_NEXT",
        },
        nextStep: "map",
      },
      {
        route: "map",
        component: SelectGeolocation,
        nextStep: "pincode",
        hideInEmployee: true,
      },
    ],
  },
  {
    head: t("ES_NEW_APPLICATION_LOCATION_DETAILS"),
    body: [
      {
        route: "pincode",
        component: SelectPincode,
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PINCODE_LABEL",
          cardText: "CS_FILE_APPLICATION_PINCODE_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        inputs: [
          {
            label: "CORE_COMMON_PINCODE",
            type: "text",
            name: "pincode",
            validation: {
              pattern: /^([1-9])(\d{5})$/,
              minLength: 6,
              maxLength: 7,
            },
            error: "CORE_COMMON_PINCODE_INVALID",
          },
        ],
        withoutLabel: true,
        key: "pincode",
        nextStep: "address",
        type: "component",
      },
      {
        route: "address",
        component: SelectAddress,
        withoutLabel: true,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_CITY_MOHALLA_TEXT",
          nextText: "CS_COMMON_NEXT",
        },
        key: "complaint",
        nextStep: "street",
        isMandatory: true,
        type: "component",
      },
      {
        type: "component",
        isMandatory: true,
        component: SelectSlumName,
        texts: {
          header: "ES_NEW_APPLICATION_SLUM_NAME"
        },
        withoutLabel: true,
        key: "slum",
        hideInCitizen: true
      },
      {
        type: "component",
        route: "street",
        component: SelectStreet,
        key: "street",
        withoutLabel: true,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_ADDRESS_TEXT",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_DOOR_NO_LABEL",
          nextText: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        inputs: [
          {
            label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL",
            type: "text",
            name: "street",
            validation: {
              pattern: /^[\w\s]{1,256}$/,
            },
            error: "CORE_COMMON_STREET_INVALID",
          },
          {
            label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL",
            type: "text",
            name: "doorNo",
            validation: {
              pattern: /^[\w]([\w\/,\s])*$/,
            },
            error: "CORE_COMMON_DOOR_INVALID",
          },
        ],
        nextStep: "landmark",
      },
      {
        label: t("ES_NEW_APPLICATION_LOCATION_LANDMARK"),
        type: "component",
        route: "landmark",
        component: SelectLandmark,
        texts: {
          headerCaption: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LABEL",
          header: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TITLE",
          cardText: "CS_FILE_APPLICATION_PROPERTY_LOCATION_PROVIDE_LANDMARK_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        key: "landmark",
        inputs: [
          {
            label: "CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL",
            type: "textarea",
            name: "landmark",
            validation: {
              maxLength: 1024,
            },
          },
        ],
        nextStep: "pit-type",
      },
    ],
  },
  {
    head: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
    body: [
      {
        label: t("ES_NEW_APPLICATION_PIT_TYPE"),
        isMandatory: true,
        type: "component",
        route: "pit-type",
        key: "pitType",
        component: SelectPitType,
        texts: {
          header: "CS_FILE_PROPERTY_PIT_TYPE",
          cardText: "CS_FILE_PROPERTY_PIT_TYPE_TEXT",
          nextText: "CS_COMMON_NEXT",
        },
        nextStep: "tank-size",
      },
      {
        route: "tank-size",
        component: SelectTankSize,
        texts: {
          headerCaption: "",
          header: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TITLE",
          cardText: "CS_FILE_APPLICATION_PIT_SEPTIC_TANK_SIZE_TEXT",
          nextText: "CS_COMMON_NEXT",
          skipText: "CORE_COMMON_SKIP_CONTINUE",
        },
        type: "component",
        key: "pitDetail",
        nextStep: null,
        label: t("ES_NEW_APPLICATION_PIT_DIMENSION"),
      },
      //     {
      //       label: t("ES_NEW_APPLICATION_DISTANCE_FROM_ROAD"),
      //       type: "text",
      //       populators: {
      //         name: "distanceFromRoad",
      //       },
      //     },
      //     {
      //       label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
      //       type: "dropdown",
      //       populators: <Dropdown option={vehicleMenu} optionKey="i18nKey" id="vehicle" selected={vehicle} select={selectVehicle} t={t} />,
      //     },
      //     {
      //       label: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"),
      //       type: "text",
      //       populators: {
      //         name: "noOfTrips",
      //         error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
      //         validation: { pattern: /^[1-9]{1}$/ },
      //         defaultValue: customizationConfig && Object.keys(customizationConfig).length > 0 ? customizationConfig?.noOfTrips?.default : 1,
      //       },
      //       disable: customizationConfig ? !customizationConfig?.noOfTrips?.override : true,
      //     },
      //     {
      //       label: t("ES_NEW_APPLICATION_AMOUNT_PER_TRIP"),
      //       type: "text",
      //       populators: {
      //         name: "amountPerTrip",
      //         error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
      //         validation: { required: true, pattern: /^[1-9]\d+$/ },
      //         defaultValue: vehicle?.amount,
      //       },
      //       disable: customizationConfig ? !customizationConfig["additionalDetails.tripAmount"]?.override : true,
      //     },
      //     {
      //       label: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"),
      //       type: "text",
      //       populators: {
      //         name: "amount",
      //         validation: { required: true },
      //         defaultValue: paymentAmount,
      //       },
      //       disable: true,
      //     },
    ],
  },
  // // {
  // //   head: t(),
  // //   body: [
  // //     {
  // //       label: t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED"),
  // //       isMandatory: true,
  // //       type: "dropdown",
  // //       populators: <Dropdown option={vehicleMenu} optionKey="i18nKey" id="vehicle" selected={vehicle} select={selectVehicle} t={t} />,
  // //     },
  // //   ],
  // // },
];