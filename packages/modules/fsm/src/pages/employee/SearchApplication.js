import React, { useState, useEffect } from "react";
import { Loader, Card } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Search from "../../components/inbox/search";
import ApplicationTable from "../../components/inbox/ApplicationTable";

// const getLocalisedProperty = ;
// .reduce((keyValue, obj) => ({ ...keyValue, ...obj }), {});

const SearchApplication = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [pageOffset, setPageOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState({});
  const [shouldSearch, setShouldSearch] = useState(false);
  const stateId = Digit.ULBService.getCurrentTenantId().split(".")[0];
  const parseTypeSubType = (d) => d.map((e) => ({ [e.i18nKey]: t(e.i18nKey) })).reduce((keyValue, obj) => ({ ...keyValue, ...obj }), {});
  const PropertyType = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertyType", {
    select: parseTypeSubType,
  });
  const PropertySubType = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "PropertySubtype", {
    select: parseTypeSubType,
  });
  const { isLoading, isIdle, isError, data, error } = Digit.Hooks.fsm.useSearchAll(
    tenantId,
    {
      limit: pageSize + 1,
      offset: pageOffset,
      ...searchParams,
      fromDate: searchParams?.fromDate ? new Date(searchParams?.fromDate).getTime() : undefined,
      toDate: searchParams?.toDate ? new Date(searchParams?.toDate).getTime() : undefined,
    },
    null,
    { enabled: shouldSearch }
  );

  const fetchNextPage = () => {
    setPageOffset((prevState) => prevState + pageSize);
  };

  const fetchPrevPage = () => {
    setPageOffset((prevState) => prevState - pageSize);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;
  const columns = React.useMemo(
    () => [
      {
        Header: t("ES_INBOX_APPLICATION_NO"),
        accessor: "applicationNo",
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <Link to={"/digit-ui/employee/fsm/application-details/" + row.original["applicationNo"]}>{row.original["applicationNo"]}</Link>
              </span>
              {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
            </div>
          );
        },
      },
      {
        Header: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"),
        accessor: (row) => GetCell(row.citizen?.name || ""),
      },
      {
        Header: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"),
        accessor: (row) => GetCell(row.citizen?.mobileNumber || ""),
      },
      {
        Header: t("ES_APPLICATION_DETAILS_PROPERTY_TYPE"),
        accessor: (row) => {
          const key = `PROPERTYTYPE_MASTERS_${row.propertyUsage.split(".")[0]}`;
          console.log(PropertyType.data && PropertyType.data[key]);
          return PropertyType.data?.[key] || <Loader />;
        },
      },
      {
        Header: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"),
        accessor: (row) => {
          const key = `PROPERTYTYPE_MASTERS_${row.propertyUsage}`;
          return PropertySubType.data?.[key] || <Loader />;
        },
      },
      {
        Header: t("ES_INBOX_LOCALITY"),
        accessor: (row) => GetCell(t(Digit.Utils.locale.getLocalityCode(row.address.locality.code, row.tenantId))),
      },
      {
        Header: t("ES_INBOX_STATUS"),
        accessor: (row) => {
          return GetCell(t(`CS_COMMON_FSM_${row.applicationStatus}`));
        },
      },
    ],
    [PropertyType.data, PropertySubType.data]
  );

  const handleSearch = (params) => {
    setSearchParams({ ...params });
    setShouldSearch(true);
  };

  const searchFields = [
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

  let result;
  if (!shouldSearch) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t("CS_MYAPPLICATIONS_NO_APPLICATION")
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (isLoading || isError) {
    result = <Loader />;
  } else {
    result = (
      <ApplicationTable
        t={t}
        data={data}
        columns={columns}
        onNextPage={fetchNextPage}
        onPrevPage={fetchPrevPage}
        currentPage={Math.floor(pageOffset / pageSize)}
        pageSizeLimit={pageSize}
        onPageSizeChange={handlePageSizeChange}
        disableSort={true}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
            },
          };
        }}
      />
    );
  }

  return (
    <div className="inbox-container">
      <div style={{ width: "100%", overflowX: "auto" }}>
        <Search onSearch={handleSearch} type="desktop" searchFields={searchFields} />
        <div style={{ flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default SearchApplication;
