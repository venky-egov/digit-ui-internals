import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const useApplicationStatus = (select) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const fetch = async () => {
    let WorkflowService = await Digit.WorkflowService.init(tenantId, "FSM");
    return WorkflowService;
  };
  const defaultSelect = (WorkflowService) => {
    let applicationStatus = WorkflowService.BusinessServices[0].states
      .filter((state) => state.applicationStatus)
      .map((state) => ({
        name: t(`CS_COMMON_FSM_${state.applicationStatus}`),
        code: state.applicationStatus,
      }));
    return applicationStatus;
  };
  return useQuery("APPLICATION_STATUS", () => fetch(), { select: select || defaultSelect });
};

export default useApplicationStatus;
