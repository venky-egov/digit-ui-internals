import { FSMService } from "../../elements/FSM";
import DsoDetails from "./DsoDetails";

const getPropertyTypeLocale = (value) => {
  return `PROPERTYTYPE_MASTERS_${value?.split(".")[0]}`;
};

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (err) {
    return true;
  }
  return true;
};

const getPropertySubtypeLocale = (value) => `PROPERTYTYPE_MASTERS_${value}`;

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

const displayServiceDate = (timeStamp) => {
  if (timeStamp === 0) return "N/A";
  const date = new Date(timeStamp);
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

export const Search = {
  all: async (tenantId, filters = {}) => {
    const response = await FSMService.search(tenantId, { ...filters });
    return response.fsm;
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
    const amountPerTrip = isJsonString(response?.additionalDetails) ? JSON.parse(response.additionalDetails).tripAmount : "N/A";
    const totalAmount = response?.noOfTrips === 0 || amountPerTrip === "N/A" ? "N/A" : response?.noOfTrips * Number(amountPerTrip);
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
          { title: t("ES_APPLICATION_DETAILS_LOCATION_GEOLOCATION"), value: "" },
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
          },
          {
            title: t("ES_NEW_APPLICATION_DISTANCE_FROM_ROAD"),
            value: response?.pitDetail?.distanceFromRoad,
          },
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
          { title: t("ES_APPLICATION_DETAILS_VEHICLE_NO"), value: vehicle?.registrationNumber || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_VEHICLE_CAPACITY"), value: vehicle?.capacity || "N/A" },
          { title: t("ES_APPLICATION_DETAILS_POSSIBLE_SERVICE_DATE"), value: displayServiceDate(response?.possibleServiceDate) || "N/A" },
        ],
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
