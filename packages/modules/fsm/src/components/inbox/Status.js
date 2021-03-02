import React from "react";
import { CheckBox, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const Status = ({ onAssignmentChange, fsmfilters }) => {
  const { t } = useTranslation();
  const { data: applicationsWithCount, isLoading } = Digit.Hooks.fsm.useApplicationStatus();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="status-container">
      <div className="filter-label">{t("ES_INBOX_STATUS")}</div>
      {applicationsWithCount?.map((option, index) => (
        <CheckBox
          key={index}
          onChange={(e) => onAssignmentChange(e, option)}
          checked={fsmfilters.applicationStatus.filter((e) => e.name === option.name).length !== 0 ? true : false}
          label={t(option.name)}
        />
      ))}
    </div>
  );
};

export default Status;
