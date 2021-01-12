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

const MobileInbox = ({ data, onFilterChange, onSearch }) => {
  const { t } = useTranslation();
  // const localizedData = data?.map(({ locality, serviceRequestId, sla, status, taskOwner }) => ({
  //   [t("CS_COMMON_COMPLAINT_NO")]: serviceRequestId,
  //   [t("WF_INBOX_HEADER_LOCALITY")]: t(locality),
  //   [t("CS_COMPLAINT_DETAILS_CURRENT_STATUS")]: t(`CS_COMMON_${status}`),
  //   [t("WF_INBOX_HEADER_CURRENT_OWNER")]: taskOwner,
  //   [t("WF_INBOX_HEADER_SLA_DAYS_REMAINING")]: GetSlaCell(sla),
  // }));
  const localizedData = data;

  const userDetails = Digit.UserService.getUser();

  // const isFstpOperator = !!userDetails.info.roles.find((role) => role.code === "FSTP_OPERATOR");
  const isFstpOperator = true;

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

  return (
    <div style={{ padding: 0 }}>
      <div className="inbox-container">
        <div className="filters-container">
          {!isFstpOperator && <ApplicationLinks isMobile={true} />}
          <ApplicationCard
            data={isFstpOperator ? fstpOperatorData : localizedData}
            onFilterChange={onFilterChange}
            serviceRequestIdKey={isFstpOperator ? "FSTP_OPERATOR_VEHICLE_NO" : t("ES_INBOX_APPLICATION_NO")}
            onSearch={onSearch}
            isFstpOperator={isFstpOperator}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInbox;
