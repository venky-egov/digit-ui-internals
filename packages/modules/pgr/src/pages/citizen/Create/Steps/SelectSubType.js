import { TypeSelectCard } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";

const SelectSubType = ({ t, config, onSelect, ...props }) => {
  const complaintType = Digit.SessionStorage.get("complaintType");
  const __initSubType__ = Digit.SessionStorage.get("subType");
  const [subType, setSubType] = useState(__initSubType__ ? __initSubType__ : {});
  const menu = Digit.GetServiceDefinitions.getSubMenu(complaintType, t);

  const goNext = () => {
    props.dispatcher({ type: "EDIT", subType });
    props.nextStep();
  };

  function selectedValue(value) {
    setSubType(value);
    Digit.SessionStorage.set("subType", value);
  }

  const configNew = {
    ...config.texts,
    ...{ headerCaption: complaintType.key },
    ...{ menu: menu },
    ...{ optionsKey: "name" },
    ...{ selected: selectedValue },
    ...{ selectedOption: subType },
    ...{ onSave: goNext },
  };

  return <TypeSelectCard {...configNew} t={t} />;
};
export default SelectSubType;
