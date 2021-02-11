import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PTRoutes from "./pt";
// import { myBillMap } from "./myBillsKeysMap";

export const MyBills = ({ ...props }) => {
  const { businessService } = useParams();
  const { isLoading, data } = Digit.Hooks.useFetchCitizenBillsForBuissnessService({ businessService });
  const { tenantId } = Digit.UserService.getUser().info;
  const { isLoading: mdmsLoading, data: mdmsBillingData } = Digit.Hooks.useMdmsBillingServiceForBusinessService(tenantId);

  // useEffect(() => {
  //   if (mdmsBillingData) console.log(">>>>>>>>>>>>>>>>>>>", mdmsBillingData);
  // }, [mdmsLoading]);

  const billsList = data?.Bill || [];

  const getPaymentRestrictionDetails = () => {
    const payRestrictiondetails = mdmsBillingData?.MdmsRes?.BillingService?.BusinessService;
    if (payRestrictiondetails?.length) return payRestrictiondetails.filter((e) => e.code == businessService)[0];
    else
      return {
        // isAdvanceAllowed: false,
        // isVoucherCreationEnabled: true,
        // minAmountPayable: 100,
        // partPaymentAllowed: true,
      };
  };

  const getProps = () => ({ billsList, paymentRules: getPaymentRestrictionDetails() });

  const ComponentToLoad = () => {
    switch (businessService) {
      case "PT":
        return <PTRoutes {...getProps()} />;

      default:
        return <PTRoutes {...getProps()} />;
    }
  };

  return <React.Fragment>{ComponentToLoad()}</React.Fragment>;
};
