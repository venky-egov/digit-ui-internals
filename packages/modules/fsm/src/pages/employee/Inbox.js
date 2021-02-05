import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState({});
  const { data: applications, isLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...searchParams,
  });

  const handleFilterChange = (filterParam) => {
    // console.log("handleFilterChange", { ...searchParams, filters: filterParam });
    setSearchParams({ ...searchParams, ...filterParam });
  };

  const onSearch = (params = {}) => {
    setSearchParams({ ...searchParams, ...params });
  };

  const getSearchFields = (userRole) => {
    switch (userRole) {
      case "FSTP_OPERATOR":
        return [
          {
            label: t("ES_FSTP_OPERATOR_VEHICLE_NO"),
            name: "vehicleNo",
          },
          {
            label: t("ES_FSTP_DSO_NAME"),
            name: "name",
          },
        ];
      default:
        return [
          {
            label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
            name: "applicationNos",
          },
          {
            label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
            name: "mobileNumber",
          },
        ];
    }
  };

  let isMobile = window.Digit.Utils.browser.isMobile;
  if (applications?.length !== null) {
    if (isMobile) {
      return <MobileInbox data={applications} isLoading={isLoading || isIdle} onFilterChange={handleFilterChange} onSearch={onSearch} />;
    } else {
      return (
        <div>
          <Header>{t("ES_COMMON_INBOX")}</Header>
          <DesktopInbox data={applications} isLoading={isLoading || isIdle} onFilterChange={handleFilterChange} onSearch={onSearch} />
        </div>
      );
    }
  }
};

export default Inbox;
