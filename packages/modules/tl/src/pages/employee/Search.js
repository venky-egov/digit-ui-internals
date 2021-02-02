import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import FormComposer from "./FormComposer";
import { useHistory } from "react-router-dom";
// import { createComplaint } from "../../../redux/actions/index";
import { Card, CardHeader, CardSubHeader, CardLabel, TextInput, Dropdown, SubmitBar } from "@egovernments/digit-ui-react-components";
// import useTenants from "../../../hooks/useTenants";

export const Search = ({ parentUrl }) => {
  const SessionStorage = Digit.SessionStorage;
  const __initComplaintType__ = Digit.SessionStorage.get("complaintType");
  const __initSubType__ = Digit.SessionStorage.get("subType");

  const city_complaint = Digit.SessionStorage.get("city_complaint");
  const selected_localities = Digit.SessionStorage.get("selected_localities");
  const locality_complaint = Digit.SessionStorage.get("locality_complaint");

  const [complaintType, setComplaintType] = useState(__initComplaintType__ ? __initComplaintType__ : {});
  const [subTypeMenu, setSubTypeMenu] = useState(__initSubType__ ? __initSubType__ : []);
  const [subType, setSubType] = useState({});
  const [selectedCity, setSelectedCity] = useState(city_complaint ? city_complaint : null);
  const [localities, setLocalities] = useState(selected_localities ? selected_localities : null);
  const [selectedLocality, setSelectedLocality] = useState(locality_complaint ? locality_complaint : null);
  const [submitValve, setSubmitValve] = useState(false);
  const [params, setParams] = useState({});
  // const cities = useTenants();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  //On SUbmit
  const onSubmit = async (data) => {
    setSubmitValve(true);
    console.log("submit data", data, subType, selectedCity, selectedLocality);
    // const cityCode = selectedCity.code;
    // const city = selectedCity.city.name;
    // const district = selectedCity.city.name;
    // const region = selectedCity.city.name;
    // const state = "Punjab";
    // const localityCode = selectedLocality.code;
    // const localityName = selectedLocality.name;
    // const landmark = data.landmark;
    // const { key } = subType;
    // const complaintType = key;
    // const mobileNumber = data.mobileNumber;
    // const name = data.name;
    // const formData = { ...params, cityCode, city, district, region, state, localityCode, localityName, landmark, complaintType, mobileNumber, name };
    // await dispatch(createComplaint(formData));
    // history.push(parentUrl + "/response");
  };

  const config = [
    {
      head: t("Please provide at least one parameter to search for an application"),
      body: [
        {
          label: t("Application No."),
          type: "text",

          populators: {
            name: "applicationNo",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Trade License No."),
          type: "text",
          populators: {
            name: "name",
            validation: {
              pattern: /[A-Za-z]/,
            },
          },
        },
        {
          label: t("Owner Mobile No."),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Application Type"),
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={[]} id="city" optionKey="name" />,
        },
        {
          label: t("From Date"),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("To Date"),
          type: "text",
          populators: {
            name: "mobileNumber",
            validation: {
              required: true,
              pattern: /^[6-9]\d{9}$/,
            },
          },
        },
        {
          label: t("Application Status"),
          type: "dropdown",
          populators: <Dropdown isMandatory selected={selectedCity} option={[]} id="city" optionKey="name" />,
        },
        {
          type: "dropdown",
          populators: <SubmitBar label={t("SEARCH")} submit="submit" onSubmit={(data) => onSubmit(data)} />,
        },
      ],
    },
  ];

  return <FormComposer heading="Search Trade License Application" config={config} onSubmit={onSubmit}></FormComposer>;
};
