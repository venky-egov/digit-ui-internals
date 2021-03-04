import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configRejectApplication = ({ t, rejectMenu, rejectionReason, selectReason, action }) => {
  return {
    label: {
      heading: `ES_FSM_ACTION_TITLE_${action.toUpperCase()}_REQUEST`,
      submit: `CS_COMMON_${action.toUpperCase()}`,
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t(`ES_FSM_ACTION_${action.toUpperCase()}_REASON`),
            type: "dropdown",
            populators: <Dropdown t={t} option={rejectMenu} id="reason" optionKey="code" selected={rejectionReason} select={selectReason} />,
          },
          {
            label: t("ES_FSM_ACTION_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
        ],
      },
    ],
  };
};
