import React, { useState } from "react";
import { LinkButton, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import StatusCount from "./StatusCount";

const Status = ({ onAssignmentChange, fsmfilters, roleStatuses }) => {
  const { t } = useTranslation();

  const userInfo = Digit.UserService.getUser();
  const userRoles = userInfo.info.roles.map((roleData) => roleData.code);

  const userRoleDetails = roleStatuses.filter((roleDetails) => userRoles.filter((role) => role === roleDetails.userRole)[0]);

  const mergedRoleDetails = userRoleDetails.reduce(
    (merged, details) => ({
      fixed: details?.fixed && merged?.fixed,
      statuses: [...details?.statuses, ...merged?.statuses],
      zeroCheck: details?.zeroCheck || merged?.zeroCheck,
    }),
    { statuses: [] }
  );

  const { data: applicationsWithCount, isLoading } = Digit.Hooks.fsm.useApplicationStatus(true);
  // console.log("find application stats", applicationsWithCount)

  const [moreStatus, showMoreStatus] = useState(false);

  const finalApplicationWithCount = mergedRoleDetails.statuses
    .map((roleDetails) => applicationsWithCount?.filter((application) => application.code === roleDetails)[0])
    .filter((status) => status?.code);

  const moreApplicationWithCount = applicationsWithCount?.filter(
    (application) => !finalApplicationWithCount.find((listedApplication) => listedApplication.code === application.code)
  );

  // console.log("find role status from here", applicationsWithCount , mergedRoleDetails, finalApplicationWithCount, moreApplicationWithCount);

  if (isLoading) {
    return <Loader />;
  }

  return finalApplicationWithCount ? (
    <div className="status-container">
      <div className="filter-label">{t("ES_INBOX_STATUS")}</div>
      {finalApplicationWithCount?.map((option, index) => (
        <StatusCount key={index} onAssignmentChange={onAssignmentChange} status={option} fsmfilters={fsmfilters} />
      ))}
      {moreStatus
        ? moreApplicationWithCount?.map((option, index) => (
            <StatusCount key={index} onAssignmentChange={onAssignmentChange} status={option} fsmfilters={fsmfilters} />
          ))
        : null}
      {mergedRoleDetails.fixed === false ? (
        <div className="filter-button" onClick={() => showMoreStatus(!moreStatus)}>
          {" "}
          {moreStatus ? t("ES_COMMON_LESS") : t("ES_COMMON_MORE")}{" "}
        </div>
      ) : null}
    </div>
  ) : null;
};

export default Status;
