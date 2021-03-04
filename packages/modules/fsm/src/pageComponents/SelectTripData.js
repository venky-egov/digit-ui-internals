import React, { useEffect, useState } from "react";
import { getVehicleType } from "../utils";
import { LabelFieldPair, CardLabel, TextInput, Dropdown } from "@egovernments/digit-ui-react-components";

const SelectTripData = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId?.split(".")[0] || "pb";

  const [vehicle, setVehicle] = useState(null);
  const [kill, setKill] = useState(false);

  const { isLoading: isVehicleMenuLoading, data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });

  const inputs = [
    {
      label: "ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS",
      name: "noOfTrips",
      error: t("ES_NEW_APPLICATION_NO_OF_TRIPS_INVALID"),
      validation: { required: true },
      default: formData?.tripData?.noOfTrips,
      disable: true,
      isMandatory: true,
    },
    {
      label: "ES_NEW_APPLICATION_AMOUNT_PER_TRIP",
      name: "amountPerTrip",
      error: t("ES_NEW_APPLICATION_AMOUNT_INVALID"),
      validation: { required: true },
      default: formData?.tripData?.amountPerTrip,
      disable: true,
      isMandatory: true,
    },
    {
      label: "ES_PAYMENT_DETAILS_TOTAL_AMOUNT",
      name: "amount",
      validation: { required: true },
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

  function setValue(value, input) {
    onSelect(config.key, { ...formData[config.key], [input]: value });
    console.log("find value here", value, input, formData);
  }
  useEffect(() => {
    // setNoOfTrips(formData?.noOfTrips || 1);
    (async () => {
      // console.log("abcd1",vehicle, formData?.propertyType , formData?.subtype)

      if (formData?.propertyType && formData?.subtype && formData?.address && formData?.tripData?.vehicleType?.code && !kill) {
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
          setKill(true);
          console.log("find bill slab here", billSlab.price);
          setValue(billSlab.price, "amountPerTrip");
          setValue(billSlab.price * formData.tripData.noOfTrips, "amount");
          // console.log("find formdata here", formData);
        }
      }
    })();
    // console.log("abcd2",vehicle, formData?.propertyType , formData?.subtype)

    // console.log("find form data here helllo", formData);
  }, [formData]);

  return (
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
      {inputs?.map((input) => (
        <LabelFieldPair>
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
    </div>
  );
};

export default SelectTripData;
