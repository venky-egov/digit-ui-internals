import React from "react";

export const configCompleteApplication = ({ t }) => ({
  label: {
    heading: "ES_FSM_ACTION_TITLE_COMPLETE_REQUEST",
    submit: "CS_COMMON_COMPLETE",
    cancel: "CS_COMMON_CANCEL",
  },
  form: [
    {
      body: [
        {
          label: t("ES_FSM_ACTION_DESLUGED_DATE_LABEL"),
          type: "date",
          populators: {
            name: "desluged",
          },
        },
        {
          label: t("ES_FSM_ACTION_WASTE_VOLUME_LABEL"),
          type: "text",
          populators: {
            name: "wasteVolume",
          },
        },
      ],
    },
  ],
});
