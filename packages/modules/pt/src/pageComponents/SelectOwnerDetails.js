import React, {useState} from "react";
import { FormStep, TextInput, LabelFieldPair, CardLabel, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";

const SelectOwnerDetails = ({ t, config, onSelect, userType, formData }) => {

  const [name, setName] = useState(() => {
    const { name } = ""; //value
    return name;
  });
  const [gender, setGender] = useState(() => {
    const { gender } = ""; //value
    return gender;
  });
  const [mobileNo, setMobileNo] = useState(() => {
    const { mobileNo } = ""; //value
    return mobileNo;
  });
  const [guardians, setGuardianNames] = useState(() => {
    const { guardian } = ""; //value
    return guardian;
  });

  const [guardian, setGuardian] = useState(() => {
    const { guardian } = ""; //value
    return guardian;
  });

  function setOwnerName(e) {
    setName(e.target.value);
  }
  function setGenderName(value) {
    setGender(value);
  }
  function setMobileNumber(e) {
    setMobileNo(e.target.value);
  }
  function setGuardiansName(e) {
    setGuardianNames(e.target.value);
  }
  function setGuardianName(value) {
    setGuardian(value);
  }

  // const goNext = () => {
  //   onSelect({
  //       name,
  //       gender,
  //       mobileNo, 
  //       guardian
  //   });
  // };

  function goNext() {
    onSelect();
  }

  const onSkip = () => onSelect();
  const onSubmit = () => {};

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
    <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t}>
       <CardLabel>{t("PT_OWNER_NAME")}</CardLabel>
        <TextInput
          isMandatory={false}
          optionKey="i18nKey"
          t={t}
          name="name"
          onChange={setOwnerName}
          value={name}
        />
        <CardLabel>{t("PT_FORM3_GENDER")}</CardLabel>
        <RadioButtons
          t={t}
          onSelect={setGenderName}
          value={gender}
          options={options}
          optionsKey="code"
          selectedOption={gender}
        />
        <CardLabel>{t("PT_FORM3_MOBILE_NO")}</CardLabel>
        <TextInput
          isMandatory={false}
          optionKey="i18nKey"
          t={t}
          name="mobileNo"
          onChange={setMobileNumber}
          value={mobileNo}
        />
        <CardLabel>{t("PT_SEARCHPROPERTY_TABEL_GUARDIANNAME")}</CardLabel>
        <TextInput
          isMandatory={false}
          optionKey="i18nKey"
          t={t}
          name="guardian"
          onChange={setGuardiansName}
          value={guardians}
        />
        <RadioButtons
          t={t}
          options={GuardianOptions}
          optionsKey="code"
          onSelect={setGuardianName}
          value={guardian}
          selectedOption={guardian}
        />
    </FormStep>
  );
};

export default SelectOwnerDetails;
