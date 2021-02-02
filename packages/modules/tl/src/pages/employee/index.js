import React, { useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { BackButton } from "@egovernments/digit-ui-react-components";
import { Employee } from "../../constants/Routes";
import Response from "./Response";
import { Search } from "./Search";

const Complaint = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const match = useRouteMatch();

  function popupCall(option) {
    console.log("option", option);
    setDisplayMenu(false);
    setPopup(true);
  }
  return (
    <React.Fragment>
      <div className="ground-container">
        <BackButton>Back</BackButton>
        <Switch>
          {/* <Route path={match.url + Employee.CreateComplaint} component={() => <CreateComplaint parentUrl={match.url} />} /> */}
          <Route path={match.url + Employee.Search} component={Search} />
          <Route path={match.url + Employee.Response} component={Response} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Complaint;
