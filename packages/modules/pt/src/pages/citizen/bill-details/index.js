import React, { useState } from "react";
import {
  Card,
  KeyNote,
  CardHeader,
  Header,
  RadioButtons,
  CardSubHeader,
  TextInput,
  SubmitBar,
  BackButton,
} from "@egovernments/digit-ui-react-components";
import BillSumary from "./bill-summary";

export const BillDetails = ({ application }) => {
  const [paymentType, setPaymentType] = useState("Full Amount");
  const [amount, setAmount] = useState("6000");

  return (
    <React.Fragment>
      <BackButton />

      <Header>Bill Details</Header>
      <Card>
        <KeyNote keyValue={"Unique_Property_Id"} note={application.uniquePropertyId} />
        <KeyNote keyValue={"Billing_Period"} note={application.billingPeriod} />
        <BillSumary />

        <CardSubHeader>Payment Amount</CardSubHeader>
        <RadioButtons selectedOption={paymentType} onSelect={setPaymentType} options={["Full Amount", "Custom Amount"]} />
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", backgroundColor: "#efefef", padding: " 6px 12px", border: "2px black solid" }}>₹</span>
          <TextInput
            style={{ textIndent: "30px" }}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            disabled={paymentType === "Full Amount"}
          ></TextInput>
        </div>
        <SubmitBar label={"Pay"}></SubmitBar>
      </Card>
    </React.Fragment>
  );
};
