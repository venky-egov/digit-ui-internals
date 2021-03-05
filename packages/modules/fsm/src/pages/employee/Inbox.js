import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";

const Inbox = ({ parentRoute, isSearch = false, isInbox = false }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  console.log("current TenantId in ", tenantId);
  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles;

  const COLLECTOR = Digit.UserService.hasAccess("FSM_COLLECTOR") || false;
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  const FSM_CREATOR = Digit.UserService.hasAccess("FSM_CREATOR_EMP") || false;
  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;
  const isFSTPOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;

  const { t } = useTranslation();
  const [shouldSearch, setShouldSearch] = useState(false);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortParams, setSortParams] = useState({ key: "createdTime", sortOrder: "DESC" });
  const [searchParams, setSearchParams] = useState(() => {
    return isInbox
      ? {
          applicationStatus: [],
          locality: [],
          uuid:
            DSO || isFSTPOperator
              ? { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") }
              : { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
        }
      : {};
  });

  let isMobile = window.Digit.Utils.browser.isMobile();
  let paginationParms = isMobile
    ? { limit: 100, offset: 0, sortBy: sortParams?.key, sortOrder: sortParams.sortOrder }
    : { limit: pageSize, offset: pageOffset, sortBy: sortParams?.key, sortOrder: sortParams.sortOrder };

  // TODO: Here fromDate and toDate is only for mobile and it is not working for search application for mobile screen
  const { data: applications, isLoading, isIdle, refetch, revalidate } = Digit.Hooks.fsm.useInbox(
    tenantId,
    {
      ...searchParams,
      ...paginationParms,
      fromDate: searchParams?.fromDate ? new Date(searchParams?.fromDate).getTime() : undefined,
      toDate: searchParams?.toDate ? new Date(searchParams?.toDate).getTime() : undefined,
    },
    null,
    {
      enabled: isInbox,
    }
  );

  const { isLoading: isSearchLoading, isIdle: isSearchIdle, isError: isSearchError, data, error } = Digit.Hooks.fsm.useSearchAll(
    tenantId,
    {
      limit: pageSize,
      offset: pageOffset,
      ...searchParams,
      fromDate: searchParams?.fromDate ? new Date(searchParams?.fromDate).getTime() : undefined,
      toDate: searchParams?.toDate ? new Date(searchParams?.toDate).getTime() : undefined,
    },
    null,
    { enabled: shouldSearch && isSearch }
  );

  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + pageSize);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - pageSize);
  };

  const handleFilterChange = (filterParam) => {
    let keys_to_delete = filterParam.delete;
    let _new = { ...searchParams };
    if (keys_to_delete) keys_to_delete.forEach((key) => delete _new[key]);
    setSearchParams({ ..._new, ...filterParam });
  };

  const handleSort = useCallback((args) => {
    if (args.length === 0) return;
    const [sortBy] = args;
    setSortParams({ key: sortBy.id, sortOrder: sortBy.desc ? "DESC" : "ASC" });
  }, []);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const onSearch = (params = {}) => {
    setSearchParams({ ...searchParams, ...params });
    if (isSearch) {
      setShouldSearch(true);
    }
  };

  const removeParam = (params = {}) => {
    const _search = { ...searchParams };
    Object.keys(params).forEach((key) => delete _search[key]);
    setSearchParams(_search);
  };

  const getSearchFields = (userRoles) => {
    if (isSearch) {
      return [
        {
          label: t("ES_SEARCH_APPLICATION_APPLICATION_NO"),
          name: "applicationNos",
        },
        {
          label: t("ES_SEARCH_APPLICATION_MOBILE_NO"),
          name: "mobileNumber",
        },
        {
          label: t("ES_SEARCH_FROM_DATE"),
          name: "fromDate",
          type: "date",
        },
        {
          label: t("ES_SEARCH_TO_DATE"),
          name: "toDate",
          type: "date",
        },
      ];
    }
    if (userRoles.find((role) => role.code === "FSM_EMP_FSTPO")) {
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
    } else {
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

  if (applications?.length !== null) {
    if (isMobile) {
      return (
        <MobileInbox
          data={isInbox ? applications : data}
          isLoading={isInbox ? isLoading || isIdle : isSearchLoading}
          isSearch={isSearch}
          searchFields={getSearchFields(userRoles)}
          onFilterChange={handleFilterChange}
          onSearch={onSearch}
          onSort={handleSort}
          searchParams={searchParams}
          sortParams={sortParams}
          removeParam={removeParam}
          linkPrefix={"/digit-ui/employee/fsm/application-details/"}
        />
      );
    } else {
      return (
        <div>
          {!isSearch && <Header>{t("ES_COMMON_INBOX")}</Header>}
          <DesktopInbox
            data={isInbox ? applications : data}
            isLoading={isInbox ? isLoading || isIdle : isSearchLoading}
            isSearch={isSearch}
            shouldSearch={shouldSearch}
            onFilterChange={handleFilterChange}
            searchFields={getSearchFields(userRoles)}
            onSearch={onSearch}
            onSort={handleSort}
            onNextPage={fetchNextPage}
            onPrevPage={fetchPrevPage}
            currentPage={Math.floor(pageOffset / pageSize)}
            pageSizeLimit={pageSize}
            disableSort={false}
            searchParams={searchParams}
            onPageSizeChange={handlePageSizeChange}
            parentRoute={parentRoute}
            searchParams={searchParams}
            totalRecords={isInbox ? Number(applications?.[0].totalCount) : null}
          />
        </div>
      );
    }
  }
};

export default Inbox;
