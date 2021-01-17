import React from "react";
import { useTranslation } from "react-i18next";
import { Loader, Card } from "@egovernments/digit-ui-react-components";
import { ComplaintCard } from "./inbox/ComplaintCard";
import ComplaintsLink from "./inbox/ComplaintLinks";
import { LOCALE } from "../constants/Localization";

const GetSlaCell = (value) => {
  return value < 0 ? (
    <span style={{ color: "#D4351C", backgroundColor: "rgba(212, 53, 28, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
  ) : (
    <span style={{ color: "#00703C", backgroundColor: "rgba(0, 112, 60, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
  );
};

const MobileInbox = ({ data, onFilterChange, onSearch, isLoading }) => {
  const { t } = useTranslation();
  const localizedData = data?.map(({ locality, tenantId, serviceRequestId, complaintSubType, sla, status, taskOwner }) => ({
    [t("CS_COMMON_COMPLAINT_NO")]: serviceRequestId,
    [t("CS_ADDCOMPLAINT_COMPLAINT_SUB_TYPE")]: t(`SERVICEDEFS.${complaintSubType.toUpperCase()}`),
    [t("WF_INBOX_HEADER_LOCALITY")]: t(Digit.Utils.locale.getLocalityCode(locality, tenantId)),
    [t("CS_COMPLAINT_DETAILS_CURRENT_STATUS")]: t(`CS_COMMON_${status}`),
    [t("WF_INBOX_HEADER_CURRENT_OWNER")]: taskOwner,
    [t("WF_INBOX_HEADER_SLA_DAYS_REMAINING")]: GetSlaCell(sla),
    // status,
  }));

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
  } else if (localizedData.length > 0) {
    result = (
      <ComplaintCard data={localizedData} onFilterChange={onFilterChange} serviceRequestIdKey={t("CS_COMMON_COMPLAINT_NO")} onSearch={onSearch} />
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
    <div style={{ padding: 0 }}>
      <div className="inbox-container">
        <div className="filters-container">
          <ComplaintsLink isMobile={true} />
          {result}
        </div>
      </div>
    </div>
  );
};

export default MobileInbox;
