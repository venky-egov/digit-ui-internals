import { Card } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "./inbox/ApplicationCard";
import ApplicationLinks from "./inbox/ApplicationLinks";

const GetSlaCell = (value) => {
  return value < 0 ? <span className="sla-cell-error">{value}</span> : <span className="sla-cell-success">{value}</span>;
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

  return (
    <div style={{ padding: 0 }}>
      <div className="inbox-container">
        <div className="filters-container">
          <ApplicationLinks isMobile={true} />
          <ApplicationCard
            data={localizedData}
            onFilterChange={onFilterChange}
            serviceRequestIdKey={t("ES_INBOX_APPLICATION_NO")}
            onSearch={onSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileInbox;
