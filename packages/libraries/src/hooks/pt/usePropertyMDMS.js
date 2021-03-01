import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const usePropertyMDMS = (tenantId, moduleCode, type, config = {}) => {
    const usePropertyOwnerType = () => {
        return useQuery("PT_OWNERSHIP_CATEGORY", () => MdmsService.getPropertyOwnerType(tenantId, moduleCode, type), config);
    };
    const usePropertyOwnerShipCategory = () => {
        return useQuery("PT_OWNER_TYPE", () => MdmsService.getPropertyOwnerShipCategory(tenantId, moduleCode, type), config);
    }
    const useSubOwnerShipCategory = () => {
        return useQuery("PT_SUB_OWNERSHIP_CATEGORY", () => MdmsService.getPropertySubOwnerShipCategory(tenantId, moduleCode, type), config);
    }

    switch (type) {
        case "OwnerShipCategory":
            return usePropertyOwnerShipCategory();
        case "OwnerType":
            return usePropertyOwnerType();
        case "SubOwnerShipCategory":
            debugger;
            return useSubOwnerShipCategory();
    }
};

export default usePropertyMDMS;
