import React, { useState } from "react";
import { TypeSelectCard, RadioButtons, FormStep } from "@egovernments/digit-ui-react-components";

const PropertyFloorsDetails = ({ t, config, onSelect, formData }) => {
  const [FloorDetails, setFloorDetails] = useState(formData?.noOfFloors);

  const menu = [
    {
      i18nKey: "Ground Floor Only",
    },
    {
      i18nKey: "Ground +1",
    },
    {
      i18nKey: "Ground +2",
    },
  ];

  const onSkip = () => onSelect();

  function selectFloorDetails(value) {
    setFloorDetails(value);
  }

  function goNext() {
    onSelect(config.key, FloorDetails);
  }

  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!FloorDetails} isMultipleAllow={true}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={FloorDetails}
        onSelect={selectFloorDetails}
      />
    </FormStep>
  );
};
// return (
//   <FormStep t={t} config={config} onSelect={goNext}>
//     <TypeSelectCard
//       t={t}
//       optionsKey="key"
//       options={menu || []}
//       selected = {selectedValue}
//       selectedOption={FloorDetails}
//       onSave={goNext}      />
//   </FormStep>
// );
// };

// return (
//   <TypeSelectCard
//     {...textParams}
//     {...{ menu: menu }}
//     // {...{ menu: ownershipCategory }}
//     {...{ optionsKey: "key" }}
//     {...{ selected: selectedValue }}
//     {...{ selectedOption: FloorDetails }}
//     {...{ onSave: goNext }}
//     {...{ t }}
//   />
// );
// };

export default PropertyFloorsDetails;
