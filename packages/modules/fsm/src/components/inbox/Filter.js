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
  const [selectedLocality, setSelectedLocality] = useState(null);

  const [pgrfilters, setPgrFilters] = useState({
    serviceCode: [],
    locality: [],
    applicationStatus: [],
  });

  const [wfFilters, setWfFilters] = useState({
    applicationStatus: [],
    locality: [],
    uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
  });

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const localities = useSelector((state) => state.common.localities[tenantId]);

  useEffect(() => {
    let filters = {};
    filters.applicationStatus = wfFilters.applicationStatus.map((status) => status.code).join(",");
    filters.locality = wfFilters.locality.map((item) => item.code.split("_").pop()).join(",");
    if (wfFilters.uuid && Object.keys(wfFilters.uuid).length > 0) {
      filters.uuid = wfFilters.uuid.code === "ASSIGNED_TO_ME" ? uuid : "";
    }
    props.onFilterChange(filters);
    //props.onClose();
  }, [wfFilters]);

  const onRadioChange = (value) => {
    setWfFilters({ ...wfFilters, uuid: value });
  };

  const ifExists = (list, key) => {
    return list.filter((object) => object.code === key.code).length;
  };

  function onSelectLocality(value) {
    setWfFilters((prevState) => {
      return { ...prevState, locality: [...prevState.locality.filter((item) => item.code !== value.code), value] };
    });
  }

  useEffect(() => {
    if (wfFilters.locality.length > 1) {
      setSelectedLocality({ code: `${wfFilters.locality.length} selected` });
    } else {
      setSelectedLocality(wfFilters.locality[0]);
    }
  }, [wfFilters.locality]);

  const onRemove = (index, key) => {
    let afterRemove = wfFilters[key].filter((value, i) => {
      return i !== index;
    });
    setWfFilters({ ...pgrfilters, [key]: afterRemove });
  };

  const handleAssignmentChange = (e, type) => {
    if (e.target.checked) {
      setWfFilters({ ...wfFilters, applicationStatus: [...wfFilters.applicationStatus, type] });
    } else {
      const filteredStatus = wfFilters.applicationStatus.filter((value) => {
        return value.code !== type.code;
      });
      setWfFilters({ ...wfFilters, applicationStatus: filteredStatus });
    }
  };

  function clearAll() {
    setWfFilters({
      applicationStatus: [],
      locality: [],
      uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
    });
    setSelectedLocality(null);
  }

  const GetSelectOptions = (lable, options, selected, select, optionKey, onRemove, key, displayKey) => (
    <div>
      <div className="filter-label">{lable}</div>
      <Dropdown
        option={options}
        selected={selected}
        select={(value) => {
          select(value, key);
        }}
        optionKey={optionKey}
        t={t}
      />
      <div className="tag-container">
        {wfFilters[key].length > 0 &&
          wfFilters[key].map((value, index) => {
            if (value[displayKey]) {
              return <RemoveableTag key={index} text={`${value[displayKey].slice(0, 22)} ...`} onClick={() => onRemove(index, key)} />;
            } else {
              return <RemoveableTag key={index} text={`${value.slice(0, 22)} ...`} onClick={() => onRemove(index, key)} />;
            }
          })}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="filter">
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
            <RadioButtons
              onSelect={onRadioChange}
              selectedOption={wfFilters.uuid}
              optionsKey="name"
              options={[
                { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
                { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
              ]}
            />
            <div>
              {GetSelectOptions(t("ES_INBOX_LOCALITY"), localities, selectedLocality, onSelectLocality, "code", onRemove, "locality", "name")}
            </div>
            <Status applications={props.applications} onAssignmentChange={handleAssignmentChange} fsmfilters={wfFilters} />
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
