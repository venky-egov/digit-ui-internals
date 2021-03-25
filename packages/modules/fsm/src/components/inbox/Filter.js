import React from "react";
import { Dropdown, RadioButtons, ActionBar, RemoveableTag, CloseSvg, Loader } from "@egovernments/digit-ui-react-components";
import { useSelector } from "react-redux";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import Status from "./Status";

const Filter = ({ searchParams, onFilterChange, onSearch, removeParam, ...props }) => {
  const { t } = useTranslation();

  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]) || false;
  const isFstpOperator = Digit.UserService.hasAccess("FSTP") || false;

  const hideLocalityFilter = Digit.UserService.hasAccess(["FSM_CREATOR_EMP", "FSM_VIEW_EMP"]);

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];

  const { data: roleStatuses, isFetched: isRoleStatusFetched } = Digit.Hooks.fsm.useMDMS(state, "DIGIT-UI", "RoleStatusMapping");

  const localities = useSelector((state) => state.common.revenue_localities[tenantId]);
  const selectLocality = (d) => {
    onFilterChange({ locality: [...searchParams?.locality, d] });
  };

  const onStatusChange = (e, type) => {
    if (e.target.checked) onFilterChange({ applicationStatus: [...searchParams?.applicationStatus, type] });
    else onFilterChange({ applicationStatus: searchParams?.applicationStatus.filter((option) => type.name !== option.name) });
  };

  const clearAll = () => {
    onFilterChange({ applicationStatus: [], locality: [], uuid: { code: "ASSIGNED_TO_ME", name: "Assigned to Me" } });
    props?.onClose?.();
  };

  return (
    <React.Fragment>
      <div className="filter" style={{ marginTop: isFstpOperator ? "-0px" : "revert" }}>
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("ES_COMMON_FILTER_BY")}:</div>
            <div className="clearAll" onClick={clearAll}>
              {t("ES_COMMON_CLEAR_ALL")}
            </div>
            {props.type === "desktop" && (
              <span className="clear-search" onClick={clearAll}>
                {t("ES_COMMON_CLEAR_ALL")}
              </span>
            )}
            {props.type === "mobile" && (
              <span onClick={props.onClose}>
                <CloseSvg />
              </span>
            )}
          </div>
          <div>
            {!DSO && !isFstpOperator && (
              <React.Fragment>
                <RadioButtons
                  onSelect={(d) => onFilterChange({ uuid: d })}
                  selectedOption={searchParams?.uuid}
                  optionsKey="name"
                  options={[
                    { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
                    { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
                  ]}
                />
              </React.Fragment>
            )}
            <div>
              {/* {GetSelectOptions(t("ES_INBOX_LOCALITY"), localities, selectedLocality, onSelectLocality, "code", onRemove, "locality", "name")} */}
            </div>
            {/* <Status applications={props.applications} onAssignmentChange={handleAssignmentChange} fsmfilters={searchParams} /> */}
          </div>

          {!hideLocalityFilter ? (
            <div>
              <div className="filter-label">{t("ES_INBOX_LOCALITY")}</div>
              <Dropdown option={localities} keepNull={true} selected={null} select={selectLocality} optionKey={"name"} />
              <div className="tag-container">
                {searchParams?.locality.map((locality, index) => {
                  return (
                    <RemoveableTag
                      key={index}
                      text={locality.name}
                      onClick={() => {
                        onFilterChange({ locality: searchParams?.locality.filter((loc) => loc.code !== locality.code) });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
          <div>
            {isRoleStatusFetched ? <Status onAssignmentChange={onStatusChange} fsmfilters={searchParams} roleStatuses={roleStatuses} /> : <Loader />}
          </div>
        </div>
      </div>
      {props.type === "mobile" && (
        <ActionBar>
          <ApplyFilterBar
            submit={false}
            labelLink={t("ES_COMMON_CLEAR_ALL")}
            buttonLink={t("ES_COMMON_FILTER")}
            onClear={clearAll}
            onSubmit={() => {
              if (props.type === "mobile") onSearch({ delete: ["applicationNos"] });
              else onSearch();
            }}
            style={{ flex: 1 }}
          />
        </ActionBar>
      )}
    </React.Fragment>
  );
};

export default Filter;
