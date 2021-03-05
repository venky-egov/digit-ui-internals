import { Loader, Modal, FormComposer } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";

import { configAssignDso, configCompleteApplication, configReassignDSO, configAcceptDso, configRejectApplication } from "../config";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

const ActionModal = ({ t, action, tenantId, state, id, closeModal, submitAction }) => {
  const { data: dsoData, isLoading: isDsoLoading, isSuccess: isDsoSuccess, error: dsoError } = Digit.Hooks.fsm.useDsoSearch(tenantId);
  const { isLoading, isSuccess, isError, data: applicationData, error } = Digit.Hooks.fsm.useSearch(
    tenantId,
    { applicationNos: id },
    {
      staleTime: Infinity,
      select: (details) => {
        let { additionalDetails } = details;

        const parseTillObject = (str) => {
          if (typeof str === "object") return str;
          else return parseTillObject(JSON.parse(str));
        };

        additionalDetails = parseTillObject(additionalDetails);
        return { ...details, additionalDetails };
      },
    }
  );
  // console.log("find application details here", applicationData)
  const client = useQueryClient();
  const stateCode = tenantId.split(".")[0];
  const { data: vehicleList, isLoading: isVehicleData, isSuccess: isVehicleDataLoaded } = Digit.Hooks.fsm.useMDMS(
    stateCode,
    "Vehicle",
    "VehicleType",
    { staleTime: Infinity }
  );
  const [dsoList, setDsoList] = useState([]);
  const [vehicleNoList, setVehicleNoList] = useState([]);
  const [config, setConfig] = useState({});
  const [dso, setDSO] = useState(null);
  const [vehicleNo, setVehicleNo] = useState(null);
  const [vehicleMenu, setVehicleMenu] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [rejectMenu, setRejectMenu] = useState([
    { code: "ES_FSM_REJECTION_OPTION_A", name: "Vehicle under maintenance" },
    { code: "ES_FSM_REJECTION_OPTION_B", name: "Cannot service within provided service date, multiple request in pipeline" },
  ]);
  const [reassignReasonMenu, setReassignReasonMenu] = useState([
    "ES_FSM_REASSIGN_OPTION_A",
    "ES_FSM_REASSIGN_OPTION_B",
    "ES_FSM_REASSIGN_OPTION_C",
    "ES_FSM_REASSIGN_OPTION_D",
  ]);
  const [rejectionReason, setReason] = useState(null);
  const [reassignReason, selectReassignReason] = useState(null);
  const [formValve, setFormValve] = useState(false);

  useEffect(() => {
    if (isSuccess && isVehicleDataLoaded) {
      const [vehicle] = vehicleList.filter((item) => item.code === applicationData.vehicleType);
      setVehicleMenu([vehicle]);
      setVehicle(vehicle);
    }
  }, [isVehicleDataLoaded, isSuccess]);

  useEffect(() => {
    if (vehicle && isDsoSuccess) {
      const dsoList = dsoData.filter((dso) => dso.vehicles.find((dsoVehicle) => dsoVehicle.type === vehicle.code));
      setDsoList(dsoList);
    }
  }, [vehicle, isDsoSuccess]);

  useEffect(() => {
    if (isSuccess && isDsoSuccess && applicationData.dsoId) {
      const [dso] = dsoData.filter((dso) => dso.id === applicationData.dsoId);
      const vehicleNoList = dso.vehicles.filter((vehicle) => vehicle.type === applicationData.vehicleType);
      setVehicleNoList(vehicleNoList);
    }
  }, [isSuccess, isDsoSuccess]);

  function selectDSO(dsoDetails) {
    // console.log("find dso details here", dsoDetails);
    setDSO(dsoDetails);
    // setVehicleMenu(dsoDetails.vehicles);
  }

  function selectVehicleNo(vehicleNo) {
    setVehicleNo(vehicleNo);
  }

  function selectVehicle(value) {
    // console.log("find vehicle details here", value)
    setVehicle(value);
  }

  function selectReason(value) {
    setReason(value);
  }

  function submit(data) {
    // console.log("find submit here",data);
    const workflow = { action: action };

    if (dso) applicationData.dsoId = dso.id;
    if (vehicleNo && action === "ACCEPT") applicationData.vehicleId = vehicleNo.id;
    if (vehicleNo && action === "DSO_ACCEPT") applicationData.vehicleId = vehicleNo.id;
    if (vehicle && action === "ASSIGN") applicationData.vehicleType = vehicle.code;
    if (data.date) applicationData.possibleServiceDate = new Date(`${data.date}`).getTime();
    if (data.wasteCollected) applicationData.wasteCollected = data.wasteCollected;

    if (rejectionReason) workflow.comments = rejectionReason.code;

    submitAction({ fsm: applicationData, workflow });
  }

  let defaultValues = { capacity: vehicle?.capacity };

  useEffect(() => {
    switch (action) {
      case "DSO_ACCEPT":
      case "ACCEPT":
        //TODO: add accept UI
        setFormValve(vehicleNo ? true : false);
        return setConfig(
          configAcceptDso({
            t,
            dsoData,
            dso,
            vehicle,
            vehicleNo,
            vehicleNoList,
            selectVehicleNo,
          })
        );

      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
        // console.log("find vehicle menu here", vehicleMenu)
        setFormValve(dso && vehicle ? true : false);
        return setConfig(
          configAssignDso({
            t,
            dsoData,
            dso,
            selectDSO,
            vehicleMenu,
            vehicle,
            selectVehicle,
          })
        );
      case "REASSIGN":
        setFormValve(dso && vehicle ? true : false);
        return setConfig(
          configReassignDSO({
            t,
            dsoData,
            dso,
            selectDSO,
            vehicleMenu,
            vehicle,
            selectVehicle,
            reassignReasonMenu,
            reassignReason,
            selectReassignReason,
          })
        );
      case "COMPLETE":
      case "COMPLETED":
        setFormValve(true);
        defaultValues = { capacity: vehicle?.capacity };
        return setConfig(configCompleteApplication({ t, vehicle, applicationCreatedTime: applicationData?.auditDetails?.createdTime }));
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "CANCEL":
      case "DECLINE":
      case "SENDBACK":
      case "DSO_REJECT":
      case "REJECT":
        setFormValve(rejectionReason ? true : false);
        return setConfig(
          configRejectApplication({
            t,
            rejectMenu,
            selectReason,
            rejectionReason,
            action,
          })
        );

      case "PAY":
      case "ADDITIONAL_PAY_REQUEST":
      case "FSM_PAY":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      default:
        console.log("default case");
        break;
    }
  }, [action, isDsoLoading, dso, vehicleMenu, rejectionReason, vehicleNo, vehicleNoList]);

  return action && config.form && !isDsoLoading ? (
    <Modal
      headerBarMain={<Heading label={t(config.label.heading)} />}
      headerBarEnd={<CloseBtn onClick={closeModal} />}
      actionCancelLabel={t(config.label.cancel)}
      actionCancelOnSubmit={closeModal}
      actionSaveLabel={t(config.label.submit)}
      actionSaveOnSubmit={() => {}}
      formId="modal-action"
      isDisabled={!formValve}
    >
      <FormComposer
        config={config.form}
        noBoxShadow
        inline
        childrenAtTheBottom
        onSubmit={submit}
        defaultValues={defaultValues}
        formId="modal-action"
      />
    </Modal>
  ) : (
    <Loader />
  );
};

export default ActionModal;
