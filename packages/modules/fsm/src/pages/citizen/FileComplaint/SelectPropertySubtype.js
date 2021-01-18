import React, { useState } from "react";
import { Loader, TypeSelectCard } from "@egovernments/digit-ui-react-components";

const SelectPropertySubtype = ({ config, onSelect, t, value }) => {
  const [subtype, setSubtype] = useState(() => {
    const { subtype } = value;
    return subtype !== undefined ? subtype : null;
  });
  const { propertyType } = value;

  // const tenantId = Digit.ULBService.getCurrentTenantId();
  // const propertySubtypesData = Digit.Hooks.fsm.useMDMS(tenantId, "PropertyTax", "PropertySubtype");

  // TODO: below data is hard coded, it should be fetch
  const propertySubtypesData = {
    data: [
      {
        code: "NONRESIDENTIAL.COMMERCIAL.OTHERCOMMERCIALSUBMINOR.OTHERCOMMERCIAL",
      },
      {
        code: "NONRESIDENTIAL.COMMERCIAL.RETAIL.ESTABLISHMENTSINMALLS",
      },
      {
        code: "NONRESIDENTIAL.INSTITUTIONAL.OTHERINSTITUTIONALSUBMINOR.OTHERINSTITUTIONAL",
      },
    ],
  };

  const selectedValue = (value) => {
    setSubtype(value);
  };

  const goNext = () => {
    onSelect({ subtype: subtype });
  };

  if (propertySubtypesData.isLoading) {
    return <Loader />;
  }

  const menu = propertySubtypesData.data.filter((item) => item.code.includes(propertyType?.code));

  return (
    <TypeSelectCard
      {...config.texts}
      {...{ menu: menu }}
      {...{ optionsKey: "code" }}
      {...{ selected: selectedValue }}
      {...{ selectedOption: subtype }}
      {...{ onSave: goNext }}
      t={t}
    />
  );
};

export default SelectPropertySubtype;
