import { useQuery, useQueryClient } from "react-query";
import useSearchAll from "./useSearchAll";

const useInbox = (tenantId, filters) => {
  const client = useQueryClient();
  const { isLoading, isError, data: applicationsList } = useSearchAll(tenantId, filters);
  // console.log("find inbox application here", applicationsList)

  const fetchInboxData = async () => {
    let result = [];
    // const tenantId = Digit.ULBService.getCurrentTenantId();
    const serviceIds = applicationsList.map((application) => application.applicationNo);
    const serviceIdParams = serviceIds.join();
    const workflowInstances = await Digit.WorkflowService.getByBusinessId(tenantId, serviceIdParams, {}, false);
    if (workflowInstances.ProcessInstances.length) {
      result = combineResponses(applicationsList, workflowInstances).map((data) => ({
        ...data,
        sla: Math.round(data.sla / (24 * 60 * 60 * 1000)),
      }));

      return result;
    }
  };

  const result = useQuery(["FSM_INBOX", applicationsList], fetchInboxData, { enabled: !!applicationsList });
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
