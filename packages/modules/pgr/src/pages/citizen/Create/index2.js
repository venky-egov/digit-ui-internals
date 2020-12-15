import React, { Fragment, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createComplaint } from "../../../redux/actions/index";

import { FormStep, SubmitBar, TextInput } from "@egovernments/digit-ui-react-components";

import { newComplaintSteps } from "./config";
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory, useRouteMatch } from "react-router-dom";

import { defaultArray } from "./default-steps";

// steps type: radio, map location, input, city-mohalla, textarea, upload photo

export const CreateComplaint = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formReducer = useCallback((state, action) => {
    let obj = {};
    for (const key in action) {
      if (key !== "type") obj[key] = action[key];
    }
    Digit.SessionStorage.set("PGR_CREATE_COMPLAINT_PARAMS", { ...state, ...obj });
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

  const [formState, dispatcher] = useReducer(formReducer, {});
  const [step, setStep] = useState(0);
  const [maxAllowedStep, setMaxStep] = useState(0);

  const nextStep = () => {
    setStep((old) => (old < maxAllowedStep ? old + 1 : old));
  };

  const prevStep = () => {
    setStep((old) => (old < 0 ? 0 : old - 1));
  };

  const updateMaxStep = (value) => {
    setMaxStep((old) => (value > compArray.length - 1 ? old : value));
  };

  const appState = useSelector((state) => state)["common"];
  const __initParams = Digit.SessionStorage.get("PGR_CREATE_COMPLAINT_PARAMS");
  const [submitForm, setSubmitForm] = useState(false);

  const stepItems = useMemo(
    () =>
      newComplaintSteps.map((step, index) => {
        const texts = {};
        for (const key in step.texts) {
          texts[key] = t(step.texts[key]);
        }
        return { ...step, texts };
      }),
    [newComplaintSteps]
  );

  useEffect(() => {
    console.log("submitForm");
  }, [submitForm]);

  const selectComplaintType = (complaintType) => {
    nextStep();
  };

  const selectSubType = (subType) => {
    const { key, name } = subType;
    const complaintType = key;
    dispatcher({ type: "EDIT", complaintType });
    nextStep();
  };

  const selectPincode = (_pincode) => {
    if (_pincode) {
      const { pincode } = _pincode;
      console.log("index --->", pincode);
      dispatcher({ type: "EDIT", pincode });
    }
    nextStep();
  };

  const selectAddress = (address) => {
    const cityCode = address.city.code;
    const city = address.city.name;
    const district = address.city.name;
    const region = address.city.name;
    const state = "Punjab";
    const localityCode = address.locality.code;
    const localityName = address.locality.name;
    dispatcher({ type: "EDIT", cityCode, city, district, region, state, localityCode, localityName });
    nextStep();
  };

  const saveLandmark = (_landmark) => {
    if (_landmark) {
      const { landmark } = _landmark;
      dispatcher({ type: "EDIT", landmark });
    }
    nextStep();
  };

  const saveImagesUrl = (images) => {
    if (images) {
      const uploadedImages = images?.map((url) => {
        return {
          documentType: "PHOTO",
          fileStore: url,
          documentUid: "",
          additionalDetails: {},
        };
      });
      dispatcher({ type: "EDIT", uploadedImages });
    }
    nextStep();
  };

  const submitComplaint = async (_details) => {
    if (_details) {
      const { details } = _details;
      details && details !== "" ? dispatcher({ type: "EDIT", details }) : null;
    }
    console.log("index params", formState);

    //Empty Session Storage for params
    Digit.SessionStorage.set("PGR_CREATE_COMPLAINT_PARAMS", null);

    // submit complaint through actions
    await dispatch(createComplaint(formState));
    // history.push(`${path}/response`);
    nextStep();
  };

  const backToHome = () => {
    setStep(0);
  };

  const updateParams = (param, value) => {
    setParams({ ...params, [param]: value });
  };

  const mergeComponentIntoArray = ({ step, component, props }) => {
    let index = step;
    let _default = Digit.createCompArray;
    let a = _default.splice(0, index - 1);
    console.log("from mergeComp", a, step);
    Digit.createCompArray = [...a, { component, props }, ..._default];
  };

  const generateCompArray = () => {
    // index, component , props
    if (Digit.deltaComplaintArr?.length) {
      const indicesToRemove = Digit.deltaComplaintArr.filter((comp) => comp.remove).map((comp) => comp.defaultStep - 1);
      console.log(indicesToRemove);
      const compToAdd = Digit.deltaComplaintArr.filter((comp) => !comp.remove);
      Digit.createCompArray = defaultArray.filter((comp, index) => !indicesToRemove.includes(index));
      console.log(Digit.createCompArray);
      compToAdd.sort((a, b) => a.step - b.step).forEach((comp) => mergeComponentIntoArray(comp));
    }
    return Digit.createCompArray;
  };

  const compArray = generateCompArray() || defaultArray;

  useEffect(() => {
    setMaxStep(compArray.length - 1);
  }, [compArray]);

  const getView = () => {
    let compProps = compArray[step].props;
    if (compProps && compProps.onSelect) return compArray[step].component(compProps);
    else {
      compProps = compProps || {};
      compProps["nextStep"] = nextStep;
      compProps["prevStep"] = prevStep;
      compProps.dispatcher = dispatcher;
      return compArray[step].component(compProps);
    }
  };

  // setSubmitForm(true); USE TO SUBMIT FORM
  return <Fragment>{getView()}</Fragment>;
};
