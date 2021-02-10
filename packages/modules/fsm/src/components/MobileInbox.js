import { Card } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "./inbox/ApplicationCard";
import ApplicationLinks from "./inbox/ApplicationLinks";

const GetSlaCell = (value) => {
  return value < 0 ? (
    <span style={{ color: "#D4351C", backgroundColor: "rgba(212, 53, 28, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
  ) : (
    <span style={{ color: "#00703C", backgroundColor: "rgba(0, 112, 60, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
  );
};

const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;

const MobileInbox = ({ data, onFilterChange, onSearch, searchParams }) => {
  const { t } = useTranslation();
  const localizedData = data?.map(({ locality, applicationNo, createdTime, tenantId, status, sla }) => ({
    [t("ES_INBOX_APPLICATION_NO")]: applicationNo,
    [t("ES_INBOX_APPLICATION_DATE")]: `${createdTime.getDate()}/${createdTime.getMonth() + 1}/${createdTime.getFullYear()}`,
    [t("ES_INBOX_LOCALITY")]: GetCell(t(Digit.Utils.locale.getLocalityCode(locality, tenantId))),
    [t("ES_INBOX_STATUS")]: GetCell(t(`CS_COMMON_${status}`)),
    [t("ES_INBOX_SLA_DAYS_REMAINING")]: GetSlaCell(sla),
  }));

  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;
  const userDetails = Digit.UserService.getUser();

  const isFstpOperator = Digit.UserService.hasAccess("FSTP");

  // TODO: below line is hard coded, it should come from server
  const fstpOperatorData = [
    {
      DSO: "Jagdamba Cleaners",
      "Vehicle No": "KA-25235",
      "Vehicle Capacity": "2500 ltrs",
      "Waste Collected": "2250 ltrs",
    },
    {
      DSO: "Jagdamba Cleaners",
      "Vehicle No": "KA-25235",
      "Vehicle Capacity": "2500 ltrs",
      "Waste Collected": "2250 ltrs",
    },
    {
      DSO: "Jagdamba Cleaners",
      "Vehicle No": "KA-25235",
      "Vehicle Capacity": "2500 ltrs",
      "Waste Collected": "2250 ltrs",
    },
  ];

  // TODO: below line is hard coded, it should come from server
  const dsoData = [
    {
      "Application No.": "FSM-789-78-21222",
      Locality: "Ajit Nagar",
      Status: "DSO Assigned",
      "SLA Remaining": 12,
    },
    {
      "Application No.": "FSM-789-78-34563",
      Locality: "Ajit Nagar",
      Status: "Completed",
      "SLA Remaining": 12,
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <div className="inbox-container">
        <div className="filters-container">
          {!DSO && !isFstpOperator && <ApplicationLinks isMobile={true} />}
          <ApplicationCard
            data={isFstpOperator ? fstpOperatorData : DSO ? dsoData : localizedData}
            onFilterChange={onFilterChange}
            serviceRequestIdKey={isFstpOperator ? "FSTP_OPERATOR_VEHICLE_NO" : DSO ? "Application No." : t("ES_INBOX_APPLICATION_NO")}
            isFstpOperator={isFstpOperator}
            onSearch={!DSO ? onSearch : false}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInbox;
