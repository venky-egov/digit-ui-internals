import React, { useEffect, useState } from "react";
import { getVehicleType } from "../utils";
import { LabelFieldPair, CardLabel, TextInput, Dropdown, Loader, CardLabelError } from "@egovernments/digit-ui-react-components";

const SelectTripData = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId?.split(".")[0] || "pb";

  const [vehicle, setVehicle] = useState(formData?.tripData?.vehicleType);
  const [billError, setError] = useState(false);

  const { isLoading: isVehicleMenuLoading, data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });

  const inputs = [
    {
      label: "ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS",
      type: "text",
      name: "noOfTrips",
      error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
      validation: {
        isRequired: true,
      },
      default: formData?.tripData?.noOfTrips,
      disable: true,
      isMandatory: true,
    },
    {
      label: "ES_NEW_APPLICATION_AMOUNT_PER_TRIP",
      type: "text",
      name: "amountPerTrip",
      error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
      validation: {
        isRequired: true,
        pattern: "[0-9]{1,10}",
        title: t("ES_APPLICATION_BILL_SLAB_ERROR"),
      },
      default: formData?.tripData?.amountPerTrip,
      disable: true,
      isMandatory: true,
    },
    {
      label: "ES_PAYMENT_DETAILS_TOTAL_AMOUNT",
      type: "text",
      name: "amount",
      validation: {
        isRequired: true,
        title: t("ES_APPLICATION_BILL_SLAB_ERROR"),
      },
      default: formData?.tripData?.amount,
      disable: true,
      isMandatory: true,
    },
  ];

  function selectVehicle(value) {
    setVehicle(value);
    onSelect(config.key, { ...formData[config.key], vehicleType: value });
    console.log("find value here", value, formData);
  }

  function setValue(object) {
    onSelect(config.key, { ...formData[config.key], ...object });
    // console.log("find value here", formData);
  }
  useEffect(() => {
    (async () => {
      // console.log("abcd1",vehicle, formData?.propertyType , formData?.subtype)

      if (formData?.tripData?.vehicleType !== vehicle) {
        setVehicle(formData?.tripData?.vehicleType);
      }

      if (formData?.propertyType && formData?.subtype && formData?.address && formData?.tripData?.vehicleType?.code) {
        const { capacity } = formData?.tripData?.vehicleType;
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
          console.log("find bill slab here", billSlab.price);
          setValue({
            amountPerTrip: billSlab.price,
            amount: billSlab.price * formData.tripData.noOfTrips,
          });
          // console.log("find formdata here", formData);
        } else {
          setError(true);
        }
      }
    })();
    // console.log("find form data here helllo", formData);
  }, [formData?.propertyType, formData?.subtype, formData?.address, formData?.tripData?.vehicleType?.code]);

  return isVehicleMenuLoading ? (
    <Loader />
  ) : (
    <div>
      <LabelFieldPair>
        <CardLabel style={{ marginBottom: "revert", width: "30%" }}>{t("ES_NEW_APPLICATION_LOCATION_VEHICLE_REQUESTED") + " * "}</CardLabel>
        <Dropdown
          className="field"
          style={{ width: "50%" }}
          isMandatory
          option={vehicleMenu?.map((vehicle) => ({ ...vehicle, label: getVehicleType(vehicle, t) }))}
          optionKey="label"
          id="vehicle"
          selected={vehicle}
          select={selectVehicle}
          t={t}
        />
      </LabelFieldPair>
      {inputs?.map((input, index) => (
        <LabelFieldPair key={index}>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t(input.label)}
            {input.isMandatory ? " * " : null}
          </CardLabel>
          <div className="field">
            <TextInput
              key={input.name}
              value={input.default ? input.default : formData && formData[config.key] ? formData[config.key][input.name] : null}
              {...input.validation}
              disable={input.disable}
            />
          </div>
        </LabelFieldPair>
      ))}
      {billError ? <CardLabelError>{t("ES_APPLICATION_BILL_SLAB_ERROR")}</CardLabelError> : null}
    </div>
  );
};

export default SelectTripData;
