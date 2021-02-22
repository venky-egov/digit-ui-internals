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
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const GetSlaCell = (value) => {
    if (isNaN(value)) value = "-";
    return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
  };

  const history = useHistory();

  function goTo(id) {
    // console.log("id", id);
    // history.push("/digit-ui/employee/fsm/complaint/details/" + id);
  }

  const columns = React.useMemo(() => {
    switch (props.userRole) {
      case "FSM_EMP_FSTPO":
        return [
          {
            Header: t("ES_INBOX_VEHICLE_LOG"),
            accessor: "applicationNo",
            Cell: ({ row }) => {
              return (
                <div>
                  <span className="link">
                    <Link to={"/digit-ui/employee/fsm/fstp-operator-details/" + row.original["applicationNo"]}>{row.original["applicationNo"]}</Link>
                  </span>
                </div>
              );
            },
          },
          {
            Header: t("ES_INBOX_VEHICLE_NO"),
            accessor: (row) => row.vehicle.registrationNumber,
          },
          {
            Header: t("ES_INBOX_DSO_NAME"),
            accessor: (row) => row.tripOwner.name,
          },
          {
            Header: t("ES_INBOX_WASTE_COLLECTED"),
            accessor: (row) => row.volumeCarried,
          },
        ];
      default:
        return [
          {
            Header: t("CS_FILE_DESLUDGING_APPLICATION_NO"),
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
            Cell: (row) => {
              return GetCell(t(`CS_COMMON_FSM_${row.row.original["status"]}`));
            },
          },
          {
            Header: t("ES_INBOX_SLA_DAYS_REMAINING"),
            Cell: ({ row }) => {
              return GetSlaCell(row.original["sla"]);
            },
          },
        ];
    }
  }, []);

  let result;
  if (props.isLoading) {
    result = <Loader />;
  } else if (props?.data?.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {/* TODO Change localization key */}
        {
          // t("CS_MYCOMPLAINTS_NO_COMPLAINTS")
          t("CS_MYAPPLICATIONS_NO_APPLICATION")
            .split("\\n")
            .map((text, index) => (
              <p key={index} style={{ textAlign: "center" }}>
                {text}
              </p>
            ))
        }
      </Card>
    );
  } else if (props?.data?.length > 0) {
    result = (
      <ApplicationTable
        t={t}
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
        onPageSizeChange={props.onPageSizeChange}
        currentPage={props.currentPage}
        onNextPage={props.onNextPage}
        onPrevPage={props.onPrevPage}
        pageSizeLimit={props.pageSizeLimit}
        onSort={props.onSort}
        disableSort={props.disableSort}
        onPageSizeChange={props.onPageSizeChange}
      />
    );
  }

  return (
    <div className="inbox-container">
      {props.userRole !== "FSM_EMP_FSTPO" && (
        <div className="filters-container">
          <FSMLink />
          <div>
            <Filter applications={props.data} onFilterChange={props.onFilterChange} type="desktop" />
          </div>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <SearchApplication onSearch={props.onSearch} type="desktop" searchFields={props.searchFields} />
        <div style={{ marginTop: "24px", marginLeft: "24px", flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default DesktopInbox;
