import Urls from "../atoms/urls";
import { Request } from "../atoms/Utils/Request";

export const PaymentService = {
  fetchBill: (tenantId, filters = {}) =>
    Request({
      url: Urls.payment.fetch_bill,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId, ...filters },
    }),

  createReciept: (tenantId, details = {}) =>
    Request({
      url: Urls.payment.create_reciept,
      useCache: false,
      method: "POST",
      auth: true,
      userService: true,
      params: { tenantId },
      data: { ...details },
    }),
};
