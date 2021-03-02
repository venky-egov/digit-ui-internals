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
          {
            title: t("CS_APPLICATION_DETAILS_APPLICATION_CHANNEL"),
            value: t(`ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${application?.source}`) || "NA",
          },
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
          {
            title: t("CS_APPLICATION_DETAILS_MOHALLA"),
            value: t(`${application?.tenantId?.toUpperCase().split(".").join("_")}_ADMIN_${application?.address?.locality?.code}`) || "NA",
          },
          {
            title: t("CS_NEW_APPLICATION_SLUM_NAME"),
            value: application?.slum?.i18nKey ? t(`${application?.slum?.i18nKey}`) : "NA",
          },
          { title: t("CS_APPLICATION_DETAILS_STREET"), value: application?.address?.street || "NA" },
          { title: t("CS_APPLICATION_DETAILS_DOOR_NO"), value: application?.address?.doorNo || "NA" },
          { title: t("CS_APPLICATION_DETAILS_LANDMARK"), value: application?.address?.landmark || "NA" },
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
            // NOTE: value have too much whitespace bcz we want the text after whitespace should go to next line, so pls don't remove whitespace
            value:
              application?.pitDetail?.height && application?.pitDetail?.height !== null
                ? application?.pitDetail?.length
                  ? `${application?.pitDetail?.length}m * ${application?.pitDetail?.width}m * ${
                      application?.pitDetail?.height
                    }m                                  (${t("CS_COMMON_LENGTH")} x ${t("CS_COMMON_BREADTH")} x ${t("CS_COMMON_DEPTH")})`
                  : `${application?.pitDetail?.diameter}m * ${application?.pitDetail?.height}m                                  (${t(
                      "CS_COMMON_DIAMETER"
                    )} x ${t("CS_COMMON_DEPTH")})`
                : "NA",
          },
          {
            title: t("ES_FSM_ACTION_VEHICLE_TYPE"),
            value: application?.pdfVehicleType ? application?.pdfVehicleType : "NA",
          },
          { title: t("CS_APPLICATION_DETAILS_TRIPS"), value: application?.noOfTrips || "NA" },
          {
            title: t("CS_APPLICATION_DETAILS_AMOUNT_PER_TRIP"),
            value: application?.additionalDetails?.tripAmount
              ? application?.additionalDetails?.tripAmount !== 0 && `₹ ${application?.additionalDetails?.tripAmount}`
              : "NA",
          },
          {
            title: t("CS_APPLICATION_DETAILS_AMOUNT_DUE"),
            value:
              application?.additionalDetails?.tripAmount && application?.additionalDetails?.tripAmount !== 0
                ? `₹ ${application?.additionalDetails?.tripAmount * application?.noOfTrips}`
                : "NA",
          },
        ],
      },
    ],
  };
};

export default getPDFData;
