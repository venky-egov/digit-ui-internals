import { FSMService } from "../../elements/FSM";

const ApplicationUpdateActions = async (applicationDetails, action, tenantId) => {
  const data = {
    fsm: applicationDetails,
    workflow: {
      action: action,
    },
  };

  return await FSMService.update(data, tenantId);
};

export default ApplicationUpdateActions;
