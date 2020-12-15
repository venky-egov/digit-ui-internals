import React, { useState } from "react";

const useCreateSteps = (initialState = []) => {
  const [state, setState] = useState(initialState);

  const getAllStepNames = () => {
    return state.map((step) => step.urlPath);
  };

  const addFieldTo = (stepName, fields) => {
    setState((prevState) => prevState.map((step) => (step.urlPath === stepName ? { ...step, options: { ...step.options, fields } } : step)));
  };

  const addNewStep = (afterStepName, urlPath, Component) => {
    const newStep = {
      urlPath,
      component: () => <Component />,
    };

    if (afterStepName === "") {
      setState((prevState) => [newStep, ...prevState]);
    } else {
      setState((prevState) => {
        const updatedSteps = [];
        prevState.forEach((step) => {
          updatedSteps.push(step);
          if (step.urlPath === urlPath) {
            updatedSteps.push(newStep);
          }
        });
        return updatedSteps;
      });
    }
  };

  return { state, setState, getAllStepNames, addFieldTo, addNewStep };
};

export default useCreateSteps;
