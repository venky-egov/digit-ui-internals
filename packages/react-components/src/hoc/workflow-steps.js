import React, { useReducer, useCallback, useEffect, useState, useMemo, useRef } from "react";

const WorkflowSteps = ({ defaultComponents, onSubmit, deltas, ...props }) => {
  const formReducer = useCallback((state, action) => {
    let obj = {};
    for (const key in action.delta) {
      obj[key] = action.delta[key];
    }
    // Digit.SessionStorage.set("PGR_CREATE_COMPLAINT_PARAMS", { ...state, ...obj });
    switch (action.type) {
      case "EDIT":
        return { ...state, ...obj };

      case "SUBMIT":
        return state;

      case "CLEAR":
        Digit.SessionStorage.set("PGR_CREATE_COMPLAINT_PARAMS", null);
        return {};

      default:
        return state;
    }
  }, []);

  const [formState, dispatcher] = useReducer(formReducer, Digit.SessionStorage.get("PGR_CREATE_COMPLAINT_PARAMS"));
  const [step, setStep] = useState(() => 0);
  const [maxAllowedStep, setMaxStep] = useState(() => 0);
  let prevStepNo = useRef(0);

  useEffect(() => {
    console.log("newest step in comp", step, prevStepNo.current);
    return () => {
      prevStepNo.current = step;
    };
  }, [step]);

  const nextStep = () => {
    setStep((old) => (old < maxAllowedStep ? old + 1 : old));
    if (prevStepNo == maxAllowedStep && onSubmit) {
      onSubmit(FormData);
      if (props.clearFormOnSubmit) dispatcher({ type: "CLEAR" });
    }
  };

  const prevStep = () => {
    setStep((old) => (old < 0 ? 0 : old - 1));
  };

  const updateMaxStep = (value) => {
    setMaxStep((old) => (value > compArray.length - 1 ? old : value));
  };

  const defaultProps = useMemo(
    () => ({
      nextStep,
      prevStep,
      setMaxStep,
      updateMaxStep,
      dispatcher,
      formState,
      currenStep: step,
      onSubmit,
    }),
    [nextStep, prevStep, setMaxStep, dispatcher, step, formState, onSubmit]
  );

  let holderArray = [];
  const mergeComponentIntoArray = ({ step, component, props }) => {
    let index = step;
    let _default = holderArray;
    let a = _default.splice(0, index - 1);
    console.log("from mergeComp", a, step);
    holderArray = [...a, { component, props }, ..._default];
  };

  const generateCompArray = () => {
    // index, component , props
    if (deltas?.length) {
      const indicesToRemove = deltas.filter((comp) => comp.remove).map((comp) => comp.defaultStep - 1);
      console.log("indices to remove", indicesToRemove);
      const compToAdd = deltas.filter((comp) => !comp.remove);
      holderArray = defaultComponents.filter((comp, index) => !indicesToRemove.includes(index));
      compToAdd.sort((a, b) => a.step - b.step).forEach((comp) => mergeComponentIntoArray(comp));
      return holderArray;
    }
    return defaultComponents;
  };

  const arrayToRender = generateCompArray();

  useEffect(() => {
    setMaxStep(arrayToRender.length - 1);
  }, [arrayToRender]);

  useEffect(() => {
    console.log("============================>", formState);
  }, [formState]);

  const getView = () => {
    let compProps = arrayToRender[step].props || {};
    compProps["nextStep"] = nextStep;
    compProps["prevStep"] = prevStep;
    compProps.dispatcher = dispatcher;
    return arrayToRender[step].component(compProps);
  };

  return <React.Fragment>{getView()}</React.Fragment>;
};

export default WorkflowSteps;
