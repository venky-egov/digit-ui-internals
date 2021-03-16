import React from "react";
import { useTranslation } from "react-i18next";
import { Card, KeyNote, SubmitBar, CardSubHeader } from "@egovernments/digit-ui-react-components";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { getKeyNotesConfig } from "./keynotesConfig";

const MyBill = ({ bill, currentPath, businessService }) => {
  const { t } = useTranslation();
  const history = useHistory();

  onsubmit = () => {
    history.push(`${currentPath}/${bill.consumerCode}`, { bill });
  };

  return (
    <React.Fragment>
      <Card>
        {/* <KeyNote
          keyValue={t("CS_COMMON_AMOUNT_DUE")}
          note={"₹ " + (bill.totalAmount?.toFixed(2) || "N/A")}
          noteStyle={{ fontWeight: "bold", fontSize: "24px", paddingTop: "5px" }}
        />
        <KeyNote keyValue={t("PT_PROPERTY_ID")} note={bill.propertyId} />
        <KeyNote keyValue={t("CS_OWNER_NAME")} note={(bill.owners?.length && bill.owners[0].name) || t("ES_TITLE_FSM")} />
        <KeyNote keyValue={t("PT_PROPERTY_ADDRESS")} note={bill.address?.locality?.name || t("CS_APPLICATION_TYPE_DESLUDGING")} />
        <KeyNote keyValue={t("PT_DUE_DATE")} note={t(bill.dueDate)} /> */}
        {getKeyNotesConfig(businessService).map((obj, index) => {
          const value = obj.keyPath.reduce((acc, key) => {
            if (typeof key === "function") acc = key(acc);
            else acc = acc[key];
            return acc;
          }, bill);
          return <KeyNote key={index + obj.keyValue} keyValue={t(obj.keyValue)} note={value || obj.fallback} noteStyle={obj.noteStyle || {}} />;
        })}
        {/* <Link to={}> */}
        <SubmitBar disabled={!bill.totalAmount?.toFixed(2)} onSubmit={onsubmit} label={t("CS_MY_APPLICATION_VIEW_DETAILS")} />
        {/* </Link> */}
      </Card>
    </React.Fragment>
  );
};

export default MyBill;
