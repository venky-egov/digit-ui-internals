import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const IsResidentialType = ({ t, config, onSelect, value }) => {
  const [ResidentialType, setResidentialType] = useState(() => {
    const { ResidentialType } = ""; //value;
    return ResidentialType ? ResidentialType : {};
  });

  const goNext = () => {
    onSelect({ ResidentialType });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "Yes",
      key: "Yes",
    },
    {
      name: "No",
      key: "No",
    },
  ];
  debugger;

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectedValue(value) {
    setResidentialType(value);
    // sessionStorage.setItem("ownerType", value.code);
    sessionStorage.setItem("ResidentialType", value.key);
  }
  debugger;
  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      // {...{ menu: ownershipCategory }}
      {...{ optionsKey: "key" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: ResidentialType }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default IsResidentialType;
