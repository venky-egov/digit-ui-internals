import React, { useEffect, useState } from "react";
import { Loader, RatingCard } from "@egovernments/digit-ui-react-components";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectRating = ({ parentRoute }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];
  const history = useHistory();
  let { id: applicationNos } = useParams();
  const { isError, error, data: application } = Digit.Hooks.fsm.useSearchAll(tenantId, { applicationNos });
  const { isLoading, data: checklistData } = Digit.Hooks.fsm.useMDMS(stateId, "FSM", "Checklist");
  const [answers, setAnswers] = useState({});

  async function log(data) {
    const { rating } = data;
    const allAnswers = { ...data, ...answers };
    let checklist = Object.keys(allAnswers).reduce((acc, key) => {
      if (key === "comments" || key === "rating") {
        return acc;
      }
      acc.push({ code: key, value: Array.isArray(allAnswers[key]) ? allAnswers[key].join(",") : allAnswers[key] });
      return acc;
    }, []);

    const [applicationData] = application;
    applicationData.additionalDetails = {
      CHECKLIST: checklist,
    };
    const requestBody = {
      fsm: {
        ...applicationData,
      },
      workflow: {
        action: "SUBMIT_FEEDBACK",
        rating,
      },
    };
    const result = await Digit.FSMService.update(requestBody, tenantId);
    // history.push(`${parentRoute}/response`);
  }

  const handleSelect = (key) => {
    return (value) => {
      setAnswers({ ...answers, [key]: value });
    };
  };

  if (isLoading) {
    return <Loader />;
  }

  const inputs = checklistData?.FSM?.CheckList.map((item) => ({
    type: item.type === "SINGLE_SELECT" ? "radio" : "checkbox",
    checkLabels: item.options,
    onSelect: item.type === "SINGLE_SELECT" ? handleSelect(item.code) : null,
    selectedOption: item.type === "SINGLE_SELECT" ? answers[item.code] : null,
    name: item.code,
    label: item.code,
  }));

  const config = {
    texts: {
      header: "CS_FSM_APPLICATION_RATE_HELP_TEXT",
      submitBarLabel: "CS_COMMON_SUBMIT",
    },
    inputs: [
      {
        type: "rate",
        maxRating: 5,
        label: t("CS_FSM_APPLICATION_RATE_TEXT"),
      },
      // {
      //   name: "WHAT_WAS_GOOD",
      //   type: "checkbox",
      //   label: t("CS_FEEDBACK_WHAT_WAS_GOOD"),
      //   checkLabels: [t("CS_FEEDBACK_SERVICES"), t("CS_FEEDBACK_RESOLUTION_TIME"), t("CS_FEEDBACK_QUALITY_OF_WORK"), t("CS_FEEDBACK_OTHERS")],
      // },
      // {
      //   name: "WHAT_WAS_BAD",
      //   type: "checkbox",
      //   label: t("CS_FEEDBACK_WHAT_WENT_WRONG"),
      //   checkLabels: [
      //     t("CS_FEEDBACK_THERE_WAS_SPILLAGE"),
      //     t("CS_FEEDBACK_OPERATORS_WERE_WITHOUT_SAFETY_GEARS"),
      //     t("CS_FEEDBACK_RESOLUTION_TIME_WAS_LONG"),
      //     t("CS_FEEDBACK_OTHERS"),
      //   ],
      // },
      {
        type: "textarea",
        label: t("CS_COMMON_COMMENTS"),
        name: "comments",
      },
    ],
  };
  return <RatingCard config={{ ...config, inputs: [...inputs, ...config.inputs] }} t={t} onSelect={log} />;
};
export default SelectRating;
