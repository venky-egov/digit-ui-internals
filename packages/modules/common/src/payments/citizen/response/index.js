import React, { useState } from "react";
import { Banner, Card, CardText, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SuccessfulPayment = (props) => {
  const { t } = useTranslation();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const egId = urlParams.get("eg_pg_txnid");
  const { isLoading, data: payments, isError } = Digit.Hooks.usePaymentUpdate({ egId });
  const [printing, setPrinting] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    <Card>
      <Banner message={t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE")} info="" successful={false} />
      <Link to="/digit-ui/citizen">
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>;
  }

  const paymentData = payments?.Payments[0];
  const printReciept = async () => {
    if (printing) return;
    setPrinting(true);
    const tenantId = paymentData?.tenantId;
    console.log("--------", { payments });
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };
    if (!paymentData?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(tenantId, { Payments: payments.Payments });
      // console.log({ response });
    }
    const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: response.filestoreIds[0] });
    if (fileStore && fileStore[response.filestoreIds[0]]) {
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
    setPrinting(false);
  };

  const bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_PAYMENT_MESSAGE`;

  return (
    <Card>
      <Banner
        message={t(bannerText)}
        info={t(`${bannerText}_DETAIL`)}
        applicationNumber={paymentData?.paymentDetails[0].receiptNumber}
        successful={true}
      />
      <React.Fragment>
        <div className="primary-label-btn d-flex" onClick={printReciept}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>
          {t("COMMON_PRINT_RECEIPT")}
        </div>
      </React.Fragment>
      <Link to="/digit-ui/citizen">
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
      <Link to="/digit-ui/citizen">
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};
