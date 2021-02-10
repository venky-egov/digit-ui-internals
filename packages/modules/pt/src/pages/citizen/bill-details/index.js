import React, { useState } from "react";
import { Card, KeyNote, Header, RadioButtons, CardSubHeader, TextInput, SubmitBar } from "@egovernments/digit-ui-react-components";
import BillSumary from "./bill-summary";
import { useParams } from "react-router-dom";

export const BillDetails = ({}) => {
  const [paymentType, setPaymentType] = useState("Full Amount");
  const [amount, setAmount] = useState("6000");
  const { uniquePropertyId } = useParams();

  const application = { billingPeriod: "sdadsds" };

  const getInputStyle = () => {
    if (paymentType === "Full Amount") return { textIndent: "30px", border: "#9a9a9a solid 2px", color: "#9a9a9a" };
    else return { textIndent: "30px" };
  };

  const getLabelStyle = () => {
    if (paymentType === "Full Amount")
      return { position: "absolute", backgroundColor: "#efefef", padding: " 6px 12px", border: "#9a9a9a solid 2px", color: "#9a9a9a" };
    else return { position: "absolute", backgroundColor: "#efefef", padding: " 6px 12px", border: "2px black solid" };
  };

  return (
    <React.Fragment>
      <Header>Bill Details</Header>
      <Card>
        <KeyNote keyValue={"Unique_Property_Id"} note={uniquePropertyId} />
        <KeyNote keyValue={"Billing_Period"} note={application.billingPeriod} />
        <BillSumary />
        <CardSubHeader>Payment Amount</CardSubHeader>
        <RadioButtons selectedOption={paymentType} onSelect={setPaymentType} options={["Full Amount", "Custom Amount"]} />
        <div style={{ position: "relative" }}>
          <span style={getLabelStyle()}>₹</span>
          <TextInput
            style={getInputStyle()}
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            disable={paymentType === "Full Amount"}
          ></TextInput>
        </div>
        <SubmitBar label={"Pay"}></SubmitBar>
      </Card>
    </React.Fragment>
  );
};
