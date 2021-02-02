import React from "react";

export const useCardPaymentDetails = (props) => {
  const config = [
    {
      head: "Card Details",
      headId: "paymentInfo",
      body: [
        {
          label: "Last 4 Digits",
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
          label: "Transanction Number",
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
          label: "Re-enter Transanction Number",
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
