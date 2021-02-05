import { useMutation } from "react-query";
import ApplicationUpdateActions from "../../services/molecules/FSM/ApplicationUpdateActions";

const useApplicationUpdate = (tenantId) => {
  return useMutation((applicationDetails, action) => ApplicationUpdateActions(applicationDetails, action, tenantId));
};

export default useApplicationUpdate;
