import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, PitDimension, FormComposer, CheckBox, CardSubHeader, Card } from "@egovernments/digit-ui-react-components";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newConfig } from "../../../config/NewApplication/config";

export const NewApplication = ({ parentUrl, heading }) => {
  // const __initPropertyType__ = window.Digit.SessionStorage.get("propertyType");
  // const __initSubType__ = window.Digit.SessionStorage.get("subType");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId?.split(".")[0] || "pb";
  const [channel, setChannel] = useState(null);
  const [channelMenu, setChannelMenu] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const { t } = useTranslation();
  const history = useHistory();
  const customizationConfig = {};

  const [canSubmit, setSubmitValve] = useState(false);

  const applicationChannelData = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });

  const onFormValueChange = (formData) => {
    // setNoOfTrips(formData?.noOfTrips || 1);
    if (formData?.propertyType && formData?.subtype && formData?.address?.city?.code && formData?.address?.locality?.code) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  useEffect(() => {
    console.log("useEffect", { applicationChannelData });
    if (!applicationChannelData.isLoading) {
      const data = applicationChannelData.data?.map((channel) => ({
        ...channel,
        i18nKey: `ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${channel.code}`,
      }));

      setChannelMenu(data);
    }
  }, [applicationChannelData]);

  function selectChannel(value) {
    setChannel(value);
  }
  function selectVehicle(value) {
    setVehicle(value);
    // setPaymentAmount(noOfTrips * value.amount);
  }

  // useEffect(() => {
  //   (async () => {
  //     if (propertyType && subType && vehicle) {
  //       setSubmitValve(false);
  //       const { capacity } = vehicle;
  //       const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, { propertyType: subType.key, capacity, slum: "YES" });

  //       const billSlab = billingDetails?.billingSlab?.length && billingDetails?.billingSlab[0];
  //       if (billSlab?.price) {
  //         setAmountPerTrip(billSlab.price);
  //       }
  //       setSubmitValve(true);
  //     }
  //   })();
  // }, [propertyType, subType, vehicle]);

  const onSubmit = (data) => {
    const applicationChannel = data?.applicationChannel;
    const sanitationtype = data.sanitationtype;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data.pincode;
    const street = data?.street?.streetName;
    const doorNo = data?.street?.doorNo;
    const landmark = data.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amountPerTrip;
    const cityCode = data?.complaint?.city_complaint?.code;
    const city = data?.city_complaint?.city.name;
    const state = "Punjab";
    const localityCode = data?.complaint?.locality_complaint?.code;
    const localityName = data?.complaint?.locality_complaint?.name;
    const { name } = subType;
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
        propertyUsage: data?.subType,
        vehicleType: vehicle?.code,
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
            code: localityCode?.split("_").pop(),
            name: localityName,
          },
          geoLocation: {
            latitude: selectedLocality?.latitude,
            longitude: selectedLocality?.longitude,
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

  // Employee Items
  const itemsAtStart = {
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
    ],
  };

  const itemsAtLast = {
    head: "",
    body: [
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
          // defaultValue: customizationConfig && Object.keys(customizationConfig).length > 0 ? customizationConfig?.noOfTrips?.default : 1,
        },
        disable: customizationConfig ? !customizationConfig?.noOfTrips?.override : true,
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
        disable: customizationConfig ? !customizationConfig["additionalDetails.tripAmount"]?.override : true,
      },
      {
        label: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"),
        type: "text",
        populators: {
          name: "amount",
          validation: { required: true },
          defaultValue: paymentAmount,
        },
        disable: true,
      },
    ],
  };

  const configs = [itemsAtStart, ...newConfig, itemsAtLast];

  return (
    <FormComposer
      heading={t("ES_TITLE_NEW_DESULDGING_APPLICATION")}
      isDisabled={!canSubmit}
      label={t("ES_COMMON_APPLICATION_SUBMIT")}
      config={configs.map((config) => {
        return {
          ...config,
          body: config.body.filter((a) => !a.hideInEmployee),
        };
      })}
      fieldStyle={{ marginRight: 0 }}
      onSubmit={onSubmit}
      onFormValueChange={onFormValueChange}
    />
  );
};
