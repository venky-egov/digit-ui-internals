import React, { useState } from "react";
import { Header, Card, RadioButtons, CardSubHeader, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

export const SelectPaymentType = (props) => {
  const { t } = useTranslation();

  const menu = ["UPI", "NEFT", "Debit/Credit Card"];

  const { control, handleSubmit } = useForm();

  const onSubmit = (d) => {
    console.log(d);
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
              1500
            </span>
          </div>

          <CardSubHeader>Select Payment Method</CardSubHeader>

          {menu?.length && (
            <Controller
              name="paymentType"
              defaultValue={"UPI"}
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
