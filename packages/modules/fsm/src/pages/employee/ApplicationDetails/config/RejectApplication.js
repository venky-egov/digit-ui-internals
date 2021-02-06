import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configRejectApplication = ({ t, vehicleMenu, vehicle, selectVehicle }) => ({
  label: {
    heading: "ES_FSM_ACTION_TITLE_DECLINE_REQUEST",
    submit: "CS_COMMON_DECLINE",
    cancel: "CS_COMMON_CANCEL",
  },
  form: [
    {
      body: [
        {
          label: t("ES_FSM_ACTION_DECLINE_REASON"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
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
});
