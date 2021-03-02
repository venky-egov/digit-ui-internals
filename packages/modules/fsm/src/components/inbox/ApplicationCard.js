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
  const [popup, setPopup] = useState(false);

  const [params, setParams] = useState(searchParams);
  const [type, setType] = useState("");

  const selectParams = (param) => {
    setParams((o) => ({ ...o, ...param }));
  };

  const onSearchPara = (param) => {
    onFilterChange(params);
    setType("");
    setPopup(false);
  };

  useEffect(() => {
    console.log("params in application card", params);
  }, [params]);

  useEffect(() => {
    if (type) setPopup(true);
  }, [type]);

  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;

  const handlePopupClose = () => {
    setPopup(false);
    setType("");
    setParams(searchParams);
  };

  const handlePopupAction = () => {
    if (type === "SEARCH") {
      setSelectedComponent();
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
        serviceRequestIdKey={"Application No"}
        linkPrefix={linkPrefix ? linkPrefix : DSO ? "/digit-ui/employee/fsm/application-details/" : "/digit-ui/employee/fsm/"}
      />
    );
  }

  return (
    <React.Fragment>
      <div className="searchBox">
        {onSearch && (
          <SearchAction
            text="SEARCH"
            handleActionClick={() => {
              setType("SEARCH");
              setPopup(true);
            }}
          />
        )}
        {onFilterChange && (
          <FilterAction
            text="FILTER"
            handleActionClick={() => {
              setType("FILTER");
              setPopup(true);
            }}
          />
        )}
        <FilterAction
          text="SORT"
          handleActionClick={() => {
            setType("SORT");
            setPopup(true);
          }}
        />
      </div>
      {result}
      {popup && (
        <PopUp>
          {type === "FILTER" && (
            <div className="popup-module">
              {<Filter onFilterChange={selectParams} onClose={handlePopupClose} onSearch={onSearchPara} type="mobile" searchParams={params} />}
            </div>
          )}
          {type === "SORT" && (
            <div className="popup-module">
              {<SortBy type="mobile" searchParams={searchParams} onClose={handlePopupClose} type="mobile" onSort={selectParams} />}
            </div>
          )}
          {type === "Search" && (
            <SearchApplication
              type="mobile"
              onClose={handlePopupClose}
              onSearch={onSearch}
              isFstpOperator={isFstpOperator}
              searchParams={searchParams}
              searchFields={searchFields}
            />
          )}
        </PopUp>
      )}
    </React.Fragment>
  );
};
