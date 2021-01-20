import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader, Header } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = () => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const { data: applications, isLoading, isIdle, revalidate } = Digit.Hooks.fsm.useInbox(tenantId, { mobileNumber: "9999999999" });

  const handleFilterChange = (filterParam) => {
    // console.log("handleFilterChange", { ...searchParams, filters: filterParam });
    // setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    // setSearchParams({ ...searchParams, search: params });
  };

  let isMobile = window.Digit.Utils.browser.isMobile;

  if (isLoading || isIdle) {
    return <Loader />;
  }

  if (isMobile) {
    return <MobileInbox data={applications} onFilterChange={handleFilterChange} onSearch={onSearch} />;
  } else {
    return (
      <div>
        <Header>{t("ES_COMMON_INBOX")}</Header>
        <DesktopInbox data={applications} onFilterChange={handleFilterChange} onSearch={onSearch} />
      </div>
    );
  }
};

export default Inbox;
