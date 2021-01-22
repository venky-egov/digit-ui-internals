import React from "react";
import config from "./config";
import InboxComposer from "./InboxComposer";

const Inbox = () => {
  console.log("find config here", config);
  return <InboxComposer {...config} />;
};

export default Inbox;
