import React from "react";
import { Banner, Card, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams, Link, LinkLabel } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SuccessfulPayment = (props) => {
  const { addParams, clearParams } = props;
  const { t } = useTranslation();
  const { consumerCode, receiptId, businessService} = useParams();

  const getMessage = () => "PAYMENT COLLECTED";
  console.log('--------->', consumerCode)

  const printReciept = () =>{
    const tenantId = Digit.ULBService.getCurrentTenantId();
    Digit.PaymentService.printReciept(tenantId,businessService,{receiptId});
  }

  return (
    <Card>
      <Banner message={getMessage()} info="Receipt No." applicationNumber={receiptId} successful={true} />
      <CardText>{t("The notification along with applicant number is sent to your applicant’s mobile number. Applicant can track the application status using mobile or web app.")}</CardText>
      <div className="primary-label-btn" onClick={printReciept}> &#xe045; PRINT RECEIPT </div>
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
