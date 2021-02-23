import React from "react";
import { useQuery, useQueryClient } from "react-query";

const useRouteGuard = ({ useHistory, useRouteMatch, useParams }) => {
  const info = Digit.UserService.getUser()?.info;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const roleCodes = info.roles.filter((e) => e.tenantId === tenantId).map((e) => e.code);
  const { path: pathname } = useRouteMatch();
  const history = useHistory();
  const params = useParams();
  //   const client = useQueryClient();

  const { data: routesObj, isLoading } = useQuery(
    ["ROUTE_GUARD", rolecode, tenantId],
    () => Digit.MdmsService.fetchMDMSRoleBasedAction(tenantId, roleCodes),
    {
      select: (data) => {
        const routes = {};
        data.actions.forEach((e) => {
          routes[e.navigationURL] = e;
        });
        return { routes };
      },
    }
  );

  useEffect(() => {
    const { routes } = routesObj;
    if (isLoading || !routes[pathname]) history.pop();
  }, [routesObj, roleCodes, params, pathname]);

  return isLoading;
};

export default useRouteGuard;
