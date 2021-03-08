import React from "react";

export const configCompleteApplication = ({ t, vehicle, applicationCreatedTime = 0, action }) => ({
  label: {
    heading: `ES_FSM_ACTION_TITLE_${action}`,
    submit: `CS_COMMON_${action}`,
    cancel: "CS_COMMON_CANCEL",
  },
  form: [
    {
      body: [
        {
          label: t("ES_FSM_ACTION_DESLUGED_DATE_LABEL"),
          isMandatory: true,
          type: "date",
          populators: {
            name: "desluged",
            max: new Date().toISOString().split("T")[0],
            defaultValue: new Date().toISOString().split("T")[0],
          },
        },
        {
          label: t("ES_FSM_ACTION_WASTE_VOLUME_LABEL"),
          type: "text",
          isMandatory: true,
          populators: {
            name: "wasteCollected",
            validation: {
              required: true,
              validate: (value) => value <= vehicle.capacity,
            },
            defaultValue: vehicle?.capacity,
          },
        },
      ],
    },
  ],
});
