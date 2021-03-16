import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Header, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import MyBill from "./my-bill";

export const BillList = ({ billsList, currentPath, businessService }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const consumerCodes = billsList.map((bill) => bill.consumerCode);
  const { mobileNumber, tenantId } = Digit.UserService.getUser().info;

  const searchResult = Digit.Hooks.useApplicationsForBusinessServiceSearch({ filters: {}, businessService });

  /* 
  call the relevant business search and find what key is being used as consumerCode in bills it is as follows :-

  FSM -> applicationNo
  PT -> propertyId

  */

  const keyForConsumerCode = searchResult.key;

  const [applicationList, setApplicationList] = useState([]);
  const billableApplicationsObj = useMemo(() => ({}), []);
  const billsListObj = useMemo(() => ({}), []);

  useEffect(() => {
    if (searchResult.data) searchResult.refetch();
  }, []);

  useEffect(() => {
    if (searchResult.data) {
      const billableApps = searchResult.data.filter((property) => consumerCodes.includes(property[keyForConsumerCode]));
      const billableIDs = billableApps.map((e) => e[keyForConsumerCode]);

      billableApps.forEach((app) => {
        billableApplicationsObj[app[keyForConsumerCode]] = app;
      });

      //console.log("from PT", billableProps);

      billsList.forEach((bill) => {
        billsListObj[bill.consumerCode] = bill;
      });
      //console.log("from PT", billsListObj);

      const newBillsList = billableIDs.map((e) => ({ ...billsListObj[e], ...billableApplicationsObj[e] }));
      //console.log(newBillsList);
      setApplicationList(newBillsList);
    }
  }, [searchResult.data]);

  const goToSearch = () => {
    history.push(`/digit-ui/citizen/pt/property/search`);
  };

  if (searchResult.isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div onClick={goToSearch} className="back-btn2">
        <ArrowLeft />
        <p>{t("PT_SEARCH_PROPERTY")}</p>
      </div>
      <Header>{t("CS_TITLE_MY_BILLS")}</Header>
      {applicationList?.length > 0 &&
        applicationList.map((bill, index) => (
          <div key={index}>
            <MyBill {...{ bill, currentPath, businessService }} />
          </div>
        ))}
      {!applicationList?.length > 0 && <p>No Bills Found.</p>}
    </React.Fragment>
  );
};
