import SelectComplaintType from "./Steps/SelectComplaintType";
import SelectSubType from "./Steps/SelectSubType";
import SelectPincode from "./Steps/SelectPincode";
import SelectAddress from "./Steps/SelectAddress";
import SelectLandmark from "./Steps/SelectLandmark";
import SelectImages from "./Steps/SelectImages";
import SelectDetails from "./Steps/SelectDetails";
import Response from "./Steps/Response";
import { newComplaintSteps } from "./config";
import { useTranslation } from "react-i18next";
import React from "react";

export const defaultArray = () => {
  const { t } = useTranslation();

  const stepItems = newComplaintSteps.map((step, index) => {
    const texts = {};
    for (const key in step.texts) {
      texts[key] = t(step.texts[key]);
    }
    return { ...step, texts };
  });

  return [
    {
      component: (props) => <SelectComplaintType {...props} />,
      props: {
        config: stepItems[0],
        t: t,
      },
    },
    {
      component: (props) => <SelectSubType {...props} />,
      props: {
        config: stepItems[1],
        t: t,
      },
    },
    {
      component: (props) => <SelectPincode {...props} />,
      props: {
        config: stepItems[2],
        t: t,
      },
    },
    {
      component: (props) => <SelectAddress {...props} />,
      props: {
        config: stepItems[3],
        t: t,
      },
    },
    {
      component: (props) => <SelectLandmark {...props} />,
      props: {
        config: stepItems[4],
        t: t,
      },
    },
    {
      component: (props) => <SelectImages {...props} />,
      props: {
        config: stepItems[5],
        t: t,
      },
    },
    {
      component: (props) => <SelectDetails {...props} />,
      props: {
        config: stepItems[6],
        t: t,
      },
    },
    {
      component: (props) => <Response {...props} />,
      props: {
        config: stepItems[7],
        t: t,
      },
    },
  ];
};
