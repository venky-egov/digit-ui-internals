import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/FSM/ApplicationUpdateActions";

const useApplicationActions = (tenantId) => {
  return useMutation(({ applicationData, action }) => ApplicationUpdateActions(applicationData, action, tenantId));
};

export default useApplicationActions;
