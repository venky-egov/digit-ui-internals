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

  const DSO = Digit.UserService.hasAccess("DSO");

  const handleFilterChange = (filterParam) => {
    // console.log("handleFilterChange", { ...searchParams, filters: filterParam });
    setSearchParams({ ...searchParams, ...filterParam });
  };

  const onSearch = (params = {}) => {
    setSearchParams({ ...searchParams, ...params });
  };

  if (isLoading || isIdle) {
    return <Loader />;
  }

  let isMobile = window.Digit.Utils.browser.isMobile;

  if (applications.length !== null) {
    if (DSO || isMobile) {
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
