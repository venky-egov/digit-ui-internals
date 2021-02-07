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

const ActionModal = ({ t, action, tenantId, state, closeModal, submitAction }) => {
  const { data: dsoData, isLoading: isDsoLoading, error: dsoError } = Digit.Hooks.fsm.useDsoSearch(tenantId);
  const { data: vehicleMenu, isLoading: isVehicleData } = Digit.Hooks.fsm.useMDMS(state, "FSM", "VehicleType", { staleTime: Infinity });

  const [config, setConfig] = useState({});
  const [dso, selectDSO] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  function selectVehicle(value) {
    setVehicle(value);
  }

  useEffect(() => {
    switch (action) {
      case "DSO_ACCEPT":
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
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
        return setConfig(
          configReassignDSO({
            t,
            dsoData,
            dso,
            selectDSO,
            vehicleMenu,
            vehicle,
            selectVehicle,
          })
        );
      case "COMPLETE":
        return setConfig(configCompleteApplication({ t }));
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "CANCEL":
      case "SENDBACK":
        return setConfig(
          configRejectApplication({
            t,
            vehicleMenu,
            vehicle,
            selectVehicle,
          })
        );
      case "PAY":
      case "FSM_PAY":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      default:
        console.log("default case");
        break;
    }
  }, [action]);
  return action && config.form && !isDsoLoading && !isVehicleData ? (
    <Modal
      headerBarMain={<Heading label={t(config.label.heading)} />}
      headerBarEnd={<CloseBtn onClick={closeModal} />}
      actionCancelLabel={t(config.label.cancel)}
      actionCancelOnSubmit={closeModal}
      actionSaveLabel={t(config.label.submit)}
      actionSaveOnSubmit={() => {}}
    >
      <FormComposer config={config.form} noBoxShadow inline childrenAtTheBottom onSubmit={submitAction} />
    </Modal>
  ) : (
    <Loader />
  );
};

export default ActionModal;
