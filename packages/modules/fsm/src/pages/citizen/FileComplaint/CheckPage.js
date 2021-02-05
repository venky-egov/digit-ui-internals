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

const CheckPage = ({ onSubmit, value }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { city_complaint, locality_complaint, street, doorNo, landmark, propertyType, subtype, pitType, pitDetail } = value;

  const pitDetailValues = Object.values(pitDetail)

  const pitMeasurement = pitDetailValues.reduce((previous, current, index, array) => {
    if (index === array.length - 1) {
      return previous + current + "m";
    } else {
      return previous + current + "m X ";
    }
  }, "");

  return (
    <Card>
      <CardHeader>{t("CS_CHECK_CHECK_YOUR_ANSWERS")}</CardHeader>
      <CardText>{t("CS_CHECK_CHECK_YOUR_ANSWERS_TEXT")}</CardText>
      <CardSubHeader>{t("CS_CHECK_PROPERTY_DETAILS")}</CardSubHeader>
      <StatusTable>
        <Row
          label={t("CS_CHECK_PROPERTY_TYPE")}
          text={t(propertyType.i18nKey)}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/property-type" />}
        />
        <Row
          label={t("CS_CHECK_PROPERTY_SUB_TYPE")}
          text={t(subtype.i18nKey)}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/property-subtype" />}
        />
        <Row
          label={t("CS_CHECK_ADDRESS")}
          text={`${doorNo} ${street}, ${t(locality_complaint.code)}, ${t(city_complaint.code)}`}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/pincode" />}
        />
        {landmark && (
          <Row
            label={t("CS_CHECK_LANDMARK")}
            text={landmark}
            actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/landmark" />}
          />
        )}
        {pitType && (
          <Row
            label={t("CS_CHECK_PIT_TYPE")}
            text={t(pitType.i18nKey)}
            actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/pit-type" />}
          />
        )}
        <Row
          label={t("CS_CHECK_SIZE")}
          text={[pitMeasurement, pitDetailValues?.length === 3 ? 'Length x Breadth x Depth' : 'Diameter x Depth']}
          actionButton={<ActionButton jumpTo="/digit-ui/citizen/fsm/new-application/tank-size" />}
        />
      </StatusTable>
      {/* <CitizenInfoLabel info={t("CS_FILE_APPLICATION_INFO_LABEL")} text={t("CS_CHECK_INFO_TEXT")} /> */}
      <SubmitBar label="Submit" onSubmit={onSubmit} />
    </Card>
  );
};

export default CheckPage;
