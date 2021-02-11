import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Header, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import MyBill from "./my-bill";

export const BillListPT = ({ billsList, currentPath }) => {
  const { t } = useTranslation();
  const history = useHistory();

  console.log(currentPath);
  const propertyIds = billsList.map((bill) => bill.consumerCode);
  const { mobileNumber, tenantId } = Digit.UserService.getUser().info;
  const result = Digit.Hooks.pt.usePropertySearch({ tenantId, filters: { mobileNumber } });
  const [propertyList, setPropertyList] = useState([]);
  const billableObj = useMemo(() => ({}), []);
  const billsListObj = useMemo(() => ({}), []);

  useEffect(() => {
    if (result.data) result.revalidate();
  }, []);

  useEffect(() => {
    if (result.data) {
      const billableProps = result.data.Properties.filter((prop) => propertyIds.includes(prop.propertyId));
      const billableIDs = billableProps.map((e) => e.propertyId);

      billableProps.forEach((prop) => {
        billableObj[prop.propertyId] = prop;
      });

      billsList.forEach((bill) => {
        billsListObj[bill.consumerCode] = bill;
      });

      const newBillsList = billableIDs.map((e) => ({ ...billsListObj[e], ...billableObj[e] }));
      console.log(newBillsList);
      setPropertyList(newBillsList);
    }
  }, [result.data]);

  const goToSearch = () => {
    history.push(`/digit-ui/citizen/pt/property/search`);
  };

  if (result.isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div onClick={goToSearch} className="back-btn2">
        <ArrowLeft />
        <p>Search Property</p>
      </div>
      <Header>{t("CS_TITLE_MY_BILLS")}</Header>
      {propertyList?.length > 0 &&
        propertyList.map((bill, index) => (
          <div key={index}>
            <MyBill {...{ bill, currentPath }} />
          </div>
        ))}
    </React.Fragment>
  );
};
