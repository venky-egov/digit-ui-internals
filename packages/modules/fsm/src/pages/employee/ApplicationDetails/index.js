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
  FormComposer,
} from "@egovernments/digit-ui-react-components";

import { useHistory, useParams } from "react-router-dom";
import { getPropertyTypeLocale, getPropertySubtypeLocale } from "../../../utils";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

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

const ApplicationDetails = (props) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = tenantId.split(".")[0];
  const { data: dsoData, isLoading: isDsoLoading, error: dsoError } = Digit.Hooks.fsm.useDsoSearch(tenantId);
  const { data: vehicleMenu } = Digit.Hooks.fsm.useMDMS(state, "FSM", "VehicleType", { staleTime: Infinity });
  const { t } = useTranslation();
  const history = useHistory();
  let { id: applicationNumber } = useParams();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [dso, selectDSO] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [config, setCurrentConfig] = useState({});
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
  // const [vehicleMenu, setVehicleMenu] = useState([
  //   { key: "Type A", name: "Type A" },
  //   { key: "Type B", name: "Type B" },
  // ]);

  const DSO = Digit.UserService.hasAccess("FSM_DSO") || false;

  function selectVehicle(value) {
    setVehicle(value);
  }

  const configAssignDso = {
    label: {
      heading: "ES_FSM_ACTION_TITLE_ASSIGN_DSO",
      submit: "CS_COMMON_ASSIGN",
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_DSO_NAME"),
            type: "dropdown",
            populators: <Dropdown option={dsoData} optionKey="name" id="channel" selected={dso} select={selectDSO} />,
          },
          {
            label: t("ES_FSM_ACTION_VEHICLE_TYPE"),
            type: "dropdown",
            populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
          },
          {
            label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
            type: "text",
            populators: {
              name: "capacity",
              validation: {
                required: true,
                pattern: /^[0-9]\d{6}$/,
              },
            },
          },
          {
            label: t("ES_FSM_ACTION_SERVICE_DATE"),
            type: "date",
            populators: {
              name: "date",
              validation: {
                required: true,
              },
            },
          },
        ],
      },
    ],
  };

  const configReassignDSO = {
    label: {
      heading: "ES_FSM_ACTION_TITLE_REASSIGN_DSO",
      submit: "CS_COMMON_ASSIGN",
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_DSO_NAME"),
            type: "dropdown",
            populators: <Dropdown option={dsoData} optionKey="name" id="channel" selected={dso} select={selectDSO} />,
          },
          {
            label: t("ES_FSM_ACTION_VEHICLE_TYPE"),
            type: "dropdown",
            populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
          },
          {
            label: t("ES_FSM_ACTION_VEHICLE_CAPACITY_IN_LTRS"),
            type: "text",
            populators: {
              name: "capacity",
              validation: {
                required: true,
                pattern: /^[0-9]\d{6}$/,
              },
            },
          },
          {
            label: t("ES_FSM_ACTION_SERVICE_DATE"),
            type: "date",
            populators: {
              name: "date",
              validation: {
                required: true,
              },
            },
          },
          {
            label: t("ES_FSM_ACTION_REASSIGN_REASON"),
            type: "dropdown",
            populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
          },
        ],
      },
    ],
  };

  const configCompleteApplication = {
    label: {
      heading: "ES_FSM_ACTION_TITLE_COMPLETE_REQUEST",
      submit: "CS_COMMON_COMPLETE",
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_DESLUGED_DATE_LABEL"),
            type: "date",
            populators: {
              name: "desluged",
            },
          },
          {
            label: t("ES_FSM_ACTION_WASTE_VOLUME_LABEL"),
            type: "text",
            populators: {
              name: "wasteVolume",
            },
          },
        ],
      },
    ],
  };

  const configRejectApplication = {
    label: {
      heading: "ES_FSM_ACTION_TITLE_DECLINE_REQUEST",
      submit: "CS_COMMON_DECLINE",
      cancel: "CS_COMMON_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: t("ES_FSM_ACTION_DECLINE_REASON"),
            type: "dropdown",
            populators: <Dropdown option={vehicleMenu} optionKey="name" id="channel" selected={vehicle} select={selectVehicle} />,
          },
          {
            label: t("ES_FSM_ACTION_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
        ],
      },
    ],
  };

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
      case "DSO_ACCEPT":
      // return setShowModal(true);
      case "ASSIGN":
      case "GENERATE_DEMAND":
      case "FSM_GENERATE_DEMAND":
        setCurrentConfig(configAssignDso);
        return setShowModal(true);
      case "REASSIGN":
        setCurrentConfig(configReassignDSO);
        return setShowModal(true);
      case "COMPLETE":
        setCurrentConfig(configCompleteApplication);
        return setShowModal(true);
      case "SUBMIT":
      case "FSM_SUBMIT":
        return history.push("/digit-ui/employee/fsm/modify-application/" + applicationNumber);
      case "CANCEL":
      case "SENDBACK":
        setCurrentConfig(configRejectApplication);
        return setShowModal(true);
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
    setVehicle(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  let application = {};

  // TODO: Below data is hard coded, it should come from apis
  const dsoApplication = {
    applicationNo: applicationNumber,
    source: "Online",
    propertyUsage: "COMMERCIAL",
    tenantId: "pb.amritsar",
    address: {
      pincode: 232123,
      locality: "Ajit Nagar",
      city: "Amritsar",
      landmark: "SBI bank",
      geolocation: "View on Map",
    },
    sanitationtype: "Conventional Pit",
    pitDetail: {
      length: "2m",
      width: "2m",
      height: "2m",
    },
    disatncePitFromRoad: "500 mts",
    vehicleType: "Tractor",
    noOfTrips: 2,
    amountPerTrip: 200.0,
    totalAmount: 400.0,
    assignedDso: "Jagdamba Cleaners",
    vehicleNo: "KA8272722",
    vehicleCapacity: "300 ltrs",
    possibleServiceDate: "12/08/2020",
  };
  const applicationDetails = {
    details: [
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("CS_FILE_DESLUDGING_APPLICATION_NO"), value: application.applicationNo },
          { title: t("ES_APPLICATION_CHANNEL"), value: application.source },
        ],
      },
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"), value: application.citizen?.name },
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"), value: application.citizen?.mobileNumber },
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
          {
            title: t("ES_APPLICATION_DETAILS_LOCATION_LOCALITY"),
            value: t(`${application.tenantId.toUpperCase().split(".").join("_")}_ADMIN_${application.address.locality.code}`),
          },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_CITY"), value: application.address.city },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_PINCODE"), value: application.address.pincode },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"), value: application.address.street },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"), value: application.address.doorNo },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL"), value: application.address.landmark },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"), value: "" },
        ],
      },
      {
        title: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
        values: [
          {
            title: t("ES_APPLICATION_DETAILS_PIT_TYPE"),
            value: !!application.sanitationtype ? t(`PITTYPE_MASTERS_${application.sanitationtype}`) : "",
          },
          {
            title: t("ES_APPLICATION_DETAILS_PIT_DIMENSION"),
            value: [
              displayPitDimension({
                length: application.pitDetail.length,
                width: application.pitDetail.width,
                height: application.pitDetail.height,
                diameter: application.pitDetail.diameter,
              }),
              `(${t("CS_FILE_PROPERTY_LENGTH")} X ${t("CS_FILE_PROPERTY_WIDTH")} X ${t("CS_FILE_PROPERTY_HEIGHT")})`,
            ],
          },
          { title: t("ES_APPLICATION_DETAILS_PAYMENT_NO_OF_TRIPS"), value: application.noOfTrips === 0 ? "N/A" : application.noOfTrips },
          { title: t("ES_APPLICATION_DETAILS_AMOUNT_PER_TRIP"), value: "N/A" },
          { title: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"), value: "N/A" },
        ],
      },
    ],
  };

  if (DSO) {
    application = dsoApplication;
  } else {
    application = data?.fsm[0];
  }

  const details = {
    applicationDetails: {
      title: DSO ? t("ES_TITLE_APPLICATION_SUMMARY") : t("ES_TITLE_APPLICATION_DETAILS"),
      values: [
        { title: t("CS_FILE_DESLUDGING_APPLICATION_NO"), value: application?.applicationNo },
        { title: t("ES_APPLICATION_CHANNEL"), value: application?.source },
      ],
    },
    applicantDetails: {
      title: t("ES_TITLE_APPLICATION_DETAILS"),
      values: [
        { title: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"), value: application?.citizen?.name },
        { title: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"), value: application?.citizen?.mobileNumber },
        // { title: t("ES_APPLICATION_DETAILS_SLUM_NAME"), value: "Jagbandhu huda" },
      ],
    },
    propertyDetails: {
      title: t("ES_APPLICATION_DETAILS_PROPERTY_DETAILS"),
      values: [
        { title: t("ES_APPLICATION_DETAILS_PROPERTY_TYPE"), value: t(getPropertyTypeLocale(application?.propertyUsage)) },
        { title: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"), value: t(getPropertySubtypeLocale(application?.propertyUsage)) },
      ],
    },
    locationDetails: {
      title: t("ES_APPLICATION_DETAILS_LOCATION_DETAILS"),
      values: [
        {
          title: t("ES_APPLICATION_DETAILS_LOCATION_LOCALITY"),
          value: t(`${application?.tenantId?.toUpperCase()?.split(".")?.join("_")}_ADMIN_${application?.address?.locality?.code}`),
        },
        { title: t("ES_APPLICATION_DETAILS_LOCATION_CITY"), value: application?.address?.city },
        { title: t("ES_APPLICATION_DETAILS_LOCATION_PINCODE"), value: application?.address?.pincode },
        { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"), value: application?.address?.street },
        { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"), value: application?.address?.doorNo },
        { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL"), value: application?.address?.landmark },
        { title: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"), value: "" },
      ],
    },
    pitSepticTankDetails: {
      title: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
      values: [
        {
          title: t("ES_APPLICATION_DETAILS_PIT_TYPE"),
          value: !!application?.sanitationtype ? t(`PITTYPE_MASTERS_${application?.sanitationtype}`) : "",
        },
        {
          title: t("ES_APPLICATION_DETAILS_PIT_DIMENSION"),
          value: displayPitDimension({
            length: application?.pitDetail?.length,
            width: application?.pitDetail?.width,
            height: application?.pitDetail?.height,
            diameter: application?.pitDetail?.diameter,
          }),
        },
        { title: t("ES_APPLICATION_DETAILS_PAYMENT_NO_OF_TRIPS"), value: application?.noOfTrips === 0 ? "N/A" : application?.noOfTrips },
        { title: t("ES_APPLICATION_DETAILS_AMOUNT_PER_TRIP"), value: application.amountPerTrip || "N/A" },
        { title: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"), value: application.totalAmount || "N/A" },
      ],
    },
  };

  if (DSO) {
    applicationDetails?.details?.push(details.applicationDetails);
    applicationDetails?.details?.push(details?.propertyDetails);
    applicationDetails?.details?.push(details?.locationDetails);
    applicationDetails?.details?.push(details?.pitSepticTankDetails);
    applicationDetails?.details?.push({
      title: t("ES_APPLICATION_DETAILS_DSO_DETAILS"),
      values: [
        { title: t("ES_APPLICATION_DETAILS_ASSIGNED_DSO"), value: application.assignedDso },
        { title: t("ES_APPLICATION_DETAILS_VEHICLE_NO"), value: application.vehicleDso },
        { title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"), value: application.vehicleCapacity },
        { title: t("ES_APPLICATION_DETAILS_POSSIBLE_SERVICE_DATE"), value: application.possibleServiceDate },
      ],
    });
  } else {
    applicationDetails?.details?.push(details?.applicationDetails);
    applicationDetails?.details?.push(details?.applicantDetails);
    applicationDetails?.details?.push(details?.propertyDetails);
    applicationDetails?.details?.push(details?.locationDetails);
    applicationDetails?.details?.push(details?.pitSepticTankDetails);
  }

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
                  {detail?.values?.map((value, index) => (
                    <Row key={value.title} label={value.title} text={value.value} last={index === detail?.values?.length - 1} />
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
                              label={t("CS_COMMON_FSM_" + checkpoint.status)}
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
          {showModal ? (
            <Modal
              headerBarMain={<Heading label={t(config.label.heading)} />}
              headerBarEnd={<CloseBtn onClick={closeModal} />}
              actionCancelLabel={t(config.label.cancel)}
              actionCancelOnSubmit={closeModal}
              actionSaveLabel={t(config.label.submit)}
              actionSaveOnSubmit={() => {}}
            >
              <FormComposer config={config.form} noBoxShadow inline childrenAtTheBottom onSubmit={handleGenerateDemand} />
            </Modal>
          ) : null}
          {!workflowDetails?.isLoading && workflowDetails?.data?.nextActions?.length > 0 && (
            <ActionBar>
              {displayMenu && workflowDetails?.data?.nextActions ? (
                <Menu
                  localeKeyPrefix={"CS_COMMON_FSM"}
                  options={workflowDetails?.data?.nextActions.map((action) => action.action)}
                  t={t}
                  onSelect={onActionSelect}
                />
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
