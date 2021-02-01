import { Card, CheckBox, Loader } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import FSMLink from "./inbox/FSMLink";
import ApplicationTable from "./inbox/ApplicationTable";
import Filter from "./inbox/Filter";
import SearchApplication from "./inbox/search";
import { useHistory } from "react-router-dom";

const DesktopInbox = (props) => {
  const { t } = useTranslation();
  let { match } = useRouteMatch();
  const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;
  const GetSlaCell = (value) => {
    if (isNaN(value)) value = "-";
    return value < 0 ? (
      <span style={{ color: "#D4351C", backgroundColor: "rgba(212, 53, 28, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
    ) : (
      <span style={{ color: "#00703C", backgroundColor: "rgba(0, 112, 60, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
    );
  };
  const history = useHistory();

  function goTo(id) {
    // console.log("id", id);
    // history.push("/digit-ui/employee/fsm/complaint/details/" + id);
  }

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
        Header: t("ES_INBOX_APPLICATION_DATE"),
        accessor: "createdTime",
        Cell: ({ row }) => {
          return GetCell(
            `${row.original.createdTime.getDate()}/${row.original.createdTime.getMonth() + 1}/${row.original.createdTime.getFullYear()}`
          );
        },
        // Cell: (row) => {
        //   return GetCell(
        //     t(row.row.original["locality"].includes("_") ? row.row.original["locality"] : `PB_AMRITSAR_ADMIN_${row.row.original["locality"]}`)
        //   );
        // },
      },
      {
        Header: t("ES_INBOX_LOCALITY"),
        Cell: ({ row }) => {
          return GetCell(t(Digit.Utils.locale.getLocalityCode(row.original["locality"], row.original["tenantId"])));
        },
        // Cell: (row) => {
        //   return GetCell(t(`CS_COMMON_${row.row.original["status"]}`));
        // },
      },
      {
        Header: t("ES_INBOX_STATUS"),
        accessor: "status",
        Cell: (row) => {
          return GetCell(t(`CS_COMMON_${row.row.original["status"]}`));
        },
      },
      {
        Header: t("ES_INBOX_SLA_DAYS_REMAINING"),
        Cell: ({ row }) => {
          return GetSlaCell(row.original["sla"]);
        },
      },
    ],
    []
  );

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if (props.data.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {/* TODO Change localization key */}
        {t("CS_MYCOMPLAINTS_NO_COMPLAINTS")
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (props.data.length > 0) {
    result = (
      <ApplicationTable
        data={props.data}
        columns={columns}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
              // borderTop: "1px solid grey",
              // textAlign: "left",
              // verticalAlign: "middle",
            },
          };
        }}
      />
    );
  }

  return (
    <div className="inbox-container">
      <div className="filters-container">
        <FSMLink />
        <div>
          <Filter applications={props.data} onFilterChange={props.onFilterChange} type="desktop" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <SearchApplication onSearch={props.onSearch} type="desktop" />
        <div style={{ marginTop: "24px", marginTop: "24px", marginLeft: "24px", flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default DesktopInbox;
