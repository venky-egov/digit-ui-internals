import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Loader } from "@egovernments/digit-ui-react-components";
import ComplaintsLink from "./inbox/ComplaintLinks";
import ComplaintTable from "./inbox/ComplaintTable";
import Filter from "./inbox/Filter";
import SearchComplaint from "./inbox/search";
import { LOCALE } from "../constants/Localization";

const DesktopInbox = ({ data, onFilterChange, onSearch, isLoading }) => {
  const { t } = useTranslation();
  const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;
  const GetSlaCell = (value) => {
    return value < 0 ? (
      <span style={{ color: "#D4351C", backgroundColor: "rgba(212, 53, 28, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value || ""}</span>
    ) : (
      <span style={{ color: "#00703C", backgroundColor: "rgba(0, 112, 60, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value || ""}</span>
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: t("CS_COMMON_COMPLAINT_NO"),
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <Link to={"/digit-ui/employee/pgr/complaint/details/" + row.original["serviceRequestId"]}>{row.original["serviceRequestId"]}</Link>
              </span>
              {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
              <br />
              <span style={{ marginTop: "4px", color: "#505A5F" }}>{t(`SERVICEDEFS.${row.original["complaintSubType"].toUpperCase()}`)}</span>
            </div>
          );
        },
      },
      {
        Header: t("WF_INBOX_HEADER_LOCALITY"),
        Cell: ({ row }) => {
          return GetCell(t(Digit.Utils.locale.getLocalityCode(row.original["locality"], row.original["tenantId"])));
        },
      },
      {
        Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
        Cell: ({ row }) => {
          return GetCell(t(`CS_COMMON_${row.original["status"]}`));
        },
      },
      {
        Header: t("WF_INBOX_HEADER_CURRENT_OWNER"),
        Cell: ({ row }) => {
          return GetCell(row.original["taskOwner"]);
        },
      },
      {
        Header: t("WF_INBOX_HEADER_SLA_DAYS_REMAINING"),
        Cell: ({ row }) => {
          return GetSlaCell(row.original["sla"]);
        },
      },
    ],
    []
  );

  let result;
  if (isLoading) {
    result = <Loader />;
  } else if (data && data.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t(LOCALE.NO_COMPLAINTS)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (data.length > 0) {
    result = (
      <ComplaintTable
        data={data}
        columns={columns}
        getCellProps={(cellInfo) => {
          return {
            style: {
              minWidth: cellInfo.column.Header === t("CS_COMMON_COMPLAINT_NO") ? "240px" : "",
              padding: "20px 18px",
              fontSize: "16px",
            },
          };
        }}
      />
    );
  } else {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t(LOCALE.ERROR_LOADING_RESULTS)
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  }

  return (
    <div className="inbox-container">
      <div className="filters-container">
        <ComplaintsLink />
        <div>
          <Filter complaints={data} onFilterChange={onFilterChange} type="desktop" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <SearchComplaint onSearch={onSearch} type="desktop" />
        <div style={{ marginTop: "24px", marginTop: "24px", marginLeft: "24px", flex: 1 }}>{result}</div>
      </div>
    </div>
  );
};

export default DesktopInbox;
