import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useMDMS = (tenantId, moduleCode, type, config = {}) => {
  const useSanitationType = () => {
    return useQuery("FSM_SANITATION_TYPE", () => MdmsService.getSanitationType(tenantId, moduleCode), config);
  };

  const usePitType = () => {
    return useQuery("FSM_PIT_TYPE", () => MdmsService.getPitType(tenantId, moduleCode, config));
  };

  const useApplicationChannel = () => {
    return useQuery("FSM_APPLICATION_CHANNEL", () => MdmsService.getApplicationChannel(tenantId, moduleCode, type), config);
  };

  const useEmployeeApplicationChannel = () => {
    async function onlyEmployeeChannels() {
      const allApplicationChannels = await MdmsService.getApplicationChannel(tenantId, moduleCode, type);
      return allApplicationChannels.filter((type) => !type.citizenOnly);
    }
    return useQuery("FSM_APPLICATION_CHANNEL", () => onlyEmployeeChannels(), config);
  };

  const usePropertyType = () => {
    return useQuery("FSM_PROPERTY_TYPE", () => MdmsService.getPropertyType(tenantId, moduleCode, type), config);
  };

  const usePropertySubType = () => {
    return useQuery("FSM_PROPERTY_SUBTYPE", () => MdmsService.getPropertyType(tenantId, moduleCode, type), config);
  };

  const useChecklist = () => {
    return useQuery("FSM_CHECKLIST", () => MdmsService.getChecklist(tenantId, moduleCode));
  };

  const useVehicleType = () => {
    return useQuery("FSM_VEHICLE_TYPE", () => MdmsService.getVehicleType(tenantId, moduleCode, type), config);
  };

  switch (type) {
    case "SanitationType":
      return useSanitationType();

    case "ApplicationChannel":
      return useApplicationChannel();

    case "EmployeeApplicationChannel":
      return useEmployeeApplicationChannel();

    case "PropertyType":
      return usePropertyType();

    case "PropertySubtype":
      return usePropertySubType();

    case "PitType":
      return usePitType();

    case "VehicleType":
      return useVehicleType();

    case "Checklist":
      return useChecklist();
  }
};

export default useMDMS;
