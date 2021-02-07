import { FSMService } from "../../elements/FSM";

const ApplicationUpdateActions = async (applicationData, action, tenantId) => {
  // console.log("find application update action here", applicationData, action, tenantId)
  const data = {
    fsm: applicationData,
    workflow: {
      action: action,
    },
  };

  return await FSMService.update(data, tenantId);
};

export default ApplicationUpdateActions;
