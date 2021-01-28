const capitalize = (text) => text.substr(0, 1).toUpperCase() + text.substr(1);
const ulbCamel = (ulb) => ulb.toLowerCase().split(" ").map(capitalize).join(" ");

// TODO: add localization
const getPDFData = (application, tenantInfo, t, logoUrl) => {
  return {
    logo: tenantInfo?.logoId ? tenantInfo?.logoId : logoUrl,
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
          { title: "Application Channel", value: application.source || "NA" },
        ],
      },
      {
        title: "Applicant Details",
        values: [
          { title: "Applicant Name", value: application.citizen.name || "NA" },
          { title: "Mobile No.", value: application.citizen.mobileNumber || "NA" },
        ],
      },
      {
        title: "Property Details",
        values: [
          { title: "Property Type", value: t(`PROPERTYTYPE_MASTERS_${application.propertyUsage}`) || "NA" },
          { title: "Property Sub Type", value: t(`PROPERTYTYPE_MASTERS_${application.propertyUsage}`) || "NA" },
        ],
      },
      {
        title: "Property Location Details",
        values: [
          { title: "Pincode", value: application.address.pincode || "NA" },
          { title: "City", value: application.address.city || "NA" },
          { title: "Mohalla", value: application.address.locality.name || "NA" },
          { title: "Street", value: application.address.street || "NA" },
          { title: "Building No.", value: application.address.buildingName || "NA" },
          { title: "Landmark", value: application.address.landmark || "NA" },
        ],
      },
      {
        title: "Pit/Septic Tank Details",
        values: [
          {
            title: "Dimension",
            value: `${application.pitDetail.length}m * ${application.pitDetail.width}m * ${application.pitDetail.height}m` || "NA",
          },
          { title: "Distance from Road", value: `${application.pitDetail.distanceFromRoad}m` || "NA" },
          { title: "No. of Trips", value: application.noOfTrips || "NA" },
          { title: "Amount per Trip", value: application.noOfTrips === 0 ? "NA" : `₹ ${application.noOfTrips}` },
          { title: "Total Amount Due", value: `₹ ${application.amountDue}` || "NA" },
        ],
      },
    ],
  };
};

export default getPDFData;
