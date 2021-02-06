import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configReassignDSO = ({ t, dsoData, dso, selectDSO, vehicleMenu, vehicle, selectVehicle }) => ({
  label: {
    heading: "ES_FSM_ACTION_TITLE_REASSIGN_DSO",
    submit: "CS_COMMON_ASSIGN",
    cancel: "CS_COMMON_CANCEL",
  },
  form: [
    {
      body: [
        {
          label: t("ES_FSM_ACTION_DSO_NAME"),
          type: "dropdown",
          populators: <Dropdown option={dsoData} optionKey="name" id="channel" selected={dso} select={selectDSO} />,
        },
        {
          label: t("ES_FSM_ACTION_VEHICLE_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
        },
        {
          label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
          type: "text",
          populators: {
            name: "capacity",
            validation: {
              required: true,
              pattern: /^[0-9]\d{6}$/,
            },
          },
        },
        {
          label: t("ES_FSM_ACTION_SERVICE_DATE"),
          type: "date",
          populators: {
            name: "date",
            validation: {
              required: true,
            },
          },
        },
        {
          label: t("ES_FSM_ACTION_REASSIGN_REASON"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
        },
      ],
    },
  ],
});
