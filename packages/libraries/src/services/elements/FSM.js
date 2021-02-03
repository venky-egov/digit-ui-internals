import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const FSMService = {
  search: (tenantId, filters = {}) =>
    Request({
      url: Urls.fsm.search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    }),
  create: (details, tenantId) =>
    Request({
      url: Urls.fsm.create,
      data: details,
      useCache: true,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  update: (details, tenantId) =>
    Request({
      url: Urls.fsm.update,
      data: details,
      useCache: true,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  vendorSearch: (tenantId) =>
    Request({
      url: Urls.fsm.vendorSearch,
      useCache: true,
      userService: true,
      method: "POST",
      params: { tenantId },
      auth: true,
    }),
  vehicleSearch: (registrationNumber, tenantId) =>
    Request({
      url: Urls.fsm.vehicleSearch,
      useCache: true,
      userService: true,
      method: "POST",
      params: { registrationNumber, tenantId },
      auth: true,
    }),
};
