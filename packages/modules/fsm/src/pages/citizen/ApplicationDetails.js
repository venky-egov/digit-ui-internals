import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Header, Card, KeyNote, SubmitBar, LinkButton, Loader } from "@egovernments/digit-ui-react-components";
import { Link, useHistory, useParams } from "react-router-dom";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getPDFData = (application, tenantInfo, t, logoUrl) => {
  return {
    logo: tenantInfo.logoId ? tenantInfo.logoId : logoUrl,
    name: `${t(tenantInfo.i18nKey)} ${ulbCamel(t("ULBGRADE_MUNICIPAL_CORPORATION"))}`,
    email: tenantInfo.emailId,
    phoneNumber: tenantInfo.contactNumber,
    heading: "Desludging request - Acknowledgement",
    details: [
      {
        title: "Application Details",
        values: [
          { title: "Application No.", value: application.applicationNo },
          { title: "Application Date", value: Digit.DateUtils.ConvertTimestampToDate(application.auditDetails.createdTime, "dd/MM/yyyy") },
          { title: "Application Channel", value: application.source },
        ],
      },
      {
        title: "Applicant Details",
        values: [
          { title: "Applicant Name", value: application.citizen.name },
          { title: "Mobile No.", value: application.citizen.mobileNumber },
        ],
      },
      {
        title: "Property Details",
        values: [
          { title: "Property Type", value: t(`PROPERTYTYPE_MASTERS_${application.propertyUsage}`) },
          { title: "Property Sub Type", value: t(`PROPERTYTYPE_MASTERS_${application.propertyUsage}`) },
        ],
      },
      {
        title: "Property Location Details",
        values: [
          { title: "Pincode", value: application.address.pincode },
          { title: "City", value: application.address.city },
          { title: "Mohalla", value: application.address.locality.name },
          { title: "Street", value: application.address.street },
          { title: "Building No.", value: application.address.buildingName },
          { title: "Landmark", value: application.address.landmark },
        ],
      },
      {
        title: "Pit/Septic Tank Details",
        values: [
          { title: "Dimension", value: `${application.pitDetail.length}m * ${application.pitDetail.width}m * ${application.pitDetail.height}m` },
          { title: "Distance from Road", value: application.pitDetail.distanceFromRoad },
          { title: "No. of Trips", value: application.noOfTrips },
          { title: "Amount per Trip", value: "₹ NA" },
          { title: "Total Amount Due", value: "₹ NA" },
        ],
      },
    ],
  };
};
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
          onClick={() => Digit.Utils.pdf.generate(getPDFData(application, tenantInfo, t, coreData?.stateInfo?.logoUrl))}
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
