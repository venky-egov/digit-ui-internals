import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";
import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const config = {
  placeholderData: [],
  select: (response) => {
    return response?.vehicleTrip;
  },
};

const FstpInbox = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [searchParams, setSearchParams] = useState({});
  const { isLoading, data: vehicleLog, isSuccess } = Digit.Hooks.fsm.useVehicleSearch({ tenantId, filters: searchParams, config });

  const onSearch = () => {};

  const handleFilterChange = () => {};

  const searchFields = [
    {
      label: t("ES_FSTP_OPERATOR_VEHICLE_NO"),
      name: "vehicleNo",
    },
    {
      label: t("ES_FSTP_DSO_NAME"),
      name: "name",
    },
  ];

  let isMobile = window.Digit.Utils.browser.isMobile;
  // if (isSuccess) {
  if (isMobile) {
    return (
      <MobileInbox
        onFilterChange={handleFilterChange}
        vehicleLog={vehicleLog}
        isLoading={isLoading}
        userRole={"FSM_EMP_FSTPO"}
        linkPrefix={"/digit-ui/employee/fsm/fstp-operator-details/"}
        onSearch={onSearch}
        searchFields={searchFields}
      />
    );
  } else {
    return (
      <div>
        <Header>{t("ES_COMMON_INBOX")}</Header>
        <DesktopInbox
          data={vehicleLog}
          isLoading={isLoading}
          userRole={"FSM_EMP_FSTPO"}
          onFilterChange={handleFilterChange}
          searchFields={searchFields}
          onSearch={onSearch}
          // onNextPage={fetchNextPage}
          // onPrevPage={fetchPrevPage}
          // currentPage={Math.floor(pageOffset / pageSize)}
          // pageSizeLimit={pageSize}
          // onPageSizeChange={handlePageSizeChange}
        />
      </div>
    );
  }
  // }
};

export default FstpInbox;
