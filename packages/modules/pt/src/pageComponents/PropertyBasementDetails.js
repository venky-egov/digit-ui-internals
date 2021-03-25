import React, { useState } from "react";
import { RadioButtons, TypeSelectCard, FormStep } from "@egovernments/digit-ui-react-components";

const PropertyBasementsDetails = ({ t, config, onSelect, userType, formData }) => {
  const [BasementDetails, setBasementDetails] = useState(formData?.noOofBasements);

  const menu = [
    {
      i18nKey: "No Basement",
    },
    {
      i18nKey: "1 Basement",
    },
    {
      i18nKey: "2 Basement",
    },
  ];

  const onSkip = () => onSelect();

  function selectBasementDetails(value) {
    setBasementDetails(value);
  }

  function goNext() {
    let index = window.location.href.charAt(window.location.href.length - 1);
    sessionStorage.setItem("noOofBasements", BasementDetails);
    onSelect(config.key, BasementDetails, "", index);
  }

  return (
    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!BasementDetails} isMultipleAllow={true}>
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        isMandatory={config.isMandatory}
        options={menu}
        selectedOption={BasementDetails}
        onSelect={setBasementDetails}
      />
    </FormStep>
  );
};
//   return (
//   <FormStep t={t} config={config} onSelect={goNext}>
//     <TypeSelectCard
//       t={t}
//       optionsKey="key"
//       options={menu || []}
//       selected = {selectedValue}
//       selectedOption={BasementDetails}
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
//     {...{ selectedOption: BasementDetails }}
//     {...{ onSave: goNext }}
//     {...{ t }}
//   />
// );
// };

export default PropertyBasementsDetails;
