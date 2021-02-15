import React, { useState } from "react";
import { Header, Card, RadioButtons, CardSubHeader, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useParams, useRouteMatch, useHistory, useLocation } from "react-router-dom";

export const SelectPaymentType = (props) => {
  const { state } = useLocation();
  const paymentAmount = state?.paymentAmount;
  const { t } = useTranslation();
  const history = useHistory();
  const { path: currentPath } = useRouteMatch();
  const menu = ["AXIS"];
  const { consumerCode, businessService } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { control, handleSubmit } = useForm();
  const { data: paymentdetails } = Digit.Hooks.useFetchPayment({ tenantId: tenantId, consumerCode, businessService });

  const billDetails = paymentdetails?.Bill ? paymentdetails?.Bill[0] : {};
  console.log({ billDetails, payment: paymentdetails?.Bill });

  const onSubmit = async (d) => {
    const filterData = {
      Transaction: {
        tenantId: tenantId,
        txnAmount: paymentAmount || billDetails.totalAmount,
        module: businessService,
        billId: billDetails.id,
        consumerCode: consumerCode,
        productInfo: "Common Payment",
        gateway: "AXIS",
        taxAndPayments: [
          {
            billId: billDetails.id,
            amountPaid: paymentAmount || billDetails.totalAmount,
          },
        ],
        user: {
          name: billDetails.payerName,
          mobileNumber: billDetails.mobileNumber,
          tenantId: tenantId,
        },
        callbackUrl: `${window.location.protocol}//${window.location.host}/digit-ui/citizen/payment/success`,
        additionalDetails: {
          isWhatsapp: false,
        },
      },
    };
    debugger;
    const data = await Digit.PaymentService.createCitizenReciept(tenantId, filterData);
    const redirectUrl = data?.Transaction?.redirectUrl;
    window.location = redirectUrl;
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>Payment</Header>
        <Card>
          <div
            className="detail"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "25px",
            }}
          >
            <span className="label">
              <h2>Total Amount Due</h2>
            </span>
            <span style={{ fontSize: "20px" }} className="name">
              ₹ {paymentAmount || billDetails.totalAmount}
            </span>
          </div>

          <CardSubHeader>Select Payment Method</CardSubHeader>

          {menu?.length && (
            <Controller
              name="paymentType"
              defaultValue={menu[0]}
              control={control}
              render={(props) => <RadioButtons selectedOption={props.value} options={menu} onSelect={props.onChange} />}
            />
          )}
          <SubmitBar label="Pay" submit={true} />
        </Card>
      </form>
    </React.Fragment>
  );
};
