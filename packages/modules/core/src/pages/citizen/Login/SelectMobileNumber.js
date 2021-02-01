import React from "react";
import { CardText, FormStep } from "@egovernments/digit-ui-react-components";

const SelectMobileNumber = ({ t, onSelect, onRegisterClick, showRegisterLink, mobileNumber, config }) => {
  return (
    <FormStep onSelect={onSelect} config={config} t={t} componentInFront="+91" value={mobileNumber}>
      {showRegisterLink && (
        <CardText>
          {t("CS_LOGIN_NO_ACCOUNT")}
          <span className="card-text-button" onClick={onRegisterClick}>
            Register
          </span>
        </CardText>
      )}
    </FormStep>
  );
};

export default SelectMobileNumber;
