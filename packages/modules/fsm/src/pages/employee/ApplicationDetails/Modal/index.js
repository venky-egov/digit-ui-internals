import { Loader, Modal, FormComposer } from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";

import { configAssignDso, configCompleteApplication, configReassignDSO, configRejectApplication } from "../config";

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
  const { data: dsoData, isLoading: isDsoLoading, error: dsoError } = Digit.Hooks.fsm.useDsoSearch(tenantId);
  const { isLoading, isError, data: applicationData, error } = Digit.Hooks.fsm.useSearch(tenantId, { applicationNos: id }, { staleTime: Infinity });
  // console.log("find application details here", applicationData)
  // const { data: vehicleMenu, isLoading: isVehicleData } = Digit.Hooks.fsm.useMDMS(state, "FSM", "VehicleType", { staleTime: Infinity });

  const [config, setConfig] = useState({});
  const [dso, setDSO] = useState(null);
  const [vehicleMenu, setVehicleMenu] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [rejectMenu, setRejectMenu] = useState([
    "ES_FSM_REJECTION_OPTION_A",
    "ES_FSM_REJECTION_OPTION_B",
    "ES_FSM_REJECTION_OPTION_C",
    "ES_FSM_REJECTION_OPTION_D",
  ]);
  const [reassignReasonMenu, setReassignReasonMenu] = useState([
    "ES_FSM_REASSIGN_OPTION_A",
    "ES_FSM_REASSIGN_OPTION_B",
    "ES_FSM_REASSIGN_OPTION_C",
    "ES_FSM_REASSIGN_OPTION_D",
  ]);
  const [rejectionReason, selectReason] = useState(null);
  const [reassignReason, selectReassignReason] = useState(null);
  const [formValve, setFormValve] = useState(false);

  function selectDSO(dsoDetails) {
    // console.log("find dso details here", dsoDetails);
    setDSO(dsoDetails);
    setVehicleMenu(dsoDetails.vehicles);
  }

  function selectVehicle(value) {
    // console.log("find vehicle details here", value)
    setVehicle(value);
  }

  function submit(data) {
    // console.log("find submit here",data);
    const workflow = { action: action };

    if (dso) applicationData.dsoId = dso.id;
    if (vehicle) applicationData.vehicleId = vehicle.id;
    if (vehicle) applicationData.vehicleType = vehicle.type;
    if (data.date) applicationData.possibleServiceDate = new Date(data.date).getTime();

    if (rejectionReason) workflow.comments = rejectionReason;

    submitAction({ fsm: applicationData, workflow });
  }

  useEffect(() => {
    switch (action) {
      case "DSO_ACCEPT":
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
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
        setFormValve(true);
        return setConfig(configCompleteApplication({ t }));
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "CANCEL":
      case "SENDBACK":
      case "REJECT":
        setFormValve(rejectionReason ? true : false);
        return setConfig(
          configRejectApplication({
            t,
            rejectMenu,
            rejectionReason,
            selectReason,
          })
        );
      case "PAY":
      case "FSM_PAY":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      default:
        console.log("default case");
        break;
    }
  }, [action, isDsoLoading, dso, vehicle, rejectionReason]);
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
      <FormComposer config={config.form} noBoxShadow inline childrenAtTheBottom onSubmit={submit} formId="modal-action" />
    </Modal>
  ) : (
    <Loader />
  );
};

export default ActionModal;
