import { Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Search from "../../components/inbox/search";
import ApplicationTable from "../../components/inbox/ApplicationTable";

const SearchApplication = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, data, error } = Digit.Hooks.fsm.useSearchAll(tenantId, {});
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
        accessor: (row) => row.propertyUsage.split(".")[0],
      },
      {
        Header: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"),
        accessor: (row) => row.propertyUsage.split(".")[1],
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
    []
  );

  const handleSearch = () => {};

  const searchFields = [
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
      type: "date",
    },
    {
      label: t("ES_SEARCH_TO_DATE"),
      name: "toDate",
      type: "date",
    },
  ];

  let result;

  if (isLoading || isError) {
    result = <Loader />;
  } else {
    result = (
      <ApplicationTable
        t={t}
        data={data}
        columns={columns}
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
      <div style={{ flex: 1 }}>
        <Search onSearch={handleSearch} type="desktop" searchFields={searchFields} />
        <div style={{ marginTop: "24px", marginTop: "24px", marginLeft: "24px", flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default SearchApplication;
