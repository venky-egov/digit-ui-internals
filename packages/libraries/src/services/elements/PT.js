import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const PTService = {
  fetchProperties: ({ tenantId, filters }) => {
    Request({
      url: Urls.pt.fectch_property,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    });
  },
};
