import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeSelectCard } from "@egovernments/digit-ui-react-components";

const SelectSpecialOwnerCategoryType = ({ t, config, onSelect, value }) => {
  const [complaintType, setComplaintType] = useState(() => {
    const { complaintType } = ""; //value;
    return complaintType ? complaintType : {};
  });

  const goNext = () => {
    onSelect({ complaintType });
  };

  const textParams = config.texts;

  // const menu = Digit.Hooks.pt.useMDMS("pb", "PropertyTax", "OwnerType", {});

  const menu = [
    {
      name: "Freedom Fighter",
      key: "Freedom Fighter",
    },
    {
      name: "Widow",
      key: "Widow"
    },
    {
      name: "Handicapped Person",
      key: "Handicapped Person"
    },
    {
      name: "Below Poverty Line",
      key: "Below Poverty Line"
    },
    {
      name: "Defense Personnel",
      key: "Defense Personnel"
    },
    {
      name: "None of the above",
      key: "None of the above"
    }
  ]

  function selectedValue(value) {
    setComplaintType(value);
    // SessionStorage.set("complaintType", value);
  }
  return (
    <TypeSelectCard
      {...textParams}
      {...{ menu: menu }}
      {...{ optionsKey: "name" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: complaintType }}
      {...{ onSave: goNext }}
      {...{ t }}
    />
  );
};

export default SelectSpecialOwnerCategoryType;
