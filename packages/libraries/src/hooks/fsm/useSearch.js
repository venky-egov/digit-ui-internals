import { Search } from "../../services/molecules/FSM/Search";
import { useQuery } from "react-query";

const useSearchAll = ({ tenantId, uuid, applicationNumber = "", mobileNumber = "", limit = 100, config = {} }) => {
  return useQuery(
    ["FSM_CITIZEN_SEARCH", applicationNumber],
    () => Search.application(tenantId, { applicationNumber, mobileNumber, uuid, limit }),
    config
  );
};

export default useSearchAll;
