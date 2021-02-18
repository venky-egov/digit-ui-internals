import React, { Fragment, useState } from "react";
import { CardLabel, LabelFieldPair, Dropdown } from "@egovernments/digit-ui-react-components";

const SelectSlumName = ({ config, onSelect, t, value, userType, setValue, data }) => {
  const [slum, setSlum] = useState();
  const [slumMenu, setSlumMenu] = useState([
    { key: "PB_AMRITSAR_SUN01_SLUM_NJAGBANDHU", name: "NJagbandhu" },
    { key: "PB_AMRITSAR_SUN01_SLUM_B", name: "Slum B" },
    { key: "PB_AMRITSAR_SUN01_SLUM_C", name: "Slum C" },
  ]);

  function selectSlum(value) {
    setValue(config.key, value.key)
  }
  
    return(
      <LabelFieldPair>
          <CardLabel style={{ marginBottom: "revert", width: "30%" }}>
            {t("ES_NEW_APPLICATION_SLUM_NAME")}
            {config.isMandatory ? " * " : null}
          </CardLabel>
          <Dropdown option={slumMenu}  style={{ width: "50%" }} optionKey="name" id="slum" selected={slum} select={selectSlum} />
        </LabelFieldPair>
      
    );
};

export default SelectSlumName;
