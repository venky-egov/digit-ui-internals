import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardCaption,
  CardHeader,
  CardLabel,
  CardSubHeader,
  StatusTable,
  Row,
  ActionLinks,
  LinkButton,
  SubmitBar,
  CardText,
} from "@egovernments/digit-ui-react-components";

const PropertyInformation = () => {
  const { t } = useTranslation();
  const { acknowledgementIds } = useParams();
  //const tenantId = Digit.ULBService.getCurrentTenantId();
  //const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ tenantId, filters: { propertyIds:PB-PT-2021-02-17-011910 }});

  const ActionButton = ({ jumpTo }) => {
    const { t } = useTranslation();
    const history = useHistory();
    function routeTo() {
      history.push(jumpTo);
    }
    return <LinkButton label={t("PT_OWNER_HISTORY")} className="check-page-link-button" onClick={routeTo} />;
  };

  return (
    <React.Fragment>
      <CardHeader>{t("PT_PROPERTY_INFORMATION")}</CardHeader>
      <Card>
        <StatusTable>
          <Row label={t("PT_PROPERTY_PTUID")} text={"10004"} />
          <Row label={t("Total Property Due")} text={"3223"} />
        </StatusTable>
      </Card>
      <Card>
        <CardSubHeader> {t("PT_PROPERTY_ADDRESS_SUB_HEADER")} </CardSubHeader>
        <StatusTable>
          <Row label={t("Pincode ")} text={"522032"} />
          <Row label={t("City")} text={"Bangalore"} />
          <Row label={t("Mohalla")} text={"PB_AMRITSAR_REVENUE_SUN04"} />
          <Row label={t("Street Name")} text={"xyz"} />
          <Row label={t(" Building Name ")} text={"ram bhavan"} />
        </StatusTable>

        <CardSubHeader> {t("Property Assesment Details")} </CardSubHeader>
        <StatusTable>
          <Row label={t("Property Usage Type")} text={"residential"} />
          <Row label={t("Property Type")} text={"independent"} />
          <Row label={t(" Plot Size(sq yards)")} text={"222"} />
          <Row label={t(" No. of Floors ")} text={"1"} />
          <Row label={t(" Building Name ")} text={"sear"} />
        </StatusTable>
        <CardSubHeader> {t("Ground Floor")} </CardSubHeader>
        <StatusTable>
          <Row label={t("unit 1")} />
          <Row label={t("unit usage type")} text={"residential"} />
          <Row label={t("unit occupancy type")} text={"slefoccupied"} />
          <Row label={t("unit buildup area")} text={"12.33"} />
        </StatusTable>

        <CardSubHeader>{t("Property Ownership Details")}</CardSubHeader>

        <StatusTable>
          <Row label={t("Owners Name")} text={"jagan"} actionButton={<ActionButton jumpTo="" />} />
          <Row label={t(" Gender")} text={"Male"} />
          <Row label={t("Mobile No")} text={"233234"} />
          <Row label={t("Special Category")} text={"none"} />
          <Row label={t("Guardian's Name")} text={"ew"} />
          <Row label={t("Ownership Type")} text={"single"} />
          <Row label={t("Email")} text={"xyew"} />
          <Row label={t("Correspondence Address")} text={"no1,new road"} />
        </StatusTable>
      </Card>
    </React.Fragment>
  );
};

export default PropertyInformation;
