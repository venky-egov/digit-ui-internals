export const getKeyNotesConfig = (businessService) => {
  const businessId = businessService?.toLowerCase().split(".")[0];

  switch (businessId) {
    case "pt":
      return {
        "my-bill": [
          {
            keyValue: "CS_COMMON_AMOUNT_DUE",
            keyPath: ["totalAmount", (d) => "₹" + d.toFixed(2)],
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
            keyPath: ["owners", 0, "name"],
            fallback: "ES_TITLE_FSM",
          },
          {
            keyValue: "PT_PROPERTY_ADDRESS",
            keyPath: ["address", "locality", "name"],
            fallback: "CS_APPLICATION_TYPE_DESLUDGING",
          },
          {
            keyValue: "PT_DUE_DATE",
            keyPath: [
              "billDetails",
              (d) => {
                if (!d[0]?.toPeriod) return "N/A";
                const date = new Date(d[0]?.toPeriod);
                return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
              },
            ],
            fallback: "N/A",
          },
        ],
        response: [],
      };

    /**<Row rowContainerStyle={{ padding: "4px 10px" }} last label={t("CS_PAYMENT_TRANSANCTION_ID")} text={egId} />
        <Row rowContainerStyle={{ padding: "4px 10px" }} last label={t("CS_PAYMENT_AMOUNT_PAID")} text={amount} />
        <Row
          rowContainerStyle={{ padding: "4px 10px" }}
          last
          label={t("CS_PAYMENT_TRANSANCTION_DATE")}
          text={transactionDate && new Date(transactionDate).toLocaleDateString("in")}
        /> */

    case "fsm":
      return {
        "my-bill": [
          {
            keyValue: "CS_COMMON_AMOUNT_DUE",
            keyPath: ["totalAmount", (d) => d.toFixed(2), (d) => "₹" + d],
            fallback: "N/A",
            noteStyle: { fontWeight: "bold", fontSize: "24px", paddingTop: "5px" },
          },
        ],
        response: [],
      };
  }
};
