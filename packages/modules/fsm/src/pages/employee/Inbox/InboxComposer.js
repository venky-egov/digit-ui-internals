import config from "./config";
import React from "react";

import FSMLink from "../../../components/inbox/FSMLink";
import ApplicationTable from "../../../components/inbox/ApplicationTable";
import Filter from "../../../components/inbox/Filter";
import SearchApplication from "../../../components/inbox/search";

const InboxComposer = () => {
  const selector = ({ type }) => {
    switch (type) {
      // case "links":
      //   return <FSMLink/>

      // case "filter":
      //   return <Filter />

      // case "search":
      //   return <SearchApplication />

      // case "table":
      //   return <ApplicationTable />

      default:
        return <div>{type} not supported please add in InboxComposer</div>;
    }
  };

  return config.map((component) => selector(component));
};

export default InboxComposer;
