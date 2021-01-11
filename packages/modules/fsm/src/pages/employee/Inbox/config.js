const config = {
  head: [
    {
      //exactly the component name which we want to import from react-components
      type: "TextInput",
      name: "name",
      validation: {
        required: true,
      },
      label: "Name",
    },
    {
      type: "Card",
      children: [
        {
          type: "CardHeader",
          label: "",
        },
      ],
    },
  ],
  lhs: [],
  rhs: [],
  main: [],
  foot: [],
};
