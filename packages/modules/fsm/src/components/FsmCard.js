import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ArrowRight = ({ to }) => (
  <Link to={to}>
    <svg style={{ display: "inline", height: "24px" }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#F47738" />
      <path d="M16 5.33325L14.12 7.21325L21.56 14.6666H5.33337V17.3333H21.56L14.12 24.7866L16 26.6666L26.6667 15.9999L16 5.33325Z" fill="white" />
    </svg>
  </Link>
);

const FSMCard = () => {
  const { t } = useTranslation();
  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;
  const COLLECTOR = Digit.UserService.hasAccess("FSM_COLLECTOR") || false;
  const FSM_EDITOR = Digit.UserService.hasAccess("FSM_EDITOR_EMP") || false;
  const isFSTPOperator = Digit.UserService.hasAccess("FSM_EMP_FSTPO") || false;

  const [total, setTotal] = useState("-");

  // Septage ready for Disposal ( 10 KL)
  // Septage disposed today ( 50 KL)
  const tenantId = Digit.ULBService.getCurrentTenantId();

  // TO DO get day time

  const config = {
    enabled: isFSTPOperator ? true : false,
    select: (data) => {
      const info = data.vehicleTrip.reduce(
        (info, trip) => {
          const totalVol = trip.tripDetails.reduce((vol, details) => details.volume + vol, 0);
          info[t("ES_READY_FOR_DISPOSAL")] += totalVol / 1000;
          return info;
        },
        { [t("ES_READY_FOR_DISPOSAL")]: 0 }
      );
      info[t("ES_READY_FOR_DISPOSAL")] = info[t("ES_READY_FOR_DISPOSAL")] + " (KL)";
      return info;
    },
  };

  const { isLoading, data: info, isSuccess } = Digit.Hooks.fsm.useVehicleSearch({
    tenantId,
    filters: { applicationStatus: "WAITING_FOR_DISPOSAL" },
    config,
  });

  const filters = {
    uuid: { code: "ASSIGNED_TO_ME", name: t("ES_INBOX_ASSIGNED_TO_ME") },
    sortBy: "createdTime",
    sortOrder: "DESC",
    limit: 10,
    offset: 0,
  };

  const { data: inbox, isFetching: pendingApprovalRefetching } = Digit.Hooks.fsm.useInbox(tenantId, { ...filters }, null, {
    enabled: !isFSTPOperator ? true : false,
  });

  useEffect(() => {
    if (inbox) {
      console.log("here", inbox);
      const total = inbox?.[0]?.totalCount || 0;
      setTotal(total);
    }
  }, [inbox]);

  if (isFSTPOperator) {
    return (
      <div className="employeeCard card-home">
        <div className="complaint-links-container">
          <div className="header">
            <span className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white"></path>
              </svg>
            </span>
            <span className="text">{t("ES_TITLE_VEHICLE_LOG")}</span>
          </div>
          <div className="body">
            {info && (
              <div className="employeeCard-info-box" style={{}}>
                {Object.keys(info).map((key, index) => {
                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                      <span>{t(info[key])}</span>
                      <span style={{}}>{t(key)}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <span className="link">
              <Link to={`/digit-ui/employee/fsm/fstp-inbox`}>{t("ES_TITLE_INBOX")}</Link>
              {<ArrowRight to={`/digit-ui/employee/fsm/fstp-inbox`} />}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="employeeCard card-home">
      <div className="complaint-links-container">
        <div className="header">
          <span className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="white"></path>
            </svg>
          </span>
          <span className="text">{t("ES_TITLE_FAECAL_SLUDGE_MGMT")}</span>
        </div>
        <div className="body">
          <span className="link">
            <Link to={`/digit-ui/employee/fsm/inbox`}>{t("ES_TITLE_INBOX")}</Link>
            <span className="inbox-total">{" " + total || "-"}</span>
            {<ArrowRight to={`/digit-ui/employee/fsm/inbox`} />}
          </span>
          {!DSO && !COLLECTOR && !FSM_EDITOR && (
            <React.Fragment>
              <span className="link">
                <Link to={`/digit-ui/employee/fsm/new-application`}>{t("ES_TITLE_NEW_DESULDGING_APPLICATION")}</Link>
              </span>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default FSMCard;
