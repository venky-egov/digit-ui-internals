import React from "react";
import { Banner, Card, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SuccessfulPayment = (props) => {
  const { addParams, clearParams } = props;
  const { t } = useTranslation();
  const { consumerCode } = useParams();

  const getMessage = () => "Success";
  return (
    <Card>
      <Banner message={getMessage()} complaintNumber={consumerCode} successful={true} />
      <CardText>{t("ES_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
      <Link to="/digit-ui/employee">
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export const FailedPayment = (props) => {
  const { addParams, clearParams } = props;
  const { t } = useTranslation();
  const { consumerCode } = useParams();

  const getMessage = () => "Failure !";
  return (
    <Card>
      <Banner message={getMessage()} complaintNumber={consumerCode} successful={false} />
      <CardText>{t("ES_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
      <Link to="/digit-ui/employee">
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};
