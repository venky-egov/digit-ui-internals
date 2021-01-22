const fsmCustomizations = {
  // DSO Edit Application Customizations
  getDsoEditApplicationCustomization: (t, config) => {
    // Below code is copied from docs or you can console.log config and copy and paste here
    const dsoConfig = [
      {
        name: "propertyDetails",
        fieldsOrder: ["propertyType", "propertySubType"],
        customFields: [
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
        customFields: [],
      },
      {
        name: "dsoDetails",
        fieldsOrder: ["assignedDso", "vehicleNo", "vehicleCapacity", "possibleServiceDate"],
        customFields: [],
      },
    ];

    return {
      disable: ["propertyDetails", "locationDetails", "paymentDetails"],
      config: dsoConfig,
    };
  },
  getApplicationCustomization: () => {},
};

const fsmComponents = {};

export { fsmCustomizations, fsmComponents };

// This thing will be in our docs
// const dsoConfig = [
//   {
//     name: "propertyDetails",
//     fieldsOrder: ["propertyType", "propertySubType"],
//     customFields: [
//       // {
//       //   name: "example",
//       //   label: t("Example"),
//       //   isMandatory: true,
//       //   type: "text",
//       //   populators: {
//       //     name: "example",
//       //     validation: { pattern: /[0-9]+/ },
//       //   },
//       //   disable: true,
//       // },
//     ],
//   },
//   {
//     name: "paymentDetails",
//     fieldsOrder: ["noOfTrips", "amount"],
//     customFields: [],
//   },
//   {
//     name: "dsoDetails",
//     fieldsOrder: ["assignedDso", "vehicleNo", "vehicleCapacity", "possibleServiceDate"],
//     customFields: [],
//   },
// ];
