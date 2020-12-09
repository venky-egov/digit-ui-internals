import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer, EmployeeAppContainer } from "@egovernments/digit-ui-react-components";
import Complaint from "./pages/employee/index";
import { StoreSingleton } from "@egovernments/digit-ui-module-core/src/redux_2/store";
const App = () => {
  console.log(new StoreSingleton().getInstance());
  return (
    <EmployeeAppContainer>
      <Complaint />
    </EmployeeAppContainer>
  );
};

export default App;
