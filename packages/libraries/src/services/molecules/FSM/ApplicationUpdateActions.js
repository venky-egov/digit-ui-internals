import { FSMService } from "../../elements/FSM";

const ApplicationUpdateActions = async (applicationData, tenantId) => {
  // console.log("find application update action here", applicationData, action, tenantId)
  try {
    const response = await FSMService.update(applicationData, tenantId);
    return response;
  } catch (error) {
    // console.log("find me here", error.response.data.Errors[0].message)
    throw new Error(error.response.data.Errors[0].message);
  }
};

export default ApplicationUpdateActions;
