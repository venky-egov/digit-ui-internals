import { PropertyTaxRegistration } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useHistory } from "react-router-dom";

export const PropertyTax = ({ onSelect, value, t }) => {
  function onSave() {
    const history = useHistory();
    history.push(`/digit-ui/citizen/pt/property/createProperty/map`);
    //history.push(`http://localhost:3000/digit-ui/citizen/pt/property/test/location`);
    //onclick();
  }

  /*  const goNext = () => {
    onSelect();
  }; */

  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      <PropertyTaxRegistration
        submit={() => {
          console.log("skipped")
          onSkip();
        }}
      />
    </React.Fragment>
  );
};
