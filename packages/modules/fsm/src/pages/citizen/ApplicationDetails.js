import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Header, Card, KeyNote, SubmitBar, LinkButton, Loader } from "@egovernments/digit-ui-react-components";
import { Link, useHistory, useParams } from "react-router-dom";
import getPDFData from "../../getPDFData";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data } = Digit.Hooks.fsm.useSearch(tenantId, { applicationNumber: id });
  const coreData = Digit.Hooks.useCoreData();

  if (isLoading) {
    return <Loader />;
  }
  const { fsm: applications } = data;
  if (applications.length === 0) {
    history.goBack();
  }

  const application = applications[0];
  const tenantInfo = coreData.tenants.find((tenant) => tenant.code === application.tenantId);

  const handleDownloadPdf = async () => {
    const data = getPDFData(application, tenantInfo, t, coreData?.stateInfo?.logoUrl);
    Digit.Utils.pdf.generate(data);
  };

  return (
    <React.Fragment>
      <Header>{t("CS_TITLE_APPLICATION_DETAILS")}</Header>
      <Card style={{ position: "relative" }}>
        <LinkButton
          label={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span style={{ color: "#f47738", marginLeft: "8px" }}>{t("CS_COMMON_DOWNLOAD")}</span>
            </div>
          }
          style={{ position: "absolute", top: 0, right: 20 }}
          onClick={handleDownloadPdf}
        />
        <KeyNote keyValue={t("CS_MY_APPLICATION_APPLICATION_NO")} note={application.applicationNo} />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_SERVICE_CATEGORY")} note={application.serviceCategory || "FSM"} />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_APPLICATION_TYPE")} note={application.applicationType || "Desludging Request"} />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_STATUS")} note={application.applicationStatus} />
        <KeyNote
          keyValue={t("CS_APPLICATION_DETAILS_APPLICATION_DATE")}
          note={Digit.DateUtils.ConvertTimestampToDate(application.auditDetails.createdTime)}
        />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_PROPERTY_TYPE")} note={t(`PROPERTYTAX_BILLING_SLAB_${application.propertyUsage}`)} />
        <KeyNote
          keyValue={t("CS_APPLICATION_DETAILS_PIT_SIZE")}
          note={`${application.pitDetail.length}m * ${application.pitDetail.width}m * ${application.pitDetail.height}m`}
        />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_NO_OF_TRIPS")} note={application.noOfTrips} />
        <KeyNote keyValue={t("CS_APPLICATION_DETAILS_DESLUDGING_CHARGES")} note={application.desuldgingCharges || "NA"} />
        {application.applicationStatus === "PENDING_APPL_FEE_PAYMENT" && (
          <Link to={`/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${application.applicationNo}`}>
            <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
          </Link>
        )}
      </Card>
    </React.Fragment>
  );
};

export default ApplicationDetails;
