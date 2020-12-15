import React, { useEffect, useState } from "react";

const useCreateSteps = (initialState = []) => {
  const __initComplaints = window.Digit.SessionStorage.get("PGR_COMPLAINTS");
  const [state, setState] = useState(__initComplaints ? __initComplaints : initialState);
  // const [state, setState] = useState(__initComplaints.length > 0 ? __initComplaints : initialState);

  // TODO: here im saving the state into session storage but I think when we using component from session storage, we will get error bcz I think session storage don't know that where this component is come from
  // useEffect(() => {
  //   window.Digit.SessionStorage.set("PGR_COMPLAINTS", state);
  // }, [state]);

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
      options: {
        addFields: [],
      },
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
