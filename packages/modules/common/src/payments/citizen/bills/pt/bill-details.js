import React, { useEffect, useState } from "react";
import { Card, KeyNote, Header, RadioButtons, CardSubHeader, TextInput, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import BillSumary from "./bill-summary";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";

const BillDetails = () => {
  const history = useHistory();
  const { state, ...location } = useLocation();
  const { consumerCode } = useParams();
  const [bill, setBill] = useState(state?.bill);

  debugger;
  const { data, isLoading } = state?.bill ? { isLoading: false } : Digit.Hooks.useFetchCitizenBillsForBuissnessService({ businessService: "PT" });

  const billDetails = (bill?.billDetails.length && bill?.billDetails[0]) || [];

  const getBillingPeriod = () => {
    let from = new Date(billDetails.fromPeriod).getFullYear().toString();
    let to = new Date(billDetails.toPeriod).getFullYear().toString();
    return "FY " + from + "~" + to;
  };

  const getBillBreakDown = () => billDetails?.billAccountDetails || [];
  const getTotal = () => getBillBreakDown()?.reduce((total, tax) => total + tax.amount, 0) || 0;

  const getLabelStyle = () => {
    if (paymentType === "Full Amount")
      return { position: "absolute", backgroundColor: "#efefef", padding: " 6px 12px", border: "#9a9a9a solid 2px", color: "#9a9a9a" };
    else return { position: "absolute", backgroundColor: "#efefef", padding: " 6px 12px", border: "2px black solid" };
  };

  const [paymentType, setPaymentType] = useState("Full Amount");
  const [amount, setAmount] = useState(getTotal());

  useEffect(() => {
    if (paymentType == "Full Amount") setAmount(getTotal());
  }, [paymentType, bill]);

  useEffect(() => {
    if (!bill && data) {
      setBill(data.Bill.filter((e) => e.consumerCode == consumerCode)[0]);
    }
  }, [isLoading]);

  onsubmit = () => {
    console.log(location);
    let paymentAmount = paymentType === "Full Amount" ? getTotal() : amount;
    history.push(`/digit-ui/citizen/payment/collect/PT/${consumerCode}`, { paymentAmount });
  };

  if (isLoading) return <Loader />;

  return (
    <React.Fragment>
      <Header>Bill Details</Header>
      <Card>
        <KeyNote keyValue={"Unique_Property_Id"} note={consumerCode} />
        <KeyNote keyValue={"Billing_Period"} note={getBillingPeriod()} />
        <BillSumary billAccountDetails={getBillBreakDown()} />
        <CardSubHeader>Payment Amount</CardSubHeader>
        <RadioButtons selectedOption={paymentType} onSelect={setPaymentType} options={["Full Amount", "Custom Amount"]} />
        <div style={{ position: "relative" }}>
          <span style={getLabelStyle()}>₹</span>
          {paymentType !== "Full Amount" ? (
            <TextInput style={{ textIndent: "30px" }} onChange={(e) => setAmount(e.target.value)} value={amount} />
          ) : (
            <TextInput style={{ textIndent: "30px" }} value={getTotal()} disable={true} />
          )}
        </div>
        <SubmitBar onSubmit={onsubmit} label={"Pay"}></SubmitBar>
      </Card>
    </React.Fragment>
  );
};

export default BillDetails;
