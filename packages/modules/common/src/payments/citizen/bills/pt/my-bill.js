import React from "react";
import { useTranslation } from "react-i18next";
import { Card, KeyNote, SubmitBar, CardSubHeader } from "@egovernments/digit-ui-react-components";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const MyBill = ({ bill, currentPath }) => {
  const { t } = useTranslation();
  const history = useHistory();

  console.log(bill);
  onsubmit = () => {
    history.push(`${currentPath}/${bill.consumerCode}`, { bill });
  };

  return (
    <React.Fragment>
      <Card>
        <KeyNote
          keyValue={t("CS_COMMON_AMOUNT_DUE")}
          note={"₹ " + bill.totalAmount?.toFixed(2)}
          noteStyle={{ fontWeight: "bold", fontSize: "24px", paddingTop: "5px" }}
        />
        <KeyNote keyValue={t("PT_PROPERTY_ID")} note={bill.propertyId} />
        <KeyNote keyValue={t("CS_OWNER_NAME")} note={(bill.owners?.length && bill.owners[0].name) || t("ES_TITLE_FSM")} />
        <KeyNote keyValue={t("PT_PROPERTY_ADDRESS")} note={bill.address?.locality?.name || t("CS_APPLICATION_TYPE_DESLUDGING")} />
        <KeyNote keyValue={t("PT_DUE_DATE")} note={t(bill.dueDate)} />
        {/* <Link to={}> */}
        <SubmitBar onSubmit={onsubmit} label={t("CS_MY_APPLICATION_VIEW")} />
        {/* </Link> */}
      </Card>
    </React.Fragment>
  );
};

export default MyBill;
