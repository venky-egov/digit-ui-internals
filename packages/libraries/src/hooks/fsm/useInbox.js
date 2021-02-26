import { useQuery, useQueryClient } from "react-query";
import { Search } from "../../services/molecules/FSM/Search";
import useSearchAll from "./useSearchAll";

const useInbox = (tenantId, filters) => {
  const client = useQueryClient();
  let { uuid } = Digit.UserService.getUser().info;

  console.log("inside fetchInbox", filters);

  const fetchFilters = () => {
    let filtersObj = {};
    const { applicationNos, mobileNumber, limit, offset, sortBy, sortOrder } = filters;
    if (filters.applicationStatus) {
      filtersObj.applicationStatus = filters.applicationStatus.map((status) => status.code).join(",");
    }
    if (filters.locality) {
      filtersObj.locality = filters.locality.map((item) => item.code.split("_").pop()).join(",");
    }
    if (filters.uuid && Object.keys(filters.uuid).length > 0) {
      filtersObj.assignee = filters.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
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
    return { limit, offset, sortBy, sortOrder, ...filtersObj };
  };

  const workflowFilters = fetchFilters().assignee ? { assignee: uuid } : {};

  const workFlowInstances = useQuery(
    ["WORKFLOW", { uuid: fetchFilters().uuid }],
    () => Digit.WorkflowService.getAllApplication(tenantId, { ...workflowFilters, businesssService: "FSM" }),
    { select: (data) => data.ProcessInstances }
  );

  const { data: processInstances, isLoading: workflowLoading, isFetching: wfFetching, isSuccess: wfSuccess } = workFlowInstances;
  let applicationNos = !wfFetching && wfSuccess ? { applicationNos: processInstances.map((e) => e.businessId).join() } : {};

  const appList = useQuery(["FSM_SEARCH", { ...fetchFilters(), ...applicationNos }], () => Search.all(tenantId, { ...fetchFilters() }), {
    enabled: !wfFetching && wfSuccess,
    select: (data) => combineResponses(data, processInstances),
  });
  return appList;
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
