import React, { useEffect, useState } from "react";
import { DashboardBox, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const svgIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white"></path>
  </svg>
);

const links = [
  {
    pathname: "/digit-ui/employee/fsm/inbox",
    label: "ES_TITLE_INBOX",
  },
];

const DsoDashboard = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();

  const [info, setInfo] = useState({});
  const [total, setTotal] = useState("-");
  const [loader, setLoader] = useState(true);

  const [progressStatusCode, setProgressStatusCode] = useState(null);
  const [pendingApprovalStatusCode, setPendingApprCode] = useState(null);

  // fetch Status codes for DSO_ACTIONS

  const { data: statusCodes, isFetching: statusFetching } = Digit.Hooks.fsm.useApplicationStatus();
  useEffect(() => {
    if (statusCodes) {
      const [inProgress, pendingApproval] = statusCodes.filter((e) => e.roles?.includes("FSM_DSO"));
      console.log("here", inProgress, pendingApproval);
      setProgressStatusCode(inProgress);
      setPendingApprCode(pendingApproval);
    }
  }, [statusCodes]);

  const filters = {
    uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
    sortBy: "createdTime",
    sortOrder: "DESC",
    limit: 10,
    offset: 0,
  };

  const { data, isFetching: vendorDetailsFetching } = Digit.Hooks.fsm.useVendorDetail();

  useEffect(() => {
    if (data?.vendor) {
      const { vendor } = data;
      Digit.UserService.setExtraRoleDetails(vendor[0]);
    }
  }, [data]);

  const { data: pendingApprovalArray, isFetching: pendingApprovalRefetching } = Digit.Hooks.fsm.useInbox(
    tenantId,
    { ...filters, applicationStatus: [pendingApprovalStatusCode] },
    null,
    {
      enabled: typeof pendingApprovalStatusCode === "object" && !vendorDetailsFetching && !statusFetching,
    }
  );

  const { data: pendingCompletionArray, isFetching: pendingCompletionRefetching } = Digit.Hooks.fsm.useInbox(
    tenantId,
    { ...filters, applicationStatus: [progressStatusCode] },
    null,
    {
      enabled: typeof progressStatusCode === "object" && !vendorDetailsFetching && !statusFetching,
    }
  );

  useEffect(() => {
    if (pendingApprovalArray && pendingCompletionArray) {
      const infoObj = {
        [t(progressStatusCode?.name)]: pendingCompletionArray?.[0]?.totalCount || 0,
        [t(pendingApprovalStatusCode?.name)]: pendingApprovalArray?.[0]?.totalCount || 0,
      };
      setInfo(infoObj);
    }
  }, [pendingApprovalArray, pendingCompletionArray, progressStatusCode, pendingApprovalStatusCode]);

  const { data: inbox, isFetching: inboxFetching } = Digit.Hooks.fsm.useInbox(tenantId, { ...filters }, null, {
    enabled: true,
  });

  const links = useMemo(
    () => [
      {
        pathname: "/digit-ui/employee/fsm/inbox",
        label: "ES_TITLE_INBOX",
        total: total,
      },
    ],
    [total]
  );

  useEffect(() => {
    if (inbox) {
      const total = inbox?.[0]?.totalCount || 0;
      setTotal(total);
      if (Object.keys(info).length) setLoader(false);
    }
  }, [info, inbox]);

  if (loader) {
    return <Loader />;
  }
  return (
    <div>
      <DashboardBox t={t} svgIcon={svgIcon} header={t("ES_TITLE_FAECAL_SLUDGE_MGMT")} info={info} links={links} />
    </div>
  );
};

export default DsoDashboard;
