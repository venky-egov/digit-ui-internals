import React, { useEffect, useState } from "react";
import { Banner, Card, CardText, Loader, Row, StatusTable, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";

export const SuccessfulPayment = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { eg_pg_txnid: egId } = Digit.Hooks.useQueryParams();
  const [printing, setPrinting] = useState(false);
  const [allowFetchBill, setallowFetchBill] = useState(false);
  const { businessService: business_service, consumerCode, tenantId } = useParams();

  const { isLoading, data, isError } = Digit.Hooks.usePaymentUpdate({ egId }, business_service);

  const { label } = Digit.Hooks.useApplicationsForBusinessServiceSearch({ businessService: business_service }, { enabled: false });

  const { data: demand } = Digit.Hooks.useDemandSearch({ consumerCode, businessService: business_service }, { enabled: !isLoading });

  const { data: billData, isLoading: isBillDataLoading } = Digit.Hooks.useFetchPayment(
    { tenantId, consumerCode, businessService: business_service },
    { enabled: allowFetchBill }
  );

  const payments = data?.payments;

  useEffect(() => {
    return () => {
      queryClient.clear();
    };
  }, []);

  useEffect(() => {
    if (data && data.txnStatus && data.txnStatus !== "FAILURE") {
      setallowFetchBill(true);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const applicationNo = data?.applicationNo;

  const isMobile = window.Digit.Utils.browser.isMobile();

  if (isError || !payments || !payments.Payments || payments.Payments.length === 0 || data.txnStatus === "FAILURE") {
    return (
      <Card>
        <Banner message={t("CITIZEN_FAILURE_COMMON_PAYMENT_MESSAGE")} info="" successful={false} />

        {business_service !== "PT" ? (
          <Link to={`digit-ui/citizen`}>
            <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        ) : (
          <React.Fragment>
            <Link to={(applicationNo && `/digit-ui/citizen/payment/my-bills/${business_service}/${applicationNo}`) || "/digit-ui/citizen"}>
              <SubmitBar label={t("CS_PAYMENT_TRY_AGAIN")} />
            </Link>
            <div className="link" style={isMobile ? { marginTop: "8px", width: "100%", textAlign: "center" } : { marginTop: "8px" }}>
              <Link to={`digit-ui/citizen`}>{t("CORE_COMMON_GO_TO_HOME")}</Link>
            </div>
          </React.Fragment>
        )}
      </Card>
    );
  }

  const paymentData = data?.payments?.Payments[0];
  const amount = paymentData.totalAmountPaid;
  const transactionDate = paymentData.transactionDate;

  const printReciept = async () => {
    if (printing) return;
    setPrinting(true);
    const tenantId = paymentData?.tenantId;
    let response = { filestoreIds: [payments.Payments[0]?.fileStoreId] };
    if (!paymentData?.fileStoreId) {
      response = await Digit.PaymentService.generatePdf(tenantId, { Payments: payments.Payments });
    }
    const fileStore = await Digit.PaymentService.printReciept(tenantId, { fileStoreIds: response.filestoreIds[0] });
    if (fileStore && fileStore[response.filestoreIds[0]]) {
      window.open(fileStore[response.filestoreIds[0]], "_blank");
    }
    setPrinting(false);
  };

  const getBillingPeriod = (billDetails) => {
    const { taxPeriodFrom, taxPeriodTo } = billDetails || {};
    if (taxPeriodFrom && taxPeriodTo) {
      let from = new Date(taxPeriodFrom).getFullYear().toString();
      let to = new Date(taxPeriodTo).getFullYear().toString();
      return "FY " + from + "-" + to;
    } else return "N/A";
  };

  const bannerText = `CITIZEN_SUCCESS_${paymentData?.paymentDetails[0].businessService.replace(/\./g, "_")}_PAYMENT_MESSAGE`;

  // https://dev.digit.org/collection-services/payments/FSM.TRIP_CHARGES/_search?tenantId=pb.amritsar&consumerCodes=107-FSM-2021-02-18-063433

  // if (billDataLoading) return <Loader />;

  const rowContainerStyle = {
    padding: "4px 0px",
    justifyContent: "space-between",
  };

  return (
    <Card>
      <Banner
        message={t(bannerText)}
        info={t(`${bannerText}_DETAIL`)}
        applicationNumber={paymentData?.paymentDetails[0].receiptNumber}
        successful={true}
      />
      <CardText>{t("CS_PAYMENT_SUCCESSFUL_DESCRIPTION")}</CardText>
      <React.Fragment>
        <div className="primary-label-btn d-grid" onClick={printReciept}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>
          {t("COMMON_PRINT_RECEIPT")}
        </div>
      </React.Fragment>
      <StatusTable>
        <Row rowContainerStyle={rowContainerStyle} last label={t(label)} text={applicationNo} />
        {/** TODO : move this key and value into the hook based on business Service */}
        {business_service === "PT" && (
          <Row
            rowContainerStyle={{ padding: "4px 10px" }}
            last
            label={t("CS_PAYMENT_BILLING_PERIOD")}
            text={getBillingPeriod(demand?.Demands?.[0])}
          />
        )}

        {business_service === "PT" &&
          (isBillDataLoading ? (
            <Loader />
          ) : (
            <Row rowContainerStyle={{ padding: "4px 10px" }} last label={t("CS_PAYMENT_AMOUNT_PENDING")} text={billData?.Bill[0]?.totalAmount} />
          ))}

        <Row rowContainerStyle={rowContainerStyle} last label={t("CS_PAYMENT_TRANSANCTION_ID")} text={egId} />
        <Row rowContainerStyle={rowContainerStyle} last label={t("CS_PAYMENT_AMOUNT_PAID")} text={amount} />
        {business_service !== "PT" && (
          <Row
            rowContainerStyle={{ padding: "4px 10px" }}
            last
            label={t("CS_PAYMENT_TRANSANCTION_DATE")}
            text={transactionDate && new Date(transactionDate).toLocaleDateString("in")}
          />
        )}
      </StatusTable>
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
