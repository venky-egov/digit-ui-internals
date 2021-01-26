import React, { useEffect, useState } from "react";
import { RadioButtons, FormComposer, Dropdown, CardSectionHeader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useCardPaymentDetails } from "./card";
import { useChequeDetails, ChequeDetailsComponent } from "./cheque";
import isEqual from "lodash/isEqual";
import {} from "../../../hoc/testForm-config";

export const CollectPayment = (props) => {
  // const { formData, addParams } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const { cardConfig } = useCardPaymentDetails(props);
  const { chequeConfig, date } = useChequeDetails(props);

  const [formState, setFormState] = useState({});

  const { consumerCode } = useParams();
  const defaultPaymentModes = [
    { code: "CASH", label: "Cash" },
    { code: "CHEQUE", label: "Cheque" },
    { code: "CARD", label: "Debit/Credit Card" },
    { code: "DD", label: "Demand Draft" },
    { code: "OFFLINE_NEFT", label: "Offline NEFT" },
    { code: "OFFLINE_RTGS", label: "Offline RTGS" },
    { code: "POSTAL_ORDER", label: "Postal Order" },
  ];

  const formConfigMap = {
    CHEQUE: chequeConfig,
    CARD: cardConfig,
  };

  const getPaymentModes = () => defaultPaymentModes;

  const [selectedPaymentMode, setPaymentMode] = useState(formState?.selectedPaymentMode || getPaymentModes()[0]);

  const paidByMenu = ["Owner", "Other"];

  const onSubmit = (data) => {
    console.log(data);
    history.push("success");
  };

  useEffect(() => {
    let el = document?.getElementById("paymentInfo");
    el?.scrollIntoView();
  }, [selectedPaymentMode]);

  const config = [
    {
      head: "Payment Details",
      body: [
        {
          label: "Total Amount",
          populators: <CardSectionHeader>₹ 500.00</CardSectionHeader>,
        },
      ],
    },
    {
      head: "Payer Details",
      body: [
        {
          label: "Paid By",
          isMandatory: true,
          type: "custom",
          populators: {
            name: "paidBy",
            customProps: { t, isMendatory: true, option: paidByMenu },
            component: (props, customProps) => (
              <Dropdown
                {...customProps}
                selected={props.value}
                select={(d) => {
                  props.onChange(d);
                }}
              />
            ),
            defaultValue: formState?.paidBy || paidByMenu[0],
          },
        },
        {
          label: "Payer Name",
          isMandatory: true,
          type: "text",
          populators: {
            name: "payerName",
            validation: {
              required: true,
              pattern: /^[A-Za-z]/,
            },
            error: "a valid name required",
            defaultValue: formState?.payerName || "",
          },
        },
        {
          label: "Payer Mobile",
          isMandatory: true,
          type: "text",
          populators: {
            name: "payerMobile",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
            error: "a valid mobile no. required",
            defaultValue: formState?.payerMobile || "",
          },
        },
      ],
    },
    {
      head: "Payment Mode",
      body: [
        {
          withoutLabel: true,
          type: "custom",
          populators: {
            name: "paymentMode",
            customProps: {
              options: getPaymentModes(),
              optionsKey: "label",
              style: { display: "flex", flexWrap: "wrap" },
              innerStyles: { minWidth: "33%" },
            },
            defaultValue: formState?.paymentMode || getPaymentModes()[0],
            component: (props, customProps) => (
              <RadioButtons
                selectedOption={props.value}
                onSelect={(d) => {
                  props.onChange(d);
                }}
                {...customProps}
              />
            ),
          },
        },
      ],
    },
  ];

  const getFormConfig = () => config.concat(formConfigMap[formState?.paymentMode?.code] || []);

  return (
    <React.Fragment>
      <FormComposer
        cardStyle={{ paddingBottom: "100px" }}
        heading={"Collect Payment"}
        label={"Generate Reciept"}
        config={getFormConfig()}
        onSubmit={onSubmit}
        formState={formState}
        onFormValueChange={(formValue) => {
          console.log(formValue);
          if (!isEqual(formValue.paymentMode, selectedPaymentMode)) {
            setFormState(formValue);
            setPaymentMode(formState.paymentMode);
          }
        }}
      ></FormComposer>
      {/* <ChequeDetailsComponent chequeDetails={{}} /> */}
    </React.Fragment>
  );
};
