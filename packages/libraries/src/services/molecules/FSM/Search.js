import { FSMService } from "../../elements/FSM";

export const Search = {
  all: (tenantId) => {
    return FSMService.search(tenantId, { applicationNumber: "" });
  },

  application: (tenantId, filters = {}) => {
    return FSMService.search(tenantId, { ...filters, limit: 1000 });
  },
};
