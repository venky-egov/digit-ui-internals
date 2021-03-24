import { Card, KeyNote, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MyApplication = ({ application }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <KeyNote keyValue={t("CS_MY_APPLICATION_APPLICATION_NO")} note={application.acknowldgementNumber} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_SERVICE_CATEGORY")} note={application.serviceCategory || t("ES_TITLE_PT")} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_APPLICATION_TYPE")} note={application.applicationType || t("CS_APPLICATION_TYPE_PT")} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_STATUS")} note={t("CS_COMMON_" + application.status)} />
      <Link to={`/digit-ui/citizen/pt/property/application/${application.acknowldgementNumber}`}>
        <SubmitBar label={t("CS_MY_APPLICATION_TRACK")} />
      </Link>
    </Card>
  );
};

export default MyApplication;
