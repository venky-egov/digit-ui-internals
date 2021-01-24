import React, { useState } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";

import { Breadcrumb, ActionBar, Menu, SubmitBar } from "@egovernments/digit-ui-react-components";
import { ComplaintDetails } from "./ComplaintDetails";
import { CreateComplaint } from "./CreateComplaint";
import Inbox from "./Inbox";
import { Employee } from "../../constants/Routes";
import Response from "./Response";
//import Breadcrumb from "@egovernments/digit-ui-react-components/src/atoms/BreadCrumb";

const Complaint = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const match = useRouteMatch();
  const breadcrumbObj = {
    home : {
      content : 'Home',
      path: Employee.Home
    },
    inbox : {
      content: 'Inbox',
      path: match.url + Employee.Inbox
    },
    createComplaint : {
      content: 'Create Complaint',
      path: match.url + Employee.CreateComplaint
    },
    complaintDetails : {
      content : 'Complaint Detail',
      path: match.url + Employee.ComplaintDetails + ":id"
    },
    response : {
      content : 'Response',
      path : match.url + Employee.Response
    }
  }
  function popupCall(option) {
    console.log("option", option);
    setDisplayMenu(false);
    setPopup(true);
  }

  let location = useLocation().pathname;

  return (
    <React.Fragment>
      <div className="ground-container">
        {!location.includes(Employee.Response) && 
        <Switch>
          <Route path={match.url + Employee.CreateComplaint} component={() => <Breadcrumb crumbs={[breadcrumbObj.home, breadcrumbObj.createComplaint]}></Breadcrumb>} />
          <Route path={match.url + Employee.ComplaintDetails + ":id"} component={() =><Breadcrumb crumbs={[breadcrumbObj.home, breadcrumbObj.inbox, breadcrumbObj.complaintDetails]}></Breadcrumb>} />
          <Route path={match.url + Employee.Inbox} component={() => <Breadcrumb crumbs={[breadcrumbObj.home, breadcrumbObj.inbox]}></Breadcrumb>} />
          <Route path={match.url + Employee.Response} component={<Breadcrumb crumbs={[breadcrumbObj.home, breadcrumbObj.response]}></Breadcrumb>} />
        </Switch>
    }
        <Switch>
          <Route path={match.url + Employee.CreateComplaint} component={() => <CreateComplaint parentUrl={match.url} />} />
          <Route path={match.url + Employee.ComplaintDetails + ":id"} component={() => <ComplaintDetails />} />
          <Route path={match.url + Employee.Inbox} component={Inbox} />
          <Route path={match.url + Employee.Response} component={Response} />
        </Switch>
      </div>
      {/* <ActionBar>
        {displayMenu ? <Menu options={["Assign Complaint", "Reject Complaint"]} onSelect={popupCall} /> : null}
        <SubmitBar label="Take Action" onSubmit={() => setDisplayMenu(!displayMenu)} />
      </ActionBar> */}
    </React.Fragment>
  );
};

export default Complaint;
