import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyTaxRegistration, Card, CardLabel, CardHeader, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
//import { map } from "lodash-es";

const PropertyTax = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = tenantId.split(".")[0];

  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  //console.log(Documentsob);
  const docs = Documentsob?.PropertyTax?.Documents;
  //console.log(docs);
  // console.log(x);

  function onSave() {
    //history.push(`http://localhost:3000/digit-ui/citizen/pt/property/test/location`);
    //onclick();
  }

  function goNext() {
    onSelect();
  }
  return (
    <React.Fragment>
      <Card>
        <CardHeader>{t("PT_DOC_REQ_SCREEN_HEADER")}</CardHeader>
        <CardText>{t("PT_DOC_REQ_SCREEN_SUB_HEADER")}</CardText>
        <CardText>{t("PT_DOC_REQ_SCREEN_TEXT")}</CardText>
        <CardText>{t("PT_DOC_REQ_SCREEN_SUB_TEXT")}</CardText>
        <CardLabel>{t("PT_DOC_REQ_SCREEN_LABEL")}</CardLabel>
        <CardText>{t("PT_DOC_REQ_SCREEN_LABEL_TEXT")}</CardText>
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
