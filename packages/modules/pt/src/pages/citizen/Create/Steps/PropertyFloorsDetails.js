import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const PropertyFloorsDetails = ({ t, config, onSelect, value }) => {
  const [FloorDetails, setFloorDetails] = useState(() => {
    const { FloorDetails } = ""; //value;
    return FloorDetails ? FloorDetails : {};
  });

  const goNext = () => {
    onSelect({ FloorDetails });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "Ground Floor Only",
      key: "Ground Floor Only",
    },
    {
      name: "Ground + 1",
      key: "Ground +1",
    },
    {
      name: "Ground + 2",
      key: "Ground +2",
    },
  ];
  debugger;

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectedValue(value) {
    setFloorDetails(value);
    // sessionStorage.setItem("ownerType", value.code);
    sessionStorage.setItem("FloorDetails", value.key);
  }
  debugger;
  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      // {...{ menu: ownershipCategory }}
      {...{ optionsKey: "key" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: FloorDetails }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default PropertyFloorsDetails;
