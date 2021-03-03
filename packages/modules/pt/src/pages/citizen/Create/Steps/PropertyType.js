import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const PropertyType = ({ t, config, onSelect, value }) => {
  const [BuildingType, setBuildingType] = useState(() => {
    const { BuildingType } = ""; //value;
    return BuildingType ? BuildingType : {};
  });

  const goNext = () => {
    onSelect({ BuildingType });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "Independent Building",
      key: "Independent Building",
    },
    {
      name: "Flat / Part of a Building",
      key: "Flat / Part of a Building",
    },
    {
      name: "Vacant land",
      key: "Vacant land",
    },
  ];
  debugger;

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectedValue(value) {
    setBuildingType(value);
    // sessionStorage.setItem("ownerType", value.code);
    sessionStorage.setItem("BuildingType", value.key);
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

export default PropertyType;
