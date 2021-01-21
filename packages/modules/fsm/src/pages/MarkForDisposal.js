import React, { useState } from "react";
import { PopUp, SearchAction, FilterAction, DetailsCard, ActionBar, SubmitBar, Header } from "@egovernments/digit-ui-react-components";
import Filter from "../components/inbox/Filter";
import SearchApplication from "../components/inbox/search";
import { useTranslation } from "react-i18next";

const MarkForDisposal = () => {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [vehicleCapacity, setVehicleCapacity] = useState(3000);
  const [disposedLocation, setDisposedLocation] = useState("Berhampur SeTP");
  const [totalWasteCollected, setTotalWasteCollected] = useState(0);
  const [selectedApplicationNumbers, setSelectedApplicationNumbers] = useState([]);
  const [searchParams, setSearchParams] = useState({ filters: {}, search: "", sort: {} });

  const handleFilterChange = (filterParam) => {
    // console.log("handleFilterChange", { ...searchParams, filters: filterParam });
    // setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    // setSearchParams({ ...searchParams, search: params });
  };

  const handlePopupAction = (type) => {
    console.log("option");
    if (type === "SEARCH") {
      setSelectedComponent(<SearchApplication type="mobile" onClose={handlePopupClose} onSearch={onSearch} />);
    } else if (type === "FILTER") {
      setSelectedComponent(<Filter onFilterChange={handleFilterChange} onClose={handlePopupClose} type="mobile" />);
    }
    setPopup(true);
    if (type === "SORT") {
      setPopup(false);
    }
  };

  const handlePopupClose = () => {
    setPopup(false);
    setSelectedComponent(null);
  };

  const applications = React.useMemo(
    () => [
      {
        "Application No.": "PB-FSM-789-78-11111",
        Locality: "Alakapuri",
        Status: "Completed",
        "Waste Collected": 250,
      },
      {
        "Application No.": "PB-FSM-789-78-22222",
        Locality: "Alakapuri",
        Status: "Completed",
        "Waste Collected": 250,
      },
      {
        "Application No.": "PB-FSM-789-78-33333",
        Locality: "Alakapuri",
        Status: "Completed",
        "Waste Collected": 250,
      },
    ],
    []
  );

  const handleSelect = (application) => {
    if (selectedApplicationNumbers.includes(application["Application No."])) {
      setSelectedApplicationNumbers((prev) => {
        return prev.filter((applicationNumber) => applicationNumber !== application["Application No."]);
      });
    } else {
      setSelectedApplicationNumbers((prev) => [...prev, application["Application No."]]);
    }
  };

  React.useEffect(() => {
    let totalWaste = 0;
    applications.forEach((application) => {
      if (selectedApplicationNumbers.includes(application["Application No."])) {
        totalWaste += application["Waste Collected"];
      }
    });
    setTotalWasteCollected(totalWaste);
  }, [selectedApplicationNumbers]);

  const handleSubmit = () => {
    const data = applications.filter((application) => selectedApplicationNumbers.includes(application["Application No."]));
    console.log("%c MarkForDisposal: handleSubmit -> data ", "font-size:16px;background-color:#d0601a;color:white;", data);
  };

  return (
    <div className="mark-for-disposal-container">
      <div className="inbox-container">
        <div className="filters-container">
          <div className="searchBox">
            <SearchAction text="SEARCH" handleActionClick={() => handlePopupAction("SEARCH")} />
            <FilterAction text="FILTER" handleActionClick={() => handlePopupAction("FILTER")} />
            <FilterAction text="SORT" handleActionClick={() => handlePopupAction("SORT")} />
          </div>
          <div className="disposal-info">
            <h3 className="disposal-text">{`${t("ES_DSO_VEHICLE_CAPACITY")}: ${vehicleCapacity} ltrs`}</h3>
            <h3 className="disposal-text">{`${t("ES_DSO_TO_BE_DISPOSED_AT")}: ${disposedLocation}`}</h3>
          </div>
          <DetailsCard data={applications} handleSelect={handleSelect} keyForSelected="Application No." selectedItems={selectedApplicationNumbers} />
          {popup && (
            <PopUp>
              <div className="popup-module">{selectedComponent}</div>
            </PopUp>
          )}
          <ActionBar className="disposal-action-bar">
            <h3 className="disposal-text">{`${totalWasteCollected} ltrs`}</h3>
            <SubmitBar onSubmit={handleSubmit} label={t("READY_FOR_DISPOSAL")} style={{ width: "230px" }} />
          </ActionBar>
        </div>
      </div>
    </div>
  );
};

export default MarkForDisposal;
