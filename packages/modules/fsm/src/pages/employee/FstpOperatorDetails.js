import React from "react";
import { DetailsCard, TextInput, ActionBar, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const FstpOperatorDetails = () => {
  const { t } = useTranslation();

  // TODO: below line is hard coded, it should come from server and there should be state added too
  const data = [
    {
      DSO: "Jagdamba Cleaners",
      "Vehicle No": "KA-25235",
      "Vehicle Capacity": "2500 ltrs",
      "Waste Collected": "2250 ltrs",
      "Waste Received": <TextInput />,
      Time: <TextInput />,
    },
  ];

  // TODO: below line is hard coded, it should come from server
  const wasteGeneratorsData = [
    {
      "Application No.": "FSM-789-78-21222",
      Locality: "Alakapuri",
      Usage: "Commercial / Mail",
      "Waste Collected": "1000 ltrs",
    },
    {
      "Application No.": "FSM-789-78-21222",
      Locality: "Alakapuri",
      Usage: "Commercial / Mail",
      "Waste Collected": "1000 ltrs",
    },
  ];

  return (
    <div>
      <DetailsCard data={data} />
      <h2 style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "8px", marginTop: "16px" }}>Waste Generators</h2>
      <DetailsCard data={wasteGeneratorsData} />
      <ActionBar>
        <SubmitBar label={t("ES_COMMON_SUBMIT")} submit />
      </ActionBar>
    </div>
  );
};

export default FstpOperatorDetails;
