export const getKeyNotesConfig = (businessService) => {
  const businessId = businessService?.toLowerCase().split(".")[0];
  switch (businessId) {
    case "pt":
      return [
        {
          keyValue: "CS_COMMON_AMOUNT_DUE",
          keyPath: ["totalAmount", (d) => d.toFixed(2), (d) => "₹" + d],
          fallback: "N/A",
          noteStyle: { fontWeight: "bold", fontSize: "24px", paddingTop: "5px" },
        },
        {
          keyValue: "PT_PROPERTY_ID",
          keyPath: ["propertyId"],
          fallback: "",
        },
        {
          keyValue: "CS_OWNER_NAME",
          keyPath: [
            (d) => {
              console.log(">>/>>/>>/", d);
              return d;
            },
            "owners",
            (d) => {
              return d;
            },
            0,
            "name",
          ],
          fallback: "ES_TITLE_FSM",
        },

        {
          keyValue: "PT_PROPERTY_ADDRESS",
          keyPath: ["address", "locality", "name"],
          fallback: "CS_APPLICATION_TYPE_DESLUDGING",
        },
      ];

    case "fsm":
      return [
        {
          keyValue: "CS_COMMON_AMOUNT_DUE",
          keyPath: ["totalAmount", (d) => d.toFixed(2), (d) => "₹" + d],
          fallback: "N/A",
          noteStyle: { fontWeight: "bold", fontSize: "24px", paddingTop: "5px" },
        },
      ];
  }
};
