import React from "react";
import { useTranslation } from "react-i18next";
import { Card, KeyNote, SubmitBar } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

const MyBill = ({ application }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <KeyNote keyValue={t("PT_PROPERTY_ID")} note={application.propertId} />
      <KeyNote keyValue={t("CS_OWNER_NAME")} note={application.ownerName || t("ES_TITLE_FSM")} />
      <KeyNote keyValue={t("PT_PROPERTY_ADDRESS")} note={application.propertyAddress || t("CS_APPLICATION_TYPE_DESLUDGING")} />
      <KeyNote keyValue={t("PT_DUE_DATE")} note={t(application.dueDate)} />
      <Link to={`/digit-ui/citizen/pt/property/bill-details/${application.propertId}`}>
        <SubmitBar label={t("CS_MY_APPLICATION_VIEW")} />
      </Link>
    </Card>
  );
};

export default MyBill;
