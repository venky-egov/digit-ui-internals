import { PTService } from "../../services/elements/PT";
import { useQuery, useMutation } from "react-query";

const usePropertyAPI = (data, tenantId, config = {}) => {
  debugger;
  const response = Digit.PTService.create(data, tenantId);
  return response;
};

export default usePropertyAPI;
