import React from "react";
import { WorkFlowSteps } from "@egovernments/digit-ui-react-components";
import { defaultArray } from "./default-steps";

export const CreateComplaint = () => {
  const defaultComps = defaultArray();
  return <React.Fragment>{<WorkFlowSteps defaultComponents={defaultComps} deltas={Digit.deltaComplaintArr} />}</React.Fragment>;
};
