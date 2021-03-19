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
  Loader,
} from "@egovernments/digit-ui-react-components";

const PropertyInformation = () => {
  const { t } = useTranslation();
  const { propertyIds } = useParams();

  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data } = Digit.Hooks.pt.usePropertySearch({ tenantId, filters: { propertyIds } });

  const property = data?.Properties[0] || " ";

    if (isLoading) {
    return <Loader />;
  }

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
          <Row label={t("PT_PROPERTY_PTUID")} text={`${property.propertyId || "NA"}`} />
          <Row label={t("Total Property Due")} text={"3223"} />
        </StatusTable>
      </Card>
      <Card>
        <CardSubHeader> {t("PT_PROPERTY_ADDRESS_SUB_HEADER")} </CardSubHeader>
        <StatusTable>
          <Row label={t("Pincode ")} text={`${property.pincode || "NA"}`} />
          <Row label={t("City")} text={`${property.address?.city || "NA"}`} />
          <Row label={t("Mohalla")} text={t("PB_AMRITSAR_REVENUE_SUN04")} />
          <Row label={t("Street Name")} text={`${property.street || "NA"}`} />
          <Row label={t(" Building Name ")} text={`${property.address?.buildingName || "NA"}`} />
        </StatusTable>

        <CardSubHeader> {t("Property Assesment Details")} </CardSubHeader>
        <StatusTable>
          <Row label={t("Property Usage Type")} text={`${property.usageCategory || "NA"}`} />
          <Row label={t("Property Type")} text={`${property.propertyType || "NA"}`} />
          <Row label={t(" Plot Size(sq yards)")} text={`${property.landArea || "NA"}`} />
          <Row label={t(" No. of Floors ")} text={`${property.noOfFloors || "NA"}`} />
          <Row label={t(" Building Name ")} text={`${property.address?.buildingName || "NA"}`} />
        </StatusTable>
        <CardSubHeader> {t("Ground Floor")} </CardSubHeader>
        <StatusTable>
          <Row label={t("unit 1")} />
          <Row label={t("unit usage type")} text={`${property.units?.usageCategory || "NA"}`} />
          <Row label={t("unit occupancy type")} text={`${property.units?.occupancyType || "NA"}`} />
          <Row label={t("unit buildup area")} text={`${property.units?.constructionDetail?.builtUpArea || "NA"}`} />
        </StatusTable>

        <CardSubHeader>{t("Property Ownership Details")}</CardSubHeader>

        <StatusTable>
          <Row label={t("Owners Name")} text={`${property.owners?.name || "NA"}`} actionButton={<ActionButton jumpTo="" />} />
          <Row label={t(" Gender")} text={`${property.owners?.gender || "NA"}`} />
          <Row label={t("Mobile No")} text={"233234"} />
          <Row label={t("Special Category")} text={"none"} />
          <Row label={t("Guardian's Name")} text={`${property.owners?.fatherOrHusbandName || "NA"}`} />
          <Row label={t("Ownership Type")} text={`${property.ownershipCategory || "NA"}`} />
          <Row label={t("Email")} text={"xyew"} />
          <Row label={t("Correspondence Address")} text={`${property.owners?.correspondenceAddress || "NA"}`} />
        </StatusTable>
      </Card>
    </React.Fragment>
  );
};

export default PropertyInformation;
