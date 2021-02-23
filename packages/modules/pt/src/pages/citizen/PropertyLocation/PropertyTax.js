import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyTaxRegistration } from "@egovernments/digit-ui-react-components";

export const PropertyTax = (onSave) => {
  function onSave() {
    // history.push(`http://localhost:3000/digit-ui/citizen/pt/property/test/location`);
  }
  return (
    <React.Fragment>
      <PropertyTaxRegistration
        onSubmit={() => {
          onSave;
        }}
      />
    </React.Fragment>
  );
};
