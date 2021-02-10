import React from "react";
import { ActionBar, RadioButtons } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { ApplyFilterBar } from "@egovernments/digit-ui-react-components";

const SortBy = (props) => {
  const { t } = useTranslation();

  function clearAll() {}

  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">{t("FILTER_BY")}:</div>
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
              onSelect={() => {}}
              selectedOption={() => {}}
              optionsKey="name"
              options={[
                { code: "DATE_LATEST_FIRST", name: t("ES_INBOX_DATE_LATEST_FIRST") },
                { code: "DATE_LATEST_LAST", name: t("ES_INBOX_DATE_LATEST_LAST") },
              ]}
            />
          </div>
        </div>
      </div>
      <ActionBar>
        {props.type === "mobile" && (
          <ApplyFilterBar labelLink={t("CS_COMMON_CLEAR_ALL")} buttonLink={t("CS_COMMON_FILTER")} onClear={clearAll} onSubmit={props.onClose} />
        )}
      </ActionBar>
    </React.Fragment>
  );
};

export default SortBy;
