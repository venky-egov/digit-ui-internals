import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState({});
  const { data: applications, isLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(tenantId, {
    ...searchParams,
  });

  // useEffect(() => {
  //   revalidate();
  // }, [searchParams])

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
      case "DSO":
        return [
          {
            label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
            name: "applicationNo",
          },
          {
            label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
            name: "mobileNumber",
          },
          {
            label: t("ES_SEARCH_FROM_DATE"),
            name: "fromDate",
          },
          {
            label: t("ES_SEARCH_TO_DATE"),
            name: "toDate",
          },
        ];
      default:
        return [
          {
            label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
            name: "applicationNo",
          },
          {
            label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
            name: "mobileNumber",
          },
        ];
    }
  };

  let isMobile = window.Digit.Utils.browser.isMobile;

  if (isMobile) {
    return <MobileInbox data={applications} isLoading={isLoading || isIdle} onFilterChange={handleFilterChange} onSearch={onSearch} />;
  } else {
    return (
      <div>
        <Header>{t("ES_COMMON_INBOX")}</Header>
        <DesktopInbox
          data={applications}
          isLoading={isLoading || isIdle}
          searchFields={getSearchFields()}
          onFilterChange={handleFilterChange}
          onSearch={onSearch}
        />
      </div>
    );
  }
};

export default Inbox;
