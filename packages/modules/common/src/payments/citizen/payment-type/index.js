import React from "react";
import { Header, Card, RadioButtons, CardSubHeader, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

export const SelectPaymentType = (props) => {
  const { t } = useTranslation();

  const menu = ["Cash", "Cheque", "Debit/Credit Card"];
  const selectedOption = "Cheque";

  return (
    <React.Fragment>
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
        {menu?.length && <RadioButtons selectedOption={selectedOption} options={menu} onSelect={() => {}} />}
        <SubmitBar label="Pay" onSubmit={() => {}} />
      </Card>
    </React.Fragment>
  );
};
