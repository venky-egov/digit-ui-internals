import React from "react";
import { RadioButtons } from "@egovernments/digit-ui-react-components";

const AssignedTo = ({ onFilterChange, searchParams, tenantId, t }) => {
  const { data: AssignedToMe } = Digit.Hooks.fsm.useInbox(
    tenantId,
    {
      ...searchParams,
      total: true,
      uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
    },
    null
  );
  const { data: AssignedToAll } = Digit.Hooks.fsm.useInbox(
    tenantId,
    {
      ...searchParams,
      total: true,
      uuid: { code: "ASSIGNED_TO_ALL", name: t("ES_INBOX_ASSIGNED_TO_ALL") },
    },
    null
  );

  return (
    <React.Fragment>
      <RadioButtons
        onSelect={(d) => onFilterChange({ uuid: d })}
        selectedOption={searchParams?.uuid}
        optionsKey="name"
        options={[
          { code: "ASSIGNED_TO_ME", name: `${t("ES_INBOX_ASSIGNED_TO_ME")} (${AssignedToMe?.[0]?.totalCount || 0})` },
          { code: "ASSIGNED_TO_ALL", name: `${t("ES_INBOX_ASSIGNED_TO_ALL")} (${AssignedToAll?.[0]?.totalCount || 0})` },
        ]}
      />
    </React.Fragment>
  );
};

export default AssignedTo;
