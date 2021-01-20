import config from "./config";

import FSMLink from "../../../components/inbox/FSMLink";
import ApplicationTable from "../../../components/inbox/ApplicationTable";
import Filter from "../../../components/inbox/Filter";
import SearchApplication from "../../../components/inbox/search";

export const InboxComposer = () => {
  const selector = ({ component }) => {
    switch (component.type) {
      // case "links":
      //   return <FSMLink/>

      // case "filter":
      //   return <Filter />

      // case "search":
      //   return <SearchApplication />

      // case "table":
      //   return <ApplicationTable />

      default:
        return <div>{component.type} not supported please add in InboxComposer</div>;
    }
  };

  return config.map((component) => selector(component.type));
};
