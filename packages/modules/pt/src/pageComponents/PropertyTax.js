import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyTaxRegistration, Card, CardLabel, CardHeader, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
//import { map } from "lodash-es";

const PropertyTax = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  console.log(Documentsob);
  const docs = Documentsob?.PropertyTax?.Documents;
  console.log(docs);
  var IdentityProof = [];
  var RegisProof = [];
  var OccupancyProof = [];
  var docshead = [];
  var d = [];
  for (var i = 0; i < docs.length; i++) {
    //console.log(docs[i]);
    docshead.push(docs[i].code);
    for (var j = 0; j < docs[i].dropdownData.length; j++) {
      //console.log(docs[i].dropdownData);
      d.push(docs[i].dropdownData[j].code);
      if (i == 1) {
        //console.log(docs[i].dropdownData[j].code);
        IdentityProof.push(docs[i].dropdownData[j].code);
      } else if (i == 2) {
        RegisProof.push(docs[i].dropdownData[j].code);
      } else if (i == 6) {
        OccupancyProof.push(docs[i].dropdownData[j].code);
      }
    }
    d.push("-1");
  }
  // console.log(x);

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
      <Card>
        <CardHeader>Property Tax Registration</CardHeader>
        <CardText>We will be guiding you through this multi-step process</CardText>
        <CardText>Please take your time at each step and fill this form carefully.</CardText>
        <CardText>if you loose network or take a break in between, you can always come back later and continue from where you left off.</CardText>
        <CardLabel>Before you Start</CardLabel>
        <CardText>Scans or photos of the following documents are mandatory to complete the application.</CardText>
        <div>
          {Array.isArray(docs)
            ? docs.map(({ code, dropdownData }, index) => (
                <div key={index}>
                  <CardLabel>
                    {index + 1}. {code}
                  </CardLabel>
                  {dropdownData.map((dropdownData) => (
                    <CardText>{dropdownData?.code}</CardText>
                  ))}
                </div>
              ))
            : console.log("error")}
        </div>

        <SubmitBar label="Next" onSubmit={onSelect} />
      </Card>
    </React.Fragment>
  );
};

export default PropertyTax;
