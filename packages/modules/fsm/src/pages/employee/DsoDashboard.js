import React, { useEffect } from "react";
import { DashboardBox, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

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

  const info = {
    ES_PENDING: 15,
    ES_NEARING_SLA: 20,
  };

  const { data: applications, isLoading: inboxLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(tenantId, {
    uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },

    sortBy: "createdTime",
    sortOrder: "DESC",
    limit: 11,
    offset: 0,
  });

  const { isLoading, data } = Digit.Hooks.fsm.useVendorDetail();

  useEffect(() => {
    if (data?.vendor) {
      const { vendor } = data;
      Digit.UserService.setExtraRoleDetails(vendor[0]);
    }
  }, [data]);

  useEffect(() => {
    console.log("find here....", applications);
  }, [applications]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <DashboardBox t={t} svgIcon={svgIcon} header={t("ES_TITLE_FAECAL_SLUDGE_MGMT")} info={info} links={links} />
    </div>
  );
};

export default DsoDashboard;
