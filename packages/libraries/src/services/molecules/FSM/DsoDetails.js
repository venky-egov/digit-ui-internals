import { FSMService } from "../../elements/FSM";

const DsoDetails = async (tenantId) => {
  const dsoDetails = await FSMService.vendorSearch(tenantId);

  //TODO get possible dates to book dso
  const data = dsoDetails.vendor.map((dso) => ({
    name: dso.name,
    id: dso.id,
    vehicles: dso.vehicles
      .filter((vehicle) => vehicle.status === "ACTIVE")
      .map((vehicle) => ({
        id: vehicle.id,
        registrationNumber: vehicle.registrationNumber,
        type: vehicle.type,
        i18nKey: `FSM_VEHICLE_TYPE_${vehicle.type}`,
        capacity: vehicle.tankCapicity,
        suctionType: vehicle.suctionType,
        model: vehicle.model,
      })),
  }));

  return data;
};

export default DsoDetails;
