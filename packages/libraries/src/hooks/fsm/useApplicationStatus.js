import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const useApplicationStatus = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  return useQuery("APPLICATION_STATUS", async () => {
    let WorkflowService = await Digit.WorkflowService.init(tenantId, "FSM");
    let applicationStatus = WorkflowService.BusinessServices[0].states
      .filter((state) => state.applicationStatus)
      .map((state) => ({
        name: t(`CS_COMMON_${state.applicationStatus}`),
        code: state.applicationStatus,
      }));
    return applicationStatus;
  });
};

export default useApplicationStatus;
