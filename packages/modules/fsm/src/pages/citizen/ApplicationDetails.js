import React, { Fragment, useEffect } from "react";
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
import { getPropertyTypeLocale, getPropertySubtypeLocale, getVehicleType } from "../../utils";

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

const getPitDimensionCaption = (diameter, length, t) => {
  if (diameter && diameter > 0) return `(${t("CS_COMMON_DIAMETER")} x ${t("CS_COMMON_DEPTH")})`;
  if (length && length > 0) return `(${t("CS_COMMON_LENGTH")} x ${t("CS_COMMON_BREADTH")} x ${t("CS_COMMON_DEPTH")})`;
};

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { isLoading, isError, error, data: application, error: errorApplication } = Digit.Hooks.fsm.useApplicationDetail(
    t,
    tenantId,
    id,
    {},
    "CITIZEN"
  );
  const state = tenantId?.split(".")[0];
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "Vehicle", "VehicleType", { staleTime: Infinity });
  const vehicle = vehicleMenu?.find((vehicle) => application?.vehicleType === vehicle?.code);
  const pdfVehicleType = getVehicleType(vehicle, t);
  const localityCode = application?.address?.locality?.code;
  const slumCode = application?.address?.slumName;
  const slum = Digit.Hooks.fsm.useSlum(slumCode, localityCode);

  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: application?.tenantId,
    id,
    moduleCode: "FSM",
    serviceData: application,
    config: { enabled: application?.tenantId ? true : false },
  });
  const coreData = Digit.Hooks.useCoreData();
  const key = globalConfigs.getConfig("GMAPS_API_KEY");

  useEffect(() => {
    console.log(application, errorApplication);
  }, [application, errorApplication]);

  if (isLoading || !application) {
    return <Loader />;
  }

  if (application?.applicationDetails?.length === 0) {
    history.goBack();
  }

  const tenantInfo = coreData.tenants.find((tenant) => tenant.code === application?.tenantId);

  const handleDownloadPdf = async () => {
    const data = getPDFData({ ...application, pdfVehicleType, slum }, tenantInfo, t);
    Digit.Utils.pdf.generate(data);
  };

  const showNextActions = (nextAction) => {
    switch (nextAction?.action) {
      case "PAY":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link to={`/digit-ui/citizen/payment/collect/FSM.TRIP_CHARGES/${id}`}>
              <SubmitBar label={t("CS_APPLICATION_DETAILS_MAKE_PAYMENT")} />
            </Link>
          </div>
        );
      case "SUBMIT_FEEDBACK":
        return (
          <div style={{ marginTop: "24px" }}>
            <Link to={`/digit-ui/citizen/fsm/rate/${id}`}>
              <SubmitBar label={t("CS_APPLICATION_DETAILS_RATE")} />
            </Link>
          </div>
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

        {application?.applicationDetails?.map(({ title, value, child, caption }, index) => {
          return (
            <KeyNote key={index} keyValue={t(title)} note={t(value)} caption={t(caption)}>
              {child && typeof child === "object" ? React.createElement(child.element, { ...child }) : child}
            </KeyNote>
          );
        })}

        {!workflowDetails?.isLoading && workflowDetails.data && (
          <Fragment>
            {workflowDetails?.data?.timeline?.length > 0 && (
              <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
                {t("CS_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
              </CardSectionHeader>
            )}
            {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
              <CheckPoint isCompleted={true} label={t("CS_COMMON_" + workflowDetails?.data?.timeline[0]?.status)} />
            ) : (
              <ConnectingCheckPoints>
                {workflowDetails?.data?.timeline &&
                  workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
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
