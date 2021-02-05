export const config = [
  {
    texts: {
      header: "SEARCH_PROPERTY",
      submitButtonLabel: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH",
      description: "PT_HOME_SEARCH_RESULTS_DESC",
    },
    inputs: [
      {
        label: "PT_HOME_SEARCH_RESULTS_OWN_MOB_LABEL",
        type: "text",
        name: "mobileNumber",
        error: "ERR_HRMS_INVALID_USER_ID",
      },
      {
        label: "PT_PROPERTY_UNIQUE_ID",
        type: "text",
        name: "propertyId",
        error: "ERR_HRMS_WRONG_PASSWORD",
      },
      {
        label: "PT_EXISTING_PROPERTY_ID",
        type: "text",
        name: "oldPropertyId",
        error: "ERR_HRMS_INVALID_CITY",
      },
    ],
  },
];
