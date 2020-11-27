import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
// import UserOnboarding from "../UserOnboarding/index";
import { PgrRoutes, getRoute } from "../../constants/Routes";
import ComplaintsPage from "../Complaints";
import RatingAndFeedBack from "../Rating/Rating";
import ComplaintDetailsPage from "../ComplaintDetails";
import ReasonPage from "./Reason";
import UploadPhoto from "./UploadPhoto";
import AddtionalDetails from "./AddtionalDetails";

const ReopenComplaint = ({ match, history }) => {
  return (
    <Switch>
      <Route exact path={getRoute(match, PgrRoutes.ReasonPage)} component={() => <ReasonPage match={match} />} />
      <Route path={getRoute(match, PgrRoutes.UploadPhoto)} component={() => <UploadPhoto match={match} />} />
      <Route path={getRoute(match, PgrRoutes.AddtionalDetails)} component={() => <AddtionalDetails match={match} />} />
      <Route path={getRoute(match, PgrRoutes.Response)} component={() => <Response match={match} />} />
    </Switch>
  );
};

export { ReopenComplaint };