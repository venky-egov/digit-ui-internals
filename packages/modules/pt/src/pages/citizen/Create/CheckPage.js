import React from "react";
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
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const { address, city_complaint, locality_complaint, street, doorNo, landmark, ownerType, ownershipCategory, owners } = value;
  return (
    <Card>
      <CardHeader>{t("CS_CHECK_CHECK_YOUR_ANSWERS")}</CardHeader>
      <CardText>{t("CS_CHECK_CHECK_YOUR_ANSWERS_TEXT")}</CardText>
      <CardSubHeader>{t("PT_PROPERTY_ADDRESS_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_PROPERTY_ADDRESS_SUB_HEADER")}
          text={`${address?.doorNo ? `${address?.doorNo} ` : ""} ${address?.street ? `${address?.street}, ` : ""}${t(address?.locality.code)}, ${t(
            address?.city.code
          )}`}
          /* text={`${address?.doorNo ? `${address?.doorNo} ` : ""} ${address?.street ? `${address?.street}, ` : ""}${t(address?.locality.code)}, ${t(
            address?.city.code
          )}`} */
          //text="002/62 Kayian Mohalla, Nawanshar, Punjab, 144, 514"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/createProperty/pincode" />}
        />
        <Row
          label={t("PT_PROOF_OF_ADDRESS_SUB_HEADER")}
          //text="Adhaar.jpg"
          text={`${t(owners[0]?.documents.specialProofIdentity)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/createProperty/proof" />}
        />
        {/* {landmark && (
          <Row label={t("landmark")} text={landmark} actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/test/landmark" />} />
        )} */}
      </StatusTable>
      <CardSubHeader>{t("PT_OWNERSHIP_DETAILS_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("PT_FORM3_OWNERSHIP_TYPE")}
          //text = {`${ownershipCategory ? `${ownershipCategory}` : ""}`}
          text={t(ownershipCategory.i18nKey)}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen" />}
        />
      </StatusTable>
      <CardSubHeader>{t("PT_OWNER_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row label={t("PT_COMMON_APPLICANT_NAME_LABEL")} text={`${t(owners[0]?.name)}`} actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
        <Row label={t("PT_COMMON_GENDER_LABEL")} text={`${t(owners[0]?.gender.code)}`} actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
        <Row
          label={t("PT_GUARDIAN_SUB_HEADER")}
          text={`${t(owners[0]?.fatherOrHusbandName)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen" />}
        />
        <Row
          label={t("Owner address")}
          text={`${address?.doorNo ? `${address?.doorNo} ` : ""} ${address?.street ? `${address?.street}, ` : ""}${t(address?.locality.code)}, ${t(
            address?.city.code
          )}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen" />}
        />
      </StatusTable>
      <CardSubHeader>{t("PT_ASSESMENT_INFO_SUB_HEADER")}</CardSubHeader>
      <StatusTable>
        <Row label={t("Residental Property")} text="yes" actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
        <Row label={t("Type of property")} text="Independent Building" actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
        <Row label={t("No. of Floors")} text="Ground + 1" actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
        <Row label={t("No. of Basements")} text="None" actionButton={<ActionButton jumpTo="/digit-ui/citizen" />} />
      </StatusTable>
      {/* <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("CS_CHECK_INFO_TEXT")} /> */}
      <SubmitBar label="Submit" onSubmit={onSubmit} />
    </Card>
  );
};

export default CheckPage;
