import { Dropdown, Loader } from "@egovernments/digit-ui-react-components";
import { useState } from "react";

const ApplicantDetails = (t) => {
  const { data: channelMenu, isLoading } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");

  const [channel, setChannel] = useState();

  return {
    head: t("ES_TITLE_APPLICATION_DETAILS"),
    body: [
      {
        label: t("ES_NEW_APPLICATION_APPLICATION_CHANNEL"),
        type: "dropdown",
        populators: isLoading ? (
          <Loader />
        ) : (
          <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} />
        ),
      },
      {
        label: t("ES_NEW_APPLICATION_APPLICANT_NAME"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "applicantName",
          validation: {
            required: true,
            pattern: /[A-Za-z]/,
          },
        },
      },
      {
        label: t("ES_NEW_APPLICATION_APPLICANT_MOBILE_NO"),
        type: "text",
        isMandatory: true,
        populators: {
          name: "mobileNumber",
          validation: {
            required: true,
            pattern: /^[6-9]\d{9}$/,
          },
        },
      },
    ],
  };
};

export default ApplicantDetails;
