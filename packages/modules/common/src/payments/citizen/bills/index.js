import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BillListPT } from "./pt/my-bills";
// import { myBillMap } from "./myBillsKeysMap";

export const MyBills = ({ ...props }) => {
  const { businessService } = useParams();
  const { isLoading, data } = Digit.Hooks.useFetchCitizenBillsForBuissnessService({ businessService });

  useEffect(() => {
    if (data) console.log(">>>>>>>>>>>>>>>>>>>", data);
  }, [isLoading]);

  const billsList = (data && data.Bill) || [];

  const ComponentToLoad = () => {
    switch (businessService) {
      case "PT":
        return <BillListPT {...{ billsList }} />;

      default:
        return <BillListPT {...{ billsList }} />;
    }
  };

  return <React.Fragment>{ComponentToLoad()}</React.Fragment>;
};
