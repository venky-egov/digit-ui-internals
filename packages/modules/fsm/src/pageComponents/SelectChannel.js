import React, { useState } from "react";
import { Loader } from "@egovernments/digit-ui-react-components";
import { Dropdown } from "@egovernments/digit-ui-react-components";

const SelectChannel = ({ t, config, onSelect, formData = {}, userType }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();

  const { data: channelMenu } = Digit.Hooks.fsm.useMDMS(tenantId, "FSM", "EmployeeApplicationChannel");
  const [channel, setChannel] = useState(null);

  return channelMenu ? (
    <Dropdown option={channelMenu} optionKey="i18nKey" id="channel" selected={channel} select={setChannel} t={t} disable={false} />
  ) : (
    <Loader />
  );
};

export default SelectChannel;
