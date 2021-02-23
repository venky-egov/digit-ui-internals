import React, { useState } from "react";
import {
  FormStep,
  TextInput,
  CardLabel,
  RadioButtons
} from "@egovernments/digit-ui-react-components";


const SelectOwnerDetails = ({ t, config, onSelect, value }) => {

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

  const goNext = () => {
    onSelect();
  };

  const options = [
    {
      name: "Female",
      key: "Female"
    },
    {
      name: "Male",
      key: "Male"
    },
    {
      name: "Others",
      key: "Others"
    },
  ];

  const GuardianOptions = [
    {
      name: "Father",
      key: "Father"
    },
    {
      name: "Husband",
      key: "Husband"
    }
  ];


  return (
    <FormStep config={config} t={t} onSelect={goNext}>
      <div>
        <CardLabel>{t("Name")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="name"
          placeholder="Enter Name"
          onChange={setOwnerName}
          value={name}
        />
        <CardLabel>{t("Gender")}</CardLabel>
        <RadioButtons
          t={t}
          onSelect={setGenderName}
          value={gender}
          options={options}
          optionsKey="key"
          selectedOption={gender}
        />
        <CardLabel>{t("Mobile Number")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="mobileNo"
          placeholder="Enter Mobile Number"
          onChange={setMobileNumber}
          value={mobileNo}
        />
        <CardLabel>{t("Guardian")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="guardian"
          placeholder="Enter Guardian Name"
          onChange={setGuardiansName}
          value={guardians}
        />
        <RadioButtons
          t={t}
          options={GuardianOptions}
          optionsKey="key"
          onSelect={setGuardianName}
          value={guardian}
          selectedOption={guardian}
        />
      </div>
    </FormStep>
  );
};

export default SelectOwnerDetails;
