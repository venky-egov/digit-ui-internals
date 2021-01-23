const fsmCustomizations = {
  // DSO Edit Application Customizations
  getDsoEditApplicationCustomization: (config, t) => {
    // Below code is copied from docs or you can console.log config and copy and paste here
    const dsoConfig = [
      {
        name: "propertyDetails",
        fieldsOrder: ["propertyType", "propertySubType"],
        addFields: [
          // {
          //   name: "example",
          //   label: t("Example"),
          //   isMandatory: true,
          //   type: "text",
          //   populators: {
          //     name: "example",
          //     validation: { pattern: /[0-9]+/ },
          //   },
          //   disable: true,
          // },
        ],
      },
      {
        name: "paymentDetails",
        fieldsOrder: ["noOfTrips", "amount"],
        addFields: [],
      },
      {
        name: "dsoDetails",
        fieldsOrder: ["assignedDso", "vehicleNo", "vehicleCapacity", "possibleServiceDate"],
        addFields: [],
      },
    ];

    return {
      disable: ["propertyDetails", "locationDetails", "paymentDetails"],
      config: dsoConfig,
    };
  },
  getEmployeeApplicationCustomization: (config, t) => {
    const employeeConfig = [
      {
        name: "applicationDetails",
        // fields: ["sanitationType", "applicationChannel"],
        // fieldsOrder: {sanitationType: 0, applicationChannel: 1}, // TODO
        allFields: true, // for example: If in applicationDetails you have 10 fields and in fieldsOrder you only enter 3 fields name then on browser you will only see 3 fields in that order but if you want to see rest of 7 fields at the bottom.
        // removeFields: ["applicantName"], // type the name of the field in camelCase to remove it
        addFields: [
          // by default all the custom fields will add at the bottom, you can add "field name" to "fieldsOrder" if you want them in your custom order.
          {
            name: "example",
            label: t("EXAMPLE"),
            type: "text",
            isMandatory: true,
            populators: {
              name: "example",
              validation: {
                required: true,
                pattern: /[A-Za-z]/,
              },
            },
          },
        ],
      },
    ];

    return {
      config: employeeConfig,
      defaultConfig: true, // You want to use defaultConfig and you only want to update one field section. The above employeeConfig is also an order for all the field section. So if defaultConfig is false then on browser you will only see those field section who are inside employeeConfig
    };
    // TODO: BUG: for example: In employeeConfig you only update propertyDetails and you make "defaultConfig: true", so the bug is now propertyDetails order will be 1 and then other will come at bottom
  },
};

const fsmComponents = {};

export { fsmCustomizations, fsmComponents };
