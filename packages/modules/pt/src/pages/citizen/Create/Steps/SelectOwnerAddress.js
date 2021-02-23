import React, { useState } from "react";
import {
  FormStep,
  TextInput,
  CheckBox,
  CardLabel
} from "@egovernments/digit-ui-react-components";

const SelectOwnerAddress = ({ t, config, onSelect, value }) => {

  const [address, setAddress] = useState(() => {
    const { address } = ""; //value;
    return address ? address : "";
  });
  const [sameAddress, setSameAddress] = useState(() => {
    const { address } = ""; //value;
    return address ? address : {};
  });

  function setOwnerAddress(e) {
    setAddress(e.target.value);
  }
  function setSameAsPropertyAddress(e) {
    setSameAddress(e.target.value);
  }

  const goNext = () => {
    onSelect();
  };

  return (
    <FormStep config={config} t={t} onSelect={goNext}>
      <TextInput
        isMandatory
        optionKey="i18nKey"
        t={t}
        name="address"
        placeholder="Enter Address"
        onChange={setOwnerAddress}
        value={address}
      />
      <CardLabel>{t("Gender")}</CardLabel>
      <CheckBox
        label="Same as property address"
        onChange={setSameAsPropertyAddress}
        value={sameAddress}
      />
    </FormStep>

  );
};

export default SelectOwnerAddress;
