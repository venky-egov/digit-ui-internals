import React, { useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectOwnerDetails = ({ t, config, onSelect, userType, formData }) => {
  let index = window.location.href.charAt(window.location.href.length - 1);
  const [name, setName] = useState(formData.owners && formData.owners[index] && formData.owners[index].name);
  const [gender, setGender] = useState(formData.owners && formData.owners[index] && formData.owners[index].gender);
  const [mobileNumber, setMobileNumber] = useState(formData.owners && formData.owners[index] && formData.owners[index].mobileNumber);
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState(
    formData.owners && formData.owners[index] && formData.owners[index].fatherOrHusbandName
  );
  const [relationship, setRelationship] = useState(formData.owners && formData.owners[index] && formData.owners[index].relationship);

  function setOwnerName(e) {
    setName(e.target.value);
  }
  function setGenderName(value) {
    setGender(value);
  }
  function setMobileNo(e) {
    setMobileNumber(e.target.value);
  }
  function setGuardiansName(e) {
    setFatherOrHusbandName(e.target.value);
  }
  function setGuardianName(value) {
    setRelationship(value);
  }

  const goNext = () => {
    let owner = formData.owners && formData.owners[index];
    let ownerStep = { ...owner, name, gender, mobileNumber, fatherOrHusbandName, relationship };
    onSelect(config.key, ownerStep, false, index);
  };

  const onSkip = () => onSelect();

  const options = [
    { value: "Female", code: "PT_FORM3_FEMALE", value: "FEMALE" },
    { value: "Male", code: "PT_FORM3_MALE", value: "MALE" },
    { value: "Transgender", code: "PT_COMMON_GENDER_TRANSGENDER", value: "TRANSGENDER" },
    { value: "OTHERS", code: "PROPERTYTAX_BILLING_SLAB_OTHERS", value: "OTHERS" },
  ];

  const GuardianOptions = [
    { name: "Father", code: "FATHER", i18nKey: "PT_RELATION_FATHER" },
    { name: "Husband", code: "HUSBAND", i18nKey: "PT_RELATION_HUSBAND" },
  ];

  return (
    <FormStep
      config={config}
      onSelect={goNext}
      onSkip={onSkip}
      t={t}
      isDisabled={!name || !mobileNumber || !gender || !relationship || !fatherOrHusbandName}
    >
      <CardLabel>{`${t("PT_OWNER_NAME")}*`}</CardLabel>
      <TextInput t={t} isMandatory={false} optionKey="i18nKey" name="name" value={name} onChange={setOwnerName} pattern="^[a-zA-Z_ ]*$" />
      <CardLabel>{`${t("PT_FORM3_GENDER")}*`}</CardLabel>
      <RadioButtons t={t} options={options} optionsKey="code" name="gender" value={gender} selectedOption={gender} onSelect={setGenderName} />
      <CardLabel>{`${t("PT_FORM3_MOBILE_NUMBER")}*`}</CardLabel>
      <TextInput
        t={t}
        isMandatory={false}
        optionKey="i18nKey"
        name="mobileNumber"
        value={mobileNumber}
        onChange={setMobileNo}
        pattern="^([0]|((\+\d{1,2}[-]{0,1})))?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
      />
      <CardLabel>{`${t("PT_FORM3_GUARDIAN_NAME")}*`}</CardLabel>
      <TextInput
        t={t}
        isMandatory={false}
        optionKey="i18nKey"
        name="fatherOrHusbandName"
        value={fatherOrHusbandName}
        onChange={setGuardiansName}
        pattern="^[a-zA-Z_ ]*$"
      />
      <RadioButtons
        t={t}
        optionsKey="i18nKey"
        name="relationship"
        options={GuardianOptions}
        value={relationship}
        selectedOption={relationship}
        onSelect={setGuardianName}
      />
    </FormStep>
  );
};

export default SelectOwnerDetails;
