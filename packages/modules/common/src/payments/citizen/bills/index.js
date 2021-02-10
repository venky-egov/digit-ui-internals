import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PTRoutes from "./pt";
// import { myBillMap } from "./myBillsKeysMap";

export const MyBills = ({ ...props }) => {
  const { businessService } = useParams();
  const { isLoading, data } = Digit.Hooks.useFetchCitizenBillsForBuissnessService({ businessService });

  useEffect(() => {
    if (data) console.log(">>>>>>>>>>>>>>>>>>>", data);
  }, [isLoading]);

  const billsList = data?.Bill || [];

  const ComponentToLoad = () => {
    switch (businessService) {
      case "PT":
        return <PTRoutes {...{ billsList }} />;

      default:
        return <PTRoutes {...{ billsList }} />;
    }
  };

  return <React.Fragment>{ComponentToLoad()}</React.Fragment>;
};
