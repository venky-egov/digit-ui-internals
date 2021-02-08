import React from "react";
import { Dropdown } from "@egovernments/digit-ui-react-components";

export const configAssignDso = ({ t, dsoData, dso, selectDSO, vehicleMenu, vehicle, selectVehicle }) => ({
  label: {
    heading: "ES_FSM_ACTION_TITLE_ASSIGN_DSO",
    submit: "CS_COMMON_ASSIGN",
    cancel: "CS_COMMON_CANCEL",
  },
  form: [
    {
      body: [
        {
          label: t("ES_FSM_ACTION_DSO_NAME"),
          type: "dropdown",
          populators: <Dropdown option={dsoData} optionKey="name" id="dso" selected={dso} select={selectDSO} />,
        },
        {
          label: t("ES_FSM_ACTION_VEHICLE_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="i18nKey" id="vehicle" selected={vehicle} select={selectVehicle} />,
        },
        {
          label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
          type: "text",
          populators: {
            name: "capacity",
            validation: {
              required: true,
            },
            defaultValue: vehicle?.capacity,
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
      ],
    },
  ],
});
