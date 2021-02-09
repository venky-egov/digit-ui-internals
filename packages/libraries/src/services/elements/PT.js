import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const PTService = {
  fetchProperties: ({ tenantId, filters }) => 
    Request({
      url: Urls.pt.fectch_property,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    }),

  fetchPaymentDetails: ({ tenantId, consumerCodes }) => 
     Request({
      url: Urls.pt.fetch_payment_details,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, consumerCode: consumerCodes, businessService: 'PT' },
    })
};
