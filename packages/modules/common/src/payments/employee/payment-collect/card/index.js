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
            name: "cardLastDigits",
            validation: {
              required: true,
              pattern: /^\d{4}$/,
            },
            error: "a valid mobile no. required",
          },
        },
        {
          label: "Transanction Number",
          type: "text",
          populators: {
            name: "transanctionNumber",
            validation: {
              required: true,
              pattern: /^\d{5,}$/,
            },
            error: "a valid mobile no. required",
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
          },
        },
      ],
    },
  ];

  return { cardConfig: config };
};
