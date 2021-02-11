import { useQuery, useQueryClient } from "react-query";

const usePropertySearch = ({ tenantId, filters }) => {
  const client = useQueryClient();
  const { isLoading, error, data } = useQuery(
    ["propertySearchList", tenantId, filters],
    () => Digit.PTService.fetchProperties({ tenantId, filters }),
    {}
  );
  console.log({ data }, "from usePropertySearch");
  return { isLoading, error, data, revalidate: () => client.invalidateQueries(["propertySearchList", tenantId, filters]) };
};

export default usePropertySearch;
