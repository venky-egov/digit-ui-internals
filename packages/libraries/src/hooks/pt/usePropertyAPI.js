import { PTService } from "../../services/elements/PT";
import { useQuery, useMutation } from "react-query";

const usePropertyAPI = (data, tenantId, config = {}) => {
  debugger;
  const response = Digit.PTService.create(data, tenantId);
  return response;
  //return useMutation((data) => response)
  //const client = useQueryClient();
  /* const { isLoading, error, data } = useQuery(
    ["createproperty", data, tenantId],
    () => Digit.PTService.create({ data, tenantId }),
    {}
  );
  console.log({ data }, "from usePropertyAPI");
  return { isLoading, error, data, revalidate: () => client.invalidateQueries(["createproperty", data, tenantId]) }; */
};

export default usePropertyAPI;
