import React from "react";
import { CardText, FormStep } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config }) => {
  return (
    <FormStep onSelect={onSelect} config={config} t={t} componentInFront="+91" onChange={onMobileChange} value={mobileNumber}>
      {showRegisterLink && (
        <CardText>
          {t("CS_LOGIN_NO_ACCOUNT")}{" "}
          <Link className="card-text-button" to={"/digit-ui/citizen/register/name"}>
            {t("CS_LOGIN_REGISTER_LINK")}
          </Link>
        </CardText>
      )}
    </FormStep>
  );
};

export default SelectMobileNumber;
