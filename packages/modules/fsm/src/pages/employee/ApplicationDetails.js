import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  BreakLine,
  Card,
  CardSubHeader,
  StatusTable,
  Row,
  SubmitBar,
  Loader,
  CardSectionHeader,
  ConnectingCheckPoints,
  CheckPoint,
  ActionBar,
  Menu,
  LinkButton,
  Dropdown,
  Modal,
} from "@egovernments/digit-ui-react-components";

import { useHistory, useParams } from "react-router-dom";
import { getPropertyTypeLocale, getPropertySubtypeLocale } from "../../utils";

const ApplicationDetails = (props) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, isError, data, error } = Digit.Hooks.fsm.useSearch(tenantId, { applicationNumber, uuid: Digit.UserService.getUser().uuid });
  const workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId,
    id: applicationNumber,
    moduleCode: "FSM",
    role: "FSM_EMPLOYEE",
    serviceData: data,
  });
  const [vehicle, setVehicle] = useState(null);
  const [vehicleMenu, setVehicleMenu] = useState([
    { key: "Type A", name: "Type A" },
    { key: "Type B", name: "Type B" },
  ]);

  const DSO = Digit.UserService.hasAccess("DSO");

  function selectVehicle(value) {
    setVehicle(value);
  }

  const config = [
    {
      body: [
        {
          label: t("ES_VEHICLE_TYPE"),
          type: "dropdown",
          populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
        },
      ],
    },
  ];

  function onActionSelect(action) {
    setSelectedAction(action);
    setDisplayMenu(false);
  }

  const TLCaption = ({ data }) => {
    const { t } = useTranslation();
    return (
      <div>
        {data.date && <p>{data.date}</p>}
        <p>{data.name}</p>
        <p>{data.mobileNumber}</p>
        {data.source && <p>{t("ES_COMMON_FILED_VIA_" + data.source.toUpperCase())}</p>}
      </div>
    );
  };

  useEffect(() => {
    console.log("action selected", selectedAction);
    switch (selectedAction) {
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
        return setShowModal(true);
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "PAY":
      case "FSM_PAY":
        return history.push(`/digit-ui/employee/payment/collect/FSM.TRIP_CHARGES/${applicationNumber}`);
      default:
        console.log("default case");
        break;
    }
  }, [selectedAction]);

  const getTimelineCaptions = (checkpoint) => {
    if (checkpoint.status === "COMPLAINT_FILED" && complaintDetails?.audit) {
      const caption = {
        date: Digit.DateUtils.ConvertTimestampToDate(complaintDetails.audit.details.createdTime),
        name: complaintDetails.audit.citizen.name,
        mobileNumber: complaintDetails.audit.citizen.mobileNumber,
        source: complaintDetails.audit.source,
      };
      return <TLCaption data={caption} />;
    }
    return checkpoint.caption && checkpoint.caption.length !== 0 ? <TLCaption data={checkpoint.caption[0]} /> : null;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
  };

  const handleGenerateDemand = (data) => {
    closeModal();
    console.log("%c 🍓: handleGenerateDemand -> data ", "font-size:16px;background-color:#582dc7;color:white;", {
      ...data,
      vehicle,
    });
    setVehicle(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  const application = data?.fsm[0];
  const applicationDetails = {
    details: [
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_NO"), value: application.applicationNo },
          { title: t("ES_APPLICATION_CHANNEL"), value: application.source },
        ],
      },
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"), value: application.citizen.name },
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"), value: application.citizen.mobileNumber },
          // { title: t("ES_APPLICATION_DETAILS_SLUM_NAME"), value: "Jagbandhu huda" },
        ],
      },
      {
        title: t("ES_APPLICATION_DETAILS_PROPERTY_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_PROPERTY_TYPE"), value: t(getPropertyTypeLocale(application.propertyUsage)) },
          { title: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"), value: t(getPropertySubtypeLocale(application.propertyUsage)) },
        ],
      },
      {
        title: t("ES_APPLICATION_DETAILS_LOCATION_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_LOCATION_LOCALITY"), value: t(application.address.locality.code) },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_CITY"), value: application.address.city },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_PINCODE"), value: application.address.pincode },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_STREET"), value: application.address.street },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_DOOR"), value: application.address.doorNo },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_LANDMARK"), value: application.address.landmark },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"), value: "" },
        ],
      },
      {
        title: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
        values: [
          { title: t("ES_NEW_APPLICATION_PIT_TYPE"), value: !!application.sanitationtype ? t(`PITTYPE_MASTERS_${application.sanitationtype}`) : "" },
          {
            title: t("ES_NEW_APPLICATION_PIT_DIMENSION"),
            value: `${!!application.pitDetail.length ? application.pitDetail.length + "m " : ""}${
              !!application.pitDetail.width ? "x " + application.pitDetail.width + "m x " : ""
            }${application.pitDetail.height + "m "}${!!application.pitDetail.diameter ? "x" + application.pitDetail.diameter + "m" : ""}`,
          },
          { title: t("ES_NEW_APPLICATION_PAYMENT_NO_OF_TRIPS"), value: application.noOfTrips === 0 ? "N/A" : application.noOfTrips },
          { title: t("ES_NEW_APPLICATION_AMOUNT_PER_TRIP"), value: "N/A" },
          { title: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"), value: "N/A" },
        ],
      },
    ],
  };

  // TODO: Below data is hard coded, It should come from apis.
  if (DSO) {
    applicationDetails?.details?.push({
      title: t("ES_APPLICATION_DETAILS_DSO_DETAILS"),
      values: [
        { title: t("ES_APPLICATION_DETAILS_ASSIGNED_DSO"), value: "Jagdamba Cleaners" },
        { title: t("ES_APPLICATION_DETAILS_VEHICLE_NO"), value: "KA8272722" },
        { title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"), value: "2280 ltrs" },
        { title: t("ES_APPLICATION_DETAILS_POSSIBLE_SERVICE_DATE"), value: "12/08/2020" },
      ],
    });
  }

  const timeline = [
    {
      label: t("ES_TIMELINE_PENDING_FOR_DEMAND_GENERATION"),
      caption: [""],
    },
    {
      label: t("ES_COMMON_APPLICATION_SUBMITTED"),
      caption: [
        {
          date: "12/08/2020",
          name: "Nawal Kishore",
          mobileNumber: "+91 4534234512",
          source: "Filed Via Mobile App",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      {Object.keys(applicationDetails).length > 0 ? (
        <React.Fragment>
          <Card style={{ position: "relative" }}>
            {!DSO && (
              <LinkButton
                label={<span style={{ color: "#f47738", marginLeft: "8px" }}>{t("ES_APPLICATION_DETAILS_VIEW_AUDIT_TRAIL")}</span>}
                style={{ position: "absolute", top: 0, right: 20 }}
                onClick={() => {}}
              />
            )}
            {applicationDetails.details.map((detail, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <CardSubHeader style={{ marginBottom: "16px" }}>{detail.title}</CardSubHeader>
                ) : (
                  <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>{detail.title}</CardSectionHeader>
                )}
                <StatusTable>
                  {detail.values.map((value, index) => (
                    <Row key={value.title} label={value.title} text={value.value} last={index === detail.values.length - 1} />
                  ))}
                </StatusTable>
              </React.Fragment>
            ))}

            <BreakLine />
            {workflowDetails?.isLoading && <Loader />}
            {!workflowDetails?.isLoading && (
              <Fragment>
                <CardSectionHeader style={{ marginBottom: "16px", marginTop: "32px" }}>
                  {t("ES_APPLICATION_DETAILS_APPLICATION_TIMELINE")}
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
          </Card>
          {showModal ? <Modal closeModal={closeModal} onSubmit={handleGenerateDemand} config={config} heading={t("ES_GENERATE_DEMAND")} /> : null}
          {!workflowDetails?.isLoading && workflowDetails?.data?.nextActions?.length > 0 && (
            <ActionBar>
              {displayMenu && workflowDetails?.data?.nextActions ? (
                <Menu options={workflowDetails?.data?.nextActions.map((action) => action.action)} t={t} onSelect={onActionSelect} />
              ) : null}
              <SubmitBar label={t("ES_COMMON_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
            </ActionBar>
          )}
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default ApplicationDetails;
