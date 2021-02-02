import React from "react";
import FormComposer from "./FormComposer";
import { CustomCard } from "@egovernments/digit-ui-react-components";
import { AppContainer, EmployeeAppContainer } from "@egovernments/digit-ui-react-components";
import SearchPage from "./pages/index";

export const SearchPage = () => {
  return (
    <React.Fragment>
      {/* <CustomCard name="Custom Component"> */}
      {/* <h1>hello</h1> */}

      {/* </CustomCard> */}
      <EmployeeAppContainer>
        <SearchPage />
      </EmployeeAppContainer>
    </React.Fragment>
  );

  const config = [
    {
      head: t("Please provide at least one parameter to search for an application"),
      body: [
        {
          label: t("Application No."),
          type: "text",

          populators: {
            name: "applicationNo",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Trade License No."),
          type: "text",
          populators: {
            name: "name",
            validation: {
              pattern: /[A-Za-z]/,
            },
          },
        },
        {
          label: t("Owner Mobile No."),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Application Type"),
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={[]} id="city" optionKey="name" />,
        },
        {
          label: t("From Date"),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("To Date"),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Application Status"),
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={[]} id="city" optionKey="name" />,
        },
        {
          type: "dropdown",
          populators: <SubmitBar label={t("SEARCH")} submit="submit" onSubmit={(data) => onSubmit(data)} />,
        },
      ],
    },
  ];

  return <FormComposer heading="Search Trade License Application" config={config} onSubmit={onSubmit}></FormComposer>;
};
