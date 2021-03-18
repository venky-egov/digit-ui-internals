import { useQuery, useQueryClient } from "react-query";

const usePropertySearch = ({ tenantId, filters }, config = {}) => {
  const client = useQueryClient();
  const { isLoading, error, data } = useQuery(["propertySearchList", tenantId, filters], () => Digit.PTService.search({ tenantId, filters }), config);
  return { isLoading, error, data, revalidate: () => client.invalidateQueries(["propertySearchList", tenantId, filters]) };
};

export default usePropertySearch;
