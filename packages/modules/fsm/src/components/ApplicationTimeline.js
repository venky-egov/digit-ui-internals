import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Header,
  Card,
  CardSectionHeader,
  ConnectingCheckPoints,
  CheckPoint,
  KeyNote,
  SubmitBar,
  LinkButton,
  Loader,
} from "@egovernments/digit-ui-react-components";

export const ApplicationTimeline = (props) => {
  const { t } = useTranslation();

  const { isLoading, data } = Digit.Hooks.useWorkflowDetails({
    tenantId: props.application?.tenantId,
    id: props.id,
    moduleCode: "FSM",
    serviceData: props.application,
  });

  const showNextActions = (nextAction) => {
    switch (nextAction?.action) {
      case "PAY":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link to={`/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${props.application.applicationNo}`}>
              <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
            </Link>
          </div>
        );
      case "SUBMIT_FEEDBACK":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link to={`/digit-ui/citizen/fsm/rate/${props.application.applicationNo}`}>
              <SubmitBar label={t("CS_APPLICATION_DETAILS_RATE")} />
            </Link>
          </div>
        );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!isLoading && (
        <Fragment>
          {data?.timeline?.length > 0 && (
            <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
              {t("CS_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
            </CardSectionHeader>
          )}
          {data?.timeline && data?.timeline?.length === 1 ? (
            <CheckPoint isCompleted={true} label={t("CS_COMMON_" + data?.timeline[0]?.status)} />
          ) : (
            <ConnectingCheckPoints>
              {data?.timeline &&
                data?.timeline.map((checkpoint, index, arr) => {
                  return (
                    <React.Fragment key={index}>
                      <CheckPoint keyValue={index} isCompleted={index === 0} label={t("CS_COMMON_" + checkpoint.status)} />
                    </React.Fragment>
                  );
                })}
            </ConnectingCheckPoints>
          )}
        </Fragment>
      )}
      {data && showNextActions(data?.nextActions[0])}
    </React.Fragment>
  );
};
