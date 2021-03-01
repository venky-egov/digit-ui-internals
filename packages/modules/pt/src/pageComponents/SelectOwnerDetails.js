import React, { useState } from "react";
import { FormStep, TextInput, CardLabel, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectOwnerDetails = ({ t, config, onSelect, userType, formData }) => {
  let index = 0;
  const [name, setName] = useState(formData.owners && formData.owners[index] && formData.owners[index].name);
  const [gender, setGender] = useState(formData.owners && formData.owners[index] && formData.owners[index].gender);
  const [mobileNumber, setMobileNumber] = useState(formData.owners && formData.owners[index] && formData.owners[index].mobileNumber);
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState(formData.owners && formData.owners[index] && formData.owners[index].fatherOrHusbandName);
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
    onSelect(config.key, ownerStep);
  };

  const onSkip = () => onSelect();

  const options = [
    { value: "Male", code: "PT_FORM3_MALE" },
    { value: "Female", code: "PT_FORM3_FEMALE" },
    { value: "OTHERS", code: "PT_FORM3_TRANSGENDER" },
  ];

  const GuardianOptions = [
    { name: "Father", code: "FATHER" },
    { name: "Husband", code: "HUSBAND" }
  ];


  return (
    <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={(!name || !mobileNumber || !gender || !relationship || !fatherOrHusbandName)}>
      <CardLabel>{t("PT_OWNER_NAME")}</CardLabel>
      <TextInput
        t={t}
        isMandatory={false}
        optionKey="i18nKey"
        name="name"
        value={name}
        onChange={setOwnerName}
      />
      <CardLabel>{t("PT_FORM3_GENDER")}</CardLabel>
      <RadioButtons
        t={t}
        options={options}
        optionsKey="code"
        name="gender"
        value={gender}
        selectedOption={gender}
        onSelect={setGenderName}
      />
      <CardLabel>{t("PT_FORM3_MOBILE_NO")}</CardLabel>
      <TextInput
        t={t}
        isMandatory={false}
        optionKey="i18nKey"
        name="mobileNumber"
        value={mobileNumber}
        onChange={setMobileNo}
      />
      <CardLabel>{t("PT_SEARCHPROPERTY_TABEL_GUARDIANNAME")}</CardLabel>
      <TextInput
        t={t}
        isMandatory={false}
        optionKey="i18nKey"
        name="fatherOrHusbandName"
        value={fatherOrHusbandName}
        onChange={setGuardiansName}
      />
      <RadioButtons
        t={t}
        optionsKey="code"
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
