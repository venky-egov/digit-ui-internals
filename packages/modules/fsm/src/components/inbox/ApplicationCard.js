import React, { useState } from "react";

import { Card, DetailsCard, PopUp, SearchAction } from "@egovernments/digit-ui-react-components";
import { FilterAction } from "@egovernments/digit-ui-react-components";
import Filter from "./Filter";
import SearchApplication from "./search";
import SortBy from "./SortBy";

export const ApplicationCard = ({ data, onFilterChange, onSearch, serviceRequestIdKey, isFstpOperator }) => {
  const [popup, setPopup] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;

  const handlePopupAction = (type) => {
    console.log("option");
    if (type === "SEARCH") {
      setSelectedComponent(<SearchApplication type="mobile" onClose={handlePopupClose} onSearch={onSearch} isFstpOperator={isFstpOperator} />);
    } else if (type === "FILTER") {
      setSelectedComponent(<Filter onFilterChange={onFilterChange} onClose={handlePopupClose} type="mobile" />);
    } else if (type === "SORT") {
      setSelectedComponent(<SortBy type="mobile" onClose={handlePopupClose} type="mobile" />);
    }
    setPopup(true);
  };

  const handlePopupClose = () => {
    setPopup(false);
    setSelectedComponent(null);
  };

  return (
    <React.Fragment>
      <div className="searchBox">
        {onSearch && <SearchAction text="SEARCH" handleActionClick={() => handlePopupAction("SEARCH")} />}
        <FilterAction text="FILTER" handleActionClick={() => handlePopupAction("FILTER")} />
        <FilterAction text="SORT" handleActionClick={() => handlePopupAction("SORT")} />
      </div>
      <DetailsCard
        data={data}
        serviceRequestIdKey={serviceRequestIdKey}
        linkPrefix={DSO ? "/digit-ui/employee/fsm/application-details/" : "/digit-ui/employee/fsm/"}
      />
      {popup && (
        <PopUp>
          <div className="popup-module">{selectedComponent}</div>
        </PopUp>
      )}
    </React.Fragment>
  );
};
