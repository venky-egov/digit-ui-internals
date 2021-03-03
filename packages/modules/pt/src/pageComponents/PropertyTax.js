import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyTaxRegistration } from "@egovernments/digit-ui-react-components";

const PropertyTax = ({ onSave, t, config }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  console.log(Documentsob);
  function onSave() {
    //history.push(`http://localhost:3000/digit-ui/citizen/pt/property/test/location`);
    //onclick();
  }

  /*  const goNext = () => {
    onSelect();
  }; */
  function goNext() {
    onSelect();
  }
  return (
    <React.Fragment>
      <PropertyTaxRegistration
        /* onSubmit={() => {
          onSave;
        }} */
        onSelect={goNext}
      />
    </React.Fragment>
  );
};

export default PropertyTax;
