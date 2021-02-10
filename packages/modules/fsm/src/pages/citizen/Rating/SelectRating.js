import React from "react";
import { RatingCard } from "@egovernments/digit-ui-react-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectRating = ({ parentRoute }) => {
  const { t } = useTranslation();
  const history = useHistory();
  // console.log("parent route", parentRoute);

  function log(data) {
    // history.push(`${parentRoute}/response`);
  }

  const config = {
    texts: {
      header: "CS_FSM_APPLICATION_RATE_HELP_TEXT",
      submitBarLabel: "CS_COMMON_SUBMIT",
    },
    inputs: [
      {
        type: "rate",
        maxRating: 5,
        label: t("CS_FSM_APPLICATION_RATE_TEXT"),
      },
      {
        name: "WHAT_WAS_GOOD",
        type: "checkbox",
        label: t("CS_FEEDBACK_WHAT_WAS_GOOD"),
        checkLabels: [t("CS_FEEDBACK_SERVICES"), t("CS_FEEDBACK_RESOLUTION_TIME"), t("CS_FEEDBACK_QUALITY_OF_WORK"), t("CS_FEEDBACK_OTHERS")],
      },
      {
        name: "WHAT_WAS_BAD",
        type: "checkbox",
        label: t("CS_FEEDBACK_WHAT_WENT_WRONG"),
        checkLabels: [
          t("CS_FEEDBACK_THERE_WAS_SPILLAGE"),
          t("CS_FEEDBACK_OPERATORS_WERE_WITHOUT_SAFETY_GEARS"),
          t("CS_FEEDBACK_RESOLUTION_TIME_WAS_LONG"),
          t("CS_FEEDBACK_OTHERS"),
        ],
      },
      {
        type: "textarea",
        label: t("CS_COMMON_COMMENTS"),
        name: "comments",
      },
    ],
  };
  return <RatingCard {...{ config: config }} t={t} onSelect={log} />;
};
export default SelectRating;
