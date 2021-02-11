import React, { useEffect, useState } from "react";
import { Card, KeyNote, Header, RadioButtons, CardSubHeader, TextInput, SubmitBar, Loader, ArrowLeft } from "@egovernments/digit-ui-react-components";
import BillSumary from "./bill-summary";
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";

const BillDetails = ({ paymentRules }) => {
  const history = useHistory();
  const { state, ...location } = useLocation();
  const { consumerCode } = useParams();
  const [bill, setBill] = useState(state?.bill);
  const tenantId = state?.tenantId || Digit.UserService.getUser().info.tenantId;

  const { data, isLoading } = state?.bill ? { isLoading: false } : Digit.Hooks.useFetchPayment({ tenantId, businessService: "PT", consumerCode });

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
  const [paymentAllowed, setPaymentAllowed] = useState(true);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    console.log(">>>>>>>>>>>>>", paymentRules);
  }, []);

  useEffect(() => {
    if (paymentType == "Full Amount") setAmount(getTotal());
  }, [paymentType, bill]);

  useEffect(() => {
    const { minAmountPayable, isAdvanceAllowed } = paymentRules;
    const allowPayment = minAmountPayable && amount >= minAmountPayable && !isAdvanceAllowed && amount <= getTotal();
    if (paymentType != "Full Amount") setPaymentAllowed(allowPayment);
    else setPaymentAllowed(true);
  }, [paymentType, amount]);

  useEffect(() => {
    if (!bill && data) {
      let requiredBill = data.Bill.filter((e) => e.consumerCode == consumerCode)[0];
      console.log("=================>>>>>>>", requiredBill, data.Bill);
      setBill(requiredBill);
    }
  }, [isLoading]);

  const onSubmit = () => {
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
        <div style={{ position: "sticky", bottom: "0", paddingBottom: "32px", backgroundColor: "rgba(255, 255, 255, var(--bg-opacity))" }}>
          <hr style={{ borderColor: "#e7e6e6", width: "100%", marginRight: "auto", marginLeft: "auto" }} />
          <CardSubHeader>Payment Amount</CardSubHeader>
          <RadioButtons
            selectedOption={paymentType}
            onSelect={setPaymentType}
            options={paymentRules.partPaymentAllowed ? ["Full Amount", "Custom Amount"] : ["Full Amount"]}
          />
          <div style={{ position: "relative" }}>
            <span style={getLabelStyle()}>₹</span>
            {paymentType !== "Full Amount" ? (
              <TextInput style={{ textIndent: "30px" }} onChange={(e) => setAmount(e.target.value)} value={amount} />
            ) : (
              <TextInput style={{ textIndent: "30px" }} value={getTotal()} onChange={() => {}} disable={true} />
            )}
          </div>
          <SubmitBar disabled={!paymentAllowed} onSubmit={onSubmit} label={"Pay"}></SubmitBar>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BillDetails;
