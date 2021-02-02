import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const TLService = {
  search: (tenantId, filters = {}) => {
    // console.log("----------------------------", filters);
    return Request({
      url: Urls.tl_search,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId: tenantId, ...filters },
    });
  },
};
