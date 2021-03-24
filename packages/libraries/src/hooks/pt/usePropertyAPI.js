import { PTService } from "../../services/elements/PT";
import { useQuery, useMutation } from "react-query";

const usePropertyAPI = (tenantId, config = {}) => {
  return useMutation((data) =>PTService.create(data, tenantId));
};

export default usePropertyAPI;
