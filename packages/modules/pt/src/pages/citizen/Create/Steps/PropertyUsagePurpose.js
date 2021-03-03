import React, { useState } from "react";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const PropertyUsagePurpose = ({ t, config, onSelect, value }) => {
  const [PropertyPurpose, setPropertyUsage] = useState(() => {
    const { PropertyPurpose } = ""; //value;
    return PropertyPurpose ? PropertyPurpose : {};
  });

  const goNext = () => {
    onSelect({ PropertyPurpose });
  };

  const textParams = config.texts;

  const menu = [
    {
      name: "Institutional",
      key: "Institutional",
    },
    {
      name: "Industrial",
      key: "Industrial",
    },
    {
      name: "Commercial",
      key: "Commercial",
    },
  ];
  debugger;

  // const propertyOwnerShipCategory = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerShipCategory", {});
  function selectedValue(value) {
    setPropertyUsage(value);
    // sessionStorage.setItem("ownerType", value.code);
    sessionStorage.setItem("PropertyPurpose", value.key);
  }
  debugger;
  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      // {...{ menu: ownershipCategory }}
      {...{ optionsKey: "key" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: PropertyPurpose }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default PropertyUsagePurpose;
