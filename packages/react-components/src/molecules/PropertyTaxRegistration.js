import PropTypes from "prop-types";
import React from "react";
import Card from "../atoms/Card";
import CardHeader from "../atoms/CardHeader";
import CardLabel from "../atoms/CardLabel";
import CardText from "../atoms/CardText";
import SubmitBar from "../atoms/SubmitBar";

//import box from "../atoms/box";

const PropertyTaxRegistration = ({ submit }) => {
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
          console.log("submiy")
          submit();
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
