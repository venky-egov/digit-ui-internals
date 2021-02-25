import React, { useState } from "react";
import { newConfig } from "../../../config/NewApplication/config";
import { useHistory } from "react-router-dom";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import TripDetails from "../configs/TripDetails";
import ApplicantDetails from "../configs/ApplicantDetails";

const EditForm = ({ tenantId, applicationData, channelMenu, vehicleMenu, sanitationMenu }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [vehicle, setVehicle] = useState(applicationData.vehicleType || null);
  const [canSubmit, setSubmitValve] = useState(false);
  const [channel, setChannel] = useState(() => channelMenu.filter((channel) => channel.code === applicationData.source)[0]);
  const [kill, setKill] = useState(false);

  function selectVehicle(data) {
    setVehicle(data);
    setKill(false);
  }

  const defaultValues = {
    applicantName: applicationData.citizen.name,
    mobileNumber: applicationData.citizen.mobileNumber,
    noOfTrips: applicationData.noOfTrips,
    amountPerTrip: applicationData.additionalDetails.tripAmount,
    amount: applicationData.noOfTrips * applicationData.additionalDetails.tripAmount,
    propertyType: applicationData.propertyUsage.split(".")[0],
    subtype: applicationData.propertyUsage,
    address: {
      pincode: applicationData.address.pincode,
      locality: {
        ...applicationData.address.locality,
        code: `${applicationData.tenantId.toUpperCase().split(".").join("_")}_ADMIN_${applicationData.address.locality.code}`,
      },
      slum: applicationData.address.slumName,
      street: applicationData.address.street,
      doorNo: applicationData.address.doorNo,
      landmark: applicationData.address.landmark,
    },
    pitType: sanitationMenu.filter((type) => type.code === applicationData.sanitationtype)[0],
    pitDetail: applicationData.pitDetail,
  };

  const onFormValueChange = (setValue, formData) => {
    // setNoOfTrips(formData?.noOfTrips || 1);

    (async () => {
      // console.log("abcd1",vehicle, formData?.propertyType , formData?.subtype)

      if (formData?.propertyType && formData?.subtype && formData?.address && vehicle?.code && !kill) {
        const { capacity } = vehicle;
        // console.log("find bill slab form data", formData)
        const { slum: slumDetails } = formData.address;
        const slum = slumDetails ? "YES" : "NO";
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: formData?.subtype,
          capacity,
          slum,
        });

        const billSlab = billingDetails?.billingSlab?.length && billingDetails?.billingSlab[0];
        if (billSlab?.price) {
          setKill(true);
          console.log("find bill slab here", billSlab.price);
          setValue("amountPerTrip", billSlab.price);
          setValue("amount", billSlab.price * formData.noOfTrips);
        }
      }
    })();
    // console.log("abcd2",vehicle, formData?.propertyType , formData?.subtype)

    console.log("find form data here", formData);
    if (formData?.propertyType && formData?.subtype && formData?.address?.locality?.code) {
      setSubmitValve(true);
    } else {
      setSubmitValve(false);
    }
  };

  // useEffect(() => {
  //   (async () => {

  //   })();
  // }, [propertyType, subType, vehicle]);

  const onSubmit = (data) => {
    console.log("find submit data", data);
    const applicationChannel = channel;
    const sanitationtype = data.pitType.code;
    const pitDimension = data?.pitDetail;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data?.address?.pincode;
    const street = data?.address?.street;
    const doorNo = data?.address?.doorNo;
    const slum = data?.address?.slum;
    const landmark = data?.address?.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amountPerTrip;
    const cityCode = data?.address?.city?.code;
    const city = data?.address?.city?.name;
    const state = data?.address?.city?.state;
    const localityCode = data?.address?.locality?.code;
    const localityName = data?.address?.locality?.name;
    const propertyUsage = data?.subtype;
    const { height, length, width } = pitDimension;

    const formData = {
      ...applicationData,
      sanitationtype: sanitationtype,
      source: applicationChannel.code,
      additionalDetails: {
        ...applicationData.additionalDetails,
        tripAmount: amount,
      },
      propertyUsage,
      vehicleType: vehicle.code,
      noOfTrips,
      pitDetail: {
        ...applicationData.pitDetail,
        distanceFromRoad: data.distanceFromRoad,
        height,
        length,
        width,
      },
      address: {
        ...applicationData.address,
        tenantId: cityCode,
        landmark,
        doorNo,
        street,
        city,
        state,
        pincode,
        slumName: slum,
        locality: {
          ...applicationData.address.locality,
          code: localityCode.split("_").pop(),
          name: localityName,
        },
        geoLocation: {
          ...applicationData.address.geoLocation,
          latitude: data?.address?.latitude,
          longitude: data?.address?.longitude,
        },
      },
    };
    delete formData["responseInfo"];

    window.Digit.SessionStorage.set("propertyType", null);
    window.Digit.SessionStorage.set("subType", null);
    Digit.SessionStorage.set("city_property", null);
    Digit.SessionStorage.set("selected_localities", null);
    Digit.SessionStorage.set("locality_property", null);
    // console.log("find form data here", formData);
    history.push("/digit-ui/employee/fsm/response", {
      applicationData: formData,
      key: "update",
      action: "SUBMIT",
    });
  };

  const configs = [ApplicantDetails(channelMenu, channel, setChannel), ...newConfig, TripDetails(vehicleMenu, vehicle, selectVehicle)];

  return (
    <FormComposer
      heading={t("ES_TITLE_MODIFY_DESULDGING_APPLICATION")}
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
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
  );
};

export default EditForm;
