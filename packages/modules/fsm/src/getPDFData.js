import { getPropertyTypeLocale, getPropertySubtypeLocale } from "./utils";

const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

const getPDFData = (application, tenantInfo, t) => {
  return {
    t: t,
    tenantId: tenantInfo?.code,
    name: `${t(tenantInfo?.i18nKey)} ${ulbCamel(t("ULBGRADE_MUNICIPAL_CORPORATION"))}`,
    email: tenantInfo?.emailId,
    phoneNumber: tenantInfo?.contactNumber,
    heading: t("PDF_HEADER_DESLUDGING_REQUEST_ACKNOWLEDGEMENT"),
    details: [
      {
        title: t("CS_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("CS_MY_APPLICATION_APPLICATION_NO"), value: application?.applicationNo },
          {
            title: t("CS_APPLICATION_DETAILS_APPLICATION_DATE"),
            value: Digit.DateUtils.ConvertTimestampToDate(application?.auditDetails?.createdTime, "dd/MM/yyyy"),
          },
          { title: t("CS_APPLICATION_DETAILS_APPLICATION_CHANNEL"), value: application?.source || "NA" },
        ],
      },
      {
        title: t("CS_APPLICATION_DETAILS_APPLICANT_DETAILS"),
        values: [
          { title: t("CS_APPLICATION_DETAILS_APPLICANT_NAME"), value: application?.citizen?.name || "NA" },
          { title: t("CS_APPLICATION_DETAILS_APPLICANT_MOBILE"), value: application?.citizen?.mobileNumber || "NA" },
        ],
      },
      {
        title: t("CS_APPLICATION_DETAILS_PROPERTY_DETAILS"),
        values: [
          { title: t("CS_APPLICATION_DETAILS_PROPERTY_TYPE"), value: t(getPropertyTypeLocale(application?.propertyUsage)) || "NA" },
          { title: t("CS_APPLICATION_DETAILS_PROPERTY_SUB_TYPE"), value: t(getPropertySubtypeLocale(application?.propertyUsage)) || "NA" },
        ],
      },
      {
        title: t("CS_APPLICATION_DETAILS_PROPERTY_LOCATION_DETAILS"),
        values: [
          { title: t("CS_APPLICATION_DETAILS_PINCODE"), value: application?.address?.pincode || "NA" },
          { title: t("CS_APPLICATION_DETAILS_CITY"), value: application?.address?.city || "NA" },
          { title: t("CS_APPLICATION_DETAILS_MOHALLA"), value: application?.address?.locality?.name || "NA" },
          { title: t("CS_APPLICATION_DETAILS_STREET"), value: application.address?.street || "NA" },
          { title: t("CS_APPLICATION_DETAILS_DOOR_NO"), value: application.address?.doorNo || "NA" },
          { title: t("CS_APPLICATION_DETAILS_LANDMARK"), value: application.address?.landmark || "NA" },
        ],
      },
      {
        title: t("CS_APPLICATION_DETAILS_PIT_DETAILS"),
        values: [
          {
            title: t("CS_APPLICATION_DETAILS_PIT_TYPE"),
            value: application?.sanitationtype ? t("PITTYPE_MASTERS_" + application?.sanitationtype) : "NA",
          },
          {
            title: t("CS_APPLICATION_DETAILS_DIMENSION"),
            value:
              application?.pitDetail?.height && application?.pitDetail?.height !== null
                ? application?.pitDetail?.length
                  ? `${application?.pitDetail?.length}m * ${application?.pitDetail?.width}m * ${application?.pitDetail?.height}m`
                  : `${application?.pitDetail?.diameter}m * ${application?.pitDetail?.height}m`
                : "NA",
          },
          {
            title: t("CS_APPLICATION_DETAILS_DISTANCE_FROM_ROAD"),
            value: application?.pitDetail?.distanceFromRoad
              ? application?.pitDetail?.distanceFromRoad !== 0 && `${application?.pitDetail?.distanceFromRoad}m`
              : "NA",
          },
          { title: t("CS_APPLICATION_DETAILS_TRIPS"), value: application?.noOfTrips || "NA" },
          {
            title: t("CS_APPLICATION_DETAILS_AMOUNT_PER_TRIP"),
            value: application?.amountPerTrip ? application?.amountPerTrip !== 0 && `₹ ${application?.amountPerTrip}` : "NA",
          },
          {
            title: t("CS_APPLICATION_DETAILS_AMOUNT_DUE"),
            value: application?.amountDue && application?.amountDue !== 0 ? `₹ ${application?.amountDue}` : "NA",
          },
        ],
      },
    ],
  };
};

export default getPDFData;
