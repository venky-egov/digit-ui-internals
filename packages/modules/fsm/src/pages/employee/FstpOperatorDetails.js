import React, { Fragment, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TimePicker from "react-time-picker";
import {
  Card,
  CardLabel,
  DetailsCard,
  TextInput,
  ActionBar,
  SubmitBar,
  Loader,
  Toast,
  StatusTable,
  Row,
  LabelFieldPair,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

const config = {
  select: (data) => {
    return data.vehicleTrip[0];
  },
};

const FstpOperatorDetails = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  let { id: applicationNos } = useParams();
  const [filters, setFilters] = useState({ applicationNos });
  const [isVehicleSearchCompleted, setIsVehicleSearchCompleted] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [showToast, setShowToast] = useState(null);
  const [wasteCollected, setWasteCollected] = useState(null);
  const [tripTime, setTripTime] = useState(null);

  const { isLoading, isSuccess, data: vehicle } = Digit.Hooks.fsm.useVehicleSearch({ tenantId, filters, config });
  const { isLoading: isSearchLoading, isIdle, data: tripDetails } = Digit.Hooks.fsm.useSearchAll(tenantId, searchParams, null, {
    enabled: !!isVehicleSearchCompleted,
  });

  const mutation = Digit.Hooks.fsm.useVehicleUpdate(tenantId);

  useEffect(() => {
    if (isSuccess) {
      const applicationNos = vehicle.tripDetails.map((tripData) => tripData.referenceNo).join(",");
      setSearchParams({ applicationNos });
      setIsVehicleSearchCompleted(true);
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    if (!tripTime || !wasteCollected) {
      return;
    }
    const d = new Date();
    const timeStamp = Date.parse(new Date(d.toString().split(":")[0].slice(0, -2) + tripTime)) / 1000;
    vehicle.tripEndTime = timeStamp;
    vehicle.volumeCarried = wasteCollected;
    const details = {
      vehicleTrip: vehicle,
      workflow: {
        action: "DISPOSE",
      },
    };

    mutation.mutate(details, {
      onSuccess: handleSuccess,
    });
  };

  const closeToast = () => {
    setShowToast(null);
  };

  const handleSuccess = () => {
    /* Show Toast on success */
    queryClient.invalidateQueries("FSM_VEHICLE_DATA");
    setShowToast({ key: "success", action: `ES_FSM_DISPOSE_UPDATE_SUCCESS` });
    setTimeout(() => {
      closeToast();
      history.push(`/digit-ui/employee/fsm/fstp-inbox`);
    }, 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tripTime") {
      setTripTime(value);
    } else if (name === "wasteRecieved") {
      setWasteCollected(value);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const vehicleData = [
    {
      title: t("ES_INBOX_VEHICLE_LOG"),
      value: vehicle.applicationNo,
    },
    {
      title: t("ES_INBOX_DSO_NAME"),
      value: vehicle.tripOwner.name,
    },
    {
      title: t("ES_INBOX_VEHICLE_NO"),
      value: vehicle.vehicle.registrationNumber,
    },
    {
      title: `${t("ES_VEHICLE CAPACITY")} (ltrs)`,
      value: vehicle.vehicle.tankCapacity,
    },
  ];

  return (
    <div>
      <Card>
        <StatusTable>
          {vehicleData.map((row, index) => (
            <Row key={row.title} label={row.title} text={row.value || "N/A"} last={index === vehicleData.length - 1} />
          ))}
          <LabelFieldPair>
            <CardLabel>{t("ES_VEHICLE_WASTE_RECIEVED")}</CardLabel>
            <div className="field-container">
              <TextInput name="wasteRecieved" value={wasteCollected} onChange={handleChange} />
            </div>
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>{t("ES_COMMON_TIME")}</CardLabel>
            <div>
              <TimePicker name="tripTime" onChange={setTripTime} value={tripTime} locale="en-US" />
            </div>
          </LabelFieldPair>
        </StatusTable>
      </Card>
      <h2 style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "8px", marginTop: "16px" }}>{t("ES_FSTP_OPERATOR_DETAILS_WASTE_GENERATORS")}</h2>
      {isSearchLoading || isIdle ? (
        <Loader />
      ) : (
        <Card>
          <StatusTable>
            {tripDetails.map((trip, index) => {
              return (
                <>
                  <Row key={index} label={t("CS_FILE_DESLUDGING_APPLICATION_NO")} text={trip.applicationNo} />
                  <Row
                    key={index}
                    label={t("ES_INBOX_LOCALITY")}
                    text={t(`${trip?.tenantId?.toUpperCase()?.split(".")?.join("_")}_ADMIN_${trip?.address?.locality?.code}`)}
                  />
                  <Row key={index} label={t("ES_USAGE")} text={t(`PROPERTYTYPE_MASTERS_${trip.propertyUsage}`)} />
                  <Row key={index} label={t("ES_WASTE_RECIEVED")} text={vehicle.tripDetails[index].volume} />
                </>
              );
            })}
          </StatusTable>
        </Card>
      )}
      {showToast && (
        <Toast
          error={showToast.key === "error" ? true : false}
          label={t(showToast.key === "success" ? showToast.action : `ES_FSM_DISPOSE_UPDATE_FAILURE`)}
          onClose={closeToast}
        />
      )}
      <ActionBar>
        <SubmitBar label={t("ES_COMMON_SUBMIT")} submit onSubmit={handleSubmit} />
      </ActionBar>
    </div>
  );
};

export default FstpOperatorDetails;
