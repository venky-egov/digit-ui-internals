import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
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
import { Link, useHistory, useParams } from "react-router-dom";
import getPDFData from "../../getPDFData";
import { getPropertyTypeLocale, getPropertySubtypeLocale } from "../../utils";

const displayPitDimension = (pitDeminsion) => {
  return Object.values(pitDeminsion)
    .reduce((acc, current) => {
      if (!current) {
        return acc;
      } else {
        acc.push(`${current}m`);
        return acc;
      }
    }, [])
    .join(" x ");
};

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data: application } = Digit.Hooks.fsm.useSearch(tenantId, { applicationNos: id });
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: application?.tenantId,
    id,
    moduleCode: "FSM",
    serviceData: application,
  });
  const coreData = Digit.Hooks.useCoreData();

  if (isLoading) {
    return <Loader />;
  }

  if (application.length === 0) {
    history.goBack();
  }

  const tenantInfo = coreData.tenants.find((tenant) => tenant.code === application.tenantId);

  const handleDownloadPdf = async () => {
    const data = getPDFData(application, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };

  const showNextActions = (nextAction) => {
    switch (nextAction?.action) {
      case "PAY":
        return (
          <Link to={`/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${application.applicationNo}`}>
            <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
          </Link>
        );
      case "RATING":
        return (
          <Link to={`/digit-ui/citizen/fsm/rate/${application.applicationNo}`}>
            <SubmitBar label={t("CS_APPLICATION_DETAILS_RATE")} />
          </Link>
        );
    }
  };

  return (
    <React.Fragment>
      <Header>{t("CS_FSM_APPLICATION_DETAIL_TITLE_APPLICATION_DETAILS")}</Header>
      <Card style={{ position: "relative" }}>
        <LinkButton
          label={
            <div className="application-details-link-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("CS_COMMON_DOWNLOAD")}</span>
            </div>
          }
          style={{ position: "absolute", top: 0, right: 20 }}
          onClick={handleDownloadPdf}
        />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_APPLICATION_NO")} note={application.applicationNo} />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_SERVICE_CATEGORY")} note={application.serviceCategory || t("CS_TITLE_FSM")} />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_TYPE")} note={application.applicationType || t("CS_FSM_APPLICATION_TYPE_DESLUDGING")} />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_DETAIL_STATUS")} note={t("CS_COMMON_" + application.applicationStatus)} />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_DATE")} note={Digit.DateUtils.ConvertTimestampToDate(application.auditDetails.createdTime)} />
        <KeyNote
          keyValue={t("CS_FSM_APPLICATION_PROPERTY_TYPE")}
          note={t(getPropertyTypeLocale(application.propertyUsage)) + " / " + t(getPropertySubtypeLocale(application.propertyUsage))}
        />
        <KeyNote keyValue={t("CS_COMMON_MYCITY_CODE_LABEL")} note={application.address.city} />
        <KeyNote
          keyValue={t("CS_FSM_APPLICATION_MOHALLA")}
          note={t(`${application.tenantId.toUpperCase().split(".").join("_")}_ADMIN_${application.address.locality.code}`)}
        />
        <KeyNote keyValue={t("CS_FSM_APPLICATION_PINCODE")} note={application.address.pincode ? application.address.pincode : "NA"} />
        <KeyNote
          keyValue={t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL")}
          note={application.address.street ? application.address.street : "NA"}
        />
        <KeyNote
          keyValue={t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL")}
          note={application.address.doorNo ? application.address.doorNo : "NA"}
        />
        <KeyNote
          keyValue={t("CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL")}
          note={application.address.landmark ? application.address.landmark : "NA"}
        />
        <KeyNote keyValue={t("CS_COMMON_PIT_TYPE")} note={!!application.sanitationtype ? t(`PITTYPE_MASTERS_${application.sanitationtype}`) : "NA"} />
        <KeyNote
          keyValue={t("CS_APPLICATION_DETAILS_PIT_SIZE")}
          note={displayPitDimension({
            length: application.pitDetail.length,
            width: application.pitDetail.width,
            height: application.pitDetail.height,
            diameter: application.pitDetail.diameter,
          })}
        />
        {!workflowDetails?.isLoading && (
          <Fragment>
            <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
              {t("CS_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
            </CardSectionHeader>
            {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
              <CheckPoint isCompleted={true} label={t("CS_COMMON_" + workflowDetails?.data?.timeline[0]?.status)} />
            ) : (
              <ConnectingCheckPoints>
                {workflowDetails?.data?.timeline &&
                  workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                    return (
                      <React.Fragment key={index}>
                        <CheckPoint
                          keyValue={index}
                          isCompleted={index === 0}
                          label={t("CS_COMMON_" + checkpoint.status)}
                          // customChild={getTimelineCaptions(checkpoint)}
                        />
                      </React.Fragment>
                    );
                  })}
              </ConnectingCheckPoints>
            )}
          </Fragment>
        )}
        {/* <KeyNote keyValue={t("CS_APPLICATION_DETAILS_NO_OF_TRIPS")} note={application.noOfTrips} /> */}
        {/* <KeyNote keyValue={t("CS_APPLICATION_DETAILS_DESLUDGING_CHARGES")} note={application.desuldgingCharges || "NA"} /> */}
        {/* {application.applicationStatus === "PENDING_APPL_FEE_PAYMENT" && (
          <Link to={`/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${application.applicationNo}`}>
            <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
          </Link>
        )}
        {["COMPLETED", "CANCELED"].includes(application.applicationStatus) && (
          <Link to={`/digit-ui/citizen/fsm/rate/${application.applicationNo}`}>
            <SubmitBar label={t("CS_APPLICATION_DETAILS_RATE")} />
          </Link>
        )} */}
        {workflowDetails.data && showNextActions(workflowDetails.data?.nextActions[0])}
      </Card>
    </React.Fragment>
  );
};

export default ApplicationDetails;
