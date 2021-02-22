import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormComposer } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import { newConfig } from "../../../config/NewApplication/config";
import TripDetails from "../configs/TripDetails";
import ApplicantDetails from "../configs/ApplicantDetails";

export const EditApplication = ({ parentUrl, heading }) => {
  // const __initPropertyType__ = window.Digit.SessionStorage.get("propertyType");
  // const __initSubType__ = window.Digit.SessionStorage.get("subType");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId?.split(".")[0] || "pb";

  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  const { data: channelMenu } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");

  const { t } = useTranslation();
  const history = useHistory();

  const [vehicle, setVehicle] = useState();
  const [canSubmit, setSubmitValve] = useState(false);
  const [channel, setChannel] = useState(null);

  const defaultValues = {
    noOfTrips: 1,
  };
  const [kill, setKill] = useState(false);

  const onFormValueChange = (setValue, formData) => {
    // setNoOfTrips(formData?.noOfTrips || 1);
    (async () => {

      if (formData?.propertyType && formData?.subtype && vehicle?.code && !kill) {
        const { capacity } = vehicle;
        const billingDetails = await Digit.FSMService.billingSlabSearch(tenantId, {
          propertyType: formData?.subtype.key,
          capacity,
          slum: "YES",
        });

        const billSlab = billingDetails?.billingSlab?.length && billingDetails?.billingSlab[0];
        if (billSlab?.price) {
          setKill(true);
          setValue("amountPerTrip", billSlab.price);
          setValue("amount", billSlab.price * formData.noOfTrips);
        }
      }
    })();
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
    const applicationChannel = channel;
    const sanitationtype = data.pitType.code;
    const pitDimension = data?.pitDetail;
    const applicantName = data.applicantName;
    const mobileNumber = data.mobileNumber;
    const pincode = data?.address?.pincode;
    const street = data?.address?.street;
    const doorNo = data?.address?.doorNo;
    const landmark = data?.address?.landmark;
    const noOfTrips = data.noOfTrips;
    const amount = data.amountPerTrip;
    const cityCode = data?.address?.city?.code;
    const city = data?.address?.city?.name;
    const state = data?.address?.city?.state;
    const localityCode = data?.address?.locality?.code;
    const localityName = data?.address?.locality?.name;
    const formData = {
      fsm: {
        citizen: {
          name: applicantName,
          mobileNumber,
        },
        tenantId: cityCode,
        sanitationtype: sanitationtype,
        source: applicationChannel.code,
        additionalDetails: {
          tripAmount: amount,
        },
        propertyUsage: data?.subtype,
        vehicleType: vehicle?.code,
        pitDetail: {
          ...pitDimension,
          distanceFromRoad: data?.distanceFromRoad,
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
            latitude: data?.address?.latitude,
            longitude: data?.address?.longitude,
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
    history.push("/digit-ui/employee/fsm/response", formData);
  };

  const configs = [ApplicantDetails(channelMenu, channel, setChannel), ...newConfig, TripDetails(vehicleMenu, vehicle, setVehicle)];

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
      defaultValues={defaultValues}
      onFormValueChange={onFormValueChange}
    />
  );
};
