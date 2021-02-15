import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailsCard, TextInput, ActionBar, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const config = {
  select: (data) => {
    return data.vehicleTrip[0];
  },
};

const FstpOperatorDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let { id: applicationNos } = useParams();
  const [filters, setFilters] = useState({ applicationNos });
  const [isVehicleSearchCompleted, setIsVehicleSearchCompleted] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const selectTripData = (data) => {
    return data.map((trip) => ({
      [t("CS_FILE_DESLUDGING_APPLICATION_NO")]: trip.applicationNo,
      [t("ES_INBOX_LOCALITY")]: t(`${trip?.tenantId?.toUpperCase()?.split(".")?.join("_")}_ADMIN_${trip?.address?.locality?.code}`),
      [t("ES_USAGE")]: t(trip.propertyUsage),
      [t("ES_WASTE_RECIEVED")]: trip.wasteCollected,
    }));
  };

  const { isLoading, isSuccess, data: vehicle } = Digit.Hooks.fsm.useVehicleSearch({ tenantId, filters, config });
  const { isLoading: isSearchLoading, data: tripDetails } = Digit.Hooks.fsm.useSearchAll(tenantId, searchParams, null, {
    enabled: !!isVehicleSearchCompleted,
    select: selectTripData,
  });

  useEffect(() => {
    if (isSuccess) {
      const applicationNos = vehicle.tripDetails.map((tripData) => tripData.referenceNo).join(",");
      setSearchParams({ applicationNos });
      setIsVehicleSearchCompleted(true);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  const vehicleData = [
    {
      [t("ES_INBOX_VEHICLE_LOG")]: vehicle.applicationNo,
      [[t("ES_INBOX_DSO_NAME")]]: vehicle.tripOwner.name,
      [t("ES_INBOX_VEHICLE_NO")]: vehicle.vehicle.registrationNumber,
      [t("ES_VEHICLE CAPACITY")]: vehicle.vehicle.tankCapacity,
      [t("ES_VEHICLE_WASTE_COLLECTED")]: vehicle.volumeCarried,
      [t("ES_VEHICLE_WASTE_RECIEVED")]: <TextInput />,
      [t("ES_COMMON_TIME")]: <TextInput type="time" />,
    },
  ];

  return (
    <div>
      <DetailsCard data={vehicleData} />
      <h2 style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "8px", marginTop: "16px" }}>{t("ES_FSTP_OPERATOR_DETAILS_WASTE_GENERATORS")}</h2>
      {isSearchLoading ? <Loader /> : <DetailsCard data={tripDetails} />}
      <ActionBar>
        <SubmitBar label={t("ES_COMMON_SUBMIT")} submit />
      </ActionBar>
    </div>
  );
};

export default FstpOperatorDetails;
