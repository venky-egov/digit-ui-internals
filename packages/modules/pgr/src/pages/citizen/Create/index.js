import React from "react";
import { WorkFlowSteps } from "@egovernments/digit-ui-react-components";
import { defaultArray } from "./default-steps";

export const CreateComplaint = () => {
  const defaultComps = defaultArray();
  const onSubmit = (formState) => {
    console.log("FormState called from form Submit", formState);
  };
  return <WorkFlowSteps defaultComponents={defaultComps} deltas={Digit.deltaComplaintArr} onSubmit={onSubmit} />;
};
