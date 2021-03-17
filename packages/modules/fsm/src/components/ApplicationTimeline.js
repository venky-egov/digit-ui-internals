import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Header,
  ActionLinks,
  Card,
  CardSectionHeader,
  ConnectingCheckPoints,
  CheckPoint,
  KeyNote,
  SubmitBar,
  LinkButton,
  Loader,
  Rating,
  TelePhone,
} from "@egovernments/digit-ui-react-components";

const Reason = ({ children }) => (
  <p style={{ backgroundColor: "#EEEEEE", padding: "8px", color: "#0B0C0C" }}>
    {children}
  </p>
);

const TLCaption = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div>
      {data.date && <p>{data.date}</p>}
      <p>{data.name}</p>
      {data.mobileNumber && <TelePhone mobile={data.mobileNumber} />}
      {data.source && <p>{t("ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_" + data.source.toUpperCase())}</p>}
      {data.comment && <Reason>{data.comment}</Reason>}
    </div>
  );
};

export const ApplicationTimeline = (props) => {
  const { t } = useTranslation();
  const { isLoading, data } = Digit.Hooks.useWorkflowDetails({
    tenantId: props.application?.tenantId,
    id: props.id,
    moduleCode: "FSM",
  });

  const getTimelineCaptions = (checkpoint) => {
    if (checkpoint.status === "CREATED") {
      const caption = {
        date: Digit.DateUtils.ConvertTimestampToDate(props.application?.auditDetails.createdTime),
        source: props.application?.source || "",
      };
      return <TLCaption data={caption} />;
    } else if (checkpoint.status === "PENDING_APPL_FEE_PAYMENT" || checkpoint.status === "ASSING_DSO" || checkpoint.status === "PENDING_DSO_APPROVAL") {
      const caption = {
        date: Digit.DateUtils.ConvertTimestampToDate(props.application?.auditDetails.createdTime),
        name: checkpoint.assigner.name
      }
      return <TLCaption data={caption} />;
    } else if (checkpoint.status === "DSO_REJECTED") {
      const caption = {
        date: Digit.DateUtils.ConvertTimestampToDate(props.application?.auditDetails.createdTime),
        name: checkpoint?.assigner?.name,
        comment: t(checkpoint?.comment)
      }
      return <TLCaption data={caption} />
    } else if (checkpoint.status === "CITIZEN_FEEDBACK_PENDING") {
      return (
        <>
        {checkpoint.timeLineActions.length > 0 &&
          <div>
            <Link to={`/digit-ui/citizen/fsm/rate/${props.id}`}>
              <ActionLinks>{t("CS_FSM_RATE")}</ActionLinks>
            </Link>
          </div>
        }
        </>
      )
    } else if (checkpoint.status === "DSO_INPROGRESS") {
      const caption = {
        name: props.application?.dsoDetails?.displayName,
        mobileNumber: props.application?.dsoDetails?.mobileNumber,
        date: `${t('CS_FSM_EXPECTED_DATE')} ${Digit.DateUtils.ConvertTimestampToDate(props.application?.possibleServiceDate)}`,
      }
      return <TLCaption data={caption} />
    } else if (checkpoint.status === "COMPLETED") {
      return (
        <div>
          {/* <p>{t(`CS_FSM_YOU_RATED`)}</p> */}
          <Rating withText={true} text={t(`CS_FSM_YOU_RATED`)} currentRating={3} />
          <Link to={`/digit-ui/citizen/fsm/rate-view/${props.id}`}>
            <ActionLinks>{t("CS_FSM_RATE_VIEW")}</ActionLinks>
          </Link>
        </div>
      )
    }
  };

  const showNextActions = (nextAction) => {
    switch (nextAction?.action) {
      case "PAY":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link
              to={{ pathname: `/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${props.id}`, state: { tenantId: props.application.tenantId } }}
            >
              <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
            </Link>
          </div>
        );
      case "SUBMIT_FEEDBACK":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link to={`/digit-ui/citizen/fsm/rate/${props.id}`}>
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
            <CheckPoint isCompleted={true} label={t("CS_COMMON_" + data?.timeline[0]?.status)} customChild={getTimelineCaptions(data?.timeline[0])} />
          ) : (
            <ConnectingCheckPoints>
              {data?.timeline &&
                data?.timeline.map((checkpoint, index, arr) => {
                  return (
                    <React.Fragment key={index}>
                      <CheckPoint
                        keyValue={index}
                        isCompleted={index === 0}
                        label={t("CS_COMMON_" + checkpoint.status)}
                        customChild={getTimelineCaptions(checkpoint)}
                      />
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
