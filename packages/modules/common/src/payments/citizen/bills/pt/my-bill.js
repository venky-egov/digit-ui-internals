import React from "react";
import { useTranslation } from "react-i18next";
import { Card, KeyNote, SubmitBar, CardSubHeader } from "@egovernments/digit-ui-react-components";

const MyBill = ({ bill }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Card>
        <KeyNote
          keyValue={t("CS_COMMON_AMOUNT_DUE")}
          note={"₹ " + bill.totalAmount.toFixed(2)}
          noteStyle={{ fontWeight: "bold", fontSize: "24px", paddingTop: "5px" }}
        />
        <KeyNote keyValue={t("PT_PROPERTY_ID")} note={bill.propertId} />
        <KeyNote keyValue={t("CS_OWNER_NAME")} note={bill.ownerName || t("ES_TITLE_FSM")} />
        <KeyNote keyValue={t("PT_PROPERTY_ADDRESS")} note={bill.propertyAddress || t("CS_APPLICATION_TYPE_DESLUDGING")} />
        <KeyNote keyValue={t("PT_DUE_DATE")} note={t(bill.dueDate)} />
        <SubmitBar label={t("CS_MY_APPLICATION_VIEW")} />
      </Card>
    </React.Fragment>
  );
};

export default MyBill;
