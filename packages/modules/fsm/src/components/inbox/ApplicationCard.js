import React, { useCallback, useEffect, useState } from "react";

import { Card, DetailsCard, Loader, PopUp, SearchAction } from "@egovernments/digit-ui-react-components";
import { FilterAction } from "@egovernments/digit-ui-react-components";
import Filter from "./Filter";
import SearchApplication from "./search";
import SortBy from "./SortBy";

export const ApplicationCard = ({
  t,
  data,
  onFilterChange,
  onSearch,
  onSort,
  serviceRequestIdKey,
  isFstpOperator,
  isLoading,
  searchParams,
  searchFields,
  linkPrefix,
}) => {
  debugger;
  const [popup, setPopup] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [params, setParams] = useState(searchParams);

  const selectParams = (param) => {
    setParams((o) => ({ ...o, ...param }));
  };

  const onSearchPara = (param) => {
    console.log(param);
    onFilterChange(params);
    handlePopupClose();
  };

  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;

  const handlePopupClose = () => {
    setPopup(false);
    setSelectedComponent(null);
  };

  const handlePopupAction = (type) => {
    console.log("option");
    if (type === "SEARCH") {
      setSelectedComponent(
        <SearchApplication
          type="mobile"
          onClose={handlePopupClose}
          onSearch={onSearch}
          isFstpOperator={isFstpOperator}
          searchParams={searchParams}
          searchFields={searchFields}
        />
      );
    } else if (type === "FILTER") {
      setSelectedComponent(
        <Filter onFilterChange={selectParams} onClose={handlePopupClose} onSearch={onSearchPara} type="mobile" searchParams={params} />
      );
    } else if (type === "SORT") {
      setSelectedComponent(<SortBy type="mobile" onClose={handlePopupClose} type="mobile" onSort={onSort} />);
    }
    setPopup(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  let result;
  if (data && data?.length === 0) {
    result = (
      <Card style={{ marginTop: 20 }}>
        {t("CS_MYAPPLICATIONS_NO_APPLICATION")
          .split("\\n")
          .map((text, index) => (
            <p key={index} style={{ textAlign: "center" }}>
              {text}
            </p>
          ))}
      </Card>
    );
  } else if (data && data?.length > 0) {
    result = (
      <DetailsCard
        data={data}
        serviceRequestIdKey={serviceRequestIdKey}
        linkPrefix={linkPrefix ? linkPrefix : DSO ? "/digit-ui/employee/fsm/application-details/" : "/digit-ui/employee/fsm/"}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="searchBox">
        {onSearch && <SearchAction text="SEARCH" handleActionClick={() => handlePopupAction("SEARCH")} />}
        {onFilterChange && <FilterAction text="FILTER" handleActionClick={() => handlePopupAction("FILTER")} />}
        <FilterAction text="SORT" handleActionClick={() => handlePopupAction("SORT")} />
      </div>
      {result}
      {popup && (
        <PopUp>
          <div className="popup-module">{selectedComponent}</div>
        </PopUp>
      )}
    </React.Fragment>
  );
};
