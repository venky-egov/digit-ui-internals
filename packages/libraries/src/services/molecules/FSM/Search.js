import { PaymentService } from "../../elements/Payment";
import { FSMService } from "../../elements/FSM";
import { MdmsService } from "../../../services/elements/MDMS";
import DsoDetails from "./DsoDetails";
import { getPropertyTypeLocale, getPropertySubtypeLocale, getVehicleType } from "../../../utils/fsm";

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

const getPitDimensionCaption = (sanitationtype, diameter, length, t) => {
  if (diameter && diameter > 0) return `(${t("CS_COMMON_DIAMETER")} x ${t("CS_COMMON_DEPTH")})`;
  if (length && length > 0) return `(${t("CS_COMMON_LENGTH")} x ${t("CS_COMMON_BREADTH")} x ${t("CS_COMMON_DEPTH")})`;
};

const displayServiceDate = (timeStamp) => {
  if (timeStamp === 0) return "N/A";
  const date = new Date(timeStamp);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

export const Search = {
  all: async (tenantId, filters = {}) => {
    const response = await FSMService.search(tenantId, { ...filters });
    return response;
  },

  application: async (tenantId, filters = {}) => {
    const response = await FSMService.search(tenantId, { ...filters });
    return response.fsm[0];
  },

  applicationDetails: async (t, tenantId, applicationNos) => {
    const filter = { applicationNos };
    let dsoDetails = {},
      vehicle = {};
    const response = await Search.application(tenantId, filter);
    if (response?.dsoId) {
      const dsoFilters = { ids: response.dsoId, vehicleIds: response?.vehicleId };
      [dsoDetails] = await DsoDetails(tenantId, dsoFilters);

      if (response?.vehicleId) {
        vehicle = dsoDetails.vehicles.find((vehicle) => vehicle.id === response.vehicleId);
      }
    }

    const stateId = tenantId?.split(".")[0];
    let slumLabel = "";
    if (response?.address?.slumName && response?.address?.locality?.code) {
      const slumData = await MdmsService.getSlumLocalityMapping(stateId, "FSM", "Slum");
      if (slumData[response?.address?.locality?.code]) {
        slumLabel = slumData[response?.address?.locality?.code].find((slum) => slum?.code === response?.address?.slumName);
      } else {
        const slumDataArray = Object.values(slumData);
        for (let i = 0; i < slumDataArray.length; i++) {
          const slumFound = slumDataArray[i].find((slum) => slum.code === response?.address?.slumName);
          if (slumFound) {
            slumLabel = slumFound;
          }
        }
      }
    }

    const demandDetails = await PaymentService.demandSearch(tenantId, applicationNos, "FSM.TRIP_CHARGES");
    // console.log("find demand detail here", demandDetails)
    const amountPerTrip = response?.additionalDetails && response?.additionalDetails.tripAmount ? response.additionalDetails.tripAmount : "N/A";
    // const totalAmount = response?.noOfTrips === 0 || amountPerTrip === "N/A" ? "N/A" : response?.noOfTrips * Number(amountPerTrip);
    const totalAmount = demandDetails?.Demands[0]?.demandDetails?.map((detail) => detail?.taxAmount)?.reduce((a, b) => a + b) || "N/A";

    return [
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("CS_FILE_DESLUDGING_APPLICATION_NO"), value: response?.applicationNo },
          { title: t("ES_APPLICATION_CHANNEL"), value: t(`ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_${response?.source}`) },
        ],
      },
      {
        title: t("ES_TITLE_APPLICATION_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_NAME"), value: response?.citizen?.name },
          { title: t("ES_APPLICATION_DETAILS_APPLICANT_MOBILE_NO"), value: response?.citizen?.mobileNumber },
        ],
      },
      {
        title: t("ES_APPLICATION_DETAILS_PROPERTY_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_PROPERTY_TYPE"), value: t(getPropertyTypeLocale(response?.propertyUsage)) },
          { title: t("ES_APPLICATION_DETAILS_PROPERTY_SUB-TYPE"), value: t(getPropertySubtypeLocale(response?.propertyUsage)) },
        ],
      },
      {
        title: t("ES_APPLICATION_DETAILS_LOCATION_DETAILS"),
        values: [
          {
            title: t("ES_APPLICATION_DETAILS_LOCATION_LOCALITY"),
            value: t(`${response?.tenantId?.toUpperCase()?.split(".")?.join("_")}_ADMIN_${response?.address?.locality?.code}`),
          },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_CITY"), value: response?.address?.city },
          { title: t("ES_APPLICATION_DETAILS_LOCATION_PINCODE"), value: response?.address?.pincode },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"), value: response?.address?.street },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"), value: response?.address?.doorNo },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL"), value: response?.address?.landmark },
          { title: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_SLUM_LABEL"), value: slumLabel ? t(slumLabel.i18nKey) : "N/A" },
          {
            title: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"),
            value:
              response?.address?.geoLocation?.latitude && response?.address?.geoLocation?.longitude
                ? Digit.Utils.getStaticMapUrl(response?.address?.geoLocation?.latitude, response?.address?.geoLocation?.longitude)
                : "N/A",
            map: true,
          },
        ],
      },
      {
        title: t("CS_CHECK_PIT_SEPTIC_TANK_DETAILS"),
        values: [
          {
            title: t("ES_APPLICATION_DETAILS_PIT_TYPE"),
            value: !!response?.sanitationtype ? t(`PITTYPE_MASTERS_${response?.sanitationtype}`) : "",
          },
          {
            title: t("ES_APPLICATION_DETAILS_PIT_DIMENSION"),
            value: displayPitDimension({
              length: response?.pitDetail?.length,
              width: response?.pitDetail?.width,
              height: response?.pitDetail?.height,
              diameter: response?.pitDetail?.diameter,
            }),
            caption: getPitDimensionCaption(response?.sanitationtype, response?.pitDetail?.diameter, response?.pitDetail?.length, t),
          },
          // {
          //   title: t("ES_NEW_APPLICATION_DISTANCE_FROM_ROAD"),
          //   value: response?.pitDetail?.distanceFromRoad,
          // },
          { title: t("ES_APPLICATION_DETAILS_PAYMENT_NO_OF_TRIPS"), value: response?.noOfTrips === 0 ? "N/A" : response?.noOfTrips },
          {
            title: t("ES_APPLICATION_DETAILS_AMOUNT_PER_TRIP"),
            value: amountPerTrip,
          },
          { title: t("ES_PAYMENT_DETAILS_TOTAL_AMOUNT"), value: totalAmount },
        ],
      },
      {
        title: t("ES_APPLICATION_DETAILS_DSO_DETAILS"),
        values: [
          { title: t("ES_APPLICATION_DETAILS_ASSIGNED_DSO"), value: dsoDetails?.name || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_VEHICLE_MAKE"), value: t(vehicle?.type) || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_VEHICLE_NO"), value: vehicle?.registrationNumber || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"), value: vehicle?.capacity || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_POSSIBLE_SERVICE_DATE"), value: displayServiceDate(response?.possibleServiceDate) || "N/A" },
        ],
      },
    ];
  },

  citizenApplicationDetails: async (t, tenantId, applicationNos) => {
    const filter = { applicationNos };
    let dsoDetails = {},
      vehicle = {};
    const application = await Search.application(tenantId, filter);
    if (application?.dsoId) {
      const dsoFilters = { ids: application.dsoId, vehicleIds: application?.vehicleId };
      [dsoDetails] = await DsoDetails(tenantId, dsoFilters);

      if (application?.vehicleId) {
        vehicle = dsoDetails.vehicles.find((vehicle) => vehicle.id === application.vehicleId);
      }
    }

    return [
      { tite: t("CS_FSM_APPLICATION_APPLICATION_NO"), value: application.applicationNo },
      { tite: t("CS_FSM_APPLICATION_SERVICE_CATEGORY"), value: application.serviceCategory || t("CS_TITLE_FSM") },
      { tite: t("CS_FSM_APPLICATION_TYPE"), value: application.applicationType || t("CS_FSM_APPLICATION_TYPE_DESLUDGING") },
      { tite: t("CS_FSM_APPLICATION_DETAIL_STATUS"), value: t("CS_COMMON_" + application.applicationStatus) },
      { tite: t("CS_FSM_APPLICATION_DATE"), value: Digit.DateUtils.ConvertTimestampToDate(application.auditDetails.createdTime) },
      {
        tite: t("CS_FSM_APPLICATION_PROPERTY_TYPE"),
        value: t(getPropertyTypeLocale(application.propertyUsage)) + " / " + t(getPropertySubtypeLocale(application.propertyUsage)),
      },
      { tite: t("CS_COMMON_MYCITY_CODE_LABEL"), value: application.address.city },
      {
        tite: t("CS_FSM_APPLICATION_MOHALLA"),
        value: t(`${application.tenantId.toUpperCase().split(".").join("_")}_ADMIN_${application.address.locality.code}`),
      },
      { tite: t("CS_FSM_APPLICATION_PINCODE"), value: application.address.pincode ? application.address.pincode : "NA" },
      {
        tite: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_STREET_NAME_LABEL"),
        value: application.address.street ? application.address.street : "NA",
      },
      { tite: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_DOOR_NO_LABEL"), value: application.address.doorNo ? application.address.doorNo : "NA" },
      {
        tite: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_LANDMARK_LABEL"),
        value: application.address.landmark ? application.address.landmark : "NA",
      },
      { tite: t("CS_FILE_APPLICATION_PROPERTY_LOCATION_SLUM_LABEL"), value: slum?.i18nKey ? t(slum?.i18nKey) : "NA" },
      {
        tite: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"),
        child:
          application.address?.geoLocation?.latitude && application.address?.geoLocation?.longitude
            ? {
                element: "img",
                src: Digit.Utils.getStaticMapUrl(application.address?.geoLocation?.latitude, application.address?.geoLocation?.longitude),
              }
            : "NA",
      },
      { tite: t("CS_COMMON_PIT_TYPE"), value: !!application.sanitationtype ? t(`PITTYPE_MASTERS_${application.sanitationtype}`) : "NA" },
      {
        tite: t("CS_APPLICATION_DETAILS_PIT_SIZE"),
        value:
          displayPitDimension({
            length: application.pitDetail.length,
            width: application.pitDetail.width,
            height: application.pitDetail.height,
            diameter: application.pitDetail.diameter,
          }) || "NA",
        caption: getPitDimensionCaption(application?.pitDetail?.diameter, application?.pitDetail?.length, t),
      },
      { tite: t("ES_APPLICATION_DETAILS_ASSIGNED_DSO"), value: dsoData?.name || "NA" },
      { tite: t("ES_APPLICATION_DETAILS_VEHICLE_MAKE"), value: application?.vehicleType || "NA" },
      {
        title: t("ES_APPLICATION_DETAILS_VEHICLE_NO"),
        value: dsoData?.vehicles.find((vehicle) => vehicle.id === application?.vehicleId)?.registrationNumber || "NA",
      },
      {
        title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"),
        value: dsoData?.vehicles.find((vehicle) => vehicle.id === application?.vehicleId)?.capacity || "NA",
      },
      {
        title: t("ES_APPLICATION_DETAILS_POSSIBLE_SERVICE_DATE"),
        value: application?.possibleServiceDate ? Digit.DateUtils.ConvertTimestampToDate(application?.possibleServiceDate) : "NA",
      },
    ];
  },
  allVehicles: (tenantId, filters) => {
    return FSMService.vehicleSearch(tenantId, filters);
  },

  applicationWithBillSlab: async (t, tenantId, applicationNos) => {
    const app = await Search.applicationDetails(t, tenantId, applicationNos);
  },
};
