import { Card, CardHeader, CardSubHeader, CardText, LinkButton, Row, StatusTable, SubmitBar } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    history.push(jumpTo);
  }

  return <LinkButton label={t("CS_COMMON_CHANGE")} className="check-page-link-button" onClick={routeTo} />;
};

const CheckPage = ({ onSubmit, value = {} }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const {
    address,
    isResidental,
    PropertyType,
    noOfFloors,
    noOofBasements,
    units=[{}],
    UnOccupiedArea,
    city_complaint,
    locality_complaint,
    street,
    doorNo,
    landmark,
    ownerType,
    ownershipCategory,
    owners,
  } = value;
  return (
    <Card>
      <CardHeader>{t("CS_CHECK_CHECK_YOUR_ANSWERS")}</CardHeader>
      <CardText>{t("CS_CHECK_CHECK_YOUR_ANSWERS_TEXT")}</CardText>
      <CardSubHeader>{t("PT_PROPERTY_ADDRESS_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_PROPERTY_ADDRESS_SUB_HEADER")}
          text={`${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
            address?.landmark ? `${address?.landmark}, ` : ""
          }${t(address?.locality.code)}, ${t(address?.city.code)},${t(address?.pincode) ? `${address.pincode}` : " "}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/createProperty/pincode" />}
        />
        <Row
          label={t("PT_PROOF_OF_ADDRESS_SUB_HEADER")}
          text={`${address?.documents.ProofOfAddress?.name || "na"}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/createProperty/proof" />}
        />
      </StatusTable>
      <CardSubHeader>{t("PT_OWNERSHIP_DETAILS_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_FORM3_OWNERSHIP_TYPE")}
          text={t(ownershipCategory?.i18nKey)}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/owner-ship-details@0" />}
        />
      </StatusTable>
      <div>
        {owners&&owners.map&&owners.map((owners, index) => (
          <div key={index}>
            <CardSubHeader>
              {t("PT_OWNER_SUB_HEADER")} - {index + 1}
            </CardSubHeader>
            <StatusTable>
              <Row
                label={t("PT_COMMON_APPLICANT_NAME_LABEL")}
                text={`${t(owners?.name)}`}
                actionButton={<ActionButton jumpTo={`${"/digit-ui/citizen/pt/property/new-application/owner-details/"}${index}`} />}
              />
              <Row
                label={t("PT_COMMON_GENDER_LABEL")}
                text={`${t(owners?.gender?.code)}`}
                actionButton={<ActionButton jumpTo={`${"/digit-ui/citizen/pt/property/new-application/owner-details/"}${index}`} />}
              />
              <Row
                label={t("PT_FORM3_GUARDIAN_NAME")}
                text={`${t(owners?.fatherOrHusbandName)}`}
                actionButton={<ActionButton jumpTo={`${"/digit-ui/citizen/pt/property/new-application/owner-details/"}${index}`} />}
              />
              <Row
                label={`${t("COMMON_OWNER")} - ${index + 1} ${t("PT_ADDRESS_LABEL")}`}
                text={`${t(owners?.permanentAddress)}`}
                actionButton={<ActionButton jumpTo={`${"/digit-ui/citizen/pt/property/new-application/owner-address/"}${index}`} />}
              />
            </StatusTable>
          </div>
        ))}
      </div>
      <CardSubHeader>{t("PT_ASSESMENT_INFO_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_RESIDENTIAL_PROP_LABEL")}
          text={`${t(isResidental?.value?.i18nKey)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/isResidential" />}
        />
        <Row
          label={t("PT_ASSESMENT1_PROPERTY_TYPE")}
          text={`${t(PropertyType?.i18nKey)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/property-type" />}
        />
        <Row
          label={t("PT_ASSESMENT_INFO_NO_OF_FLOOR")}
          text={`${t(noOfFloors?.i18nKey)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/number-of-floors" />}
        />
        <Row
          label={t("PT_PROPERTY_DETAILS_NO_OF_BASEMENTS_LABEL")}
          text={`${t(noOofBasements?.i18nKey)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/number-of-basements@0" />}
        />
      </StatusTable>
      <CardSubHeader>{t("PT_GROUND_FLOOR_DETAILS_LABEL")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_ASSESMENT1_PLOT_SIZE")}
          text={`${t(units[0]?.plotSize)} sq.ft`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/floordetails/0" />}
        />
        <Row
          label={t("PT_BUILT_UP_AREA_LABEL")}
          text={`${t(units[0]?.builtUpArea)}sq.ft`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/floordetails/0" />}
        />
        <Row
          label={t("PT_PROPERTY_RENTED_AREA_LABEL")}
          text="120 sq.ft"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/rental-details" />}
        />
        <Row
          label={t("PT_PROPERTY_ANNUAL_RENT_LABEL")}
          text="12000 sq.ft"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/rental-details" />}
        />
        <Row
          label={t("PT_PROPERTY_UNOCCUPIED_AREA_LABEL")}
          text={`${t(UnOccupiedArea?.landmark)}sq.ft`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/new-application/un-occupied-area" />}
        />
      </StatusTable>
  
      <SubmitBar label="Submit" onSubmit={onSubmit} />
    
    </Card>
  );
};

export default CheckPage;
