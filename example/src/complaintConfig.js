export const config = {
  add: {
    segment: "address",
    name: "door-number",
    inputs: [
      {
        type: "text",
        label: "Door Number",
        name: "door-number",
        validations: {
          isRequired: true,
        },
      },
    ],
  },
  remove: {
    segment: "address",
    name: "pincode",
  },
};
