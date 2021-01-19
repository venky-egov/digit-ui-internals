import React, { useCallback, useEffect, useState } from "react";
import {
  Dropdown,
  CardLabel,
  RadioButtons,
  CardCaption,
  CheckBox,
  SubmitBar,
  ActionBar,
  RemoveableTag,
} from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Status from "./Status";

const Filter = (props) => {
  let { uuid } = Digit.UserService.getUser().info;

  const { t } = useTranslation();
  const { fsm } = useSelector((state) => state);

  const [selectAssigned, setSelectedAssigned] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [pendingApplicationCount, setPendingApplicationCount] = useState([]);
  const DSO = Digit.UserService.hasAccess("DSO");

  const [fsmFilters, setFsmFilter] = useState({
    serviceCode: [],
    locality: ["ALakapuri", "Railway medical Colony"],
    applicationStatus: [],
  });

  const [wfFilters, setWfFilters] = useState({
    assignee: [],
  });

  //TODO change city fetch from user tenantid
  // let localities = Digit.Hooks.fsm.useLocalities({ city: "Amritsar" });
  let localities = ["Alakapuri", "Railway medical Colony"];
  // let applicationStatus = Digit.Hooks.fsm.useApplicationStatus();
  // let serviceDefs = Digit.Hooks.fsm.useServiceDefs();

  const onRadioChange = (value) => {
    setSelectedAssigned(value);
    uuid = value.code === "ASSIGNED_TO_ME" ? uuid : "";
    setWfFilters({ ...wfFilters, assignee: [{ code: uuid }] });
  };

  let pgrQuery = {};
  let wfQuery = {};

  useEffect(() => {
    for (const property in fsmFilters) {
      if (Array.isArray(fsmFilters[property])) {
        let params = fsmFilters[property].map((prop) => prop.code).join();
        if (params) {
          pgrQuery[property] = params;
        }
      }
    }
    for (const property in wfFilters) {
      if (Array.isArray(wfFilters[property])) {
        let params = wfFilters[property].map((prop) => prop.code).join();
        if (params) {
          wfQuery[property] = params;
        }
      }
    }
    //queryString = queryString.substring(0, queryString.length - 1);
    handleFilterSubmit({ pgrQuery: pgrQuery, wfQuery: wfQuery });
  }, [fsmFilters, wfFilters]);

  const ifExists = (list, key) => {
    return list.filter((object) => object.code === key.code).length;
  };

  function applicationType(_type) {
    const type = { key: t("SERVICEDEFS." + _type.serviceCode.toUpperCase()), code: _type.serviceCode };
    if (!ifExists(fsmFilters.serviceCode, type)) {
      setFsmFilter({ ...fsmFilters, serviceCode: [...fsmFilters.serviceCode, type] });
    }
  }

  function onSelectLocality(value, type) {
    // if (!ifExists(fsmFilters.locality, value)) {
    //   setFsmFilter({ ...fsmFilters, locality: [...fsmFilters.locality, value] });
    // }
    setFsmFilter((prevState) => {
      return { ...prevState, locality: [...prevState.locality.filter((item) => item !== value), value] };
    });
  }

  useEffect(() => {
    if (fsmFilters.serviceCode.length > 1) {
      setSelectedApplicationType(`${fsmFilters.serviceCode.length} selected`);
    } else {
      setSelectedApplicationType(fsmFilters.serviceCode[0]);
    }
  }, [fsmFilters.serviceCode]);

  useEffect(() => {
    if (fsmFilters.locality.length > 1) {
      setSelectedLocality(`${fsmFilters.locality.length} selected`);
    } else {
      setSelectedLocality(fsmFilters.locality[0]);
    }
  }, [fsmFilters.locality]);

  const onRemove = (index, key) => {
    let afterRemove = fsmFilters[key].filter((value, i) => {
      return i !== index;
    });
    setFsmFilter({ ...fsmFilters, [key]: afterRemove });
  };

  const handleAssignmentChange = (e, type) => {
    if (e.target.checked) {
      setFsmFilter({ ...fsmFilters, applicationStatus: [...fsmFilters.applicationStatus, { code: type.code }] });
    } else {
      const filteredStatus = fsmFilters.applicationStatus.filter((value) => {
        return value.code !== type.code;
      })[0];
      setFsmFilter({ ...fsmFilters, applicationStatus: [{ code: filteredStatus }] });
    }
  };

  function clearAll() {
    setFsmFilter({ serviceCode: [], locality: [], applicationStatus: [] });
    setWfFilters({ assigned: [{ code: [] }] });
    setSelectedAssigned("");
    setSelectedApplicationType(null);
    setSelectedLocality(null);
  }

  const handleFilterSubmit = () => {
    props.onFilterChange({ pgrQuery: pgrQuery, wfQuery: wfQuery });
    //props.onClose();
  };

  const GetSelectOptions = (lable, options, selected, select, optionKey, onRemove, key, displayKey) => (
    <div>
      <div className="filter-label">{lable}</div>
      <Dropdown
        option={options}
        selected={selected}
        select={(value) => {
          select(value, key);
        }}
      />
      <div className="tag-container">
        {fsmFilters[key].length > 0 &&
          fsmFilters[key].map((value, index) => {
            if (value[displayKey]) {
              return <RemoveableTag key={index} text={value[displayKey]} onClick={() => onRemove(index, key)} />;
            } else {
              return <RemoveableTag key={index} text={value} onClick={() => onRemove(index, key)} />;
            }
          })}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="filter" style={{ marginTop: "100px" }}>
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("ES_INBOX_FILTER_BY")}:</div>
            <div className="clearAll" onClick={clearAll}>
              {t("ES_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll}>
                {t("ES_COMMON_CLEAR_ALL")}
              </span>
            )}
            {props.type === "mobile" && <span onClick={props.onClose}>x</span>}
          </div>
          <div>
            {!DSO && (
              <RadioButtons
                onSelect={onRadioChange}
                selectedOption={selectAssigned}
                optionsKey="name"
                options={[
                  { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
                  { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
                ]}
              />
            )}
            <div>
              {GetSelectOptions(t("ES_INBOX_LOCALITY"), localities, selectedLocality, onSelectLocality, "name", onRemove, "locality", "name")}
            </div>
            <Status applications={props.applications} onAssignmentChange={handleAssignmentChange} fsmFilters={fsmFilters} />
          </div>
        </div>
      </div>
      <ActionBar>
        {props.type === "mobile" && (
          <ApplyFilterBar labelLink={t("CS_COMMON_CLEAR_ALL")} buttonLink={t("CS_COMMON_FILTER")} onClear={clearAll} onSubmit={props.onClose} />
        )}
      </ActionBar>
      {/* <ActionBar>
        <SubmitBar label="Take Action" />
      </ActionBar> */}
    </React.Fragment>
  );
};

export default Filter;
