import React from "react";
import { Links } from "@egovernments/digit-ui-react-components";

const InboxComposer = ({ links }) => {
  return (
    <div className="inbox-container">
      <div className="filters-container">
        <Links links={links} />
      </div>
    </div>
  );
};

export default InboxComposer;
