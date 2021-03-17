import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Header, Loader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import MyBill from "./my-bill";

export const BillListPT = ({ billsList, currentPath }) => {
  const { t } = useTranslation();
  const history = useHistory();

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
      //console.log("from PT", billableProps);

      billsList.forEach((bill) => {
        billsListObj[bill.consumerCode] = bill;
      });
      //console.log("from PT", billsListObj);

      const newBillsList = billableIDs.map((e) => ({ ...billsListObj[e], ...billableObj[e] }));
      //console.log(newBillsList);
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
    <div className="my-bills">
      <div style={{ flex: 1 }}>
        <Header>{t("CS_TITLE_MY_BILLS")}</Header>
        {propertyList?.length > 0 &&
          propertyList.map((bill, index) => (
            <div key={index}>
              <MyBill {...{ bill, currentPath }} />
            </div>
          ))}
        {!propertyList?.length > 0 && <p>{t("PT_NO_BILLS_FOUND")}</p>}
      </div>
      <p>
        {t("PT_TEXT_NOT_ABLE_TO_FIND_THE_PROPERTY")}{" "}
        <span className="link">
          <Link to="/digit-ui/citizen/pt/property/search">{t("PT_COMMON_CLICK_HERE")}</Link>
        </span>
      </p>
    </div>
  );
};
