import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const PropertyBasementsDetails = ({ t, config, onSelect, value }) => {
  const [BasementDetails, setBasementDetails] = useState(() => {
    const { BasementDetails } = ""; //value;
    return BasementDetails ? BasementDetails : {};
  });

  const goNext = () => {
    onSelect({ BasementDetails });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "No Basement",
      key: "No Basement",
    },
    {
      name: "1 Basement",
      key: "1 Basement",
    },
    {
      name: "2 Basement",
      key: "2 Basement",
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
      {...{ selectedOption: BasementDetails }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default PropertyBasementsDetails;
