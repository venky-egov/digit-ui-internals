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

  const { city_complaint, locality_complaint, street, doorNo, landmark, ownerType } = value;
  return (
    <Card>
      <CardHeader>{t("CS_CHECK_CHECK_YOUR_ANSWERS")}</CardHeader>
      <CardText>{t("CS_CHECK_CHECK_YOUR_ANSWERS_TEXT")}</CardText>
      <CardSubHeader>{t("Property Address")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("CS_CHECK_ADDRESS")}
          //text={`${doorNo ? `${doorNo} ` : ""} ${street ? `${street}, ` : ""}${t(locality_complaint.code)}, ${t(city_complaint.code)}`}
          text="002/62 Kayian Mohalla, Nawanshar, Punjab, 144, 514"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/pincode" />}
        />
        <Row
          label={t("Proof of Address")}
          text="Adhaar.jpg"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/createProperty/proof" />}
        />
        {/* {landmark && (
          <Row label={t("landmark")} text={landmark} actionButton={<ActionButton jumpTo="/digit-ui/citizen/pt/property/test/landmark" />} />
        )} */}
      </StatusTable>
      <CardSubHeader>{t("Ownership Details")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("type of ownership")}
          //text = {`${ownerType ? `${ownerType}` : ""}`}
          text="Single Owner"
          actionButton={<ActionButton jumpTo="/digit-ui/citizen" />}
        />
      </StatusTable>
      <CardSubHeader>{t("Property Details")}</CardSubHeader>
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
