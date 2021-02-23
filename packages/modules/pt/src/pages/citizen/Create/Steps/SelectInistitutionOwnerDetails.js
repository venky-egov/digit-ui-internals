import React, { useState } from "react";
import { FormStep, TextInput, CardLabel, CardHeader } from "@egovernments/digit-ui-react-components";


const SelectInistitutionOwnerDetails = ({ t, config, onSelect, value }) => {
  // const [inistitutionName, setInistitutionName] = useState(() => {
  //   const { inistitutionName } = ""; //value
  //   return inistitutionName;
  // });
  // const [inistitutetype, setInistitutetype] = useState(() => {
  //   const { inistitutetype } = ""; //value
  //   return inistitutetype;
  // });
  // const [name, setName] = useState(() => {
  //   const { name } = ""; //value
  //   return name;
  // });
  // const [designation, setDesignation] = useState(() => {
  //   const { designation } = ""; //value
  //   return designation;
  // });
  // const [mobileNo, setMobileNo] = useState(() => {
  //   const { mobileNo } = ""; //value
  //   return mobileNo;
  // });
  // const [telePhone, setTelePhone] = useState(() => {
  //   const { telePhone } = ""; //value
  //   return telePhone;
  // });
  // const [email, setEmail] = useState(() => {
  //   const { email } = ""; //value
  //   return email;
  // });

  // function setInistitution(e) {
  //   debugger;
  //   setInistitutionName(e.target.value);
  // }
  // function setTypeOfInistituteName(e) {
  //   setInistitutetype(e.target.value);
  // }
  // function setInistituteName(e) {
  //   setName(e.target.value);
  // }
  // function setDesignationName(e) {
  //   setDesignation(e.target.value);
  // }
  // function setMobileNumber(e) {
  //   setMobileNo(e.target.value);
  // }
  // function setTelephoneNumber(e) {
  //   setTelePhone(e.target.value);
  // }
  // function setEmailAdrs(e) {
  //   setEmail(e.target.value);
  // }
  const [institutionDetails, setInstitutionDetails] = useState({
    institutionName: "",
    institutetype: "",
    name: "",
    designation: "",
    mobileNumber: "",
    telePhone: "",
    email: ""
  });

  function onChange(e) {
    console.log(e.target.value, "e.target.valuee.target.valuee.target.value");
    setInstitutionDetails({...institutionDetails, [e.target.name]: e.target.value});
  }

  const goNext = () => {
    onSelect();
  };


  return (
    <FormStep config={config} t={t} onSelect={goNext}>
      <div>
        <CardLabel>{t("Inistitution Name")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="institutionName"
          placeholder="Enter Inistitution Name"
          // onChange={setInistitution}
          // value={inistitutionName}
          onChange={onChange}
          value={institutionDetails.institutionName}
        />
        <CardLabel>{t("Type of Inistitute")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="institutetype"
          placeholder="Enter Type of Inistitute"
          // onChange={setTypeOfInistituteName}
          // value={inistitutetype}
          onChange={onChange}
          value={institutionDetails.institutetype}
        />
        <CardHeader>{t("Authorized Person's Details")}</CardHeader>
        <CardLabel>{t("Name")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="name"
          placeholder="Enter Name"
          // onChange={setInistituteName}
          // value={name}
          onChange={onChange}
          value={institutionDetails.name}
        />
        <CardLabel>{t("Designation")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="designation"
          placeholder="Enter Designation"
          // onChange={setDesignationName}
          // value={designation}
          onChange={onChange}
          value={institutionDetails.designation}
        />
        <CardLabel>{t("Mobile Number")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="mobileNumber"
          placeholder="Enter Mobile Number"
          // onChange={setMobileNumber}
          // value={mobileNo}
          onChange={onChange}
          value={institutionDetails.mobileNumber}
        />
        <CardLabel>{t("Telephone Number")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="telePhone"
          placeholder="Enter Telephone Number"
          // onChange={setTelephoneNumber}
          // value={telePhone}
          onChange={onChange}
          value={institutionDetails.telePhone}
        />
        <CardLabel>{t("Email ID")}</CardLabel>
        <TextInput
          isMandatory
          optionKey="i18nKey"
          t={t}
          name="email"
          placeholder="Enter Email ID"
          defaultValue="kole@gmail.com"
          // onChange={setEmailAdrs}
          // value={email}
          onChange={onChange}
          value={institutionDetails.email}
        />
      </div>
    </FormStep>
  );
};

export default SelectInistitutionOwnerDetails;
