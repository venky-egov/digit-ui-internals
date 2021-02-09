import React from "react";
import { useTranslation } from "react-i18next";
import { Card, KeyNote, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import { Link, useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { acknowledgementIds } = useParams();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({
    tenantId,
    filters: { acknowledgementIds },
  });

  const application = data?.Properties[0];

  console.log({ application });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <KeyNote keyValue={t("CS_MY_APPLICATION_APPLICATION_NO")} note={application?.acknowldgementNumber} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_SERVICE_CATEGORY")} note={application?.serviceCategory || t("ES_TITLE_PT")} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_APPLICATION_TYPE")} note={application?.applicationType || t("CS_APPLICATION_TYPE_PT")} />
      <KeyNote keyValue={t("CS_APPLICATION_DETAILS_STATUS")} note={t("CS_COMMON_" + application?.status)} />
      <Link to={`/digit-ui/citizen/pt/property/my-bills`}>
        <SubmitBar label={t("CS_MY_APPLICATION_TRACK")} />
      </Link>
    </Card>
  );
};

export default ApplicationDetails;
