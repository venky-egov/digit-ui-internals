import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const SelectOwnerShipDetails = ({ t, config, onSelect, value }) => {

  const [ownerType, setOwnerType] = useState(() => {
    const { ownerType } = ""; //value;
    return ownerType ? ownerType : {};
  });

  const goNext = () => {
    onSelect({ ownerType });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "Individual / Single Owner",
      key: "Individual / Single Owner"
    },
    {
      name: "Joint / Multiple Owners",
      key: "Joint / Multiple Owners"
    },
    {
      name: "Institutional - Private",
      key: "Institutional - Private"
    },
    {
      name: "Institutional - Government",
      key: "Institutional - Government"
    }
  ]
debugger;

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectedValue(value) {
    setOwnerType(value);
    // sessionStorage.setItem("ownerType", value.code);
    sessionStorage.setItem("ownerType", value.key);
  }
  debugger;
  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      // {...{ menu: ownershipCategory }}
      {...{ optionsKey: "key" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: ownerType }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default SelectOwnerShipDetails;
