const ApplicantDetails = {
  head: "ES_TITLE_APPLICANT_DETAILS",
  body: [
    {
      label: "ES_NEW_APPLICATION_APPLICATION_CHANNEL",
      isMandatory: true,
      type: "component",
      key: "channel",
      component: "SelectChannel",
      nextStep: "applicantName",
    },
    {
      type: "component",
      key: "applicantDetails",
      component: "SelectName",
    },
  ],
};

export default ApplicantDetails;
