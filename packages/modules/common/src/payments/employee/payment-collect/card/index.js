import React from "react";

export const useCardPaymentDetails = (props, t) => {
  const config = [
    {
      head: t("PAYMENT_CARD_HEAD"),
      headId: "paymentInfo",
      body: [
        {
          label: t("PAYMENT_CARD_LAST_DIGITS_LABEL"),
          type: "text",
          populators: {
            name: "instrumentNumber",
            validation: {
              required: true,
              pattern: /^\d{4}$/,
            },
            error: "a valid mobile no. required",
            minlength: "4",
            maxlength: "4",
          },
        },
        {
          label: t("PAYMENT_TRANS_NO_LABEL"),
          type: "text",
          populators: {
            name: "transactionNumber",
            validation: {
              required: true,
              pattern: /^\d{5,}$/,
            },
            error: "a valid mobile no. required",
            minlength: "12",
            maxlength: "20",
          },
        },
        {
          label: t("PAYMENT_RENTR_TRANS_LABEL"),
          type: "text",
          populators: {
            name: "reTransanctionNumber",
            validation: {
              required: true,
              pattern: /^\d{5,}$/,
            },
            error: "a valid mobile no. required",
            minlength: "12",
            maxlength: "20",
          },
        },
      ],
    },
  ];

  return { cardConfig: config };
};
