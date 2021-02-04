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

  // remove it from here ok
  const resp = Digit.Hooks.fsm.useDsoSearch(tenantId);
  const resp2 = Digit.Hooks.fsm.useVehicleSearch("TS 09 PA 2587", tenantId);
  {
    !resp.isLoading && !resp2.isLoading && console.log("find dso search data here", resp.data, resp2.data);
  }

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
