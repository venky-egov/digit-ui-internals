import { useQuery, useQueryClient } from "react-query";
import { Search } from "../../services/molecules/FSM/Search";
import useSearchAll from "./useSearchAll";

const useInbox = (tenantId, filters) => {
  const client = useQueryClient();
  let { uuid } = Digit.UserService.getUser().info;

  console.log("inside fetchInbox", filters);
  // const fetchFilters = ({ queryKey }) => {

  const fetchFilters = () => {
    // const [_key, filters] = queryKey;
    filters["applicationStatus"];
    filters["locality"];

    let filtersObj = {};
    const { applicationNos, mobileNumber, limit, offset, sortBy, sortOrder } = filters;
    if (filters.applicationStatus) {
      filtersObj.applicationStatus = filters.applicationStatus.map((status) => status.code).join(",");
    }
    if (filters.locality) {
      filtersObj.locality = filters.locality.map((item) => item.code.split("_").pop()).join(",");
    }
    if (filters.uuid && Object.keys(filters.uuid).length > 0) {
      filtersObj.uuid = filters.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
    }
    if (mobileNumber) {
      filtersObj.mobileNumber = mobileNumber;
    }
    if (applicationNos) {
      filtersObj.applicationNos = applicationNos;
    }
    if (sortBy) {
      filtersObj.sortBy = sortBy;
    }
    if (sortOrder) {
      filtersObj.sortOrder = sortOrder;
    }
    // return Search.all(tenantId, { ...filtersObj, limit, offset });
    return { limit, offset, sortBy, sortOrder, ...filtersObj };
  };
  // const { isLoading, isError, data: applicationsList } = useSearchAll(tenantId, filters, fetchApplications);
  // console.log("find inbox application here", applicationsList)

  const fetchInboxData = async () => {
    let result = [];
    // const tenantId = Digit.ULBService.getCurrentTenantId();
    // const serviceIdParams = serviceIds.join();
    if (filters.uuid && Object.keys(filters.uuid).length > 0) {
      uuid = filters.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
    }

    console.log(filters["applicationStatus"]);
    const applicationStatus = filters["applicationStatus"].map((e) => e.code).join();
    const locality = filters["locality"].map((item) => item.code.split("_").pop()).join(",");

    const workflowInstances = await Digit.WorkflowService.getDetailsByUser(tenantId, uuid, { ...fetchFilters(), businessService: "FSM" });
    let applicationList = workflowInstances?.ProcessInstances;
    const applicationNos = applicationList.map((application) => application.businessId).join();
    const appList = await Search.all(tenantId, { applicationNos, applicationStatus, locality });
    if (workflowInstances.ProcessInstances && appList) return combineResponses(appList, workflowInstances);
    return [];
  };

  // const result = useQuery(["FSM_INBOX", ""], fetchInboxData, { enabled: !!applicationsList });
  const result = useQuery(["FSM_INBOX", { ...filters }], fetchInboxData, {});
  return { ...result, revalidate: () => client.refetchQueries(["FSM_INBOX"]) };
};

const mapWfBybusinessId = (wfs) => {
  return wfs.reduce((object, item) => {
    return { ...object, [item["businessId"]]: item };
  }, {});
};

const combineResponses = (applicationDetails, workflowInstances) => {
  let wfMap = mapWfBybusinessId(workflowInstances.ProcessInstances);
  return applicationDetails.map((application) => ({
    applicationNo: application.applicationNo,
    createdTime: new Date(application.auditDetails.createdTime),
    locality: application.address.locality.code,
    status: application.applicationStatus,
    taskOwner: wfMap[application.applicationNo]?.assigner?.name,
    sla: wfMap[application.applicationNo]?.businesssServiceSla,
    tenantId: application.tenantId,
  }));
};

export default useInbox;
