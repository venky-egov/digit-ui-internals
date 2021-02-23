import React from "react";
import PropTypes from "prop-types";
// import { Card, CardHeader, CardText, LocationSearch, SubmitBar, LinkButton } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

import Card from "../atoms/Card";
import CardHeader from "../atoms/CardHeader";
import CardText from "../atoms/CardText";
import CardLabel from "../atoms/CardLabel";
import SubmitBar from "../atoms/SubmitBar";
import LinkButton from "../atoms/LinkButton";
//import box from "../atoms/box";

const PropertyTaxRegistration = (onSave) => {
  return (
    <Card>
      <CardHeader>Property Tax Registration</CardHeader>

      <CardText>We will be guiding you through this multi-step process</CardText>
      <CardText>Please take your time at each step and fill this form carefully.</CardText>
      <CardText>if you loose network or take a break in between, you can always come back later and continue from where you left off.</CardText>
      <CardLabel>Before you Start</CardLabel>
      <CardText>Scans or photos of the following documents are mandatory to complete the application.</CardText>
      <CardLabel>1. Proof of Identity</CardLabel>
      <CardText>(In the name of the registered owner) Adhar card, passport, driving licence</CardText>
      <CardLabel>2. Proof of Registration</CardLabel>
      <CardText>Patta, Sale deed, Gift certificate</CardText>
      <CardLabel>3. Proof of Occupancy</CardLabel>
      <CardText>Rent agreement, Electricity bill</CardText>
      <SubmitBar
        label="Next"
        onSubmit={() => {
          onSave;
        }}
      />
    </Card>
  );
};

PropertyTaxRegistration.propTypes = {
  header: PropTypes.string,
  cardText: PropTypes.string,
  nextText: PropTypes.string,
  skipAndContinueText: PropTypes.string,
  onSave: PropTypes.func,
};
PropertyTaxRegistration.defaultProps = {
  header: "",
  cardText: "",
  nextText: "",
  skipAndContinueText: "",
  skip: false,
  onSave: null,
};

export default PropertyTaxRegistration;
