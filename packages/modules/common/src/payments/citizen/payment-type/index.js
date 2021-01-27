import React, { useState } from "react";
import { Header, Card, RadioButtons, CardSubHeader, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

export const SelectPaymentType = (props) => {
  const { t } = useTranslation();

  const menu = ["Online Payment"];
  const { consumerCode, businessService } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { control, handleSubmit } = useForm();
  const { data: paymentdetails } = Digit.Hooks.useFetchPayment({ tenantId: tenantId, consumerCode, businessService });
  const billDetails = paymentdetails?.Bill ? paymentdetails?.Bill[0] : {};
  console.log({ billDetails, payment: paymentdetails?.Bill });

  const onSubmit = (d) => {
    console.log(d);
    // Req details
    const url = "/pg-service/transaction/v1/_create";
    const method = "POST";
    const reqData = {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: ".01",
        action: "_create",
        did: "1",
        key: "",
        msgId: "20170310130900|en_IN",
        requesterId: "",
        authToken: "87330839-8797-4ad4-96b6-8d33f5b76ebe",
      },
      Transaction: {
        tenantId: "pb.amritsar",
        txnAmount: 0,
        module: "TL",
        billId: "9e754ee2-b76f-4a90-8a48-552ad943e16f",
        consumerCode: "PB-TL-2020-03-27-005274",
        productInfo: "Common Payment",
        gateway: "AXIS",
        taxAndPayments: [
          {
            billId: "9e754ee2-b76f-4a90-8a48-552ad943e16f",
            amountPaid: 0,
          },
        ],
        user: {
          name: "Shreya B",
          mobileNumber: "9686987977",
          tenantId: "pb.amritsar",
        },
        callbackUrl: "https://egov-micro-dev.egovernments.org/citizen/egov-common/paymentRedirectPage",
        additionalDetails: {
          isWhatsapp: false,
        },
      },
    };
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
              {billDetails.totalAmount}
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
